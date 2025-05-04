// Asegurarse de que el código se ejecute solo después de que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
   const showPasswordButton = document.getElementById("login-eye");
   if (showPasswordButton) {
       // Se añade el event listener para mostrar/ocultar la contraseña
       showPasswordButton.addEventListener("click", showHiddenPass);
   }
});

// Función para mostrar/ocultar la contraseña
function showHiddenPass() {
   const passField = document.getElementById("login-pass");
   const showPasswordButton = document.getElementById("login-eye");
   if (passField && showPasswordButton) {
       // Cambiar tipo de input de password a text o viceversa
       const type = passField.type === "password" ? "text" : "password";
       passField.type = type;
       // Alternar iconos
       showPasswordButton.classList.toggle("ri-eye-line");
       showPasswordButton.classList.toggle("ri-eye-off-line");
   }
}
