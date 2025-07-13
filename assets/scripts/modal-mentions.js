document.addEventListener('DOMContentLoaded', () => {
  // Sélection de tous les liens qui ouvrent une modale
  const links = document.querySelectorAll('.mention-link');

  links.forEach(link => {
    // Récupère l'id de la modale à ouvrir, depuis data-modal-target
    const modalId = link.dataset.modalTarget;
    const modal   = document.getElementById(modalId);
    if (!modal) return;

    const closeBtn = modal.querySelector('.close-btn');

    // Ouvre la modale
    const openModal = e => {
      e.preventDefault();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';  // bloque le scroll du fond
    };

    // Ferme la modale
    const closeModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    };

    // Événements
    link.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', e => {
      // si clic en dehors de la boîte .legal-content (i.e. sur l’arrière-plan)
      if (e.target === modal) closeModal();
    });
  });
});
