import { useState, useEffect, createContext } from "react"
import { useNavigate } from "react-router-dom"

//FIREBASE
import { doc, setDoc, getDoc } from "firebase/firestore"
import {signInWithEmailAndPassword , createUserWithEmailAndPassword, onAuthStateChanged, signOut} from "firebase/auth"
import { auth,db } from "../firebase/firebaseConfig"


//TOAST
import { toast } from 'react-toastify'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    const [loadingAuth, setLoadingAuth] = useState(true);
    const [loadingSignUp, setLoadingSignUp] = useState(false)
    const [loadingSignIn, setLoadingSignIn] = useState(false)

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
          if (currentUser) {
              const uid = currentUser.uid
              const docRef = doc(db, "users", uid)
              const docSnap = await getDoc(docRef)
              const userData = {
                  uid,
                  ...docSnap.data(),
                  updatedAt: docSnap.data()?.updatedAt ?? null,
              };
              setUser(userData)
          } else {
              setUser(null);
          }
          setLoadingAuth(false)
      });
      return unsubscribe
  }, []);
  
    

    const signIn = async (data) => {

        setLoadingSignIn(true);
    
        try {
          const loginUser = await signInWithEmailAndPassword(
            auth,
            data.email,
            data.password
          )
    
          if (loginUser) {

            const uid = loginUser.user.uid;
            const docRef = doc(db, "users", uid)
            const docSnap = await getDoc(docRef)
            const userData = {
              uid: uid,
              ...docSnap.data(),
              updatedAt: docSnap.data()?.updatedAt ?? null,
            }
            setUser(userData)

            console.log(user)

            
            toast.success("Login realizado com sucesso!")
            setLoadingSignIn(false)
            navigate("/documentos-cadastrais")
            return
          }
    
          toast.error("E-mail ou senha inválidos");
          setLoadingSignIn(false)
    
        } catch (error) {
    
            setLoadingSignIn(false)
    
          if (error.code === "auth/user-not-found") {
    
            toast.error("E-mail ou senha inválidos")
    
          } else if (error.code === "auth/wrong-password") {
    
            toast.error("E-mail ou senha inválidos")
    
          } else if (error.code === "auth/invalid-credential") {
    
            toast.error("E-mail ou senha inválidos")
    
          } else if (error.code === "auth/too-many-requests") {
    
            toast.error("Muitas tentativas de login. Tente novamente mais tarde")
    
          } else {
    
            toast.error("Erro ao realizar login")
            console.error(error)
          }
        }
      }

    const signUp = async (data) => {

        setLoadingSignUp(true)

        try {
            const createUser = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            const uid = createUser.user.uid;

            await setDoc(
                doc(db, "users", uid),
                {
                    name: data.name,
                    email: data.email,
                    createdAt: new Date(),
                    adm: false
                }
            )

            const docRef = doc(db, "users", uid)
            const docSnap = await getDoc(docRef)
            const userData = {
              uid: uid,
              ...docSnap.data(),
              updatedAt: docSnap.data()?.updatedAt ?? null,
            }
            setUser(userData)

            console.log(userData)
            
            navigate("/documentos-cadastrais")
            toast.success("Usuário Registrado com sucesso!");
            setLoadingSignUp(false);

        } catch (err) {
            if (err.code === "auth/email-already-in-use") {
                toast.error("E-mail ja registrado")
            } else if (err.code === "auth/invalid-email") {
                toast.error("E-mail inválido")
            } else if (err.code === "auth/weak-password") {
                toast.error("Senha fraca")
            } else {
                toast.error("Erro ao criar usuário");
                console.log(err)
            }

            setLoadingSignUp(false)
        }
    }

    const handleSignOut = async () => {

        try {

          await signOut(auth)
          setUser(null)

        }catch(err) {

          console.log(err)

        }

    }


    return (

        <AuthContext.Provider value={
            {
            signUp,
            loadingSignUp,
            signIn,
            loadingSignIn,
            handleSignOut,
            user,
            loadingAuth,
            signed: !!user
            }
        }
        >

            {children}

        </AuthContext.Provider>

    )
}