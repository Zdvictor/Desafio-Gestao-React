import React, { memo, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { PreVisualizationContext } from "../../context/preVisualizationContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

//REACT-ICONS
import { FaArrowLeft } from "react-icons/fa";

//STYLES
import "./previewFooter.css";

const PreviewFooter = memo(() => {
    
    const [text, setText] = useState("PROXIMO");
    const [disableLatest, setDisableLatest] = useState(false);
    const { formData, validateContact, validateProfissional, handleSubmitForm, handleEditForm } = useContext(PreVisualizationContext);
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate()

    useEffect( () => {


        if(location.pathname.startsWith("/informacoes-contato")) {

             setDisableLatest(true)

        }else {

            setText(id ? "EDITAR" : "CADASTRAR");
            setDisableLatest(false)

        } 
        

    }, [location.pathname])


        const handleSubmit = () => {

            

            if(location.pathname.startsWith("/informacoes-contato")) {

                let validate = validateContact()


                if(validate) {

                
                if(id) {

                    setText("EDITAR")
                    navigate(`/informacoes-profissionais/${id}`, {replace: true})
                    

                }else {

                    setText("CADASTRAR")
                    navigate("/informacoes-profissionais", {replace: true})
                    
                }


                }


            }else {

                let validate = validateProfissional()

                if(validate) {

                    if(id) {

                        handleEditForm(id)

                    }else {

                        
                        handleSubmitForm()

                    }
            
                }
                

            }
        }

    return (
        <div className="preview-footer">
            <div className="preview-footer-container">
                    <div className="preview-footer-left">

                        {!disableLatest &&
                        <Link to={id ? `/informacoes-contato/${id}` : "/informacoes-contato"}>
                            <FaArrowLeft /> Anterior
                        </Link>
                        }

                    </div>

                <div className="preview-footer-right">

                    <button onClick={handleSubmit} type="submit">
                        {text}
                    </button>

                </div>
            </div>
        </div>
    )
});

export default PreviewFooter;


