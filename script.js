// Configuration d'EmailJS
const EMAILJS_SERVICE_ID = 'service_8zr8d4n';
const EMAILJS_TEMPLATE_ID = 'template_7bam3a9';

// Fonction pour afficher les notifications
function showNotification(icon, title, text) {
    if (typeof Swal !== 'undefined') {
        return Swal.fire({
            icon: icon,
            title: title,
            text: text,
            confirmButtonColor: 'var(--primary-color)',
            customClass: {
                confirmButton: 'swal-confirm-btn'
            }
        });
    } else {
        console.log(`[${icon}] ${title}: ${text}`);
        return Promise.resolve();
    }
}

// Fonction pour valider l'email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Fonction pour envoyer l'email
async function sendEmail() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    // Vérifier la validité du formulaire
    if (!nameInput || !emailInput || !subjectInput || !messageInput || !submitBtn) {
        await showNotification('error', 'Erreur', 'Erreur de configuration du formulaire.');
        return;
    }

    if (!nameInput.value.trim() || !validateEmail(emailInput.value.trim()) || !subjectInput.value.trim() || !messageInput.value.trim()) {
        await showNotification('error', 'Erreur', 'Veuillez remplir correctement tous les champs du formulaire.');
        return;
    }
    
    // Désactiver le bouton d'envoi
    const originalButtonText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Envoi en cours...';
    
    // Récupération des valeurs du formulaire
    const formData = {
        from_name: nameInput.value.trim(),
        from_email: emailInput.value.trim(),
        subject: subjectInput.value.trim(),
        message: messageInput.value.trim(),
        reply_to: emailInput.value.trim()
    };
    
    try {
        // Vérifier que emailjs est chargé
        if (typeof emailjs === 'undefined') {
            throw new Error('EmailJS n\'est pas correctement chargé');
        }

        console.log('Tentative d\'envoi avec les données :', {
            service_id: EMAILJS_SERVICE_ID,
            template_id: EMAILJS_TEMPLATE_ID,
            user_id: 'WKKiwnfctNu-CewS8',
            template_params: formData
        });

        // Envoi de l'email via EmailJS
        const response = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            formData,
            'WKKiwnfctNu-CewS8' // user_id optionnel
        );
        
        console.log('Email envoyé avec succès!', response);
        
        // Afficher un message de succès
        await showNotification('success', 'Message envoyé !', 'Je vous recontacterai dès que possible.');
        
        // Réinitialiser le formulaire
        contactForm.reset();
        
    } catch (error) {
        console.error('Erreur complète :', error);
        console.error('Détails de l\'erreur :', {
            status: error.status,
            text: error.text,
            message: error.message
        });
        
        // Afficher un message d'erreur plus détaillé
        let errorMessage = 'Une erreur est survenue lors de l\'envoi du message. ';
        
        if (error.status === 0) {
            errorMessage = 'Erreur de connexion. Vérifiez votre connexion internet et réessayez.';
        } else if (error.status === 400) {
            errorMessage = 'Erreur 400 - Requête incorrecte. ';
            errorMessage += 'Veuillez vérifier votre configuration EmailJS (Service ID, Template ID, clé publique).';
        } else if (error.status === 401) {
            errorMessage = 'Erreur 401 - Non autorisé. ';
            errorMessage += 'Votre clé publique EmailJS est peut-être incorrecte ou expirée.';
        } else if (error.status === 404) {
            errorMessage = 'Erreur 404 - Service ou template introuvable. ';
            errorMessage += 'Veuillez vérifier vos IDs de service et de template.';
        } else {
            errorMessage += `Erreur ${error.status || 'inconnue'}. `;
            errorMessage += 'Veuillez réessayer plus tard ou me contacter directement par email.';
        }
        
        await showNotification('error', 'Erreur', errorMessage);
        
    } finally {
        // Réactiver le bouton d'envoi
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalButtonText;
        }
    }
}

// Initialisation au chargement du document
document.addEventListener('DOMContentLoaded', function() {
    // Initialisation d'AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }

    // Typed.js pour l'effet de frappe
    if (document.querySelector('.typing-text') && typeof Typed !== 'undefined') {
        new Typed('.typing-text', {
            strings: ['Élève Ingénieur', 'Développeur', 'Passionné de Technologie'],
            typeSpeed: 80,
            backSpeed: 50,
            backDelay: 1500,
            loop: true,
            showCursor: true,
            cursorChar: '|',
            autoInsertCss: true
        });
    }

    // Gestion du menu de navigation
    const navbar = document.querySelector('.navbar');
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (navbar && backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
                backToTopButton.classList.add('visible');
            } else {
                navbar.classList.remove('scrolled');
                backToTopButton.classList.remove('visible');
            }
        });
    }

    // Fermer le menu mobile après le clic sur un lien
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const menuToggle = document.getElementById('navbarNav');
    
    if (menuToggle && navLinks.length > 0 && typeof bootstrap !== 'undefined') {
        const bsCollapse = new bootstrap.Collapse(menuToggle, {toggle: false});
        
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                if (menuToggle.classList.contains('show')) {
                    bsCollapse.toggle();
                }
            });
        });
    }

    // Gestion du bouton de retour en haut
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Gestion du formulaire de contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        
        // Fonction pour activer/désactiver le bouton d'envoi
        function updateSubmitButton() {
            if (!submitBtn) return;
            
            const isFormValid = nameInput && nameInput.value.trim() !== '' && 
                              emailInput && validateEmail(emailInput.value.trim()) && 
                              subjectInput && subjectInput.value.trim() !== '' && 
                              messageInput && messageInput.value.trim() !== '';
            
            submitBtn.disabled = !isFormValid;
            if (isFormValid) {
                submitBtn.innerHTML = '<span class="me-2">Envoyer le message</span><i class="fas fa-paper-plane"></i>';
            } else {
                submitBtn.innerHTML = '<span class="me-2">Remplissez le formulaire</span><i class="fas fa-lock"></i>';
            }
        }
        
        // Validation de l'email en temps réel
        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                if (this.value.trim() && !validateEmail(this.value.trim())) {
                    this.classList.add('is-invalid');
                } else {
                    this.classList.remove('is-invalid');
                }
                updateSubmitButton();
            });
        }
        
        // Mise à jour du bouton lors de la saisie
        [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
            if (input) {
                input.addEventListener('input', updateSubmitButton);
            }
        });
        
        // Gestion de la soumission du formulaire
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            sendEmail();
        });
        
        // Initialiser l'état du bouton
        updateSubmitButton();
    }
    
    // Animation des compétences au défilement
    const skills = document.querySelectorAll('.skill-progress');
    
    if (skills.length > 0) {
        const animateSkills = () => {
            skills.forEach(skill => {
                const skillValue = skill.getAttribute('data-skill-value');
                if (!skillValue) return;
                
                skill.style.width = '0';
                skill.style.transition = 'width 2s ease-in-out';
                
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            skill.style.width = skillValue + '%';
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.5 });
                
                observer.observe(skill);
            });
        };
        
        // Démarrer l'animation des compétences
        animateSkills();
        
        // Réanimer les compétences lors du rechargement de la section
        const skillsSection = document.getElementById('competences');
        if (skillsSection) {
            const skillsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateSkills();
                    }
                });
            }, { threshold: 0.1 });
            
            skillsObserver.observe(skillsSection);
        }
    }

    // Initialiser les animations au chargement
    if (typeof animateOnScroll === 'function') {
        window.addEventListener('scroll', animateOnScroll);
        animateOnScroll();
    }
});

// Animation des éléments au défilement
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 50) {
            element.classList.add('animated');
        }
    });
}
