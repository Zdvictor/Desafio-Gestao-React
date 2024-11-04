import React, {useState} from "react"
import { Link } from "react-router-dom"

//FIREBASE
import {getDocs, collection, query, where} from "firebase/firestore"
import {sendPasswordResetEmail} from "firebase/auth"
import {auth, db} from "../../firebase/firebaseConfig"

//FORMIK VALIDATOR
import { Formik, Form, Field, ErrorMessage } from 'formik'
import recoverySchema from "./schema"

//TOAST
import { toast } from "react-toastify"

//STYLES
import "./forget.css"

const Recovery = () => {

  const [loading, setLoading] = useState(false)

  const handleRecovery = async (value) => {

    const email = value.email

    setLoading(true)

    try {

      const userRef = collection(db, "users")
      const q = query(userRef, where("email", "==", email))
      const querySnapshot = await getDocs(q)

      if(!querySnapshot.empty) {

        await sendPasswordResetEmail(auth, email)
        setLoading(false)
        toast.success("E-mail de recuperação enviado com sucesso! Verifique sua caixa de entrada", {
          autoClose: 5000
        })
        return

      }else {

        setLoading(false)
        toast.error("E-mail não encontrado")
        return

      }



    }catch(err) {

      if(err.code === "auth/user-not-found") {
        toast.error("E-mail não encontrado")
        setLoading(false)
        return
      }
      console.log(err)
      toast.error("Erro ao enviar e-mail de recuperação")
      setLoading(false)
      return

    }
    
  }
  

  return (
    <div className="container-forget">
      <div className="card-forget">
        <h1 className="title-forget">Esqueceu a Senha</h1>

        <Formik
          initialValues={{ email: "" }}
          validationSchema={recoverySchema} // use a suitable schema for validation
          onSubmit={(value) => {
            // handle forget password logic
            handleRecovery(value)// replace with appropriate action
          }}
        >
          {() => (
            <Form className="form-forget">
              <label className="label-forget" htmlFor="email">
                E-mail
              </label>
              <Field
                className="input-forget"
                type="email"
                id="email"
                name="email"
                placeholder="victor@teste.com"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />

              <button
                className="button-forget"
                type="submit"
              >
                {!loading ? "Enviar" : <div className="loader"></div>}
              </button>
            </Form>
          )}
        </Formik>

    
          <Link
            className="back-to-login"
            to="/login"
          >
            Voltar ao login
          </Link>

      </div>
    </div>
  )
}

export default Recovery
