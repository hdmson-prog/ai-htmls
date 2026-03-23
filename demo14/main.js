document.addEventListener('DOMContentLoaded', () => {

    // 1. Scroll Reveal Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Once element is revealed, we can stop observing it
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Slight offset for better feel
    });

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // 2. Smooth Navigation Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Header Background Transition on Scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '15px 0';
            header.style.background = 'rgba(10, 10, 11, 0.95)';
        } else {
            header.style.padding = '20px 0';
            header.style.background = 'rgba(10, 10, 11, 0.8)';
        }
    });

    // 4. Form Submission Handling (Visual feedback only for B2B portal)
    const rfqForm = document.querySelector('.rfq-form');
    if (rfqForm) {
        rfqForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = rfqForm.querySelector('button');
            const originalText = btn.innerText;

            btn.innerText = 'PROCESSING INQUIRY...';
            btn.style.opacity = '0.7';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerText = 'INQUIRY SUBMITTED SUCCESSFULLY';
                btn.style.background = '#28a745'; // Success green
                rfqForm.reset();

                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = 'var(--color-accent)';
                    btn.style.opacity = '1';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // 5. Parallax effect for image placeholders (Subtle movement)
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const placeholders = document.querySelectorAll('.img-placeholder');

        placeholders.forEach(ph => {
            // Only apply to placeholders currently in view for performance
            const rect = ph.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const speed = 0.05;
                const yPos = -(scrolled * speed);
                ph.style.backgroundPosition = `center ${yPos}px`;
            }
        });
    });

    // 6. Product Archive Filter Logic (Visual Feedback)
    const filters = document.querySelectorAll('.filter-item input');
    filters.forEach(filter => {
        filter.addEventListener('change', () => {
            console.log('Technical Archive Filter Applied: Updating Results...');
            const grid = document.querySelector('.product-grid');
            if (grid) {
                grid.style.opacity = '0.5';
                setTimeout(() => {
                    grid.style.opacity = '1';
                }, 400);
            }
        });
    });

    // 7. Hero Slider Controller
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;

    const showSlide = (index) => {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));

        slides[index].classList.add('active');
        dots[index].classList.add('active');
    };

    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    };

    const startSlideShow = () => {
        slideInterval = setInterval(nextSlide, 6000); // 6 second dwell time
    };

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            currentSlide = index;
            showSlide(currentSlide);
            startSlideShow();
        });
    });

    if (slides.length > 0) {
        startSlideShow();
    }

    console.log('Global AutoSystems Engine Initialized.');
});
