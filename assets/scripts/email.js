emailjs.init({
  publicKey: "y1fO5wH-pVPcNZsh-"
});

  window.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', function(event) {
      event.preventDefault();

      // serviceID, templateID, formElement
      emailjs.sendForm(
        'service_q3t81kl',
        'template_xjqyyoq',
        this
      ).then(() => {
        alert('Merci ! Votre message a bien été envoyé.');
        // Redirection après envoi (facultative)
        window.location.href = 'https://michelhaury.com/a-propos.html';
      }, (error) => {
        console.error('EmailJS Error:', error);
        alert('Oups, une erreur est survenue. Réessayez plus tard.');
      });
    });
  });
