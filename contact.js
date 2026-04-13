// INITIALISATION EMAILJS (À configurer)
(function() {
    // REMPLACEZ 'VOTRE_CLE_PUBLIQUE' par votre clé fournie par EmailJS
    emailjs.init("1yWA4dRfwA1f7yD1e"); 
})();

//const contactForm = document.getElementById('contact-form');
const statusMsg = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Empêche le rechargement

        const btn = document.getElementById('submit-btn');
        btn.innerText = 'Envoi en cours...';
        btn.disabled = true;

        // On cible l'élément HTML exact par son ID pour EmailJS
        const formElement = document.getElementById('contact-form');

        emailjs.sendForm('service_blfrgp6', 'template_ba13ngv', formElement)
            .then(() => {
                btn.innerText = 'Envoyé !';
                alert('Message envoyé avec succès !');
                contactForm.reset();
                btn.disabled = false;
            }, (err) => {
                btn.innerText = 'Réessayer';
                btn.disabled = false;
                alert("Erreur d'envoi EmailJS : " + JSON.stringify(err));
            });
    });
}