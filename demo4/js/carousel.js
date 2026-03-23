/**
 * Carousel Module
 * Touch-enabled product carousel with navigation
 */

(function() {
  'use strict';

  const carousel = document.querySelector('.carousel-container');
  if (!carousel) return;
  
  const wrapper = carousel.querySelector('.carousel-wrapper');
  const slides = carousel.querySelectorAll('.carousel-slide');
  const prevBtn = carousel.querySelector('.carousel-nav-prev');
  const nextBtn = carousel.querySelector('.carousel-nav-next');
  const dots = carousel.querySelectorAll('.carousel-dot');
  
  let currentIndex = 0;
  let isTransitioning = false;
  let autoplayInterval = null;
  let startX = 0;
  let isDragging = false;
  
  // Get slides per view based on screen width
  function getSlidesPerView() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }
  
  // Get total slides
  function getTotalSlides() {
    const slidesPerView = getSlidesPerView();
    return Math.max(slides.length - slidesPerView + 1, 1);
  }
  
  // Update carousel position
  function updateCarousel(animate = true) {
    if (!animate) {
      wrapper.style.transition = 'none';
    }
    
    const slideWidth = slides[0].offsetWidth;
    const offset = -currentIndex * slideWidth;
    wrapper.style.transform = `translateX(${offset}px)`;
    
    if (!animate) {
      // Force reflow
      wrapper.offsetHeight;
      wrapper.style.transition = '';
    }
    
    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
    
    // Update button states
    if (prevBtn) {
      prevBtn.disabled = currentIndex === 0;
    }
    if (nextBtn) {
      nextBtn.disabled = currentIndex >= getTotalSlides() - 1;
    }
  }
  
  // Go to specific slide
  function goToSlide(index) {
    if (isTransitioning) return;
    
    const totalSlides = getTotalSlides();
    currentIndex = Math.max(0, Math.min(index, totalSlides - 1));
    
    isTransitioning = true;
    updateCarousel();
    
    setTimeout(() => {
      isTransitioning = false;
    }, 600);
  }
  
  // Next slide
  function nextSlide() {
    if (currentIndex < getTotalSlides() - 1) {
      goToSlide(currentIndex + 1);
    }
  }
  
  // Previous slide
  function prevSlide() {
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1);
    }
  }
  
  // Autoplay
  function startAutoplay() {
    stopAutoplay();
    autoplayInterval = setInterval(() => {
      if (currentIndex >= getTotalSlides() - 1) {
        goToSlide(0);
      } else {
        nextSlide();
      }
    }, 5000);
  }
  
  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  }
  
  // Touch/Swipe Support
  function handleTouchStart(e) {
    startX = e.touches ? e.touches[0].clientX : e.clientX;
    isDragging = true;
    stopAutoplay();
  }
  
  function handleTouchMove(e) {
    if (!isDragging) return;
    
    const currentX = e.touches ? e.touches[0].clientX : e.clientX;
    const diff = startX - currentX;
    
    // Add some resistance
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      isDragging = false;
    }
  }
  
  function handleTouchEnd() {
    isDragging = false;
    startAutoplay();
  }
  
  // Event Listeners
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      stopAutoplay();
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      stopAutoplay();
    });
  }
  
  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlide(index);
      stopAutoplay();
    });
  });
  
  // Touch events
  wrapper.addEventListener('touchstart', handleTouchStart, { passive: true });
  wrapper.addEventListener('touchmove', handleTouchMove, { passive: true });
  wrapper.addEventListener('touchend', handleTouchEnd);
  
  // Mouse events (for desktop drag)
  wrapper.addEventListener('mousedown', handleTouchStart);
  wrapper.addEventListener('mousemove', handleTouchMove);
  wrapper.addEventListener('mouseup', handleTouchEnd);
  wrapper.addEventListener('mouseleave', handleTouchEnd);
  
  // Keyboard navigation
  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
      stopAutoplay();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
      stopAutoplay();
    }
  });
  
  // Pause autoplay on hover
  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);
  
  // Handle window resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      updateCarousel(false);
    }, 250);
  });
  
  // Initialize
  updateCarousel(false);
  startAutoplay();
  
})();
