/**
 * NEXUS INDUSTRIAL - Homepage Slider
 * Automatic and manual slide navigation
 */

(function() {
    'use strict';

    // ========================================
    // CONFIGURATION
    // ========================================
    const CONFIG = {
        autoplay: true,
        autoplayInterval: 5000, // 5 seconds
        pauseOnHover: true,
        transitionDuration: 600
    };

    // ========================================
    // DOM ELEMENTS
    // ========================================
    const slider = document.getElementById('homepage-slider');
    if (!slider) return;

    const track = document.getElementById('slider-track');
    const slides = track ? track.querySelectorAll('.slider__slide') : [];
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');
    const dotsContainer = document.getElementById('slider-dots');
    const dots = dotsContainer ? dotsContainer.querySelectorAll('.slider__dot') : [];

    // ========================================
    // STATE
    // ========================================
    let currentSlide = 0;
    let autoplayTimer = null;
    let isTransitioning = false;
    const totalSlides = slides.length;

    // ========================================
    // SLIDER FUNCTIONS
    // ========================================

    function goToSlide(index, direction = 'next') {
        if (isTransitioning || index === currentSlide || totalSlides === 0) return;

        isTransitioning = true;

        // Remove active class from current slide
        slides[currentSlide].classList.remove('active');
        dots[currentSlide]?.classList.remove('active');

        // Update current slide index
        currentSlide = index;

        // Handle wrap-around
        if (currentSlide < 0) {
            currentSlide = totalSlides - 1;
        } else if (currentSlide >= totalSlides) {
            currentSlide = 0;
        }

        // Move track
        const offset = -currentSlide * 100;
        track.style.transform = `translateX(${offset}%)`;

        // Add active class to new slide
        slides[currentSlide].classList.add('active');
        dots[currentSlide]?.classList.add('active');

        // Reset autoplay timer
        if (CONFIG.autoplay) {
            resetAutoplay();
        }

        // Reset transitioning flag
        setTimeout(() => {
            isTransitioning = false;
        }, CONFIG.transitionDuration);
    }

    function nextSlide() {
        goToSlide(currentSlide + 1, 'next');
    }

    function prevSlide() {
        goToSlide(currentSlide - 1, 'prev');
    }

    // ========================================
    // AUTOPLAY
    // ========================================

    function startAutoplay() {
        if (!CONFIG.autoplay) return;
        
        stopAutoplay();
        autoplayTimer = setInterval(nextSlide, CONFIG.autoplayInterval);
        slider.classList.add('autoplay');
    }

    function stopAutoplay() {
        if (autoplayTimer) {
            clearInterval(autoplayTimer);
            autoplayTimer = null;
        }
        slider.classList.remove('autoplay');
    }

    function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
    }

    // ========================================
    // EVENT HANDLERS
    // ========================================

    function handlePrevClick() {
        prevSlide();
    }

    function handleNextClick() {
        nextSlide();
    }

    function handleDotClick(e) {
        const dot = e.target.closest('.slider__dot');
        if (!dot) return;

        const slideIndex = parseInt(dot.getAttribute('data-slide'), 10);
        if (!isNaN(slideIndex)) {
            goToSlide(slideIndex);
        }
    }

    function handleKeydown(e) {
        if (!slider.contains(document.activeElement) && document.activeElement !== document.body) return;

        switch (e.key) {
            case 'ArrowLeft':
                prevSlide();
                break;
            case 'ArrowRight':
                nextSlide();
                break;
        }
    }

    function handleMouseEnter() {
        if (CONFIG.pauseOnHover && CONFIG.autoplay) {
            stopAutoplay();
        }
    }

    function handleMouseLeave() {
        if (CONFIG.pauseOnHover && CONFIG.autoplay) {
            startAutoplay();
        }
    }

    // Touch/Swipe Support
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 50;

    function handleTouchStart(e) {
        touchStartX = e.changedTouches[0].screenX;
    }

    function handleTouchEnd(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }

    function handleSwipe() {
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                nextSlide();
            } else {
                // Swipe right - previous slide
                prevSlide();
            }
        }
    }

    // ========================================
    // INITIALIZE
    // ========================================

    function init() {
        if (totalSlides === 0) return;

        // Set initial state
        slides[0].classList.add('active');
        if (dots[0]) dots[0].classList.add('active');

        // Navigation buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', handlePrevClick);
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', handleNextClick);
        }

        // Dots navigation
        if (dotsContainer) {
            dotsContainer.addEventListener('click', handleDotClick);
        }

        // Keyboard navigation
        document.addEventListener('keydown', handleKeydown);

        // Pause on hover
        if (CONFIG.pauseOnHover) {
            slider.addEventListener('mouseenter', handleMouseEnter);
            slider.addEventListener('mouseleave', handleMouseLeave);
        }

        // Touch/Swipe support
        slider.addEventListener('touchstart', handleTouchStart, { passive: true });
        slider.addEventListener('touchend', handleTouchEnd, { passive: true });

        // Start autoplay
        if (CONFIG.autoplay) {
            startAutoplay();
        }

        // Pause autoplay when tab is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopAutoplay();
            } else if (CONFIG.autoplay) {
                startAutoplay();
            }
        });
    }

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
