/**
 * AETHERIA - Luxury Manufacturing Brand
 * Main Interaction Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initStickyHeader();
    initHeroParallax();
    initFeaturedCarousel();
    initMobileMenu();
    initLightbox();
    initGalleryFilters();
});

/**
 * Reveal-on-scroll animations using Intersection Observer
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Apply delay if specified
                const delay = entry.target.getAttribute('data-delay') || '0s';
                entry.target.style.transitionDelay = delay;
                entry.target.classList.add('revealed');
                // stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));
}

/**
 * Sticky header behavior and background transition
 */
function initStickyHeader() {
    const header = document.querySelector('#main-header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * Simple parallax effect for the hero section
 */
function initHeroParallax() {
    const heroBg = document.querySelector('#hero-bg');

    window.addEventListener('scroll', () => {
        const scrollVal = window.scrollY;
        if (heroBg) {
            heroBg.style.transform = `translateY(${scrollVal * 0.4}px)`;
        }
    });
}

/**
 * Featured Products Carousel Logic
 * Simple fade-in/out transition
 */
function initFeaturedCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const nextBtn = document.querySelector('.carousel-controls .next');
    const prevBtn = document.querySelector('.carousel-controls .prev');
    let currentSlide = 0;

    if (!slides.length) return;

    function showSlide(index) {
        slides.forEach(s => s.classList.remove('active'));

        if (index >= slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = slides.length - 1;
        else currentSlide = index;

        slides[currentSlide].classList.add('active');
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    }

    // Auto rotate every 8 seconds
    setInterval(() => showSlide(currentSlide + 1), 8000);
}

/**
 * Image Showcase Lightbox Logic
 */
function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item-card');
    const lightbox = document.querySelector('.lightbox');
    const lightboxLabel = document.querySelector('.lightbox-label');
    const lightboxImgPlaceholder = document.querySelector('.lightbox-image-container .image-placeholder');
    const closeBtn = document.querySelector('.lightbox-close');

    if (!lightbox) return;

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const label = item.querySelector('.image-placeholder').textContent;
            lightboxLabel.textContent = label;
            lightboxImgPlaceholder.textContent = label;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // prevent scroll
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto'; // restore scroll
        });
    }

    // Close on click outside
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

/**
 * Gallery Filter Logic
 */
function initGalleryFilters() {
    const filterLinks = document.querySelectorAll('.gallery-nav .filter-link');
    const galleryItems = document.querySelectorAll('.gallery-item-card');

    if (!filterLinks.length || !galleryItems.length) return;

    filterLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Handle active class
            filterLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            const filterValue = link.getAttribute('data-filter');

            galleryItems.forEach(item => {
                // If filter is "all", show everything
                if (filterValue === 'all') {
                    item.style.display = 'block';
                    // Optional: trigger reveal animation again if hidden
                    setTimeout(() => item.classList.add('revealed'), 100);
                } else {
                    // Show only matching category
                    if (item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => item.classList.add('revealed'), 100);
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        });
    });
}

/**
 * Mobile Navigation Toggle
 */
function initMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav-links');

    if (toggle) {
        toggle.addEventListener('click', () => {
            nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
            if (nav.style.display === 'flex') {
                nav.style.flexDirection = 'column';
                nav.style.position = 'absolute';
                nav.style.top = '100%';
                nav.style.left = '0';
                nav.style.width = '100%';
                nav.style.background = '#0a0a0a';
                nav.style.padding = '40px';
                nav.style.borderBottom = '1px solid #333';
            }
        });
    }
}

// Hover micro-interaction for product cards (handled mostly in CSS, but can add JS embellishments)
function initHoverEffects() {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Potential JS animation addition
        });
    });
}
