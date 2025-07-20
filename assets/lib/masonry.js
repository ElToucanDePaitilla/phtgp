document.addEventListener('DOMContentLoaded', function() {
    var grid = document.querySelector('.gallery');
  
    // 1. Instanciation Masonry immédiatement
    var msnry = new Masonry(grid, {
      itemSelector: '.grid-item',
      columnWidth: '.grid-sizer',
      percentPosition: true,
      gutter: 0,
      originTop: true
    });
  
    // 2. Quand chaque image lazy‐loadée trigger l'événement 'load', on relance layout()
    grid.querySelectorAll('img[loading="lazy"]').forEach(function(img) {
      if (img.complete) {
        // si déjà en cache, on relance tout de suite
        msnry.layout();
      } else {
        img.addEventListener('load', function() {
          msnry.layout();
        });
      }
    });
  });
  