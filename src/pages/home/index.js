import React from "react"
import { Link } from "react-router-dom"

//STYLES
import "./home.css"

const Home = () => {

    return (
        <div className="bg-home">
            <section className="section-home">
                <div className="container-info-home">
                    <h1>Seja bem-vindo(a) à Taugor! 🎉✨</h1>
                    <p>
                        Para simplificar a gestão e o acompanhamento de nosso time, desenvolvi um sistema de Gestão de Documentos Cadastrais de Funcionários,
                        que permite registrar, atualizar e gerenciar informações pessoais e profissionais de maneira segura e eficiente.
                    </p>
                    <div className="container-buttons-home">
                        <Link to="/login"><button className="button-entrar">Entrar</button></Link>
                    </div>
                </div>
             </section>

        </div>

    )

}


export default Home

