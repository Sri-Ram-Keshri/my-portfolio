document.addEventListener('DOMContentLoaded', () => {

    const App = {
        // --- INITIALIZATION ---
        init() {
            this.cacheDOMElements();
            this.bindEvents();
            this.handlePreloader();
            this.createTypingAnimation();
            this.observeSections();
        },

        // --- CACHE DOM ELEMENTS ---
        cacheDOMElements() {
            this.header = document.querySelector('header');
            this.navLinks = document.getElementById('nav-links');
            this.hamburger = document.getElementById('hamburger');
            this.allNavLinks = document.querySelectorAll('#nav-links a');
            this.sections = document.querySelectorAll('main > section');
            this.backToTopButton = document.querySelector('.back-to-top');
            this.currentYearSpan = document.getElementById('current-year');
            this.preloader = document.getElementById('preloader');
        },

        // --- BIND EVENT LISTENERS ---
        bindEvents() {
            window.addEventListener('scroll', () => {
                this.handleScroll();
                this.updateActiveNavLink();
            });
            this.hamburger.addEventListener('click', this.toggleMobileMenu.bind(this));
            this.allNavLinks.forEach(link => {
                link.addEventListener('click', this.closeMobileMenu.bind(this));
            });
            if (this.currentYearSpan) {
                this.currentYearSpan.textContent = new Date().getFullYear();
            }
        },

        // --- PRELOADER ---
        handlePreloader() {
            window.addEventListener('load', () => {
                this.preloader.style.opacity = '0';
                this.preloader.addEventListener('transitionend', () => {
                    this.preloader.style.display = 'none';
                });
            });
        },

        // --- SCROLL-BASED ACTIONS ---
        handleScroll() {
            // Header styling
            if (window.scrollY > 50) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }

            // Back to top button visibility
            if (window.scrollY > 300) {
                this.backToTopButton.classList.add('visible');
            } else {
                this.backToTopButton.classList.remove('visible');
            }
        },

        // --- MOBILE MENU ---
        toggleMobileMenu() {
            this.navLinks.classList.toggle('active');
            this.hamburger.classList.toggle('active');
            document.body.style.overflow = this.navLinks.classList.contains('active') ? 'hidden' : '';
        },

        closeMobileMenu() {
            if (this.navLinks.classList.contains('active')) {
                this.navLinks.classList.remove('active');
                this.hamburger.classList.remove('active');
                document.body.style.overflow = '';
            }
        },

        // --- TYPING ANIMATION ---
        createTypingAnimation() {
            const typingTextElement = document.querySelector('.typing-text');
            if (!typingTextElement) return;

            const textArray = ["Full Stack Developer", "Java Enthusiast", "Django Expert", "Creative Problem-Solver"];
            let textArrayIndex = 0;
            let charIndex = 0;

            const type = () => {
                if (charIndex < textArray[textArrayIndex].length) {
                    typingTextElement.textContent += textArray[textArrayIndex].charAt(charIndex);
                    charIndex++;
                    setTimeout(type, 100);
                } else {
                    setTimeout(erase, 2000);
                }
            }

            const erase = () => {
                if (charIndex > 0) {
                    typingTextElement.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
                    charIndex--;
                    setTimeout(erase, 50);
                } else {
                    textArrayIndex = (textArrayIndex + 1) % textArray.length;
                    setTimeout(type, 500);
                }
            }

            type();
        },

        // --- SCROLLSPY & ACTIVE NAV LINK ---
        updateActiveNavLink() {
            let currentSectionId = '';
            this.sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.scrollY >= sectionTop - this.header.offsetHeight - 50) {
                    currentSectionId = section.getAttribute('id');
                }
            });

            this.allNavLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === currentSectionId) {
                    link.classList.add('active');
                }
            });
        },

        // --- FADE-IN ANIMATION ON SCROLL ---
        observeSections() {
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15 });

            document.querySelectorAll('.fade-in').forEach(element => {
                observer.observe(element);
            });
        }
    };

    App.init();

});