// Gallery Page
// Filtering and Lightbox Functionality

document.addEventListener('DOMContentLoaded', function() {
    
    // Get elements
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDescription = document.getElementById('lightboxDescription');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const lightboxCounter = document.getElementById('lightboxCounter');
    
    let currentFilteredItems = [];
    let currentIndex = 0;
    
    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            filterGallery(category);
        });
    });
    
    function filterGallery(category) {
        currentFilteredItems = [];
        
        galleryItems.forEach((item, index) => {
            const itemCategory = item.dataset.category;
            
            if (category === 'all' || itemCategory === category) {
                item.classList.remove('hidden');
                item.style.animation = 'none';
                
                // Trigger reflow
                void item.offsetWidth;
                
                // Re-apply animation with staggered delay
                setTimeout(() => {
                    item.style.animation = `fadeInUp 600ms cubic-bezier(0.4, 0, 0.2, 1) forwards`;
                    item.style.animationDelay = `${currentFilteredItems.length * 50}ms`;
                }, 10);
                
                currentFilteredItems.push(item);
            } else {
                item.classList.add('hidden');
            }
        });
    }
    
    // Initialize filtered items
    filterGallery('all');
    
    // Gallery item click - open lightbox
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // Get visible items only
            const visibleItems = Array.from(galleryItems).filter(i => !i.classList.contains('hidden'));
            currentFilteredItems = visibleItems;
            currentIndex = visibleItems.indexOf(item);
            
            openLightbox();
        });
        
        // Keyboard support for gallery items
        item.setAttribute('tabindex', '0');
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Open lightbox
    function openLightbox() {
        updateLightboxContent();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus management
        lightboxClose.focus();
    }
    
    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Update lightbox content
    function updateLightboxContent() {
        const currentItem = currentFilteredItems[currentIndex];
        const img = currentItem.querySelector('img');
        const title = currentItem.querySelector('.gallery-title');
        const caption = currentItem.querySelector('.gallery-caption');
        
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightboxTitle.textContent = title.textContent;
        lightboxDescription.textContent = caption.textContent;
        
        // Update counter
        lightboxCounter.textContent = `${currentIndex + 1} / ${currentFilteredItems.length}`;
        
        // Update navigation buttons
        lightboxPrev.disabled = currentIndex === 0;
        lightboxNext.disabled = currentIndex === currentFilteredItems.length - 1;
        
        // Image fade-in effect
        lightboxImage.style.opacity = '0';
        setTimeout(() => {
            lightboxImage.style.transition = 'opacity 400ms ease';
            lightboxImage.style.opacity = '1';
        }, 50);
    }
    
    // Navigate to previous image
    function showPrevImage() {
        if (currentIndex > 0) {
            currentIndex--;
            updateLightboxContent();
        }
    }
    
    // Navigate to next image
    function showNextImage() {
        if (currentIndex < currentFilteredItems.length - 1) {
            currentIndex++;
            updateLightboxContent();
        }
    }
    
    // Event listeners for lightbox controls
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', showPrevImage);
    lightboxNext.addEventListener('click', showNextImage);
    
    // Close on background click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    });
    
    // Prevent body scroll when lightbox is open
    lightbox.addEventListener('wheel', function(e) {
        e.preventDefault();
    }, { passive: false });
    
    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    lightbox.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    lightbox.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
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
    
    // Preload adjacent images for smoother navigation
    function preloadAdjacentImages() {
        const preloadIndexes = [currentIndex - 1, currentIndex + 1];
        
        preloadIndexes.forEach(index => {
            if (index >= 0 && index < currentFilteredItems.length) {
                const item = currentFilteredItems[index];
                const img = item.querySelector('img');
                const preloadImg = new Image();
                preloadImg.src = img.src;
            }
        });
    }
    
    // Call preload when lightbox opens or navigation occurs
    lightbox.addEventListener('transitionend', function() {
        if (lightbox.classList.contains('active')) {
            preloadAdjacentImages();
        }
    });
    
    // Smooth scroll to gallery after filter
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            setTimeout(() => {
                const galleryMain = document.querySelector('.gallery-main');
                const offset = 120;
                
                window.scrollTo({
                    top: galleryMain.offsetTop - offset,
                    behavior: 'smooth'
                });
            }, 100);
        });
    });
});
