document.addEventListener("DOMContentLoaded", function() {
    const burger = document.querySelector('.burger');
    const burgerMenu = document.querySelector('.burger-menu');
    burger.addEventListener('click', function() {
      burgerMenu.classList.toggle('active');
    });
  
    // Fermer le menu après clic sur un lien
    burgerMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        burgerMenu.classList.remove('active');
      });
    });
  });
  