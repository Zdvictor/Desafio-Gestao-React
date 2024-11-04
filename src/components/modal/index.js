import React, { useState, useContext } from "react";
import { PreVisualizationContext } from "../../context/preVisualizationContext";


//TOOLTIP
import { Tooltip as ReactTooltip } from "react-tooltip";

//REACT-ICONS
import { MdDelete } from "react-icons/md";

//STYLES
import "./modal.css"



const ModalDelete = ({ openModal, onClose, idUser, idDocument }) => {

    const {handleDeleteDocument} = useContext(PreVisualizationContext);

    const handleDelete = () => {
        handleDeleteDocument(idUser, idDocument)
    };

    return (
      <>
        {openModal && (
          <div className="modal-delete">
            <div className="modal-delete-content">
              <h2>⚠️ Deseja deletar este documento?</h2>
              <br />
              <p>
                Se você confirmar, todos os dados referentes ao usuário, 
                incluindo documentos e informações de login, serão <strong>permanentemente excluídos.</strong> ⚠️  
                Essa ação não pode ser desfeita!
              </p>

              <br />
              
              <p>

              Por favor, <strong>tenha certeza</strong> de que o vínculo com o funcionário foi realmente desligado. 🛑  
              Recomendamos que baixe o documento antes de prosseguir, para evitar quaisquer problemas futuros.

              </p>

              <strong>Tem certeza mesmo que quer deletar? 🔴</strong>

              <div className="modal-delete-actions">
                <button
                  className="button-delete-confirm"
                  onClick={() => {
                    handleDelete()
                    onClose();
                  }}
                >
                  Sim, deletar
                </button>
                <button
                  className="button-delete-cancel"
                  onClick={onClose}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };
  
  export default ModalDelete;
  
