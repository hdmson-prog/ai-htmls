document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navigation Scroll Effect
    const nav = document.querySelector('.nav-bar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // 2. Scroll Reveal Observer
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, revealOptions);

    const revealElements = document.querySelectorAll('.scroll-reveal, .reveal-text');
    revealElements.forEach(el => revealObserver.observe(el));

    // 3. Smooth Scroll for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Subtle Parallax for Image Containers
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image-area');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });

    // 5. Mobile Menu Toggle Logic (Simplified)
    const menuToggle = document.querySelector('.menu-toggle');
    menuToggle.addEventListener('click', () => {
        // Toggle mobile menu state
        console.log('Mobile menu interaction');
    });

    // 6. Form Submission Placeholder
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = "Request Sent";
            btn.style.backgroundColor = "#b5a48b";
            
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.backgroundColor = "#1a1a1a";
                contactForm.reset();
            }, 3000);
        });
    }
});