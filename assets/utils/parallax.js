document.addEventListener('DOMContentLoaded', () => {
    console.log('▶️ Parallax : DOM chargé');
  
    const hero    = document.querySelector('.hero');
    const content = document.querySelector('.hero-content');
    if (!hero || !content) {
      console.error('❌ Parallax : .hero ou .hero-content introuvable');
      return;
    }
  
    // ----- RÉGLAGES -----
    const initialImageOffsetVh = -15; // décale la bg de 'x' vh vers le haut au chargement
    const imageSpeed           = 0.3; // 30% de la vitesse du scroll
    const textSpeed            = 0.9; // 70% de la vitesse du scroll
    // ---------------------
  
    // Convertit le vh en pixels
    const initialOffsetPx = initialImageOffsetVh * window.innerHeight / 100;
  
    // Fonction de mise à jour parallax
    const onScroll = () => {
      const y = window.pageYOffset;
  
      if (y <= hero.offsetHeight) {
        // background-image : position initiale + défilement ralenti
        hero.style.backgroundPosition = 
          `center ${initialOffsetPx + y * imageSpeed}px`;
  
        // texte : translateX fixe + translateY ralenti
        content.style.transform = 
          `translateX(-50%) translateY(${-y * textSpeed}px)`;
      }
    };
  
    // Applique la position de départ et l'effet sans attendre le scroll
    hero.style.backgroundPosition = `center ${initialOffsetPx}px`;
    onScroll();
    console.log('✅ Parallax initialisé avec offset initial');
  
    // Lancement sur scroll optimisé RAF
    window.addEventListener('scroll', () => window.requestAnimationFrame(onScroll));
  });
  