import {BrowserRouter as Router} from 'react-router-dom'
import { ToastContainer } from "react-toastify"
import Header from "./components/header"
import RoutesApp from "./routes"
import { AuthProvider } from './context/authContext'
import {PreVisualizationProvider} from "./context/preVisualizationContext"

import 'react-toastify/dist/ReactToastify.css';


const App = () => {

  return (
    
    <Router>
      
      <AuthProvider>

        <PreVisualizationProvider>

          <ToastContainer autoClose={3000} />

          <Header />

          <RoutesApp />

          
        </PreVisualizationProvider>

      </AuthProvider>
      
    </Router>
    

  )
  
}

export default App