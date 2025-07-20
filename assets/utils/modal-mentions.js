document.addEventListener('DOMContentLoaded', () => {
  // Sélectionne tous les liens qui ouvrent une modale
  const links = document.querySelectorAll('.mention-link');

  links.forEach(link => {
    // Récupère l'id de la modale à ouvrir, depuis data-modal-target
    const modalId = link.dataset.modalTarget;
    const modal   = document.getElementById(modalId);

    if (!modal) {
      console.warn(`[Modale Mentions] Aucune modale avec l'ID '${modalId}' trouvée pour le lien`, link);
      return;
    }
    console.log(`[Modale Mentions] Modale trouvée : #${modalId}`);

    const closeBtn = modal.querySelector('.close-btn');
    if (!closeBtn) {
      console.warn(`[Modale Mentions] Pas de .close-btn trouvée dans la modale #${modalId}`);
      return;
    }

    // Ouvre la modale
    const openModal = e => {
      e.preventDefault();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';  // bloque le scroll du fond
      console.log(`[Modale Mentions] Ouverture de la modale : #${modalId}`);
    };

    // Ferme la modale
    const closeModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      console.log(`[Modale Mentions] Fermeture de la modale : #${modalId}`);
    };

    // Ajout des écouteurs d'événement
    link.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', e => {
      // Si clic en dehors de la boîte .legal-content (i.e. sur l’arrière-plan)
      if (e.target === modal) closeModal();
    });
  });
});
