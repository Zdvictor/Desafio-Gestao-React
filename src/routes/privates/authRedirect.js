import React, {useContext} from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../../context/authContext"


export default function AuthRedirect({ children }) {
    const { signed, loadingAuth } = useContext(AuthContext);

    if (loadingAuth) {
        return <div></div>
    }

    if (signed) {
        return <Navigate to="/documentos-cadastrais" replace />;
    }

    return children;
}



