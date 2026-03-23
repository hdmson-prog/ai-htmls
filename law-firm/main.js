/* ═══════════════════════════════════════════════════════════
   ALDERTON & VALE — main.js
   Vanilla JS: Nav scroll, mobile menu, scroll reveal,
   form handling, smooth behaviour
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── NAV: Scroll state ─── */
  const nav = document.getElementById('nav');

  function updateNav () {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ─── NAV: Mobile burger ─── */
  const burger = document.getElementById('navBurger');
  const navLinks = document.getElementById('navLinks');

  burger.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      burger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (!nav.contains(e.target) && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      burger.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  /* ─── SCROLL REVEAL ─── */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show all immediately
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ─── HERO: Immediate reveal ─── */
  const heroContent = document.querySelector('.hero__content');
  if (heroContent) {
    setTimeout(function () {
      heroContent.classList.add('is-visible');
    }, 200);
  }

  /* ─── PRACTICE CARDS: Staggered reveal ─── */
  const practiceCards = document.querySelectorAll('.practice-card');
  practiceCards.forEach(function (card, i) {
    card.style.transitionDelay = (i * 0.08) + 's';
  });

  /* ─── TEAM CARDS: Staggered reveal ─── */
  const teamCards = document.querySelectorAll('.team-card');
  teamCards.forEach(function (card, i) {
    card.style.transitionDelay = (i * 0.07) + 's';
  });

  /* ─── SMOOTH ANCHOR SCROLL ─── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navHeight = nav ? nav.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ─── ACTIVE NAV LINK (section tracking) ─── */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');

  function setActiveNavLink () {
    let current = '';
    const scrollY = window.scrollY + window.innerHeight * 0.4;

    sections.forEach(function (section) {
      if (section.offsetTop <= scrollY) {
        current = section.getAttribute('id');
      }
    });

    navAnchors.forEach(function (link) {
      link.classList.remove('nav__link--active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('nav__link--active');
      }
    });
  }

  window.addEventListener('scroll', setActiveNavLink, { passive: true });
  setActiveNavLink();

  /* ─── FORM: Submit handler ─── */
  const form = document.querySelector('.contact__form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;

      // Validate
      let valid = true;
      const requiredFields = form.querySelectorAll('input[type="text"], input[type="email"], select, textarea');

      requiredFields.forEach(function (field) {
        const group = field.closest('.form-group');
        group.classList.remove('form-group--error');

        if (!field.value.trim()) {
          group.classList.add('form-group--error');
          valid = false;
        }
      });

      // Email format check
      const emailField = form.querySelector('input[type="email"]');
      if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
          emailField.closest('.form-group').classList.add('form-group--error');
          valid = false;
        }
      }

      if (!valid) return;

      // Simulate submission
      btn.disabled = true;
      btn.textContent = 'Sending…';

      setTimeout(function () {
        btn.textContent = 'Enquiry Received';
        btn.style.background = '#2a7d5f';
        btn.style.borderColor = '#2a7d5f';

        setTimeout(function () {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.style.borderColor = '';
          btn.disabled = false;
          form.reset();
        }, 4000);
      }, 1600);
    });

    // Clear error on input
    form.querySelectorAll('input, select, textarea').forEach(function (field) {
      field.addEventListener('input', function () {
        this.closest('.form-group').classList.remove('form-group--error');
      });
    });
  }

  /* ─── IMAGE PLACEHOLDER: Subtle parallax on hero ─── */
  const heroImg = document.querySelector('.hero__img');
  if (heroImg && window.innerWidth > 768) {
    window.addEventListener('scroll', function () {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight * 1.5) {
        heroImg.style.transform = 'translateY(' + scrolled * 0.25 + 'px)';
      }
    }, { passive: true });
  }

  /* ─── MARQUEE: Pause on hover ─── */
  const marqueeTrack = document.querySelector('.marquee__track');
  if (marqueeTrack) {
    marqueeTrack.addEventListener('mouseenter', function () {
      marqueeTrack.style.animationPlayState = 'paused';
    });
    marqueeTrack.addEventListener('mouseleave', function () {
      marqueeTrack.style.animationPlayState = 'running';
    });
  }

  /* ─── NUMBER COUNTER ANIMATION ─── */
  function animateCounter (el, target, suffix) {
    const start = 0;
    const duration = 1800;
    const startTime = performance.now();

    function step (currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quart
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(start + (target - start) * eased);
      el.textContent = current.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  // Observe stat numbers
  const statNumbers = document.querySelectorAll('.about__stat strong, .global__metrics div strong');
  const counterObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const el = entry.target;
          const raw = el.textContent.trim();
          const suffix = raw.includes('+') ? '+' : '';
          const num = parseInt(raw.replace(/[^0-9]/g, ''), 10);
          if (!isNaN(num)) {
            animateCounter(el, num, suffix);
          }
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach(function (el) {
    counterObserver.observe(el);
  });

  /* ─── PLACEHOLDER HOVER EFFECT ─── */
  document.querySelectorAll('.img-placeholder').forEach(function (placeholder) {
    placeholder.addEventListener('mouseenter', function () {
      this.style.transition = 'filter 0.4s ease';
      this.style.filter = 'brightness(1.1)';
    });
    placeholder.addEventListener('mouseleave', function () {
      this.style.filter = '';
    });
  });

})();
