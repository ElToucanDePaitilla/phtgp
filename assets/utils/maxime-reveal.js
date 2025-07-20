/* assets/scripts/maxim-text.js */
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const texte = document.querySelector('.maxime-content');
        if (!texte) return;
  
        if (entry.isIntersecting) {
          texte.classList.add('visible');    // apparition
        } else {
          texte.classList.remove('visible'); // reset
        }
      });
    }, {
      threshold: 0,               // on surveille juste le bord supérieur
      rootMargin: '-100px 0px 0px 0px'   // ← déclenche 100 px plus tard
      /*           ^ haut  droite bas  gauche
         -100 px en haut = la sentinelle doit descendre
         de 100 px DANS la fenêtre pour être "visible" */
    });
  
    document.querySelectorAll('.contact-sentinel')
            .forEach(el => observer.observe(el));
  });
  