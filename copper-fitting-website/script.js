/* ==========================================
   PRECISION METALS - INTERACTIVE FUNCTIONALITY
   ========================================== */

(function() {
    'use strict';

    /* === HEADER SCROLL EFFECT === */
    const header = document.querySelector('.header');
    let lastScroll = 0;

    function handleScroll() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    /* === MOBILE MENU TOGGLE === */
    const mobileToggle = document.getElementById('mobileToggle');
    const nav = document.getElementById('mainNav');
    const body = document.body;

    if (mobileToggle && nav) {
        mobileToggle.addEventListener('click', function() {
            mobileToggle.classList.toggle('active');
            nav.classList.toggle('active');
            body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking on a link
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Don't close if it's a dropdown parent on mobile
                if (window.innerWidth <= 1024 && this.parentElement.classList.contains('has-dropdown')) {
                    e.preventDefault();
                    this.parentElement.classList.toggle('active');
                } else {
                    mobileToggle.classList.remove('active');
                    nav.classList.remove('active');
                    body.style.overflow = '';
                }
            });
        });
    }

    /* === SEARCH BAR TOGGLE === */
    const searchToggle = document.getElementById('searchToggle');
    const searchBar = document.getElementById('searchBar');
    const searchClose = document.getElementById('searchClose');
    const searchInput = searchBar ? searchBar.querySelector('input') : null;

    if (searchToggle && searchBar) {
        searchToggle.addEventListener('click', function() {
            searchBar.classList.add('active');
            if (searchInput) {
                setTimeout(() => searchInput.focus(), 300);
            }
        });
    }

    if (searchClose && searchBar) {
        searchClose.addEventListener('click', function() {
            searchBar.classList.remove('active');
            if (searchInput) {
                searchInput.value = '';
            }
        });
    }

    // Close search bar on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchBar && searchBar.classList.contains('active')) {
            searchBar.classList.remove('active');
            if (searchInput) {
                searchInput.value = '';
            }
        }
    });

    /* === LANGUAGE SWITCHER === */
    const langToggle = document.getElementById('langToggle');
    const langDropdown = document.getElementById('langDropdown');

    if (langToggle && langDropdown) {
        langToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            langDropdown.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function() {
            if (langDropdown.classList.contains('active')) {
                langDropdown.classList.remove('active');
            }
        });

        // Handle language selection
        const langLinks = langDropdown.querySelectorAll('a');
        langLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const langText = this.textContent;
                const langCode = langText.substring(0, 2).toUpperCase();
                langToggle.textContent = langCode;
                langDropdown.classList.remove('active');
            });
        });
    }

    /* === SMOOTH SCROLL FOR ANCHOR LINKS === */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or if it's a language/dropdown link
            if (href === '#' || href.startsWith('#en') || href.startsWith('#de') || 
                href.startsWith('#zh') || href.startsWith('#es')) {
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* === INTERSECTION OBSERVER FOR SCROLL ANIMATIONS === */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('observed');
                // Optional: Unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with staggered animation
    const animateOnScroll = document.querySelectorAll('.product-card, .industry-card, .news-card, .value-item');
    animateOnScroll.forEach((el, index) => {
        el.classList.add('observe-element');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    /* === QUOTE BUTTON HANDLERS === */
    const quoteButtons = document.querySelectorAll('#quoteBtn, .btn-primary');
    quoteButtons.forEach(btn => {
        if (btn.textContent.includes('Quote') || btn.textContent.includes('Quotation')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                // Scroll to contact section or open modal
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = contactSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                } else {
                    // Fallback: Show alert (replace with modal in production)
                    console.log('Quote request initiated');
                    // In production, open a modal or redirect to contact form
                }
            });
        }
    });

    /* === VIEW PRODUCTS BUTTON === */
    const viewProductsBtn = document.querySelector('.btn-secondary');
    if (viewProductsBtn && viewProductsBtn.textContent.includes('View Products')) {
        viewProductsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const productsSection = document.getElementById('products');
            if (productsSection) {
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = productsSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    /* === PERFORMANCE: REDUCE ANIMATIONS ON LOW-END DEVICES === */
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        // Disable animations for users who prefer reduced motion
        document.querySelectorAll('.observe-element').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    }

    /* === LAZY LOAD OPTIMIZATION === */
    // If images are added later, implement lazy loading
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window && lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    /* === FORM VALIDATION (if contact form is added) === */
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Submit form data
                console.log('Form submitted successfully');
                // In production: send to server via fetch/AJAX
            }
        });
    });

    /* === PERFORMANCE MONITORING === */
    // Log page load performance
    window.addEventListener('load', function() {
        if ('performance' in window) {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page load time: ${pageLoadTime}ms`);
        }
    });

    /* === HERO SLIDER === */
    const heroSlider = document.querySelector('.hero-slider');
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroIndicators = document.querySelectorAll('.hero-indicator');
    const heroPrevBtn = document.querySelector('.hero-prev');
    const heroNextBtn = document.querySelector('.hero-next');
    
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(index) {
        // Wrap around
        if (index >= heroSlides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = heroSlides.length - 1;
        } else {
            currentSlide = index;
        }
        
        // Update slides
        heroSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentSlide);
        });
        
        // Update indicators
        heroIndicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === currentSlide);
        });
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 6000); // Change slide every 6 seconds
    }
    
    function stopSlideshow() {
        clearInterval(slideInterval);
    }
    
    // Initialize slider
    if (heroSlider) {
        showSlide(0);
        startSlideshow();
        
        // Arrow navigation
        if (heroPrevBtn) {
            heroPrevBtn.addEventListener('click', function() {
                prevSlide();
                stopSlideshow();
                startSlideshow(); // Restart timer
            });
        }
        
        if (heroNextBtn) {
            heroNextBtn.addEventListener('click', function() {
                nextSlide();
                stopSlideshow();
                startSlideshow(); // Restart timer
            });
        }
        
        // Indicator navigation
        heroIndicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function() {
                showSlide(index);
                stopSlideshow();
                startSlideshow(); // Restart timer
            });
        });
        
        // Pause on hover
        heroSlider.addEventListener('mouseenter', stopSlideshow);
        heroSlider.addEventListener('mouseleave', startSlideshow);
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                prevSlide();
                stopSlideshow();
                startSlideshow();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
                stopSlideshow();
                startSlideshow();
            }
        });
    }

    /* === COMPANY CAROUSEL === */
    const companyCarousel = document.querySelector('.company-carousel');
    const companySlides = document.querySelectorAll('.company-slide');
    const carouselPrevBtn = document.querySelector('.carousel-prev');
    const carouselNextBtn = document.querySelector('.carousel-next');
    
    let carouselIndex = 0;
    const slidesToShow = 3;
    const slideWidth = 100 / slidesToShow;
    let carouselInterval;
    
    function updateCarousel() {
        if (!companyCarousel) return;
        
        const maxIndex = Math.max(0, companySlides.length - slidesToShow);
        carouselIndex = Math.max(0, Math.min(carouselIndex, maxIndex));
        
        const translateX = -(carouselIndex * slideWidth);
        companyCarousel.style.transform = `translateX(${translateX}%)`;
        
        // Disable buttons at boundaries
        if (carouselPrevBtn) {
            carouselPrevBtn.disabled = carouselIndex === 0;
            carouselPrevBtn.style.opacity = carouselIndex === 0 ? '0.5' : '1';
            carouselPrevBtn.style.cursor = carouselIndex === 0 ? 'not-allowed' : 'pointer';
        }
        
        if (carouselNextBtn) {
            carouselNextBtn.disabled = carouselIndex >= maxIndex;
            carouselNextBtn.style.opacity = carouselIndex >= maxIndex ? '0.5' : '1';
            carouselNextBtn.style.cursor = carouselIndex >= maxIndex ? 'not-allowed' : 'pointer';
        }
    }
    
    function nextCarouselSlide() {
        const maxIndex = Math.max(0, companySlides.length - slidesToShow);
        if (carouselIndex < maxIndex) {
            carouselIndex++;
        } else {
            carouselIndex = 0; // Loop back to start
        }
        updateCarousel();
    }
    
    function startCarouselAutoplay() {
        carouselInterval = setInterval(nextCarouselSlide, 4000); // Auto-advance every 4 seconds
    }
    
    function stopCarouselAutoplay() {
        clearInterval(carouselInterval);
    }
    
    if (companyCarousel) {
        // Setup grid for carousel
        companyCarousel.style.gridTemplateColumns = `repeat(${companySlides.length}, ${100 / slidesToShow}%)`;
        companyCarousel.style.width = `${(companySlides.length / slidesToShow) * 100}%`;
        
        updateCarousel();
        startCarouselAutoplay();
        
        // Pause autoplay on hover
        const carouselWrapper = document.querySelector('.company-carousel-wrapper');
        if (carouselWrapper) {
            carouselWrapper.addEventListener('mouseenter', stopCarouselAutoplay);
            carouselWrapper.addEventListener('mouseleave', startCarouselAutoplay);
        }
        
        if (carouselPrevBtn) {
            carouselPrevBtn.addEventListener('click', function() {
                if (carouselIndex > 0) {
                    carouselIndex--;
                    updateCarousel();
                }
                stopCarouselAutoplay();
                startCarouselAutoplay(); // Restart timer
            });
        }
        
        if (carouselNextBtn) {
            carouselNextBtn.addEventListener('click', function() {
                const maxIndex = Math.max(0, companySlides.length - slidesToShow);
                if (carouselIndex < maxIndex) {
                    carouselIndex++;
                    updateCarousel();
                }
                stopCarouselAutoplay();
                startCarouselAutoplay(); // Restart timer
            });
        }
        
        // Touch/swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        companyCarousel.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        companyCarousel.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next
                    const maxIndex = Math.max(0, companySlides.length - slidesToShow);
                    if (carouselIndex < maxIndex) {
                        carouselIndex++;
                        updateCarousel();
                    }
                } else {
                    // Swipe right - prev
                    if (carouselIndex > 0) {
                        carouselIndex--;
                        updateCarousel();
                    }
                }
            }
        }
        
        // Responsive carousel
        function handleCarouselResize() {
            const width = window.innerWidth;
            let newSlidesToShow = 3;
            
            if (width <= 768) {
                newSlidesToShow = 1;
            } else if (width <= 1024) {
                newSlidesToShow = 2;
            }
            
            if (newSlidesToShow !== slidesToShow) {
                window.location.reload(); // Simple approach for demo
            }
        }
        
        window.addEventListener('resize', handleCarouselResize);
    }

    /* === RESPONSIVE CAROUSEL UPDATES === */
    function updateCarouselForMobile() {
        const carousel = document.querySelector('.company-carousel');
        if (!carousel) return;
        
        const width = window.innerWidth;
        
        if (width <= 768) {
            carousel.style.gridTemplateColumns = `repeat(${companySlides.length}, 100%)`;
            carousel.style.width = `${companySlides.length * 100}%`;
        } else if (width <= 1024) {
            carousel.style.gridTemplateColumns = `repeat(${companySlides.length}, 50%)`;
            carousel.style.width = `${(companySlides.length / 2) * 100}%`;
        }
    }
    
    window.addEventListener('resize', updateCarouselForMobile);
    updateCarouselForMobile();

    /* === LIGHTBOX === */
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDescription = document.getElementById('lightboxDescription');
    const lightboxCounter = document.getElementById('lightboxCounter');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    
    let currentLightboxIndex = 0;
    const lightboxImages = [];
    
    // Collect all company images for lightbox
    companySlides.forEach((slide, index) => {
        const imageElement = slide.querySelector('.company-image .image-placeholder');
        const title = slide.querySelector('.company-caption h4').textContent;
        const description = slide.querySelector('.company-caption p').textContent;
        
        lightboxImages.push({
            element: imageElement ? imageElement.cloneNode(true) : null,
            title: title,
            description: description
        });
        
        // Add click event to open lightbox
        slide.addEventListener('click', function() {
            openLightbox(index);
        });
    });
    
    function openLightbox(index) {
        currentLightboxIndex = index;
        updateLightboxContent();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        stopCarouselAutoplay(); // Pause carousel when lightbox is open
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        if (companyCarousel) {
            startCarouselAutoplay(); // Resume carousel when lightbox closes
        }
    }
    
    function updateLightboxContent() {
        const current = lightboxImages[currentLightboxIndex];
        
        if (current) {
            // Clear and set image
            lightboxImage.innerHTML = '';
            if (current.element) {
                lightboxImage.appendChild(current.element.cloneNode(true));
            }
            
            // Set text
            lightboxTitle.textContent = current.title;
            lightboxDescription.textContent = current.description;
            
            // Update counter
            lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${lightboxImages.length}`;
            
            // Update navigation buttons
            lightboxPrev.disabled = currentLightboxIndex === 0;
            lightboxNext.disabled = currentLightboxIndex === lightboxImages.length - 1;
        }
    }
    
    function showPreviousLightboxImage() {
        if (currentLightboxIndex > 0) {
            currentLightboxIndex--;
            updateLightboxContent();
        }
    }
    
    function showNextLightboxImage() {
        if (currentLightboxIndex < lightboxImages.length - 1) {
            currentLightboxIndex++;
            updateLightboxContent();
        }
    }
    
    // Lightbox event listeners
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', showPreviousLightboxImage);
    }
    
    if (lightboxNext) {
        lightboxNext.addEventListener('click', showNextLightboxImage);
    }
    
    // Close on background click
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
    
    // Keyboard navigation for lightbox
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            showPreviousLightboxImage();
        } else if (e.key === 'ArrowRight') {
            showNextLightboxImage();
        }
    });

    /* === VIEW TOGGLE (PRODUCTS PAGE) === */
    const viewButtons = document.querySelectorAll('.view-btn');
    const productsGrid = document.getElementById('productsGrid');
    
    if (viewButtons.length > 0 && productsGrid) {
        viewButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const view = this.getAttribute('data-view');
                
                // Update active state
                viewButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Toggle grid/list view
                if (view === 'list') {
                    productsGrid.classList.add('list-view');
                } else {
                    productsGrid.classList.remove('list-view');
                }
            });
        });
    }

    /* === PRODUCT DETAIL PAGE === */
    // Gallery Thumbnails
    const galleryThumbs = document.querySelectorAll('.thumb');
    const mainImages = document.querySelectorAll('.main-image');
    
    if (galleryThumbs.length > 0 && mainImages.length > 0) {
        galleryThumbs.forEach(thumb => {
            thumb.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                
                // Update thumbnails
                galleryThumbs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Update main images
                mainImages.forEach(img => img.classList.remove('active'));
                const targetImage = document.querySelector(`.main-image[data-index="${index}"]`);
                if (targetImage) {
                    targetImage.classList.add('active');
                }
            });
        });
    }

    // Product Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    if (tabButtons.length > 0 && tabPanels.length > 0) {
        tabButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');
                
                // Update buttons
                tabButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Update panels
                tabPanels.forEach(panel => panel.classList.remove('active'));
                const targetPanel = document.getElementById(targetTab);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                }
            });
        });
    }

    /* === FAQ ACCORDION (CONTACT PAGE) === */
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const faqItem = this.parentElement;
                const isActive = faqItem.classList.contains('active');
                
                // Close all FAQ items
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Open clicked item if it wasn't already open
                if (!isActive) {
                    faqItem.classList.add('active');
                }
            });
        });
    }

    /* === INITIALIZE === */
    console.log('Precision Metals website initialized');

})();
