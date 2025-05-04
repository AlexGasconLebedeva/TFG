// Importar Firebase desde el CDN Pero al final lo he puesto dentro de cada html
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB81PYScRvR_rLofBAKeBe6mEldiyp-Qzo",
  authDomain: "tfg-alexgascon.firebaseapp.com",
  projectId: "tfg-alexgascon",
  storageBucket: "tfg-alexgascon.firebasestorage.app",
  messagingSenderId: "388739128309",
  appId: "1:388739128309:web:4e422d9a5f3d80f1eddebc",
  measurementId: "G-YK5D53M8HP"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Obtener servicios de autenticación y Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Exportar servicios para usarlos en otros archivos
export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, doc, setDoc };
