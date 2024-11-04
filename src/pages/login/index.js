import React, {useState, useContext} from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/authContext"

//FORMIK VALIDATOR
import { Formik, Form, Field, ErrorMessage } from 'formik'
import signInSchema from "./schema"


//MATERIAL UI
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


//STYLES
import "./login.css"


const Login = () => {

  const [showPassword, setShowPassword] = useState(false)
  const { signIn, loadingSignIn } = useContext(AuthContext)


  return (
    <div className="container-login">
      <div className="card-login">
        <h1 className="title-login">Login</h1>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={signInSchema}
          onSubmit={(values) => {
            signIn(values)
          }}
        >
          {() => (
            <Form className="form-login">
              <label className="label-login" htmlFor="email">
                E-mail
              </label>
              <Field
                className="input-login"
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

              <label className="label-login" htmlFor="password">
                Senha
              </label>
              <Field
                className="input-login"
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="************"
              />
              <FormControlLabel
                onChange={() => setShowPassword(!showPassword)}
                control={<Checkbox />}
                label="Mostrar Senha"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
              />

              <button
                className="button-login"
                type="submit"
              >
                {!loadingSignIn ? "Entrar" : <div className="loader"></div>}
              </button>

            <Link
                className="button-forgot-password"
                to="/recovery"
              >
                Esqueceu a senha ?
              </Link>


            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Login

