// Portfolio Scripts - Animations et Interactions Professionnelles
document.addEventListener('DOMContentLoaded', function() {
    
    // Animation des barres de compétences
    const animateSkillBars = () => {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const progress = progressBar.getAttribute('data-progress');
                    progressBar.style.width = progress + '%';
                    observer.unobserve(progressBar);
                }
            });
        }, { threshold: 0.5 });
        
        skillBars.forEach(bar => observer.observe(bar));
    };
    
    // Animation des compteurs de statistiques
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = counter.innerText;
                    const duration = 2000;
                    const increment = 1;
                    let current = 0;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= parseInt(target)) {
                            counter.innerText = target;
                            clearInterval(timer);
                        } else {
                            counter.innerText = current + '+';
                        }
                    }, duration / parseInt(target));
                    
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
    };
    
    // Navigation active au scroll
    const updateActiveNavigation = () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    };
    
    // Animation de la navigation au scroll
    const handleNavbarScroll = () => {
        const navbar = document.querySelector('.navbar');
        
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        updateActiveNavigation();
    };
    
    // Filtre de projets (si ajouté plus tard)
    const initProjectFilters = () => {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                projectCards.forEach(card => {
                    if (filter === 'all' || card.classList.contains(filter)) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    };
    
    // Modal pour les détails des projets
    const initProjectModals = () => {
        const detailButtons = document.querySelectorAll('.project-details-btn');
        
        detailButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const projectCard = button.closest('.project-card');
                const title = projectCard.querySelector('.project-title').innerText;
                const description = projectCard.querySelector('.project-description').innerText;
                
                // Créer et afficher le modal
                const modal = createProjectModal(title, description);
                document.body.appendChild(modal);
                
                // Animation d'entrée
                setTimeout(() => {
                    modal.classList.add('active');
                }, 10);
            });
        });
    };
    
    const createProjectModal = (title, description) => {
        const modal = document.createElement('div');
        modal.className = 'project-modal';
        modal.innerHTML = `
            <div class="modal-overlay" onclick="closeProjectModal(this)"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close" onclick="closeProjectModal(this)">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <p>${description}</p>
                    <div class="modal-tech-stack">
                        <h4>Technologies utilisées</h4>
                        <div class="tech-tags">
                            <span class="tech-tag">ESP32</span>
                            <span class="tech-tag">IoT</span>
                            <span class="tech-tag">Web Development</span>
                            <span class="tech-tag">Cloud Integration</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        return modal;
    };
    
    // Fermer le modal
    window.closeProjectModal = function(element) {
        const modal = element.closest('.project-modal');
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
        }, 300);
    };
    
    // Animation de typing pour le hero (alternative)
    const initTypingAnimation = () => {
        const typingElements = document.querySelectorAll('.typing-text span');
        
        typingElements.forEach(element => {
            const text = element.getAttribute('data-text') || 'Ingénieur en Génie Électrique';
            let index = 0;
            
            const typeWriter = () => {
                if (index < text.length) {
                    element.textContent += text.charAt(index);
                    index++;
                    setTimeout(typeWriter, 100);
                } else {
                    setTimeout(() => {
                        element.textContent = '';
                        index = 0;
                        typeWriter();
                    }, 3000);
                }
            };
            
            typeWriter();
        });
    };
    
    // Smooth scroll pour les liens d'ancrage
    const initSmoothScroll = () => {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').slice(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };
    
    // Bouton "Back to top"
    const initBackToTop = () => {
        const backToTopButton = document.createElement('button');
        backToTopButton.className = 'back-to-top';
        backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTopButton.setAttribute('aria-label', 'Retour en haut');
        document.body.appendChild(backToTopButton);
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };
    
    // Animation d'apparition progressive des éléments
    const initScrollAnimations = () => {
        const animatedElements = document.querySelectorAll('[data-aos]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animation = element.getAttribute('data-aos');
                    const delay = element.getAttribute('data-aos-delay') || 0;
                    
                    setTimeout(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }, delay);
                    
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(element);
        });
    };
    
    // Validation du formulaire de contact
    const initContactForm = () => {
        const contactForm = document.querySelector('.contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Validation basique
                const formData = new FormData(contactForm);
                const name = formData.get('name');
                const email = formData.get('email');
                const message = formData.get('message');
                
                if (!name || !email || !message) {
                    showNotification('Veuillez remplir tous les champs obligatoires', 'error');
                    return;
                }
                
                if (!isValidEmail(email)) {
                    showNotification('Veuillez entrer une adresse email valide', 'error');
                    return;
                }
                
                // Simuler l'envoi
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalText = submitButton.innerHTML;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
                submitButton.disabled = true;
                
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                    contactForm.reset();
                    showNotification('Message envoyé avec succès!', 'success');
                }, 2000);
            });
        }
    };
    
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    
    const showNotification = (message, type = 'info') => {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    };
    
    // Initialisation de toutes les fonctionnalités
    const init = () => {
        animateSkillBars();
        animateCounters();
        initSmoothScroll();
        initBackToTop();
        initScrollAnimations();
        initProjectModals();
        initContactForm();
        
        // Écouteurs d'événements
        window.addEventListener('scroll', handleNavbarScroll);
        
        // Initialiser AOS si disponible
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                once: true,
                offset: 100
            });
        }
    };
    
    // Démarrer l'application
    init();
    
    // Exporter les fonctions utiles globalement
    window.portfolioScripts = {
        showNotification,
        closeProjectModal
    };
});
