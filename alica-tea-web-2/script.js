// Heritage Tea Manufactory
// Interaction & Animation Script

document.addEventListener('DOMContentLoaded', function() {
    
    // Hamburger Menu Toggle
    const hamburger = document.getElementById('hamburgerToggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Toggle hamburger icon
            this.classList.toggle('active');
            this.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle mobile menu
            navLinks.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (!isExpanded) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on nav links (not dropdowns)
        const navLinkItems = navLinks.querySelectorAll('a:not(.nav-link)');
        navLinkItems.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    hamburger.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                    navLinks.classList.remove('active');
                    body.style.overflow = '';
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && 
                navLinks.classList.contains('active') &&
                !navLinks.contains(e.target) && 
                !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                navLinks.classList.remove('active');
                body.style.overflow = '';
            }
        });
        
        // Close menu on window resize to desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                navLinks.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }
    
    // Dropdown Menu Functionality
    const dropdownItems = document.querySelectorAll('.nav-item.has-dropdown');
    
    dropdownItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        
        if (link) {
            // Mobile: Toggle dropdown on click
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    
                    // Close other dropdowns
                    dropdownItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });
                    
                    // Toggle current dropdown
                    item.classList.toggle('active');
                }
            });
            
            // Desktop: Show on hover (handled by CSS)
            // But we add keyboard support
            item.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    item.classList.toggle('active');
                }
                
                if (e.key === 'Escape') {
                    item.classList.remove('active');
                }
            });
        }
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-item.has-dropdown')) {
            dropdownItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    });
    
    // Floating Widget - Go to Top Button
    const goTopBtn = document.querySelector('#goTopWidget .widget-btn');
    
    if (goTopBtn) {
        // Show/hide button based on scroll position
        function toggleGoTopButton() {
            if (window.pageYOffset > 300) {
                goTopBtn.classList.add('visible');
            } else {
                goTopBtn.classList.remove('visible');
            }
        }
        
        // Check on scroll
        window.addEventListener('scroll', toggleGoTopButton);
        
        // Check on page load
        toggleGoTopButton();
        
        // Click handler - smooth scroll to top
        goTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Smooth scroll with offset for fixed navigation
    const allNavLinks = document.querySelectorAll('a[href^="#"]');
    
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Allow normal behavior for empty hash
            if (href === '#') return;
            
            e.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.navigation').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Intersection Observer for subtle scroll animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections for fade-in effect
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        // Set initial state for sections (except hero which has its own animation)
        if (!section.classList.contains('hero')) {
            section.style.opacity = '0';
            section.style.transform = 'translateY(10px)';
            section.style.transition = 'opacity 800ms cubic-bezier(0.4, 0, 0.2, 1), transform 800ms cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(section);
        }
    });
    
    // Navigation background on scroll
    const navigation = document.querySelector('.navigation');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navigation.style.backgroundColor = 'rgba(253, 252, 249, 0.98)';
            navigation.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
        } else {
            navigation.style.backgroundColor = 'rgba(253, 252, 249, 0.95)';
            navigation.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    }, { passive: true });
    
    // Lazy loading for images (additional optimization)
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
    
    // Keyboard navigation enhancement
    document.addEventListener('keydown', function(e) {
        // Handle keyboard navigation with focus visible
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Full-Width Slider
    const sliderTrack = document.getElementById('sliderTrack');
    const sliderPrev = document.getElementById('sliderPrev');
    const sliderNext = document.getElementById('sliderNext');
    const sliderIndicators = document.querySelectorAll('.slider-indicator');
    const slides = document.querySelectorAll('.slider-slide');
    
    if (sliderTrack && slides.length > 0) {
        let currentSlide = 0;
        const totalSlides = slides.length;
        let autoPlayInterval;
        
        // Initialize first slide as active
        slides[0].classList.add('active');
        
        function goToSlide(index) {
            // Ensure index is within bounds
            if (index < 0) index = totalSlides - 1;
            if (index >= totalSlides) index = 0;
            
            // Update current slide
            currentSlide = index;
            
            // Move slider track
            sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update active states
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === currentSlide);
            });
            
            sliderIndicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === currentSlide);
            });
            
            // Update navigation buttons
            updateNavButtons();
        }
        
        function updateNavButtons() {
            // Enable/disable buttons based on position (optional - remove if you want infinite loop)
            // For now, we'll allow continuous looping
        }
        
        function nextSlide() {
            goToSlide(currentSlide + 1);
        }
        
        function prevSlide() {
            goToSlide(currentSlide - 1);
        }
        
        // Event listeners for navigation buttons
        if (sliderPrev) {
            sliderPrev.addEventListener('click', function() {
                prevSlide();
                resetAutoPlay();
            });
        }
        
        if (sliderNext) {
            sliderNext.addEventListener('click', function() {
                nextSlide();
                resetAutoPlay();
            });
        }
        
        // Event listeners for indicators
        sliderIndicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function() {
                goToSlide(index);
                resetAutoPlay();
            });
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                prevSlide();
                resetAutoPlay();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
                resetAutoPlay();
            }
        });
        
        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        
        sliderTrack.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        sliderTrack.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next slide
                    nextSlide();
                } else {
                    // Swipe right - previous slide
                    prevSlide();
                }
                resetAutoPlay();
            }
        }
        
        // Auto-play functionality
        function startAutoPlay() {
            autoPlayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
        }
        
        function stopAutoPlay() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
            }
        }
        
        function resetAutoPlay() {
            stopAutoPlay();
            startAutoPlay();
        }
        
        // Start auto-play
        startAutoPlay();
        
        // Pause auto-play when user hovers over slider
        const sliderContainer = document.querySelector('.slider-container');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', stopAutoPlay);
            sliderContainer.addEventListener('mouseleave', startAutoPlay);
        }
        
        // Pause auto-play when page is not visible
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                stopAutoPlay();
            } else {
                startAutoPlay();
            }
        });
    }
    
    // Stats counter animation when in view
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateValue(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    function animateValue(element) {
        const text = element.textContent;
        const hasPlus = text.includes('+');
        const numericValue = parseInt(text.replace(/\D/g, ''));
        
        if (isNaN(numericValue)) return;
        
        const duration = 1500;
        const stepTime = 30;
        const steps = duration / stepTime;
        const increment = numericValue / steps;
        let current = 0;
        
        const timer = setInterval(function() {
            current += increment;
            if (current >= numericValue) {
                element.textContent = hasPlus ? numericValue + '+' : numericValue.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, stepTime);
    }
    
    // Contact Form Validation and Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous errors
            clearFormErrors();
            
            // Validate form
            let isValid = true;
            
            // First Name validation
            const firstName = document.getElementById('firstName');
            if (!firstName.value.trim()) {
                showError('firstName', 'First name is required');
                isValid = false;
            }
            
            // Last Name validation
            const lastName = document.getElementById('lastName');
            if (!lastName.value.trim()) {
                showError('lastName', 'Last name is required');
                isValid = false;
            }
            
            // Email validation
            const email = document.getElementById('email');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim()) {
                showError('email', 'Email address is required');
                isValid = false;
            } else if (!emailPattern.test(email.value)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Company validation
            const company = document.getElementById('company');
            if (!company.value.trim()) {
                showError('company', 'Company name is required');
                isValid = false;
            }
            
            // Inquiry Type validation
            const inquiryType = document.getElementById('inquiryType');
            if (!inquiryType.value) {
                showError('inquiryType', 'Please select an inquiry type');
                isValid = false;
            }
            
            // Message validation
            const message = document.getElementById('message');
            if (!message.value.trim()) {
                showError('message', 'Message is required');
                isValid = false;
            } else if (message.value.trim().length < 20) {
                showError('message', 'Message must be at least 20 characters');
                isValid = false;
            }
            
            // Privacy checkbox validation
            const privacy = document.getElementById('privacy');
            if (!privacy.checked) {
                showError('privacy', 'You must agree to the privacy policy');
                isValid = false;
            }
            
            if (isValid) {
                // Simulate form submission
                submitForm();
            }
        });
        
        // Real-time validation on blur
        const formInputs = contactForm.querySelectorAll('.form-input, .form-select, .form-textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.classList.add('error');
                } else {
                    this.classList.remove('error');
                    const errorElement = document.getElementById(this.id + 'Error');
                    if (errorElement) {
                        errorElement.classList.remove('active');
                    }
                }
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error') && this.value.trim()) {
                    this.classList.remove('error');
                    const errorElement = document.getElementById(this.id + 'Error');
                    if (errorElement) {
                        errorElement.classList.remove('active');
                    }
                }
            });
        });
    }
    
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(fieldId + 'Error');
        
        if (field) {
            field.classList.add('error');
        }
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('active');
        }
    }
    
    function clearFormErrors() {
        const errorElements = document.querySelectorAll('.form-error');
        errorElements.forEach(error => {
            error.classList.remove('active');
            error.textContent = '';
        });
        
        const errorFields = document.querySelectorAll('.error');
        errorFields.forEach(field => {
            field.classList.remove('error');
        });
        
        const formMessage = document.getElementById('formMessage');
        if (formMessage) {
            formMessage.classList.remove('success', 'error');
            formMessage.style.display = 'none';
        }
    }
    
    function submitForm() {
        const submitButton = contactForm.querySelector('.btn-submit');
        const formMessage = document.getElementById('formMessage');
        
        // Disable submit button
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';
        
        // Simulate API call
        setTimeout(function() {
            // Show success message
            formMessage.textContent = 'Thank you for your inquiry. Our team will contact you within two business days.';
            formMessage.classList.add('success');
            formMessage.style.display = 'block';
            
            // Reset form
            contactForm.reset();
            
            // Re-enable button
            submitButton.disabled = false;
            submitButton.textContent = 'Submit Inquiry';
            
            // Scroll to message
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Hide message after 8 seconds
            setTimeout(function() {
                formMessage.style.display = 'none';
                formMessage.classList.remove('success');
            }, 8000);
            
        }, 1500);
    }
    
    // Video Carousel
    const videoTrack = document.getElementById('videoTrack');
    const videoPrev = document.getElementById('videoPrev');
    const videoNext = document.getElementById('videoNext');
    const videoDots = document.getElementById('videoDots');
    
    if (videoTrack && videoPrev && videoNext && videoDots) {
        const videoSlides = videoTrack.querySelectorAll('.video-slide');
        let currentVideoIndex = 0;
        
        // Create dots
        videoSlides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'video-dot';
            dot.setAttribute('aria-label', `Go to video ${index + 1}`);
            if (index === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => goToVideo(index));
            videoDots.appendChild(dot);
        });
        
        const dots = videoDots.querySelectorAll('.video-dot');
        
        function updateVideoCarousel() {
            const offset = -currentVideoIndex * 100;
            videoTrack.style.transform = `translateX(${offset}%)`;
            
            // Update dots
            dots.forEach((dot, index) => {
                if (index === currentVideoIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
            
            // Update nav buttons
            videoPrev.disabled = currentVideoIndex === 0;
            videoNext.disabled = currentVideoIndex === videoSlides.length - 1;
        }
        
        function goToVideo(index) {
            if (index >= 0 && index < videoSlides.length) {
                currentVideoIndex = index;
                updateVideoCarousel();
            }
        }
        
        videoPrev.addEventListener('click', () => {
            goToVideo(currentVideoIndex - 1);
        });
        
        videoNext.addEventListener('click', () => {
            goToVideo(currentVideoIndex + 1);
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            const rect = videoTrack.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
            
            if (isVisible) {
                if (e.key === 'ArrowLeft') {
                    goToVideo(currentVideoIndex - 1);
                } else if (e.key === 'ArrowRight') {
                    goToVideo(currentVideoIndex + 1);
                }
            }
        });
        
        // Touch swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        
        videoTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        videoTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    goToVideo(currentVideoIndex + 1);
                } else {
                    goToVideo(currentVideoIndex - 1);
                }
            }
        });
        
        // Initialize
        updateVideoCarousel();
    }
    
    // Search Overlay
    const searchToggle = document.getElementById('searchToggle');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchClose = document.getElementById('searchClose');
    const searchInput = document.getElementById('searchInput');
    
    if (searchToggle && searchOverlay && searchClose && searchInput) {
        // Open search overlay
        searchToggle.addEventListener('click', function() {
            openSearch();
        });
        
        // Close search overlay
        searchClose.addEventListener('click', function() {
            closeSearch();
        });
        
        // Close on overlay background click
        searchOverlay.addEventListener('click', function(e) {
            if (e.target === searchOverlay || e.target.classList.contains('search-overlay-content')) {
                closeSearch();
            }
        });
        
        // Close on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
                closeSearch();
            }
        });
        
        // Handle search input
        searchInput.addEventListener('input', function() {
            const query = this.value.trim();
            if (query.length > 2) {
                // In a real implementation, this would trigger search
                console.log('Searching for:', query);
            }
        });
        
        // Handle search submission
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const query = this.value.trim();
                if (query.length > 0) {
                    // In a real implementation, navigate to search results
                    console.log('Search submitted:', query);
                    // window.location.href = `/search?q=${encodeURIComponent(query)}`;
                }
            }
        });
        
        function openSearch() {
            searchOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Focus on input after animation
            setTimeout(() => {
                searchInput.focus();
            }, 400);
        }
        
        function closeSearch() {
            searchOverlay.classList.remove('active');
            document.body.style.overflow = '';
            searchInput.value = '';
        }
    }
    
    // Language Switcher
    const languageBtn = document.getElementById('languageBtn');
    const languageDropdown = document.getElementById('languageDropdown');
    const currentLanguage = document.getElementById('currentLanguage');
    const languageOptions = document.querySelectorAll('.language-option');
    
    if (languageBtn && languageDropdown) {
        // Toggle dropdown
        languageBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            if (isExpanded) {
                closeLanguageDropdown();
            } else {
                openLanguageDropdown();
            }
        });
        
        // Language option selection
        languageOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                
                const lang = this.dataset.lang;
                const langCode = this.querySelector('.language-code').textContent;
                
                // Update active state
                languageOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                
                // Update current language display
                currentLanguage.textContent = langCode;
                
                // Store language preference
                localStorage.setItem('selectedLanguage', lang);
                
                // Close dropdown
                closeLanguageDropdown();
                
                // In a real implementation, this would trigger language change
                console.log('Language changed to:', lang);
            });
        });
        
        function openLanguageDropdown() {
            languageDropdown.classList.add('active');
            languageBtn.setAttribute('aria-expanded', 'true');
        }
        
        function closeLanguageDropdown() {
            languageDropdown.classList.remove('active');
            languageBtn.setAttribute('aria-expanded', 'false');
        }
        
        // Close on click outside
        document.addEventListener('click', function(e) {
            if (!languageBtn.contains(e.target) && !languageDropdown.contains(e.target)) {
                closeLanguageDropdown();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && languageDropdown.classList.contains('active')) {
                closeLanguageDropdown();
                languageBtn.focus();
            }
        });
        
        // Load saved language preference
        const savedLanguage = localStorage.getItem('selectedLanguage');
        if (savedLanguage) {
            const savedOption = document.querySelector(`.language-option[data-lang="${savedLanguage}"]`);
            if (savedOption) {
                languageOptions.forEach(opt => opt.classList.remove('active'));
                savedOption.classList.add('active');
                const langCode = savedOption.querySelector('.language-code').textContent;
                currentLanguage.textContent = langCode;
            }
        }
    }
    
    // Performance optimization: Reduce motion for users who prefer it
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        // Disable animations for users who prefer reduced motion
        document.querySelectorAll('[style*="animation"]').forEach(el => {
            el.style.animation = 'none';
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    }
});
