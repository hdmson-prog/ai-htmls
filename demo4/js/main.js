/**
 * Main JavaScript Entry Point
 * Initialization and orchestration
 */

(function() {
  'use strict';

  console.log('🪑 Luxury Furniture Showcase - Initialized');
  
  // Performance monitoring
  if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
      const loadTime = window.performance.timing.domContentLoadedEventEnd - 
                       window.performance.timing.navigationStart;
      console.log(`⚡ Page loaded in ${loadTime}ms`);
    });
  }
  
  // Detect reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    document.body.classList.add('reduce-motion');
    console.log('♿ Reduced motion mode enabled');
  }
  
  // Lazy load images (native browser support)
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    console.log(`🖼️ ${images.length} images set for lazy loading`);
  } else {
    // Fallback for browsers without native lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
  }
  
  // Service Worker registration (optional PWA support)
  if ('serviceWorker' in navigator) {
    // Uncomment to enable PWA features
    // window.addEventListener('load', () => {
    //   navigator.serviceWorker.register('/sw.js')
    //     .then(reg => console.log('✓ Service Worker registered'))
    //     .catch(err => console.log('✗ Service Worker registration failed'));
    // });
  }
  
  // Console easter egg
  console.log(`
    %c╔═══════════════════════════════════════╗
    ║  🪑 Luxury Furniture Showcase        ║
    ║  Crafted with passion since 1990     ║
    ║  Built with modern web technologies  ║
    ╚═══════════════════════════════════════╝
  `, 'color: #c9a962; font-family: monospace; font-size: 12px;');
  
  // Global utility functions
  window.LuxeFurniture = {
    version: '1.0.0',
    
    // Smooth scroll utility
    scrollTo: function(elementId) {
      const element = document.getElementById(elementId);
      if (element) {
        const header = document.querySelector('.site-header');
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    },
    
    // Debounce utility
    debounce: function(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    },
    
    // Throttle utility
    throttle: function(func, limit) {
      let inThrottle;
      return function(...args) {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    }
  };
  
  // Analytics placeholder (replace with your analytics)
  window.trackEvent = function(category, action, label) {
    console.log(`📊 Event: ${category} - ${action}${label ? ' - ' + label : ''}`);
    
    // Google Analytics example (uncomment and configure)
    // if (typeof gtag !== 'undefined') {
    //   gtag('event', action, {
    //     'event_category': category,
    //     'event_label': label
    //   });
    // }
  };
  
  // Track clicks on CTA buttons
  document.querySelectorAll('.btn-primary, .btn-hero-primary, .carousel-item-cta').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const buttonText = e.target.textContent.trim();
      window.trackEvent('CTA', 'click', buttonText);
    });
  });
  
  // Track product card interactions
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
      const productName = card.querySelector('.product-title')?.textContent;
      window.trackEvent('Product', 'view', productName);
    });
  });
  
  // Handle external links
  document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (!link.hostname.includes(window.location.hostname)) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });
  
  // Print detection
  window.addEventListener('beforeprint', () => {
    console.log('🖨️ Print mode activated');
  });
  
  // Online/Offline detection
  window.addEventListener('online', () => {
    console.log('🌐 Connection restored');
  });
  
  window.addEventListener('offline', () => {
    console.log('📡 Connection lost');
  });
  
  // Development helpers (remove in production)
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('🔧 Development mode');
    
    // Log all image placeholders
    const placeholders = document.querySelectorAll('[data-image-type]');
    console.log(`📷 Image placeholders found: ${placeholders.length}`);
    
    placeholders.forEach(el => {
      const type = el.getAttribute('data-image-type');
      const text = el.getAttribute('data-placeholder-text');
      console.log(`  - ${type}: ${text}`);
    });
  }
  
})();
