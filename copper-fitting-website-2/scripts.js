/* ========================================
   CopperCore Industries - JavaScript
   Industrial Manufacturing Website
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ----------------------------------------
    // Header Scroll Effect
    // ----------------------------------------
    const header = document.getElementById('header');
    let lastScrollY = 0;
    
    function handleScroll() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });

    // ----------------------------------------
    // Search Bar Toggle
    // ----------------------------------------
    const searchToggle = document.getElementById('searchToggle');
    const searchBar = document.getElementById('searchBar');
    const searchClose = document.getElementById('searchClose');
    const searchInput = searchBar?.querySelector('.search-input');
    
    function openSearch() {
        searchBar.classList.add('active');
        searchBar.setAttribute('aria-hidden', 'false');
        searchToggle.setAttribute('aria-expanded', 'true');
        setTimeout(() => searchInput?.focus(), 300);
    }
    
    function closeSearch() {
        searchBar.classList.remove('active');
        searchBar.setAttribute('aria-hidden', 'true');
        searchToggle.setAttribute('aria-expanded', 'false');
    }
    
    searchToggle?.addEventListener('click', function() {
        if (searchBar.classList.contains('active')) {
            closeSearch();
        } else {
            openSearch();
        }
    });
    
    searchClose?.addEventListener('click', closeSearch);
    
    // Close search on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchBar?.classList.contains('active')) {
            closeSearch();
        }
    });

    // ----------------------------------------
    // Language Switcher
    // ----------------------------------------
    const langToggle = document.getElementById('langToggle');
    const langDropdown = document.getElementById('langDropdown');
    
    langToggle?.addEventListener('click', function(e) {
        e.stopPropagation();
        const isOpen = langDropdown.classList.contains('active');
        
        langDropdown.classList.toggle('active');
        langToggle.setAttribute('aria-expanded', !isOpen);
    });
    
    // Handle language selection
    langDropdown?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.dataset.lang;
            
            // Update active state
            langDropdown.querySelectorAll('a').forEach(a => a.classList.remove('active'));
            this.classList.add('active');
            
            // Update toggle text
            langToggle.querySelector('span').textContent = lang.toUpperCase();
            
            // Close dropdown
            langDropdown.classList.remove('active');
            langToggle.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!langToggle?.contains(e.target) && !langDropdown?.contains(e.target)) {
            langDropdown?.classList.remove('active');
            langToggle?.setAttribute('aria-expanded', 'false');
        }
    });

    // ----------------------------------------
    // Mobile Menu Toggle
    // ----------------------------------------
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');
    let mobileOverlay = null;
    
    function createOverlay() {
        mobileOverlay = document.createElement('div');
        mobileOverlay.className = 'mobile-nav-overlay';
        document.body.appendChild(mobileOverlay);
        
        mobileOverlay.addEventListener('click', closeMobileMenu);
    }
    
    function openMobileMenu() {
        if (!mobileOverlay) createOverlay();
        
        mainNav.classList.add('active');
        mobileMenuToggle.classList.add('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'true');
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMobileMenu() {
        mainNav.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mobileOverlay?.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    mobileMenuToggle?.addEventListener('click', function() {
        if (mainNav.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
    
    // Mobile dropdown toggle
    const mobileDropdowns = mainNav?.querySelectorAll('.has-dropdown');
    
    mobileDropdowns?.forEach(item => {
        const link = item.querySelector('.nav-link');
        
        link?.addEventListener('click', function(e) {
            if (window.innerWidth < 1024) {
                e.preventDefault();
                item.classList.toggle('open');
            }
        });
    });
    
    // Close mobile menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 1024) {
            closeMobileMenu();
        }
    });

    // ----------------------------------------
    // Scroll Animations (Intersection Observer)
    // ----------------------------------------
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry, index) {
            if (entry.isIntersecting) {
                // Stagger the animation slightly
                setTimeout(function() {
                    entry.target.classList.add('visible');
                }, index * 100);
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(function(el) {
        observer.observe(el);
    });

    // ----------------------------------------
    // Smooth Scroll for Anchor Links
    // ----------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (mainNav?.classList.contains('active')) {
                    closeMobileMenu();
                }
                
                const headerHeight = header?.offsetHeight || 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ----------------------------------------
    // Contact Form Handling
    // ----------------------------------------
    const contactForm = document.getElementById('contactForm');
    
    contactForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        let isValid = true;
        const requiredFields = this.querySelectorAll('[required]');
        
        requiredFields.forEach(function(field) {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = 'var(--color-copper)';
            } else {
                field.style.borderColor = '';
            }
        });
        
        if (isValid) {
            // Show success message (in production, this would submit to a server)
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Inquiry Sent!
            `;
            submitBtn.disabled = true;
            
            setTimeout(function() {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                contactForm.reset();
            }, 3000);
        }
    });

    // ----------------------------------------
    // Hero Parallax Effect (subtle)
    // ----------------------------------------
    const hero = document.getElementById('hero');
    const heroVisual = hero?.querySelector('.hero-visual');
    
    if (heroVisual) {
        window.addEventListener('scroll', function() {
            const scrolled = window.scrollY;
            const rate = scrolled * 0.3;
            
            if (scrolled < window.innerHeight) {
                heroVisual.style.transform = `translateY(${rate}px)`;
            }
        }, { passive: true });
    }

    // ----------------------------------------
    // Navbar Active State on Scroll
    // ----------------------------------------
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function setActiveNavLink() {
        let current = '';
        
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop - 200;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavLink, { passive: true });

    // ----------------------------------------
    // Performance: Debounce scroll events
    // ----------------------------------------
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = function() {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // ----------------------------------------
    // Preloader (optional - uncomment if needed)
    // ----------------------------------------
    /*
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.classList.add('loaded');
            setTimeout(() => preloader.remove(), 500);
        }
    });
    */

});
