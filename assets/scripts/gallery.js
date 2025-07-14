// gallery.js

let swiperInstance = null;
let galeries = {};  // variable renommée pour cohérence

// 1. Charger galeries.json au lancement
fetch('assets/galeries/galeries.json')
  .then(res => res.json())
  .then(json => {
    galeries = json;
    initGalerieClicks();
  })
  .catch(e => {
    alert("Impossible de charger les galeries.");
    console.error(e);
  });

function initGalerieClicks() {
  document.querySelectorAll('.gallery .grid-item').forEach(item => {
    item.addEventListener('click', () => {
      const key = item.dataset.gallery;
      if (galeries[key] && galeries[key].length) {
        openGalerie(key, galeries[key]);
      } else {
        alert('Aucune image pour cette galerie.');
      }
    });
  });
}

// 2. Ouvre la modale et crée les slides Swiper
function openGalerie(galerieKey, images) {
  const modal = document.getElementById('modal');
  const swiperWrapper = modal.querySelector('.swiper-wrapper');

  // Détruit l'instance précédente si besoin
  if (swiperInstance) {
    swiperInstance.destroy(true, true);
    swiperInstance = null;
  }
  // Vide l'ancien contenu
  swiperWrapper.innerHTML = '';

  // Ajoute les slides
  images.forEach(imgPath => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    const zoom = document.createElement('div');
    zoom.className = 'swiper-zoom-container';
    const img = document.createElement('img');
    img.src = imgPath;
    img.loading = 'lazy';
    zoom.appendChild(img);
    slide.appendChild(zoom);
    swiperWrapper.appendChild(slide);
  });

  // Affiche la modale
  modal.classList.add('active');

  // Initialise Swiper
  swiperInstance = new Swiper(modal.querySelector('.swiper'), {
    slidesPerView : 1,
    centeredSlides: true,
    zoom          : { maxRatio: 3 },
    navigation    : {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination    : {
      el  : '.swiper-pagination',
      type: 'fraction',
    },
    on: {
      imagesReady: function() {
        setTimeout(() => {
          swiperInstance.update();
          swiperInstance.slideTo(0, 0, false);
          window.dispatchEvent(new Event('resize'));
        }, 100);
      }
    }
  });

  // Sécurité supplémentaire : update après 300ms
  setTimeout(() => {
    swiperInstance.update();
    window.dispatchEvent(new Event('resize'));
  }, 300);
}

// 3. Gestion fermeture modale
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal');
  const closeBtn = modal.querySelector('.close-btn');
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    if (swiperInstance) swiperInstance.destroy(true, true);
    modal.querySelector('.swiper-wrapper').innerHTML = '';
  });

  // Fermer la modale avec la touche Echap
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeBtn.click();
    }
  });
});
