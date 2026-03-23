/**
 * AETHER DIGITAL — MAIN INTERACTION CONTROLLER
 * Vanilla JavaScript only. Minimal footprint, maximal impact.
 */

document.addEventListener('DOMContentLoaded', () => {

    const cursor = document.getElementById('cursor');
    const navbar = document.getElementById('navbar');
    const reveals = document.querySelectorAll('.reveal');

    // ---------------------------------------------------------
    // 1. CUSTOM CURSOR FOLLOWER
    // ---------------------------------------------------------
    document.addEventListener('mousemove', (e) => {
        // Subtle lag for premium feel
        cursor.animate({
            left: `${e.clientX}px`,
            top: `${e.clientY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Expand cursor on links
    const interactiveElements = document.querySelectorAll('a, button, .portfolio-item, .service-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(4)';
            cursor.style.background = 'rgba(0, 224, 255, 0.4)';
            cursor.style.backdropFilter = 'blur(4px)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'var(--accent-blue)';
            cursor.style.backdropFilter = 'none';
        });
    });

    // ---------------------------------------------------------
    // 2. STICKY NAVBAR ON SCROLL
    // ---------------------------------------------------------
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ---------------------------------------------------------
    // 3. REVEAL ON SCROLL — INTERSECTION OBSERVER
    // ---------------------------------------------------------
    const options = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Unobserve after revealing to prevent repeated animations
                observer.unobserve(entry.target);
            }
        });
    }, options);

    reveals.forEach(el => observer.observe(el));

    // ---------------------------------------------------------
    // 4. PARALLAX EFFECT FOR HERO VISUAL
    // ---------------------------------------------------------
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        window.addEventListener('scroll', () => {
            const scrollPercent = window.scrollY / window.innerHeight;
            heroVisual.style.transform = `rotate(15deg) translateY(${scrollPercent * 200}px)`;
        });
    }

    // ---------------------------------------------------------
    // 5. SMOOTH SCROLLING FOR NAV LINKS
    // ---------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // ---------------------------------------------------------
    // 6. DYNAMIC GRADIENT MESH SHIFT
    // ---------------------------------------------------------
    const gradientMeshes = document.querySelectorAll('.gradient-mesh');
    gradientMeshes.forEach(mesh => {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            mesh.style.backgroundPosition = `${x * 100}% ${y * 100}%`;
        });
    });

    console.log('Aether Digital Site Initialized.');
});
