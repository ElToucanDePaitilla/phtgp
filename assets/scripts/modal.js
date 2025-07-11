document.addEventListener('DOMContentLoaded', () => {
  const modal             = document.getElementById('modal');
  const closeBtn          = modal.querySelector('.close-btn');
  const carouselContainer = modal.querySelector('main.accueil-main');

  // Au clic sur TOUTES les .grid-item
  document.querySelectorAll('.grid-item').forEach(item => {
    item.addEventListener('click', () => {
      // ouvrir la modale
      modal.classList.add('active');
      // afficher le carrousel en flex (comme défini en CSS)
      carouselContainer.style.display = 'flex';
    });
  });

  // Fonction de fermeture et réinitialisation
  const closeModal = () => {
    modal.classList.remove('active');
    carouselContainer.style.display = 'none';
  };

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });
});
