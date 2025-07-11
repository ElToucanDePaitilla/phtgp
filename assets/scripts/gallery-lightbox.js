import PhotoSwipeLightbox from 'https://unpkg.com/photoswipe@5/dist/photoswipe-lightbox.esm.js';

    const lightbox = new PhotoSwipeLightbox({
      gallery: '#gallery-slides',
      children: 'a',
      pswpModule: () => import('https://unpkg.com/photoswipe@5/dist/photoswipe.esm.js'),
    });

    lightbox.init();