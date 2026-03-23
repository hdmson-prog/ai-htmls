/**
 * NEXUS INDUSTRIAL - Global B2B Website
 * JavaScript Module
 */

(function() {
    'use strict';

    // ========================================
    // DOM ELEMENTS
    // ========================================
    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');
    const revealElements = document.querySelectorAll('.reveal');
    const countElements = document.querySelectorAll('[data-count]');
    const contactForm = document.getElementById('contact-form');
    
    // Search elements
    const searchToggle = document.getElementById('search-toggle');
    const searchBar = document.getElementById('search-bar');
    const searchClose = document.getElementById('search-close');
    const searchInput = document.getElementById('header-search-input');
    const searchForm = document.getElementById('header-search-form');

    // ========================================
    // HEADER SCROLL EFFECT
    // ========================================
    function handleHeaderScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // ========================================
    // MOBILE NAVIGATION
    // ========================================
    function toggleMobileMenu() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }

    function closeMobileMenu() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    // ========================================
    // SEARCH BAR TOGGLE
    // ========================================
    function openSearchBar() {
        if (searchBar) {
            searchBar.classList.add('active');
            if (searchInput) {
                setTimeout(() => searchInput.focus(), 300);
            }
        }
    }

    function closeSearchBar() {
        if (searchBar) {
            searchBar.classList.remove('active');
            if (searchInput) {
                searchInput.value = '';
            }
        }
    }

    function handleSearchSubmit(e) {
        e.preventDefault();
        const query = searchInput ? searchInput.value.trim() : '';
        if (query) {
            // Redirect to products page with search query
            window.location.href = `products.html?search=${encodeURIComponent(query)}`;
        }
    }

    // ========================================
    // SMOOTH SCROLL
    // ========================================
    function handleSmoothScroll(e) {
        const href = this.getAttribute('href');
        
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                closeMobileMenu();
            }
        }
    }

    // ========================================
    // REVEAL ON SCROLL
    // ========================================
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const revealPoint = 120;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }

    // ========================================
    // COUNTER ANIMATION
    // ========================================
    function animateCounters() {
        const windowHeight = window.innerHeight;
        
        countElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - 100 && !element.classList.contains('counted')) {
                element.classList.add('counted');
                
                const target = parseInt(element.getAttribute('data-count'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    
                    if (current < target) {
                        element.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        element.textContent = target;
                    }
                };
                
                updateCounter();
            }
        });
    }

    // ========================================
    // FORM HANDLING
    // ========================================
    function handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        
        // Validate form
        let isValid = true;
        const requiredFields = ['name', 'company', 'email', 'country'];
        
        requiredFields.forEach(field => {
            const input = contactForm.querySelector(`[name="${field}"]`);
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#e53e3e';
            } else {
                input.style.borderColor = '';
            }
        });
        
        // Email validation
        const emailInput = contactForm.querySelector('[name="email"]');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            isValid = false;
            emailInput.style.borderColor = '#e53e3e';
        }
        
        if (isValid) {
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            // Simulate API call
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.backgroundColor = '#38a169';
                
                // Reset form
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                    submitBtn.style.backgroundColor = '';
                }, 2000);
            }, 1500);
            
            console.log('Form submitted:', data);
        }
    }

    // ========================================
    // KEYBOARD NAVIGATION
    // ========================================
    function handleKeyboardNav(e) {
        // Close mobile menu on Escape
        if (e.key === 'Escape') {
            if (navMenu && navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
            if (searchBar && searchBar.classList.contains('active')) {
                closeSearchBar();
            }
        }
    }

    // ========================================
    // THROTTLE FUNCTION
    // ========================================
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // ========================================
    // INTERSECTION OBSERVER FOR BETTER PERFORMANCE
    // ========================================
    function initIntersectionObserver() {
        if ('IntersectionObserver' in window) {
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        
                        // Handle counter animation
                        const counter = entry.target.querySelector('[data-count]');
                        if (counter && !counter.classList.contains('counted')) {
                            counter.classList.add('counted');
                            animateSingleCounter(counter);
                        }
                    }
                });
            }, observerOptions);

            revealElements.forEach(element => {
                observer.observe(element);
            });
        } else {
            // Fallback for older browsers
            window.addEventListener('scroll', throttle(revealOnScroll, 100));
            window.addEventListener('scroll', throttle(animateCounters, 100));
        }
    }

    function animateSingleCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smoother animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(easeOutQuart * target);
            
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target;
            }
        }
        
        requestAnimationFrame(update);
    }

    // ========================================
    // PRELOADER (Optional)
    // ========================================
    function hidePreloader() {
        document.body.classList.add('loaded');
    }

    // ========================================
    // INITIALIZE
    // ========================================
    function init() {
        // Initial state
        handleHeaderScroll();
        
        // Event Listeners
        window.addEventListener('scroll', throttle(handleHeaderScroll, 100));
        
        if (navToggle) {
            navToggle.addEventListener('click', toggleMobileMenu);
        }
        
        navLinks.forEach(link => {
            link.addEventListener('click', handleSmoothScroll);
        });
        
        // Also handle footer links and other anchor links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', handleSmoothScroll);
        });
        
        if (contactForm) {
            contactForm.addEventListener('submit', handleFormSubmit);
        }
        
        // Search bar toggle
        if (searchToggle) {
            searchToggle.addEventListener('click', openSearchBar);
        }
        
        if (searchClose) {
            searchClose.addEventListener('click', closeSearchBar);
        }
        
        if (searchForm) {
            searchForm.addEventListener('submit', handleSearchSubmit);
        }
        
        document.addEventListener('keydown', handleKeyboardNav);
        
        // Initialize scroll-based animations
        initIntersectionObserver();
        
        // Handle counters that might be in view on load
        setTimeout(() => {
            countElements.forEach(element => {
                const rect = element.getBoundingClientRect();
                if (rect.top < window.innerHeight && !element.classList.contains('counted')) {
                    element.classList.add('counted');
                    animateSingleCounter(element);
                }
            });
        }, 500);
        
        // Hide preloader when everything is loaded
        window.addEventListener('load', hidePreloader);
    }

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
