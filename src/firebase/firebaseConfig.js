// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig1 = {
  apiKey: "AIzaSyAIu5pYJLtCtnjh7XnQFDuo2R6isa-jWik",
  authDomain: "tickets-29703.firebaseapp.com",
  projectId: "tickets-29703",
  storageBucket: "tickets-29703.appspot.com",
  messagingSenderId: "564336494759",
  appId: "1:564336494759:web:dba372277612a83fdbb382"
};

const firebaseConfig2 = {
  apiKey: "AIzaSyDOrN7IKQAaXsCT7JHI_R0O0wzzmd3ngKs",
  authDomain: "teste-desafio-c917c.firebaseapp.com",
  projectId: "teste-desafio-c917c",
  storageBucket: "teste-desafio-c917c.appspot.com",
  messagingSenderId: "1008721992452",
  appId: "1:1008721992452:web:80e3262ac756547421ce51"
};

// Inicializar a primeira instância do Firebase
const app1 = initializeApp(firebaseConfig1, "app1");
// Inicializar a segunda instância do Firebase
const app2 = initializeApp(firebaseConfig2, "app2");

// Exportar os serviços específicos de cada instância
const storage = getStorage(app1);
const auth = getAuth(app2);
const db = getFirestore(app2);

export { storage, auth, db };
