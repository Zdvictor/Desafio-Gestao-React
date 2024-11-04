import React, { useEffect, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { PreVisualizationContext } from "../../context/preVisualizationContext";
import { useLocation, Link } from "react-router-dom"

//REACT-ICONS
import { TiHome } from "react-icons/ti";
import { CiLogout } from "react-icons/ci";

import { Tooltip as ReactTooltip } from 'react-tooltip'


//MATERIAL-UI
import Progress from "./progress";

//ASSETS
import Logo from "../../assets/logo.png";

//STYLES
import "./header.css";

const Header = () => {

    const {handleSignOut}  = useContext(AuthContext)
    const {handleClearForm} = useContext(PreVisualizationContext)
    const location = useLocation()

    useEffect(() => {

        console.log(location.pathname)

    }, [location.pathname])

    return (
        <>
            <header className="header">

                <div className="header-logo-and-step">
                    
                    <Link to="/">
                    <img onClick={handleClearForm} src={Logo} alt="Logo Taugor" className="header-logo" />
                    </Link>
                    
                    <div className="header-divider"></div>

                    <section className="header-step-info">
                    <article>
                        <h5>{
                            (() => {
                                const basePath = location.pathname.split('/')[1];
                                const pathMap = {
                                    "/": "Home",
                                    "/login": "Logar",
                                    "/recovery": "Recuperar Senha",
                                    "/documentos-cadastrais": "Informações do documento",
                                    "/painel-admin": "Informações de Todos os documento",
                                    "/informacoes-contato": "Dados de Contato",
                                    "/informacoes-profissionais": "Dados de Profissão"
                                };
                                
                                
                                return pathMap[`/${basePath}`] || 
                                    (location.pathname.startsWith("/informacoes-contato") ? "Dados de Contato" : "Pagina desconhecida");
                            })()
                        }</h5>
                        <h3>
                            <strong>
                                {location.pathname.split("/")[1].split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                            </strong>
                        </h3>
                    </article>


                    </section>

                </div>
                
                <div className="header-home-icon">
                    <div className="header-divider"></div>

                    <i>
                        {(location.pathname === "/documentos-cadastrais" || location.pathname === "/painel-admin") ? (
                            <> <CiLogout onClick={handleSignOut} size={30} color="red" data-tooltip-id="logout-tooltip" data-tooltip-content="Sair" /> <ReactTooltip id="logout-tooltip" /> </>
                        ) : (
                            <Link to="/">
                                <TiHome onClick={handleClearForm} size={30} color="#686767cc" data-tooltip-id="home-tooltip" data-tooltip-content="Home" />  <ReactTooltip id="home-tooltip" /> 
                            </Link>
                        )}
                    </i>

                </div>
            </header>
            {(location.pathname.startsWith("/informacoes-contato") || location.pathname.startsWith("/informacoes-profissionais") ) && <Progress value={location.pathname.startsWith("/informacoes-contato")  ? 40 : 100} /> }
        </>
    );
};

export default Header;
