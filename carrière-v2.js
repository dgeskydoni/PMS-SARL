(function() {
    function checkJobStatus() {
        // 1. On récupère la date d'aujourd'hui
        const today = new Date();
        
        // 2. On sélectionne toutes les cartes d'emploi
        const cards = document.querySelectorAll('.job-card');

        cards.forEach(card => {
            const expiryStr = card.getAttribute('data-expiry');
            const statusLabel = card.querySelector('.job-status');
            const btn = card.querySelector('.btn-postuler');

            if (expiryStr) {
                // On transforme la chaîne "2026-12-31" en objet Date
                const expiryDate = new Date(expiryStr);

                // On compare : si la date d'expiration est plus petite que maintenant
                if (expiryDate < today) {
                    // --- ACTIONS POUR OFFRE EXPIRÉE ---
                    card.classList.add('expired');
                    if (statusLabel) {
                        statusLabel.textContent = "Expiré";
                        statusLabel.style.color = "red"; // Exemple de style direct
                    }
                    if (btn) {
                        btn.textContent = "Clôturé";
                        btn.style.pointerEvents = "none"; // Désactive le clic
                        btn.style.opacity = "0.5";       // Rend le bouton gris
                    }
                } else {
                    // --- ACTIONS POUR OFFRE ACTIVE ---
                    if (statusLabel) {
                        statusLabel.textContent = "Actif";
                        statusLabel.style.color = "green";
                    }
                }
            }
        });
    }

    // Lancement de la fonction au chargement de la page
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkJobStatus);
    } else {
        checkJobStatus();
    }
})();





document.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('#mobile-menu');
    const menuLinks = document.querySelector('.nav-links');

    if (menu) {
        menu.addEventListener('click', () => {
            menu.classList.toggle('is-active');
            menuLinks.classList.toggle('active');
        });

        // Fermer le menu si on clique sur un lien (pour les sites One Page)
        document.querySelectorAll('.nav-links a').forEach(n => n.addEventListener('click', () => {
            menu.classList.remove('is-active');
            menuLinks.classList.remove('active');
        }));
    }
});





document.addEventListener('DOMContentLoaded', () => {
    
    // GESTION DES ACCORDÉONS (EMPLOIS)
    const jobHeaders = document.querySelectorAll('.job-header-bar');

    jobHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const currentItem = header.parentElement;
            
            // Ferme les autres si on veut qu'un seul soit ouvert à la fois (optionnel)
            /*
            document.querySelectorAll('.job-item').forEach(item => {
                if(item !== currentItem) item.classList.remove('open');
            });
            */

            currentItem.classList.toggle('open');
        });
    });

    // On garde aussi le code pour les dates d'expiration que nous avions fait
    // ... (votre code handleExpirations ici) ...
});