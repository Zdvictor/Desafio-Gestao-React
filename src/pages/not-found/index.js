import {Link} from "react-router-dom"
import "./notfound.css"

const NotFound = () => {

    return (


            <div className="not-found">
                <h1>404 - Página Não Encontrada</h1>
                <p>A página que você está procurando não foi encontrada na empresa Taugor.</p>
                <p><Link to="/">Clique aqui para voltar para a página inicial</Link></p>
            </div>




    )

}


export default NotFound
