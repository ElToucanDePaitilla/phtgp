  // Empêcher le clic droit partout
  document.addEventListener("contextmenu", function(e) {
    e.preventDefault();
  });

  // Empêcher le glisser-déposer d’images
  document.addEventListener("dragstart", function(e) {
    if (e.target.nodeName === "IMG") {
      e.preventDefault();
    }
  });

  // Optionnel : empêcher la sélection de texte ou d'éléments (renforce un peu)
  document.addEventListener("selectstart", function(e) {
    e.preventDefault();
  });