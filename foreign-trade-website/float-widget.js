/**
 * NEXUS INDUSTRIAL - Floating Widget
 * WhatsApp, Email, Go to Top functionality
 */

(function() {
    'use strict';

    // ========================================
    // DOM ELEMENTS
    // ========================================
    const goToTopBtn = document.getElementById('go-to-top');
    const scrollThreshold = 300; // Show button after scrolling 300px

    // ========================================
    // GO TO TOP FUNCTIONALITY
    // ========================================
    
    function handleScroll() {
        if (!goToTopBtn) return;
        
        const scrollY = window.scrollY || window.pageYOffset;
        
        if (scrollY > scrollThreshold) {
            goToTopBtn.classList.add('visible');
        } else {
            goToTopBtn.classList.remove('visible');
        }
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // ========================================
    // INITIALIZE
    // ========================================
    
    function init() {
        // Scroll event for Go to Top button
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Initial check
        handleScroll();
        
        // Go to Top click handler
        if (goToTopBtn) {
            goToTopBtn.addEventListener('click', scrollToTop);
        }

        // Close popups when clicking outside (for mobile)
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 767) {
                const widget = document.querySelector('.float-widget');
                if (widget && !widget.contains(e.target)) {
                    // Remove any active states if needed
                }
            }
        });

        // Keyboard accessibility for Go to Top
        if (goToTopBtn) {
            goToTopBtn.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    scrollToTop();
                }
            });
        }
    }

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
