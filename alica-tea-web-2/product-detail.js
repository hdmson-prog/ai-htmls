// Product Detail Page
// Image Gallery and Interactive Elements

document.addEventListener('DOMContentLoaded', function() {
    
    // Image Gallery
    const mainImage = document.getElementById('mainImage');
    const galleryThumbs = document.querySelectorAll('.gallery-thumb');
    
    if (galleryThumbs.length > 0) {
        galleryThumbs.forEach(thumb => {
            thumb.addEventListener('click', function() {
                // Remove active class from all thumbs
                galleryThumbs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked thumb
                this.classList.add('active');
                
                // Update main image with fade effect
                mainImage.style.opacity = '0';
                
                setTimeout(() => {
                    mainImage.src = this.dataset.image;
                    mainImage.style.opacity = '1';
                }, 300);
            });
            
            // Keyboard navigation for gallery
            thumb.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
    }
    
    // Animate tasting chart bars on scroll
    const chartObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateChartBars(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const tastingChart = document.querySelector('.tasting-chart');
    if (tastingChart) {
        chartObserver.observe(tastingChart);
    }
    
    function animateChartBars(chartElement) {
        const chartFills = chartElement.querySelectorAll('.chart-fill');
        
        chartFills.forEach((fill, index) => {
            const targetWidth = fill.style.width;
            fill.style.width = '0';
            
            setTimeout(() => {
                fill.style.width = targetWidth;
            }, index * 150);
        });
    }
    
    // Smooth scroll to sections
    const ctaButton = document.querySelector('.product-cta .btn-primary');
    if (ctaButton && ctaButton.getAttribute('href').startsWith('#')) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
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
    }
    
    // Add scroll-triggered animations for sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                entry.target.style.transition = 'opacity 800ms cubic-bezier(0.4, 0, 0.2, 1), transform 800ms cubic-bezier(0.4, 0, 0.2, 1)';
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.classList.add('animated');
                }, 100);
            }
        });
    }, observerOptions);
    
    // Observe brewing items
    const brewingItems = document.querySelectorAll('.brewing-item');
    brewingItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 100}ms`;
        sectionObserver.observe(item);
    });
    
    // Observe cert items
    const certItems = document.querySelectorAll('.cert-item');
    certItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 100}ms`;
        sectionObserver.observe(item);
    });
    
    // Image lazy loading with fade-in effect
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 600ms ease';
                
                img.addEventListener('load', function() {
                    this.style.opacity = '1';
                });
                
                // Stop observing once loaded
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // Add transition to main image
    if (mainImage) {
        mainImage.style.transition = 'opacity 300ms ease';
    }
    
    // Keyboard accessibility enhancements
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
});
