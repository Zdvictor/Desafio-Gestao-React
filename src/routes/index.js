import {Routes, Route} from "react-router-dom";

//PAGES
import Home from "../pages/home"
import Login from "../pages/login";
import NotFound from "../pages/not-found";
import Recovery from "../pages/recovery";
import Documents from "../pages/documents";
import Contact from "../pages/contact";
import Professional from "../pages/professional";
import Admin from "../pages/admin";


//PRIVATE
import AuthPrivate from "./privates/authPrivate";
import AdminPrivate from "./privates/adminPrivate";

//REDIRECT
import AuthRedirect from "./privates/authRedirect";


const RoutesApp = () => {


    return (

        <Routes>

            <Route path="/" element={<AuthRedirect> <Home /> </AuthRedirect> } />
            <Route path="/login" element={<AuthRedirect> <Login /> </AuthRedirect>} />
            <Route path="/recovery" element={<AuthRedirect> <Recovery /> </AuthRedirect>} />
            <Route path="/documentos-cadastrais" element={<AuthPrivate> <Documents />  </AuthPrivate> }/>
            <Route path="/informacoes-contato/:id?" element={<AuthPrivate> <Contact /> </AuthPrivate>} />
            <Route path="/informacoes-profissionais/:id?" element={<AuthPrivate> <Professional /> </AuthPrivate>} />
            <Route path="/painel-admin" element={<AdminPrivate> <Admin /> </AdminPrivate>} />
            
            <Route path="*" element={<NotFound />} />
            

        </Routes>

    )


}


export default RoutesApp