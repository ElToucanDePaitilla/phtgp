document.addEventListener('DOMContentLoaded', () => {
  const openBtns = document.querySelectorAll('.connect');
  const modal     = document.getElementById('auth-modal');
  const closeBtn  = modal.querySelector('.auth-close');
  const tabBtns   = modal.querySelectorAll('.tab-btn');
  const forms     = modal.querySelectorAll('.auth-form');

  /* Ouverture / fermeture */
  openBtns.forEach(btn =>
    btn.addEventListener('click', e => {
      e.preventDefault();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }) // ← parenthèse manquante ici
  );

  closeBtn.addEventListener('click', close);
  modal.addEventListener('click', e => {
    if (e.target === modal) close();
  });

  function close() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  /* Toggle Login / Sign-up */
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.dataset.tab;
      forms.forEach(f => f.classList.remove('active'));
      modal.querySelector(`#${target}-form`).classList.add('active');
    });
  });

  /* Soumission (exemple) */
  modal.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      alert(`Formulaire « ${form.id} » envoyé !`);
    });
  });
});