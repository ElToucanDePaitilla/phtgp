// assets/scripts/gallery-loader.js
document.addEventListener('DOMContentLoaded', () => {
  const modal         = document.getElementById('modal');
  const swiperWrapper = document.querySelector('#gallery-slides .swiper-wrapper');
  let swiperInstance;   // pour pouvoir le détruire / recréer

  /* ------------------------------------------------------------
   * 1) Ouvre la galerie demandée
   * ---------------------------------------------------------- */
  function openGallery(folder) {
    // 1.a Remise à zéro
    if (swiperInstance) { swiperInstance.destroy(true, true); }
    swiperWrapper.innerHTML = '';

    // 1.b Chargement récursif des images
    let i = 1;
    (function loadNext() {
      const num  = String(i).padStart(3, '0');          // 001, 002…
      const img  = new Image();
      img.src    = `assets/images/galeries/${folder}/${folder}${num}.webp`;

      img.onload = () => { addSlide(img); i++; loadNext(); };
      img.onerror = () => {           // plus d’image → on initialise Swiper
        if (!swiperWrapper.children.length) {             // aucune image trouvée
          alert(`Aucune image pour ${folder}`);
          return;
        }
        initSwiper();
      };
    })();
  }

  /* ------------------------------------------------------------
   * 2) Ajoute l’image à la modale
   * ---------------------------------------------------------- */
  function addSlide(img) {
    const slide  = document.createElement('div');
    slide.className = 'swiper-slide';

    const zoom   = document.createElement('div');
    zoom.className = 'swiper-zoom-container';

    img.loading = 'lazy';
    zoom.appendChild(img);
    slide.appendChild(zoom);
    swiperWrapper.appendChild(slide);
  }

  /* ------------------------------------------------------------
   * 3) Lance Swiper après le chargement
   * ---------------------------------------------------------- */
  function initSwiper() {
    swiperInstance = new Swiper('#gallery-slides', {
      slidesPerView : 1,
      centeredSlides: true,
      lazy          : true,
      zoom          : { maxRatio: 3 },
      navigation    : {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination    : {
        el  : '.swiper-pagination',
        type: 'fraction',
      },
    });
    modal.classList.add('active');          // affiche la modale
  }

  /* ------------------------------------------------------------
   * 4) Écouteurs sur les vignettes + bouton de fermeture
   * ---------------------------------------------------------- */
  document.querySelectorAll('.gallery .grid-item').forEach(item => {
    item.addEventListener('click', () => {
      const folder = item.dataset.gallery;
      if (folder) { openGallery(folder); }
    });
  });

  document.querySelector('#modal .close-btn').addEventListener('click', () => {
    modal.classList.remove('active');
    if (swiperInstance) { swiperInstance.destroy(true, true); }
    swiperWrapper.innerHTML = '';
  });
});
