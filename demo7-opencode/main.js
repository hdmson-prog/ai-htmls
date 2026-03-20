(function() {
    'use strict';

    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const contactForm = document.getElementById('contact-form');
    const navLinks = document.querySelectorAll('.nav-link');

    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    function toggleMenu() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }

    function closeMenu() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    function smoothScroll(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                closeMenu();
            }
        }
    }

    function setupScrollReveal() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const revealElements = document.querySelectorAll(
            '.about-image, .about-content, .about-features, .product-card, ' +
            '.capability-block, .application-card, .quality-card, .quality-metrics, ' +
            '.global-map, .global-stats, .location, .contact-image, .contact-form-wrapper, ' +
            '.footer-brand, .footer-column'
        );

        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        const style = document.createElement('style');
        style.textContent = `
            .revealed {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.textContent = 'Quote Request Submitted';
            submitBtn.style.backgroundColor = '#22c55e';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.backgroundColor = '';
                submitBtn.disabled = false;
                e.target.reset();
            }, 3000);
        }, 1500);
    }

    function setupParallax() {
        const heroPlaceholder = document.querySelector('.hero-placeholder');
        if (!heroPlaceholder) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            if (scrolled < window.innerHeight) {
                heroPlaceholder.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    function setupCounterAnimation() {
        const counters = document.querySelectorAll('.stat-value, .stat-number, .metric-value');
        
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const text = el.textContent;
                    const match = text.match(/(\d+)/);
                    
                    if (match) {
                        const target = parseInt(match[1]);
                        const suffix = text.replace(match[1], '');
                        let current = 0;
                        const increment = target / 50;
                        const duration = 1500;
                        const stepTime = duration / 50;
                        
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= target) {
                                current = target;
                                clearInterval(timer);
                            }
                            el.textContent = Math.floor(current) + suffix;
                        }, stepTime);
                    }
                    
                    observer.unobserve(el);
                }
            });
        }, observerOptions);

        counters.forEach(counter => observer.observe(counter));
    }

    function setupImagePlaceholderAnimation() {
        const placeholders = document.querySelectorAll('.image-placeholder');
        
        placeholders.forEach(placeholder => {
            placeholder.addEventListener('mouseenter', () => {
                placeholder.style.borderColor = 'var(--accent)';
            });
            
            placeholder.addEventListener('mouseleave', () => {
                placeholder.style.borderColor = 'var(--steel)';
            });
        });
    }

    function handleResize() {
        if (window.innerWidth > 992 && navMenu.classList.contains('active')) {
            closeMenu();
        }
    }

    function init() {
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize, { passive: true });
        
        navToggle.addEventListener('click', toggleMenu);
        navLinks.forEach(link => link.addEventListener('click', smoothScroll));
        
        if (contactForm) {
            contactForm.addEventListener('submit', handleFormSubmit);
        }
        
        setupScrollReveal();
        setupParallax();
        setupCounterAnimation();
        setupImagePlaceholderAnimation();
        
        handleScroll();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
