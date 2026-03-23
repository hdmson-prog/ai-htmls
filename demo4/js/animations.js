/**
 * Animations Module
 * Scroll-triggered reveals and parallax effects
 */

(function() {
  'use strict';

  // Intersection Observer for scroll reveals
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Optional: unobserve after reveal for performance
        // revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all scroll-reveal elements
  const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
  scrollRevealElements.forEach(el => {
    revealObserver.observe(el);
  });
  
  // Parallax Effect for Hero
  const heroBackground = document.querySelector('.hero-background.parallax');
  let ticking = false;
  
  function updateParallax() {
    if (heroBackground) {
      const scrolled = window.pageYOffset;
      const heroHeight = document.querySelector('.hero-section').offsetHeight;
      
      // Only apply parallax while hero is visible
      if (scrolled < heroHeight) {
        const parallaxSpeed = 0.5;
        const yPos = -(scrolled * parallaxSpeed);
        heroBackground.style.transform = `translateY(${yPos}px)`;
      }
    }
    
    ticking = false;
  }
  
  function requestParallaxUpdate() {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }
  
  // Parallax scroll event
  window.addEventListener('scroll', requestParallaxUpdate);
  
  // Image Zoom on Hover (delegated)
  document.addEventListener('mousemove', (e) => {
    const imageZoom = e.target.closest('.image-zoom');
    if (imageZoom) {
      const rect = imageZoom.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;
      
      const img = imageZoom.querySelector('img');
      if (img) {
        img.style.transformOrigin = `${xPercent}% ${yPercent}%`;
      }
    }
  });
  
  // Page Load Animation
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });
  
  // Product Category Filter Animation
  const categoryButtons = document.querySelectorAll('.category-btn');
  const productCards = document.querySelectorAll('.product-card');
  
  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.getAttribute('data-category');
      
      // Update active button
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Filter products with animation
      productCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
  
  // Stagger Animation Helper
  function staggerAnimation(elements, delay = 100) {
    elements.forEach((el, index) => {
      el.style.animationDelay = `${index * delay}ms`;
    });
  }
  
  // Apply stagger to grid items
  const productGrid = document.querySelector('.products-grid');
  if (productGrid) {
    const gridItems = productGrid.querySelectorAll('.product-card');
    staggerAnimation(gridItems, 100);
  }
  
  // Smooth scroll behavior for browsers that don't support it
  if (!('scrollBehavior' in document.documentElement.style)) {
    const scrollToSmoothly = (pos, time) => {
      const currentPos = window.pageYOffset;
      let start = null;
      
      if (time == null) time = 500;
      
      window.requestAnimationFrame(function step(currentTime) {
        start = !start ? currentTime : start;
        const progress = currentTime - start;
        
        if (currentPos < pos) {
          window.scrollTo(0, ((pos - currentPos) * progress / time) + currentPos);
        } else {
          window.scrollTo(0, currentPos - ((currentPos - pos) * progress / time));
        }
        
        if (progress < time) {
          window.requestAnimationFrame(step);
        } else {
          window.scrollTo(0, pos);
        }
      });
    };
    
    // Polyfill for smooth scroll
    window.smoothScrollTo = scrollToSmoothly;
  }
  
})();
