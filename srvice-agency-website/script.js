/* ==========================================
   ENTERPRISE WEBSITE INTERACTIONS
   Professional JavaScript for corporate website
   ========================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // STICKY NAVIGATION
    // ==========================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    function handleNavbarScroll() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }
    
    window.addEventListener('scroll', handleNavbarScroll);
    
    // ==========================================
    // MOBILE MENU TOGGLE
    // ==========================================
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // ==========================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignore empty anchors or just "#"
            if (href === '#' || href === '#video') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ==========================================
    // TABBED SERVICES SECTION
    // ==========================================
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding panel
            const targetPanel = document.getElementById(targetTab);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
    
    // ==========================================
    // ANIMATED COUNTER FOR METRICS
    // ==========================================
    const metricNumbers = document.querySelectorAll('.metric-number');
    let counterAnimated = false;
    
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16); // 60fps
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }
    
    function checkMetricsInView() {
        if (counterAnimated) return;
        
        const metricsSection = document.querySelector('.metrics');
        if (!metricsSection) return;
        
        const rect = metricsSection.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if (isInView) {
            counterAnimated = true;
            metricNumbers.forEach(metric => {
                const target = parseInt(metric.getAttribute('data-target'));
                animateCounter(metric, target);
            });
        }
    }
    
    window.addEventListener('scroll', checkMetricsInView);
    checkMetricsInView(); // Check on load
    
    // ==========================================
    // TEAM CAROUSEL
    // ==========================================
    const carouselTrack = document.querySelector('.team-track');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    const teamCards = document.querySelectorAll('.team-card');
    
    if (carouselTrack && prevButton && nextButton && teamCards.length > 0) {
        let currentIndex = 0;
        let cardsToShow = 4;
        
        // Determine cards to show based on viewport
        function updateCardsToShow() {
            const width = window.innerWidth;
            if (width <= 480) {
                cardsToShow = 1;
            } else if (width <= 768) {
                cardsToShow = 2;
            } else if (width <= 1024) {
                cardsToShow = 3;
            } else {
                cardsToShow = 4;
            }
            updateCarousel();
        }
        
        function updateCarousel() {
            const cardWidth = teamCards[0].offsetWidth;
            const gap = 24; // 1.5rem in pixels
            const offset = -(currentIndex * (cardWidth + gap));
            carouselTrack.style.transform = `translateX(${offset}px)`;
            
            // Update button states
            prevButton.disabled = currentIndex === 0;
            nextButton.disabled = currentIndex >= teamCards.length - cardsToShow;
            
            prevButton.style.opacity = prevButton.disabled ? '0.5' : '1';
            nextButton.style.opacity = nextButton.disabled ? '0.5' : '1';
            prevButton.style.cursor = prevButton.disabled ? 'not-allowed' : 'pointer';
            nextButton.style.cursor = nextButton.disabled ? 'not-allowed' : 'pointer';
        }
        
        prevButton.addEventListener('click', function() {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });
        
        nextButton.addEventListener('click', function() {
            if (currentIndex < teamCards.length - cardsToShow) {
                currentIndex++;
                updateCarousel();
            }
        });
        
        // Update on window resize
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                currentIndex = 0; // Reset to first card on resize
                updateCardsToShow();
            }, 250);
        });
        
        // Initialize
        updateCardsToShow();
    }
    
    // ==========================================
    // INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
    // ==========================================
    const observerOptions = {
        threshold: 0.1,
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
    const sections = document.querySelectorAll('.services, .team, .trust-strip, .news');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // ==========================================
    // NEWS CARDS STAGGERED ANIMATION
    // ==========================================
    const newsCards = document.querySelectorAll('.news-card');
    
    if (newsCards.length > 0) {
        const newsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const cards = entry.target.querySelectorAll('.news-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100); // Stagger by 100ms
                    });
                    newsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        // Initially hide cards
        newsCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        // Observe the news section
        const newsSection = document.querySelector('.news');
        if (newsSection) {
            newsObserver.observe(newsSection);
        }
    }
    
    // ==========================================
    // LAZY LOADING FOR IMAGES (if any are added)
    // ==========================================
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
    
    // ==========================================
    // PERFORMANCE OPTIMIZATION
    // ==========================================
    
    // Debounce function for scroll/resize events
    function debounce(func, wait = 10) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Apply debouncing to scroll handler
    const debouncedScroll = debounce(function() {
        handleNavbarScroll();
        checkMetricsInView();
    }, 10);
    
    window.removeEventListener('scroll', handleNavbarScroll);
    window.removeEventListener('scroll', checkMetricsInView);
    window.addEventListener('scroll', debouncedScroll);
    
    // ==========================================
    // ACCESSIBILITY ENHANCEMENTS
    // ==========================================
    
    // Add keyboard navigation for carousel
    if (prevButton && nextButton) {
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                prevButton.click();
            } else if (e.key === 'ArrowRight') {
                nextButton.click();
            }
        });
    }
    
    // Add keyboard navigation for tabs
    tabButtons.forEach((button, index) => {
        button.addEventListener('keydown', function(e) {
            let newIndex;
            
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                newIndex = (index + 1) % tabButtons.length;
                tabButtons[newIndex].focus();
                tabButtons[newIndex].click();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                newIndex = (index - 1 + tabButtons.length) % tabButtons.length;
                tabButtons[newIndex].focus();
                tabButtons[newIndex].click();
            }
        });
    });
    
    // ==========================================
    // PRELOAD CRITICAL RESOURCES
    // ==========================================
    
    // Preconnect to external resources if needed
    const preconnectLinks = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com'
    ];
    
    preconnectLinks.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = url;
        document.head.appendChild(link);
    });
    
    // ==========================================
    // LOGO BAR ANIMATION (Optional Enhancement)
    // ==========================================
    const logoBar = document.querySelector('.logo-bar');
    
    if (logoBar) {
        const logos = logoBar.querySelectorAll('.client-logo');
        
        // Stagger fade-in animation for logos
        const logoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    logos.forEach((logo, index) => {
                        setTimeout(() => {
                            logo.style.opacity = '0.4';
                            logo.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                    logoObserver.disconnect();
                }
            });
        }, { threshold: 0.2 });
        
        // Initially hide logos
        logos.forEach(logo => {
            logo.style.opacity = '0';
            logo.style.transform = 'translateY(20px)';
            logo.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        logoObserver.observe(logoBar);
    }
    
    // ==========================================
    // PREVENT SCROLL JANK
    // ==========================================
    
    // Use passive event listeners for better scrolling performance
    const passiveSupported = checkPassiveSupport();
    
    function checkPassiveSupport() {
        let passiveSupported = false;
        try {
            const options = {
                get passive() {
                    passiveSupported = true;
                    return false;
                }
            };
            window.addEventListener('test', null, options);
            window.removeEventListener('test', null, options);
        } catch (err) {
            passiveSupported = false;
        }
        return passiveSupported;
    }
    
    // ==========================================
    // CONSOLE WELCOME MESSAGE
    // ==========================================
    
    console.log('%c Enterprise Solutions ', 'background: #0a192f; color: #d4af37; font-size: 20px; font-weight: bold; padding: 10px;');
    console.log('%c Trusted by Fortune 500 Companies ', 'background: #d4af37; color: #0a192f; font-size: 14px; padding: 5px;');
    console.log('%c Website loaded successfully. All systems operational. ', 'color: #4b5563; font-size: 12px;');
    
}); // End of DOMContentLoaded

// ==========================================
// PAGE LOAD PERFORMANCE TRACKING
// ==========================================

window.addEventListener('load', function() {
    // Get performance metrics
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const connectTime = perfData.responseEnd - perfData.requestStart;
        const renderTime = perfData.domComplete - perfData.domLoading;
        
        console.log('%c Performance Metrics:', 'color: #d4af37; font-weight: bold;');
        console.log(`Page Load Time: ${pageLoadTime}ms`);
        console.log(`Connect Time: ${connectTime}ms`);
        console.log(`Render Time: ${renderTime}ms`);
    }
});