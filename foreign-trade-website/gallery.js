/**
 * NEXUS INDUSTRIAL - Gallery Page
 * Lightbox and Filter Functionality
 */

(function() {
    'use strict';

    // ========================================
    // GALLERY DATA
    // ========================================
    const galleryData = [
        { title: 'Main Manufacturing Floor', desc: '50,000 sqm state-of-the-art production facility', category: 'facility' },
        { title: 'CNC Machined Parts', desc: 'Precision components for various industries', category: 'products' },
        { title: 'Quality Control Lab', desc: 'CMM measurement center for precision verification', category: 'facility' },
        { title: 'Engineering Team', desc: 'Our expert engineers working on innovative solutions', category: 'team' },
        { title: '5-Axis CNC Center', desc: 'Advanced machining capabilities for complex geometries', category: 'facility' },
        { title: 'Precision Gears', desc: 'Custom gear manufacturing with tight tolerances', category: 'products' },
        { title: 'Trade Show 2025', desc: 'Manufacturing World Munich exhibition', category: 'events' },
        { title: 'Assembly Line', desc: 'Automated assembly and packaging operations', category: 'facility' },
        { title: 'Electronic Assemblies', desc: 'PCB manufacturing and assembly services', category: 'products' },
        { title: 'Leadership Team', desc: 'Management and executives guiding our vision', category: 'team' },
        { title: 'Warehouse & Logistics', desc: 'Global shipping center for worldwide delivery', category: 'facility' },
        { title: 'Award Ceremony', desc: 'Industry Excellence Award 2025 recognition', category: 'events' }
    ];

    // ========================================
    // DOM ELEMENTS
    // ========================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const lightboxOverlay = document.querySelector('.lightbox__overlay');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const filterBtns = document.querySelectorAll('.gallery-filter__btn');

    // State
    let currentIndex = 0;
    let filteredItems = [...galleryItems];

    // ========================================
    // LIGHTBOX FUNCTIONS
    // ========================================
    
    function openLightbox(index) {
        currentIndex = index;
        updateLightboxContent();
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.classList.add('lightbox-open');
        
        // Focus trap
        lightboxClose.focus();
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('lightbox-open');
        
        // Return focus to the gallery item
        if (filteredItems[currentIndex]) {
            filteredItems[currentIndex].focus();
        }
    }

    function updateLightboxContent() {
        const item = filteredItems[currentIndex];
        const dataIndex = parseInt(item.getAttribute('data-index'));
        const data = galleryData[dataIndex];
        
        if (data) {
            lightboxTitle.textContent = data.title;
            lightboxDesc.textContent = data.desc;
        }
        
        // Update counter
        const currentNum = currentIndex + 1;
        const total = filteredItems.length;
        lightboxCounter.textContent = `${currentNum} / ${total}`;
        
        // Update navigation buttons
        lightboxPrev.disabled = currentIndex === 0;
        lightboxNext.disabled = currentIndex === filteredItems.length - 1;
        
        // Copy the image/SVG from gallery item
        const originalImage = item.querySelector('.gallery-item__image');
        if (originalImage) {
            lightboxImage.innerHTML = originalImage.innerHTML;
        }
    }

    function showPrevImage() {
        if (currentIndex > 0) {
            currentIndex--;
            updateLightboxContent();
        }
    }

    function showNextImage() {
        if (currentIndex < filteredItems.length - 1) {
            currentIndex++;
            updateLightboxContent();
        }
    }

    // ========================================
    // FILTER FUNCTIONS
    // ========================================
    
    function filterGallery(category) {
        // Update active button
        filterBtns.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-filter') === category);
        });

        // Filter items
        galleryItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            const shouldShow = category === 'all' || itemCategory === category;
            
            if (shouldShow) {
                item.classList.remove('hidden');
                item.style.display = '';
            } else {
                item.classList.add('hidden');
                item.style.display = 'none';
            }
        });

        // Update filtered items array for lightbox navigation
        filteredItems = [...document.querySelectorAll('.gallery-item:not(.hidden)')];
        
        // Re-apply stagger animation
        filteredItems.forEach((item, index) => {
            item.style.animation = 'none';
            item.offsetHeight; // Trigger reflow
            item.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.05}s`;
        });
    }

    // ========================================
    // EVENT HANDLERS
    // ========================================
    
    function handleKeydown(e) {
        if (!lightbox.classList.contains('active')) return;

        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
            case 'Tab':
                // Trap focus within lightbox
                trapFocus(e);
                break;
        }
    }

    function trapFocus(e) {
        const focusableElements = lightbox.querySelectorAll(
            'button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }

    // Touch/Swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    function handleTouchStart(e) {
        touchStartX = e.changedTouches[0].screenX;
    }

    function handleTouchEnd(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next image
                showNextImage();
            } else {
                // Swipe right - previous image
                showPrevImage();
            }
        }
    }

    // ========================================
    // INITIALIZE
    // ========================================
    
    function init() {
        // Gallery item click handlers
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                const filteredIndex = filteredItems.indexOf(item);
                if (filteredIndex !== -1) {
                    openLightbox(filteredIndex);
                }
            });

            // Keyboard accessibility
            item.setAttribute('tabindex', '0');
            item.setAttribute('role', 'button');
            item.setAttribute('aria-label', `View ${galleryData[index]?.title || 'image'}`);
            
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const filteredIndex = filteredItems.indexOf(item);
                    if (filteredIndex !== -1) {
                        openLightbox(filteredIndex);
                    }
                }
            });
        });

        // Lightbox controls
        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }

        if (lightboxPrev) {
            lightboxPrev.addEventListener('click', showPrevImage);
        }

        if (lightboxNext) {
            lightboxNext.addEventListener('click', showNextImage);
        }

        if (lightboxOverlay) {
            lightboxOverlay.addEventListener('click', closeLightbox);
        }

        // Filter buttons
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                filterGallery(filter);
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', handleKeydown);

        // Touch/Swipe support for lightbox
        if (lightbox) {
            lightbox.addEventListener('touchstart', handleTouchStart, { passive: true });
            lightbox.addEventListener('touchend', handleTouchEnd, { passive: true });
        }

        // Preload animation - ensure items animate in on load
        filteredItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.05}s`;
        });
    }

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
