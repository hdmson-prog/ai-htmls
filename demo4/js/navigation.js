/**
 * Navigation Module
 * Sticky header, mobile menu, smooth scroll
 */

(function() {
  'use strict';

  // Elements
  const header = document.querySelector('.site-header');
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const menuOverlay = document.querySelector('.menu-overlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  
  // Sticky Header
  let lastScroll = 0;
  
  function handleScroll() {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class
    if (currentScroll > 100) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
    
    lastScroll = currentScroll;
  }
  
  // Mobile Menu Toggle
  function toggleMobileMenu() {
    const isOpen = mobileMenu.classList.contains('is-open');
    
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }
  
  function openMobileMenu() {
    mobileMenu.classList.add('is-open');
    menuOverlay.classList.add('is-open');
    mobileMenuToggle.classList.add('is-open');
    mobileMenuToggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
  }
  
  function closeMobileMenu() {
    mobileMenu.classList.remove('is-open');
    menuOverlay.classList.remove('is-open');
    mobileMenuToggle.classList.remove('is-open');
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  }
  
  // Smooth Scroll to Anchor Links
  function smoothScroll(e) {
    const href = this.getAttribute('href');
    
    // Check if it's an anchor link
    if (href && href.startsWith('#')) {
      e.preventDefault();
      
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // Close mobile menu if open
        closeMobileMenu();
        
        // Scroll to target
        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update URL without jumping
        if (history.pushState) {
          history.pushState(null, null, href);
        }
      }
    }
  }
  
  // Active Section Highlighting
  function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.pageYOffset + 200;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  // Event Listeners
  window.addEventListener('scroll', () => {
    handleScroll();
    updateActiveSection();
  });
  
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
  }
  
  if (menuOverlay) {
    menuOverlay.addEventListener('click', closeMobileMenu);
  }
  
  // Close menu when clicking mobile nav links
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
  
  // Smooth scroll for all nav links
  navLinks.forEach(link => {
    link.addEventListener('click', smoothScroll);
  });
  
  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
      closeMobileMenu();
    }
  });
  
  // Initialize
  handleScroll();
  updateActiveSection();
  
})();
