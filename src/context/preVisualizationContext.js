import React, { createContext, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { sendMail } from '../services/emailService.js';

// Firebase
import { collection, getDocs, query, where, setDoc, doc, addDoc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, auth, db } from "../firebase/firebaseConfig.js";

// PDF generation
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

//TOAST
import { toast } from 'react-toastify';

// Utils
import { re } from "../utils/emailUtils.js";
import { phonePattern } from "../utils/phoneUtils.js";

export const PreVisualizationContext = createContext();

export function PreVisualizationProvider({ children }) {

    const [adminUser, setAdminUser] = useState(null);
    const navigate = useNavigate();
    const formRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        address: '',
        phone: '',
        email: '',
        nationality: '',
        birthdate: '',
        photo: null,
        photoFile: '',
        roundedPhoto: false,
        role: '',
        level: '',
        wage: '',
        admission: '',
        termination: ''
    });

    const [errors, setErrors] = useState({
        errorfirstName: '',
        errorlastName: '',
        errorgender: '',
        erroraddress: '',
        errorphone: '',
        erroremail: '',
        errornationality: '',
        errorbirthdate: '',
        errorphoto: '',
        errorrole: '',
        errorlevel: '',
        errorwage: '',
        erroradmission: '',
        errortermination: ''
    });

    const handleBringData = async (idDocument) => {

        setLoading(true)

        const docRef = doc(db, "documents", idDocument);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {

            toast.error("Erro ao buscar dados. Por favor, insira um id de documento valido.")
            setLoading(false)
            navigate("/painel-admin")
            return
            
        }
        
        setFormData({

            firstName: docSnap.data().name,
            ...docSnap.data()
        })

        setLoading(false)

    


  
    }

    const validateContact = () => {

        let isValid = true;

        if(formData.firstName === "") {
            setErrors({
                ...errors,
                errorfirstName:  "Nome obrigatório"
            });
            isValid = false;
        }

        if(formData.lastName === "") {
            setErrors({
                ...errors,
                errorlastName:  "Sobrenome obrigatório"
            });
            isValid = false;
        }

        if(formData.gender === "") {  
            setErrors({ 
                ...errors,
                errorgender:  "Genero obrigatório"  
            });
            isValid = false;
        }

        if(formData.address === "") {
            setErrors({
                ...errors,
                erroraddress:  "Endereço obrigatório"
            });
            isValid = false;
        }

        
        if (!phonePattern.test(formData.phone)) {
            setErrors({
                ...errors,
                errorphone: "Telefone celular inválido"
            });
            isValid = false;
        }

        if(!re.test(formData.email)) {
            setErrors({
                ...errors,
                erroremail:  "Email inválido"
            });
            isValid = false;
        }

        if(formData.nationality === "") {  
            setErrors({
                ...errors,  
                errornationality:  "Nacionalidade obrigatório"
            });
            isValid = false;
        }

        if(formData.birthdate === "" || !/^\d{4}-\d{2}-\d{2}$/.test(formData.birthdate) || isNaN(Date.parse(formData.birthdate)) ) {
            setErrors({ 
                ...errors,
                errorbirthdate:  "Data de nascimento Inválida"            
            });
            isValid = false;
        }

        if(formData.photo === undefined || formData.photo === null || formData.photo === "") {
            
            setErrors({ 
                ...errors,
                errorphoto:  "Foto obrigatória"            
            });
            isValid = false;
        }

        return isValid;
        

    }
      const validateProfissional = () => {

        let isValid = true;

        if(formData.role === "") {
            setErrors({
                ...errors,
                errorrole:  "Cargo obrigatório"
            });
            isValid = false;
        }

        if(formData.level === "") {
            setErrors({
                ...errors,
                errorlevel:  "Nivel obrigatório"
            });
            isValid = false;
        }

        if(formData.wage.length < 3) {  
            setErrors({ 
                ...errors,
                errorwage:  "Salário invalido"  
            });
            isValid = false;
        }

        if(formData.admission === "" || !/^\d{4}-\d{2}-\d{2}$/.test(formData.admission) || isNaN(Date.parse(formData.admission))) {
            setErrors({
                ...errors,
                erroradmission:  "Data de admissão inválida"
            });
            isValid = false;
        }


        return isValid;
        

    }

    const handleSubmitImage = async () => {
        if (!formData.photoFile) {
            console.error("Foto não selecionada!");
            return null;
        }

        try {
            const fileName = Date.now() + formData.photoFile.name;
            const storageRef = ref(storage, `images/${fileName}`);
            await uploadBytes(storageRef, formData.photoFile);
            const url = await getDownloadURL(storageRef);
            return url;
        } catch (err) {
            console.error("Erro ao fazer upload da imagem:", err);
            return null;
        }
    };

    
    const handleCreateUser = async () => {
        const currentAdminUser = auth.currentUser;
        setAdminUser(currentAdminUser);

        const collectionRef = collection(db, "users");
        const q = query(collectionRef, where("email", "==", formData.email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            setErrors({ ...errors, erroremail: "Email já cadastrado" });
            navigate("/informacoes-contato", { replace: true });
            return null;
        }

        const temporaryPassword = uuidv4().slice(0, 8);

        try {

            const createUser = await createUserWithEmailAndPassword(auth, formData.email, temporaryPassword);
            const uid = createUser.user.uid;

            setTimeout(async () => {
 
                await signInWithEmailAndPassword(auth, currentAdminUser.email, "admintaugor");

                await setDoc(doc(db, "users", uid), {
                    name: formData.firstName,
                    email: formData.email,
                    createdAt: new Date(),
                    adm: false,
                });

                sendMail(formData.firstName, formData.email, temporaryPassword);
            }, 500);

            return uid;
        } catch (err) {
            console.error("Erro ao criar usuário:", err);
            return null;
        }
    };
    
    const handleGeneratePdf = async () => {
        if (!formRef.current) return null;
    
        try {
            const canvas = await html2canvas(formRef.current, {
                scale: 2, 
                backgroundColor: "#ffffff"
            });
            const imgData = canvas.toDataURL('image/png');
    
            const pdf = new jsPDF();
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    
            const pdfBlob = pdf.output('blob');
            const fileName = `documents/${Date.now()}-document.pdf`;
            const storageRef = ref(storage, fileName);
            await uploadBytes(storageRef, pdfBlob);
            const url = await getDownloadURL(storageRef);
            return url;
        } catch (error) {
            console.error("Erro ao capturar e carregar o PDF:", error);
            return null;
        }
    };
    
    const handleSubmitForm = async () => {

        setLoading(true)

        try {

            const urlPdf = await handleGeneratePdf();
            if (!urlPdf) {
                toast.error("Erro ao carregar o PDF.");
                setLoading(false)
                return;
            }

            const urlImage = await handleSubmitImage();
            if (!urlImage) {

                toast.error("Erro ao carregar a imagem, Tente carrega-la novamente.");
                setLoading(false)
                return;
            }

            const userCreated = await handleCreateUser();
            if (!userCreated) {
                toast.error("Erro ao criar usuário.");
                setLoading(false)
                return;
            }
    
    
            console.log("Imagem e PDF carregados com sucesso:", urlImage, urlPdf);
            
            const docRef = collection(db, "documents");

            await addDoc(docRef, {
                idUser: userCreated,
                name: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                gender: formData.gender,
                address: formData.address,
                nationality: formData.nationality,
                birthdate: formData.birthdate,
                role: formData.role,
                level: formData.level,
                wage: formData.wage,
                admission: formData.admission,
                termination: formData.termination,
                photo: urlImage,
                pdf: urlPdf,
                createdAt: new Date(),
                updatedAt: ""
            });

            handleClearForm()
            setLoading(false)
            toast.success("Informações Cadastradas com sucesso.");
    
            navigate("/");

            
        } catch (error) {
            console.error("Erro ao enviar o formulário:", error);
        }
    };

    const handleEditForm = async (idDocument) => {

        setLoading(true)

        const urlPdf = await handleGeneratePdf();

        if (!urlPdf) {
            toast.error("Erro ao carregar o PDF.");
            setLoading(false)
            return;
        }    

        const urlImage = await handleSubmitImage();
        if (!urlImage) {

            toast.error("Erro ao carregar a imagem, Tente carrega-la novamente.");
            setLoading(false)
            return;
        }


        const docRef = doc(db, "documents", idDocument);
        await updateDoc(docRef, {   
            name: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            gender: formData.gender,
            address: formData.address,
            nationality: formData.nationality,
            birthdate: formData.birthdate,
            role: formData.role,
            level: formData.level,
            wage: formData.wage,
            admission: formData.admission,
            termination: formData.termination,
            photo: urlImage == null ? formData.photo : urlImage,
            pdf: urlPdf,
            updatedAt: new Date()    
        });

        handleClearForm()

        setLoading(false)

        toast.success("Documento editado com sucesso!");



        navigate("/");

    }


    const handleViewPdf = (id) => {
        setLoading(true);
        const docRef = doc(db, "documents", id);
        getDoc(docRef).then((doc) => {
            const url = doc.data().pdf;
            window.open(url, "_blank");
            setLoading(false);
        });

    }

    const handleDeleteDocument = async (userId, documentId) => {

        setLoading(true)

        try {
            
            const response = await fetch(`https://projeto-api-delete-firebase.vercel.app/delete-user/${userId}`, {
                method: 'DELETE',
            });
            const userDocRef = doc(db, "users", userId);
            await deleteDoc(userDocRef);

            const documentDocRef = doc(db, "documents", documentId);
            await deleteDoc(documentDocRef);

            toast.success("Documento excluído com sucesso!");
            setLoading(false)

        } catch (error) {
            console.error("Erro ao excluir documento:", error);
            toast.error("Erro ao excluir documento!");
            setLoading(false)
        }
    };

    const handleClearForm = () => {

        setFormData({
            firstName: '',
            lastName: '',
            gender: '',
            address: '',
            phone: '',
            email: '',
            nationality: '',
            birthdate: '',
            photo: null,
            photoFile: '',
            roundedPhoto: false,
            role: '',
            level: '',
            wage: '',
            admission: '',
            termination: ''
        });

        setErrors({
            errorfirstName: '',
            errorlastName: '',
            errorgender: '',
            erroraddress: '',
            errorphone: '',
            erroremail: '',
            errornationality: '',
            errorbirthdate: '',
            errorphoto: '',
            errorrole: '',
            errorlevel: '',
            errorwage: '',
            erroradmission: '',
            errortermination: ''
        })

    }
    

    return (
        <PreVisualizationContext.Provider value={{
            formData,
            setFormData,
            errors,
            setErrors,
            validateContact,
            validateProfissional,
            handleClearForm,
            handleBringData,
            handleSubmitForm,
            formRef,
            handleViewPdf,
            handleDeleteDocument,
            handleEditForm,
            loading,
            setLoading
        }}>
            {children}
        </PreVisualizationContext.Provider>
    );
}
