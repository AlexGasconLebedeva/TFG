document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.querySelector('.toggle'); // <i> con clase ri-menu-line
    const icon = toggleBtn; // ya es el icono
    const banner = document.querySelector('.banner');
    const menu = document.querySelector('.menu');
  
    toggleBtn.addEventListener('click', () => {
      toggleBtn.classList.toggle('active');
      banner.classList.toggle('active');
      menu.classList.toggle('active');
  
      // Cambiar icono
      if (icon.classList.contains('ri-menu-line')) {
        icon.classList.replace('ri-menu-line', 'ri-close-line');
      } else {
        icon.classList.replace('ri-close-line', 'ri-menu-line');
      }
    });
  
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.menu a').forEach(link => {
      link.addEventListener('click', () => {
        toggleBtn.classList.remove('active');
        banner.classList.remove('active');
        menu.classList.remove('active');
        icon.classList.replace('ri-close-line', 'ri-menu-line');
      });
    });
  });
  