// ================================================
// LUXURY SANITARY WARE - INTERACTIVE FUNCTIONALITY
// ================================================

(function() {
    'use strict';

    // ================================================
    // NAVIGATION
    // ================================================
    
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navSearchToggle = document.getElementById('navSearchToggle');
    const navSearch = document.getElementById('navSearch');
    
    // Scroll effect for navigation
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class for shadow effect
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        const resetToggleIcon = () => {
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        };

        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            if (nav) {
                nav.classList.remove('search-open');
            }
            if (navSearchToggle) {
                navSearchToggle.setAttribute('aria-expanded', 'false');
            }
            
            // Animate hamburger icon
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(10px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
            } else {
                resetToggleIcon();
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                if (nav) {
                    nav.classList.remove('search-open');
                }
                if (navSearchToggle) {
                    navSearchToggle.setAttribute('aria-expanded', 'false');
                }
                
                resetToggleIcon();
            });
        });
    }

    // Search toggle
    if (navSearchToggle && navSearch && nav) {
        const searchInput = navSearch.querySelector('input');

        navSearchToggle.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('search-open');
            navSearchToggle.setAttribute('aria-expanded', String(isOpen));
            if (navMenu && navMenu.classList.contains('active') && navToggle) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
            if (isOpen && searchInput) {
                searchInput.focus();
            }
        });
    }
    
    // ================================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ================================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const navHeight = nav.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ================================================
    // FEATURE SLIDER
    // ================================================

    const sliderTrack = document.querySelector('.slider-track');
    const sliderPrev = document.querySelector('.slider-prev');
    const sliderNext = document.querySelector('.slider-next');

    if (sliderTrack && sliderPrev && sliderNext) {
        const getSlideOffset = () => {
            const card = sliderTrack.querySelector('.slide-card');
            if (!card) return 0;
            const cardWidth = card.getBoundingClientRect().width;
            const gapValue = parseFloat(getComputedStyle(sliderTrack).columnGap || getComputedStyle(sliderTrack).gap) || 0;
            return cardWidth + gapValue;
        };

        sliderPrev.addEventListener('click', () => {
            sliderTrack.scrollBy({ left: -getSlideOffset(), behavior: 'smooth' });
        });

        sliderNext.addEventListener('click', () => {
            sliderTrack.scrollBy({ left: getSlideOffset(), behavior: 'smooth' });
        });
    }
    
    // ================================================
    // SCROLL REVEAL ANIMATIONS
    // ================================================
    
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optionally unobserve after revealing
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
    
    // ================================================
    // CONTACT FORM HANDLING
    // ================================================
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                company: document.getElementById('company').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                projectType: document.getElementById('projectType').value,
                message: document.getElementById('message').value
            };
            
            // Validate required fields
            if (!formData.name || !formData.email || !formData.message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Validate email format
            if (!isValidEmail(formData.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            // In production, this would send data to a server
            showNotification('Thank you for your inquiry. We will contact you within 24 hours.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Log form data (for demonstration)
            console.log('Form submitted:', formData);
        });
    }
    
    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Notification system
    function showNotification(message, type = 'success') {
        // Remove existing notification if present
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            padding: '1rem 1.5rem',
            backgroundColor: type === 'success' ? '#B8A992' : '#C85A54',
            color: '#FDFBF7',
            borderRadius: '4px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            zIndex: '10000',
            fontSize: '0.95rem',
            fontWeight: '500',
            maxWidth: '400px',
            opacity: '0',
            transform: 'translateX(20px)',
            transition: 'opacity 0.3s ease, transform 0.3s ease'
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(20px)';
            
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }
    
    // ================================================
    // PRODUCT CARD INTERACTIONS
    // ================================================
    
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.4s ease, box-shadow 0.4s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transition = 'transform 0.4s ease, box-shadow 0.4s ease';
        });
    });
    
    // ================================================
    // APPLICATION CARD INTERACTIONS
    // ================================================
    
    const applicationCards = document.querySelectorAll('.application-card');
    
    applicationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.application-overlay');
            if (overlay) {
                overlay.style.background = 'linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.3))';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.application-overlay');
            if (overlay) {
                overlay.style.background = 'linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent)';
            }
        });
    });
    
    // ================================================
    // PARALLAX EFFECT FOR HERO
    // ================================================
    
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image');
    
    if (hero && heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroHeight = hero.offsetHeight;
            
            // Only apply parallax when hero is in view
            if (scrolled < heroHeight) {
                const parallaxSpeed = 0.5;
                heroImage.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }

    // ================================================
    // HERO SLIDER
    // ================================================

    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroPrev = document.querySelector('.hero-prev');
    const heroNext = document.querySelector('.hero-next');
    const heroDots = document.querySelectorAll('.hero-dot');

    if (heroSlides.length > 0 && heroPrev && heroNext) {
        let heroIndex = 0;

        const setHeroSlide = (index) => {
            heroSlides.forEach((slide, idx) => {
                slide.classList.toggle('is-active', idx === index);
            });
            heroDots.forEach((dot, idx) => {
                dot.classList.toggle('is-active', idx === index);
                dot.setAttribute('aria-selected', idx === index ? 'true' : 'false');
            });
        };

        heroPrev.addEventListener('click', () => {
            heroIndex = (heroIndex - 1 + heroSlides.length) % heroSlides.length;
            setHeroSlide(heroIndex);
        });

        heroNext.addEventListener('click', () => {
            heroIndex = (heroIndex + 1) % heroSlides.length;
            setHeroSlide(heroIndex);
        });

        heroDots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                heroIndex = idx;
                setHeroSlide(heroIndex);
            });
        });
    }

    // ================================================
    // FLOATING WIDGET (GO TO TOP)
    // ================================================

    const goTopButton = document.querySelector('.floating-top');

    if (goTopButton) {
        // Initial check
        if (window.pageYOffset < 300) {
            goTopButton.classList.add('is-hidden');
        }

        // Scroll check
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                goTopButton.classList.remove('is-hidden');
            } else {
                goTopButton.classList.add('is-hidden');
            }
        });

        goTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            // Fallback for older browsers
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        });
    }

    document.addEventListener('click', (event) => {
        const topButton = event.target.closest('.floating-top');
        if (!topButton) return;
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    });
    
    // ================================================
    // IMAGE PLACEHOLDER ENHANCEMENTS
    // ================================================
    
    const imagePlaceholders = document.querySelectorAll('.image-placeholder');
    
    imagePlaceholders.forEach(placeholder => {
        // Add subtle animation on hover
        placeholder.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.6s ease';
            this.style.transform = 'scale(1.05)';
        });
        
        placeholder.addEventListener('mouseleave', function() {
            this.style.transition = 'transform 0.6s ease';
            this.style.transform = 'scale(1)';
        });
    });
    
    // ================================================
    // LAZY LOADING PREPARATION
    // ================================================
    
    // This function prepares the structure for lazy loading images
    // When real images are added, they can be loaded efficiently
    function prepareLazyLoading() {
        const imageContainers = document.querySelectorAll('.product-image, .craft-image, .application-image, .quality-image, .about-image, .contact-image, .hero-image, .global-map');
        
        imageContainers.forEach(container => {
            container.setAttribute('data-lazy-ready', 'true');
        });
    }
    
    prepareLazyLoading();
    
    // ================================================
    // PERFORMANCE OPTIMIZATION
    // ================================================
    
    // Debounce function for scroll events
    function debounce(func, wait = 10, immediate = false) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    
    // ================================================
    // ACCESSIBILITY ENHANCEMENTS
    // ================================================
    
    // Add keyboard navigation for product cards
    productCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                const link = this.querySelector('.product-link');
                if (link) {
                    link.click();
                }
            }
        });
    });
    
    // Add keyboard navigation for application cards
    applicationCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                // Could trigger a modal or navigation
                console.log('Application card activated:', this.querySelector('.application-title').textContent);
            }
        });
    });
    
    // ================================================
    // FOCUS MANAGEMENT
    // ================================================
    
    // Add focus styles for keyboard navigation
    const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #B8A992';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
    
    // ================================================
    // INITIALIZATION COMPLETE
    // ================================================
    
    console.log('Luxury Sanitary Ware Website - Interactive features initialized');
    
    // Log viewport information for debugging
    console.log('Viewport width:', window.innerWidth);
    console.log('Viewport height:', window.innerHeight);
    
})();
