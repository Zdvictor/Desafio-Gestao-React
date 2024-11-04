import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import { PreVisualizationContext } from "../../context/preVisualizationContext";
import { Link } from "react-router-dom";
import { Tooltip as ReactTooltip } from 'react-tooltip';

// FIREBASE
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

// COMPONENTS
import Switches from "../../components/switch";

// REACT-ICONS
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosDocument } from "react-icons/io";

// UTILS
import {handleFixName} from "../../utils/stringUtils";

// STYLES    
import "./documents.css";

const Documents = () => {
    const [loadingMenu, setLoadingMenu] = useState(true);
    const { user } = useContext(AuthContext);
    const { handleViewPdf, handleClearForm, loading } = useContext(PreVisualizationContext);
    const [darkMode, setDarkMode] = useState(false);
    const [documents, setDocuments] = useState([]);
   
    useEffect(() => {

        handleClearForm()
        const getDocuments = async () => {
            try {
                const documentRef = collection(db, "documents");
                const q = query(documentRef, where("idUser", "==", user?.uid));
                const querySnapshot = await getDocs(q);
                
                const docsArray = []; // Array para coletar todos os documentos

                querySnapshot.forEach((doc) => {
                    docsArray.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });

                setDocuments(docsArray); // Atualiza o estado com todos os documentos
                setLoadingMenu(false);
            } catch (err) {
                console.log(err);
                setLoadingMenu(false);
            }
        };

        if (user) { // Garante que o usuário esteja disponível
            getDocuments();
        }
    }, [user, handleClearForm]);

    const handleEdit = (id) => {
        // TODO: Implementar edição de documento
    };

    const handleDelete = (id) => {
        // TODO: Implementar exclusão de documento
    };

    const handleToggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    if (loadingMenu) {
        return (
            <h1 style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>Carregando...</h1>
        );
    }

    return (
        <div className="container-documents">
            {
                documents.length === 0 ?
                    <div className="no-documents">
                        <h1 className="">Olá, {handleFixName(user?.name)}! 👋 Você não possui nenhum documento cadastrado 📂 </h1>
                        <h2 className="no-documents-subtitle">Tente deslogar e logar novamente</h2>
                    </div>
                    :
                    <>
                        <h1>Olá, {handleFixName(user?.name)}! 👋 Aqui você pode gerenciar seu documento cadastral.</h1>
                        <Switches handleToggleDarkMode={handleToggleDarkMode} />

                        <table>
                            <thead>
                                <tr>
                                    <th style={darkMode ? { backgroundColor: "#333" } : {}}>ID</th>
                                    <th style={darkMode ? { backgroundColor: "#333" } : {}}>Status</th>
                                    <th style={darkMode ? { backgroundColor: "#333" } : {}}>Nome</th>
                                    <th style={darkMode ? { backgroundColor: "#333" } : {}}>Criado em</th>
                                    <th style={darkMode ? { backgroundColor: "#333" } : {}}>Atualizado em</th>
                                    <th style={darkMode ? { backgroundColor: "#333" } : {}}>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {documents.map((document) => (
                                    <tr style={darkMode ? { backgroundColor: "#333" } : {}} key={document.id}>
                                        <td style={darkMode ? { color: "#fff" } : {}}>{document.id}</td>
                                        <td style={darkMode ? { color: "#fff" } : {}}>{document.termination === "" ? "ATIVO" : "DESLIGADO"}</td>
                                        <td style={darkMode ? { color: "#fff" } : {}}>{document.name}</td>
                                        <td style={darkMode ? { color: "#fff" } : {}}>{document.createdAt.toDate().toLocaleString()}</td>
                                        <td style={darkMode ? {color: "#fff"} : {} }>{document.updatedAt === "" ? "Ainda Não Atualizado" : document.updatedAt.toDate().toLocaleString()}</td>
                                        <td>
                                            <button data-tooltip-id="read-tooltip" data-tooltip-content="Ver" className="button-read" onClick={() => {handleViewPdf(document.id)} }>
                                                <IoIosDocument /> <ReactTooltip id="read-tooltip" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
            }

            {loading &&<div className="loading-container">
                <div className="loading"></div>
            </div>}

            {user?.adm &&
                <div className="documents-admin">
                    <h1>🔑 Percebemos que você é um administrador. </h1>
                    <Link to="/painel-admin"><button className="button-entrar">Painel Administrativo</button></Link>
                </div>
            }
        </div>
    );
};

export default Documents;


