import React, {useContext} from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../../context/authContext"

export default function AdminPrivate({ children }) {

    const {user, loadingAuth} = useContext(AuthContext)

    if (loadingAuth) {
        return <div></div>
    }

    if(!user?.adm) {

        return <Navigate to="/" replace />

    }

    return children


}