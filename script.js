// Animation simple pour le Header au scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.padding = '10px 0';
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        header.style.padding = '0';
        header.style.background = '#fff';
    }
});



// 1. Définition des données (Images locales et Textes)
const sliderData = [
    {
        image: 'public/img/slider/slider1.jpg', // Remplacez par vos chemins locaux
        title: "Bienvenue chez PMS C&S SARL",
        text: "cabinet spécialisé dans le conseil, l’expertise et l’accompagnement des entreprises en matière de gestion, de finance et de performance organisationnelle."
    },
    {
        image: 'public/img/slider/slider2..jpg',
        title: "Professionalisme",
        text: "Accompagnement des entreprises de divers secteurs grâce à une approche personnalisée, pragmatique et orientée résultats."
    },
    {
        image: 'public/img/slider/slider3.jpeg',
        title: "Solutions & Services",
        text: "Contactez-nous dès aujourd’hui pour structurer et booster la performance de votre entreprise."
    }
];

let currentIndex = 0;

// 2. Sélection des éléments
const heroSection = document.getElementById('hero-slider');
const titleElement = document.getElementById('slider-title');
const textElement = document.getElementById('slider-text');
const dots = document.querySelectorAll('.dot');

// 3. Fonction de mise à jour
const slider = document.querySelector('.slider');

function updateSlider() {
    const current = sliderData[currentIndex];

    // Changer l'image de fond
    heroSection.style.backgroundImage = `url('${current.image}')`;

    // Changer le texte avec un petit effet de reset d'animation
    titleElement.style.animation = 'none';
    titleElement.offsetHeight; // Trigger reflow
    titleElement.style.animation = null;
    
    titleElement.textContent = current.title;
    textElement.textContent = current.text;

    // Mettre à jour les indicateurs (petites barres)
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });

    // Passer à l'index suivant
    currentIndex = (currentIndex + 1) % sliderData.length;
}

// 4. Lancement automatique toutes les 5 secondes
setInterval(updateSlider, 8000);

// Initialisation au chargement
updateSlider();

document.addEventListener("DOMContentLoaded", function() {
    const observerOptions = {
        threshold: 0.50 // Déclenche l'animation quand 15% de l'élément est visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // On ajoute la classe CSS qui contient l'animation
                entry.target.classList.add('reveal');
                // On arrête d'observer une fois l'animation jouée
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // On cible toutes nos cartes de services
    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => {
        observer.observe(card);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.counter');
    
    const startCounting = (el) => {
        const target = +el.getAttribute('data-target');
        const type = el.getAttribute('data-type'); // On récupère le type (percent ou non)
        const duration = 2000; 
        const stepTime = Math.abs(Math.floor(duration / target));
        
        let current = 0;

        const timer = setInterval(() => {
            current += 1;
            
            // LOGIQUE D'AFFICHAGE
            if (type === 'percent') {
                el.innerText = `${current}%`; // Format 98%
            } else {
                el.innerText = `+${current}`; // Format +15
            }

            if (current >= target) {
                clearInterval(timer);
                // On s'assure de fixer la valeur finale propre
                el.innerText = (type === 'percent') ? `${target}%` : `+${target}`;
            }
        }, stepTime);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounting(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
});


const observerOptions = {
    threshold: 0.1, // Se déclenche dès que 10% de la carte est visible
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // On ajoute un petit délai progressif (cascade)
            setTimeout(() => {
                entry.target.classList.add('active');
                // console.log("Élément activé !"); // Supprimez le // pour tester dans la console
            }, index * 150);
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Cette fonction initialise l'observation
function initAnimations() {
    const items = document.querySelectorAll('.reveal-item');
    if (items.length > 0) {
        items.forEach(item => revealOnScroll.observe(item));
    }
}

// On lance au chargement
window.addEventListener('load', initAnimations);




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