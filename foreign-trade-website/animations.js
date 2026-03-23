/**
 * Nexus Industrial - Animation Logic
 * Handles scroll reveal and staggered animations using IntersectionObserver.
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initStaggeredAnimations();
});

/**
 * Initialize standard scroll reveal elements
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px', // Trigger slightly before element enters view
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Animates only once
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
}

/**
 * Initialize staggered animations for lists (like search results)
 */
function initStaggeredAnimations() {
    const staggeredParents = document.querySelectorAll('.stagger-parent');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const staggerObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const parent = entry.target;
                parent.classList.add('active');
                
                // Find all children marked for staggering
                const children = parent.querySelectorAll('.stagger-child');
                
                // Add explicit delays if not handled solely by CSS transitions
                children.forEach((child, index) => {
                    // We can add a small inline delay for JS-controlled sequencing if CSS isn't enough
                    // or just rely on the parent class triggering the CSS transitions.
                    // Here we'll rely on a small inline delay addition for extra smoothness if needed
                    child.style.transitionDelay = `${index * 100}ms`;
                    child.classList.add('active'); // Optional, if we want child specific class
                });

                observer.unobserve(parent);
            }
        });
    }, observerOptions);

    staggerParents.forEach(parent => {
        staggerObserver.observe(parent);
    });
}
