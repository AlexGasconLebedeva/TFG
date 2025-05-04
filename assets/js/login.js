      import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
      import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

      const firebaseConfig = {
         apiKey: "AIzaSyB81PYScRvR_rLofBAKeBe6mEldiyp-Qzo",
         authDomain: "tfg-alexgascon.firebaseapp.com",
         projectId: "tfg-alexgascon",
         storageBucket: "tfg-alexgascon.firebasestorage.app",
         messagingSenderId: "388739128309",
         appId: "1:388739128309:web:4e422d9a5f3d80f1eddebc",
         measurementId: "G-YK5D53M8HP"
      };

      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);

      

      document.querySelector(".login__form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-pass").value;
      
        try {
          await signInWithEmailAndPassword(auth, email, password);
          window.location.href = "dashboard.html";
        } catch (error) {
          alert("Error iniciando sesión: " + error.message);
          console.error(error);
        }
      });
