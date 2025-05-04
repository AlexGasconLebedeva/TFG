// dashboard.js
import { auth } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";


document.addEventListener("DOMContentLoaded", () => {
  const userNameElement = document.getElementById("user-nickname");

  // Comprobar si el usuario está autenticado
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // Obtener el nickname desde localStorage
      const nickname = localStorage.getItem("nickname");

      if (nickname) {
        userNameElement.textContent = nickname;
      } else {
        userNameElement.textContent = "Usuario";
      }
    } else {
      // Si no hay usuario, redirigir al login
      window.location.href = "login.html";
    }
  });

  // Logout
  document.getElementById("logout-button").addEventListener("click", () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("nickname");
        window.location.href = "login.html";
      })
      .catch((error) => {
        console.error("Error al cerrar sesión:", error);
      });
  });
});


