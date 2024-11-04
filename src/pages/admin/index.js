import React, { useState, useEffect, useContext } from "react";
import {Link, useNavigate} from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { PreVisualizationContext } from "../../context/preVisualizationContext";

//MODAL
import ModalDelete from "../../components/modal";

//TOOLTIP
import { Tooltip as ReactTooltip } from "react-tooltip";

// FIREBASE
import { getDocs, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

//COMPONENTS
import Switches from "../../components/switch";

// REACT-ICONS
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosDocument } from "react-icons/io";

//UTILS
import {handleFixName} from "../../utils/stringUtils";

// STYLES
import "./admin.css";

const Admin = () => {
  const { user } = useContext(AuthContext);
  const {handleViewPdf ,handleDeleteDocument, handleClearForm, handleBringData, loading, setLoading} = useContext(PreVisualizationContext);
  const [loadingMenu, setLoadingMenu] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [dataForModal, setDataForModal] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const documentRef = query(collection(db, "documents"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(documentRef, (querySnapshot) => {
      let documents = [];
      querySnapshot.forEach((doc) => {
        documents.push({
          id: doc.id,
          ...doc.data(),
        });
      });
  
      setDocuments(documents);
      setLoadingMenu(false);
    });
  
    handleClearForm();
    return () => unsubscribe();
  }, []);
  

  const handleEdit = (id) => {

    navigate(`/informacoes-contato/${id}`, { replace: true });
    handleBringData(id)

  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Atenção: Você tem certeza de que deseja deletar este documento? Se você continuar, todos os dados referentes ao usuário serão permanentemente excluídos. Se você deseja apenas modificar os dados, clique em Editar.");
    if (confirmDelete) {
      handleDeleteDocument(documents[id].idUser, documents[id].id);
    }
  };

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handlePagination = (page) => {
    setPage(page);
  };

  const filteredDocuments = documents.filter((document) =>
    document?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedDocuments = filteredDocuments.slice(startIndex, endIndex);

  if (loadingMenu) {
    return (
      <h1
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Carregando...
      </h1>
    );
  }

  return (
    <div className="container-documents">
      {documents.length === 0 ? (
        <div className="no-documents">
          <h1 className="">
            Olá, {handleFixName(user?.name)}! 👋 Nenhum
            documento cadastrado 📂
          </h1>
          <h2 className="no-documents-subtitle">Deseja cadastrar um novo?</h2>
          <Link to="/informacoes-contato">
          <button className="add-documents-button">Adicionar Novo Documento</button>
          </Link>
        </div>
      ) : (
        <>
          <h1>
            Olá, {handleFixName(user?.name)}! 👋 Aqui você pode gerenciar Todos
            documentos cadastrados.
          </h1>

          <Link to="/informacoes-contato">
          <button className="add-documents-button">Adicionar Novo Documento</button>
          </Link>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Buscar por usuário"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Switches handleToggleDarkMode={handleToggleDarkMode} />

          <table>
            <thead>
              <tr>
                <th style={darkMode ? { backgroundColor: "#333" } : {}}>ID</th>
                <th style={darkMode ? { backgroundColor: "#333" } : {}}>Status</th>
                <th style={darkMode ? { backgroundColor: "#333" } : {}}>
                  Nome
                </th>
                <th style={darkMode ? { backgroundColor: "#333" } : {}}>
                  Criado em
                </th>
                <th style={darkMode ? { backgroundColor: "#333" } : {}}>
                  Atualizado em
                </th>
                <th style={darkMode ? { backgroundColor: "#333" } : {}}>
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedDocuments.map((document) => (
                <tr
                  style={darkMode ? { backgroundColor: "#333" } : {}}
                  key={document.id}
                >
                  <td style={darkMode ? { color: "#fff" } : {}}>
                    {document.id}
                  </td>
                  <td style={darkMode ? { color: "#fff" } : {}}>
                    {document.termination === "" ? "ATIVO" : "DESLIGADO"}
                  </td>
                  <td style={darkMode ? { color: "#fff" } : {}}>
                    {document.name}
                  </td>
                  <td style={darkMode ? {color: "#fff"} : {} }>
                    {document.createdAt.toDate().toLocaleString()}
                  </td>
                  <td style={darkMode ? {color: "#fff"} : {} }>
                    {document.updatedAt === "" ? "Ainda Não Atualizado" : document.updatedAt.toDate().toLocaleString()}
                  </td>
                  <td>
                    <button
                      data-tooltip-id="read-tooltip"
                      data-tooltip-content="Ver"
                      className="button-read"
                      onClick={() => handleViewPdf(document.id)}
                    >
                      <IoIosDocument /> <ReactTooltip id="read-tooltip" />
                    </button>
                    <button
                      data-tooltip-id="edit-tooltip"
                      data-tooltip-content="Editar"
                      className="button-edit"
                      onClick={() => handleEdit(document.id)}
                    >
                      <FaEdit /> <ReactTooltip id="edit-tooltip" />
                    </button>
                    <button
                      data-tooltip-id="delete-tooltip"
                      data-tooltip-content="Apagar"
                      className="button-delete"
                      onClick={() => {
                        setOpenModal(true);
                        setDataForModal({idUser: document.idUser, idDocument: document.id});
                      }} 
                    >
                      <MdDelete /> <ReactTooltip id="delete-tooltip" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          
          <ModalDelete openModal={openModal} onClose={() => setOpenModal(false)} idUser={dataForModal.idUser} idDocument={dataForModal.idDocument } />

          {loading &&<div className="loading-container">
                <div className="loading"></div>
            </div>}

          <div className="pagination">
            {Array.from({
              length: Math.ceil(filteredDocuments.length / itemsPerPage),
            }).map((_, i) => (
              <button
                key={i}
                className={page === i + 1 ? "active" : ""}
                onClick={() => handlePagination(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Admin;


