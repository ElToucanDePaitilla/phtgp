/* assets/scripts/apropos-reveal.js */
document.addEventListener('DOMContentLoaded', () => {
    const apropos = document.querySelector('.apropos');
    if (!apropos) return;
  
    const observer = new IntersectionObserver(
      ([entry]) => {
        /* ≥ 40 % de la section visible → on révèle   */
        if (entry.intersectionRatio >= 0.4) {
          apropos.classList.add('reveal');
        } else {
          apropos.classList.remove('reveal'); // retire pour rejouer au retour
        }
      },
      {
        threshold: [0, 0.4]   // déclenche à la montée ET à la descente
      }
    );
  
    observer.observe(apropos);
  });
  