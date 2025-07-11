document.addEventListener("DOMContentLoaded", function () {
  const swiperWrapper = document.querySelector('.swiper-wrapper');
  swiperWrapper.id = 'gallery-swiper'; // on garde cet ID pour la grille si besoin

  let i = 1;

  function loadImage() {
    const img = new Image();
    img.src = `assets/images/galeries/limoges/Michel Haury@photographie-Limoges (${i}).webp`;

    img.onload = function () {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';

      // Conteneur de zoom Swiper
      const zoomContainer = document.createElement('div');
      zoomContainer.className = 'swiper-zoom-container';

      // Attributs de l'image
      img.alt = `Creuse ${i}`;
      img.loading = 'lazy';

      // On emballe l'image dans le container de zoom
      zoomContainer.appendChild(img);
      slide.appendChild(zoomContainer);
      swiperWrapper.appendChild(slide);

      i++;
      loadImage(); // chargement récursif
    };

    img.onerror = function () {
      initializeSwiper(); // fin de la boucle => on lance Swiper
    };
  }

  function initializeSwiper() {
    new Swiper('.swiper', {
      slidesPerView: 1,          // une seule slide à la fois
      centeredSlides: true,      // centrer la slide active
      loop: false,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
      },
      lazy: true,
      zoom: {
        maxRatio: 3,     // zoom max 3×
        minRatio: 1,     // ratio minimal
        toggle: true     // double-clic pour activer/désactiver
      },
    });
  }

  loadImage(); // démarrage
});
