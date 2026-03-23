/* ===================================
   LUXURY SCENTED CANDLES MANUFACTORY
   CORPORATE WEBSITE JAVASCRIPT
   =================================== */

'use strict';

// === UTILITY FUNCTIONS ===

/**
 * Throttle function to limit execution frequency
 */
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    
    return function(...args) {
        const currentTime = Date.now();
        const timeSinceLastExec = currentTime - lastExecTime;
        
        if (timeSinceLastExec >= delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - timeSinceLastExec);
        }
    };
}

/**
 * Check if element is in viewport
 */
function isInViewport(element, offset = 0) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
        rect.bottom >= 0
    );
}

// === SEARCH BAR FUNCTIONALITY ===

class SearchBar {
    constructor() {
        this.searchToggle = document.querySelector('.search-toggle');
        this.searchBar = document.querySelector('.search-bar');
        this.searchClose = document.querySelector('.search-close');
        this.searchInput = document.querySelector('.search-bar input');
        
        this.init();
    }
    
    init() {
        if (!this.searchToggle || !this.searchBar) return;
        
        this.searchToggle.addEventListener('click', () => this.open());
        this.searchClose.addEventListener('click', () => this.close());
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.searchBar.classList.contains('active')) {
                this.close();
            }
        });
    }
    
    open() {
        this.searchBar.classList.add('active');
        setTimeout(() => {
            this.searchInput.focus();
        }, 300);
    }
    
    close() {
        this.searchBar.classList.remove('active');
        this.searchInput.value = '';
    }
}

// === SMOOTH SCROLL FUNCTIONALITY ===

class SmoothScroll {
    constructor() {
        this.links = document.querySelectorAll('a[href^="#"]');
        this.init();
    }
    
    init() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Ignore empty hash links
                if (href === '#' || href === '#!') return;
                
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// === SCROLL ANIMATIONS ===

class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll(
            '.heritage-content, .process-step, .collection-item, .capability, .news-item, .principle'
        );
        this.animated = new Set();
        
        this.init();
    }
    
    init() {
        if (this.elements.length === 0) return;
        
        // Initial check
        this.checkElements();
        
        // Throttled scroll listener
        const throttledCheck = throttle(() => this.checkElements(), 150);
        window.addEventListener('scroll', throttledCheck);
    }
    
    checkElements() {
        this.elements.forEach((element, index) => {
            if (this.animated.has(element)) return;
            
            if (isInViewport(element, 100)) {
                // Stagger animation slightly
                setTimeout(() => {
                    element.style.opacity = '0';
                    element.style.transform = 'translateY(16px)';
                    element.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                    
                    requestAnimationFrame(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    });
                    
                    this.animated.add(element);
                }, index % 4 * 80); // Subtle stagger by 80ms
            }
        });
    }
}

// === HEADER SCROLL BEHAVIOR ===

class HeaderScroll {
    constructor() {
        this.header = document.querySelector('.header');
        this.lastScroll = 0;
        this.scrollThreshold = 100;
        
        this.init();
    }
    
    init() {
        if (!this.header) return;
        
        const throttledScroll = throttle(() => this.handleScroll(), 100);
        window.addEventListener('scroll', throttledScroll);
    }
    
    handleScroll() {
        const currentScroll = window.pageYOffset;
        
        // Add shadow on scroll
        if (currentScroll > 50) {
            this.header.style.boxShadow = '0 2px 16px rgba(0, 0, 0, 0.04)';
        } else {
            this.header.style.boxShadow = 'none';
        }
        
        this.lastScroll = currentScroll;
    }
}

// === FORM VALIDATION (FOR CTA BUTTONS) ===

class CTAHandlers {
    constructor() {
        this.ctaButtons = document.querySelectorAll('.cta-button, .hero-cta, .cta-button-large');
        this.init();
    }
    
    init() {
        this.ctaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const href = button.getAttribute('href');
                
                // If it's a contact link, handle smoothly
                if (href && href.startsWith('#contact')) {
                    e.preventDefault();
                    const contactSection = document.querySelector('#contact');
                    
                    if (contactSection) {
                        const headerHeight = document.querySelector('.header').offsetHeight;
                        const targetPosition = contactSection.offsetTop - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
}

// === IMAGE LAZY LOADING ENHANCEMENT ===

class ImageLoader {
    constructor() {
        this.images = document.querySelectorAll('img[src*="unsplash"]');
        this.init();
    }
    
    init() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.style.opacity = '0';
                        img.style.transition = 'opacity 0.6s ease';
                        
                        img.onload = () => {
                            img.style.opacity = '1';
                        };
                        
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px'
            });
            
            this.images.forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
}

// === SUBMENU KEYBOARD ACCESSIBILITY ===

class SubmenuAccessibility {
    constructor() {
        this.menuItems = document.querySelectorAll('.has-submenu');
        this.init();
    }
    
    init() {
        this.menuItems.forEach(item => {
            const link = item.querySelector('a');
            const submenu = item.querySelector('.submenu');
            
            if (!link || !submenu) return;
            
            // Keyboard navigation
            link.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
                }
            });
            
            // Close submenu when focus leaves
            item.addEventListener('focusout', (e) => {
                if (!item.contains(e.relatedTarget)) {
                    submenu.style.display = 'none';
                }
            });
        });
    }
}

// === LANGUAGE SWITCHER HANDLER ===

class LanguageSwitcher {
    constructor() {
        this.selector = document.querySelector('.language-switcher select');
        this.init();
    }
    
    init() {
        if (!this.selector) return;
        
        this.selector.addEventListener('change', (e) => {
            const selectedLang = e.target.value;
            console.log(`Language switched to: ${selectedLang}`);
            
            // In production, this would trigger actual language change
            // For now, we'll just log it
            
            // Example of what could be done:
            // window.location.href = `/${selectedLang}/`;
        });
    }
}

// === STATISTICS COUNTER ANIMATION ===

class StatsCounter {
    constructor() {
        this.stats = document.querySelectorAll('.stat-number');
        this.animated = false;
        this.init();
    }
    
    init() {
        if (this.stats.length === 0) return;
        
        const throttledCheck = throttle(() => this.checkVisibility(), 150);
        window.addEventListener('scroll', throttledCheck);
        this.checkVisibility(); // Initial check
    }
    
    checkVisibility() {
        if (this.animated) return;
        
        const firstStat = this.stats[0].closest('.presence-stats');
        if (!firstStat || !isInViewport(firstStat, 200)) return;
        
        this.animated = true;
        this.animateStats();
    }
    
    animateStats() {
        this.stats.forEach(stat => {
            const text = stat.textContent;
            const hasPlus = text.includes('+');
            const number = parseInt(text.replace(/[^0-9]/g, ''));
            
            if (isNaN(number)) return;
            
            const duration = 2000; // 2 seconds
            const steps = 60;
            const increment = number / steps;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                
                if (current >= number) {
                    stat.textContent = hasPlus ? `${number}+` : number;
                    clearInterval(timer);
                } else {
                    stat.textContent = hasPlus ? `${Math.floor(current)}+` : Math.floor(current);
                }
            }, duration / steps);
        });
    }
}

// === PERFORMANCE OPTIMIZATION ===

class PerformanceOptimizer {
    constructor() {
        this.init();
    }
    
    init() {
        // Preload critical fonts
        this.preloadFonts();
        
        // Add loading indicator for images
        this.handleImageLoading();
    }
    
    preloadFonts() {
        // This would be handled in HTML, but we can add dynamic preloading if needed
        const fonts = [
            'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@300;400;500;600&display=swap'
        ];
        
        fonts.forEach(fontUrl => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = fontUrl;
            
            // Don't actually add it if it already exists
            if (!document.querySelector(`link[href="${fontUrl}"]`)) {
                // In production, fonts should be in HTML head
                // This is just a safety check
            }
        });
    }
    
    handleImageLoading() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            if (img.complete) {
                img.classList.add('loaded');
            } else {
                img.addEventListener('load', () => {
                    img.classList.add('loaded');
                });
            }
        });
    }
}

// === INITIALIZE ALL MODULES ===

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new SearchBar();
    new SmoothScroll();
    new ScrollAnimations();
    new HeaderScroll();
    new CTAHandlers();
    new ImageLoader();
    new SubmenuAccessibility();
    new LanguageSwitcher();
    new StatsCounter();
    new PerformanceOptimizer();
    
    // Add loaded class to body for any CSS transitions
    document.body.classList.add('loaded');
    
    // Console signature (subtle)
    console.log('%cAtelier de Lumière', 'font-family: serif; font-size: 14px; color: #B8986A;');
    console.log('%cHeritage Scented Candles Manufactory', 'font-family: sans-serif; font-size: 11px; color: #6B6B6B;');
});

// === HANDLE PAGE VISIBILITY ===

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause any animations or videos when page is hidden
        console.log('Page hidden - pausing animations');
    } else {
        // Resume when page is visible again
        console.log('Page visible - resuming');
    }
});

// === WINDOW RESIZE HANDLER ===

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Handle any resize-specific logic
        console.log('Window resized');
    }, 250);
});
