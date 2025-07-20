document.addEventListener('DOMContentLoaded', function() {
  const items = document.querySelectorAll('.grid-item');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1      // on veut être notifié à 10% visible <-> invisible
  };

  const onIntersect = (entries) => {
    entries.forEach(entry => {
      if (entry.intersectionRatio >= 0.1) {
        // dès qu'au moins 10% est visible, on dissout le voile
        entry.target.classList.add('reveal');
      } else {
        // dès qu'on passe sous 10%, on remet le voile
        entry.target.classList.remove('reveal');
      }
    });
  };

  const observer = new IntersectionObserver(onIntersect, observerOptions);
  items.forEach(item => observer.observe(item));
});
