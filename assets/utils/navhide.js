// navhide.js (modifié)
(function() {
  const nav = document.querySelector('.navbar');  // votre <nav class="navbar">
  let lastScrollY = window.pageYOffset;

  window.addEventListener('scroll', (e) => {
    // ignore les scrolls programmés (window.scrollTo avec behavior:'smooth')
    if (!e.isTrusted) {
      lastScrollY = window.pageYOffset;
      return;
    }

    const currentScrollY = window.pageYOffset;
    if (currentScrollY > lastScrollY) {
      // scroll vers le bas → on cache la nav
      nav.style.top = `-${nav.offsetHeight}px`;
    } else {
      // scroll vers le haut → on ré-affiche la nav
      nav.style.top = '0';
    }
    lastScrollY = currentScrollY;
  });
})();
