/* assets/scripts/apropos-reveal.js */
document.addEventListener('DOMContentLoaded', () => {
  const apropos = document.querySelector('.apropos');
  if (!apropos) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      /* 
        - Si on descend et que ≥ 40 % est visible → on ajoute reveal
        - Si on remonte et que le haut de la section a dépassé le haut du viewport → on retire reveal
      */
      if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
        apropos.classList.add('reveal');
      } else if (!entry.isIntersecting && entry.boundingClientRect.top >= 0) {
        // La section est entièrement au-dessus du viewport
        apropos.classList.remove('reveal');
      }
    },
    {
      threshold: [0, 0.4]   // déclenche à la montée ET à la descente
    }
  );

  observer.observe(apropos);
});