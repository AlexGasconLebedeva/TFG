import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB81PYScRvR_rLofBAKeBe6mEldiyp-Qzo",
  authDomain: "tfg-alexgascon.firebaseapp.com",
  projectId: "tfg-alexgascon",
  storageBucket: "tfg-alexgascon.appspot.com",
  messagingSenderId: "388739128309",
  appId: "1:388739128309:web:4e422d9a5f3d80f1eddebc",
  measurementId: "G-YK5D53M8HP"
};

// Inicialización de Firebase (solo si no existe una app previamente)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.querySelector('.register__form');
    const nicknameInput = document.getElementById("register-nickname");
    const emailInput = document.getElementById("register-email");
    const passwordInput = document.getElementById("login-pass");

    // Asegurarse de que los elementos del formulario existan
    if (!registerForm || !nicknameInput || !emailInput || !passwordInput) {
        console.error('Faltan elementos en el formulario');
        return;
    }

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();  // Prevenir el comportamiento por defecto de enviar el formulario

        const nickname = nicknameInput.value;
        const email = emailInput.value;
        const password = passwordInput.value;

        try {
            // Crear un usuario con el correo electrónico y la contraseña
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Obtener el UID del usuario recién creado
            const user = userCredential.user;

            // Guardar el nickname y otros datos en Firestore
            await setDoc(doc(db, "users", user.uid), {
                nickname: nickname,
                email: email
            });

            // Guardar el nickname en el localStorage para usarlo en otras partes de la app
            localStorage.setItem('nickname', nickname);

            // Redirigir a la página de bienvenida (dashboard)
            window.location.href = "dashboard.html"; // Asegúrate de que dashboard.html existe

        } catch (error) {
            console.error("Error registrando usuario: ", error);
            alert("Error al registrar usuario: " + error.message);
        }
    });
});
