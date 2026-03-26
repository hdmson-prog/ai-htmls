/* ========================================
   VAULTED — main.js
   Vanilla JS: Cursor · Nav · Scroll Reveal
   Parallax · Testimonial Carousel · Form
   ======================================== */

'use strict';

// ---- UTILITY ----
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

// ---- CUSTOM CURSOR ----
(function initCursor() {
  const cursor = $('#cursor');
  if (!cursor || window.matchMedia('(hover: none)').matches) return;
  const inner = $('.cursor__inner', cursor);

  let mouseX = 0, mouseY = 0;
  let posX = 0, posY = 0;
  let raf;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    const speed = 0.18;
    posX += (mouseX - posX) * speed;
    posY += (mouseY - posY) * speed;
    cursor.style.transform = `translate(${posX}px, ${posY}px)`;
    raf = requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover states
  const hoverEls = 'a, button, [data-hover], .service-card, .case-card, .why__feature, .process-step';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(hoverEls)) {
      cursor.classList.add('cursor--hover');
    }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(hoverEls)) {
      cursor.classList.remove('cursor--hover');
    }
  });
  document.addEventListener('mousedown', () => cursor.classList.add('cursor--click'));
  document.addEventListener('mouseup',   () => cursor.classList.remove('cursor--click'));
  document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; });
})();

// ---- SCROLL REVEAL ----
(function initScrollReveal() {
  const revealEls = $$('.reveal-up, .reveal-left, .reveal-right');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseInt(el.dataset.delay || 0, 10);
        setTimeout(() => {
          el.classList.add('visible');
        }, delay);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));
})();

// ---- HERO ENTRANCE ANIMATION ----
(function initHeroEntrance() {
  const items = $$('.hero__content [data-delay]');
  items.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(32px)';
    el.style.transition = `opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)`;
    const delay = parseInt(el.dataset.delay || 0, 10);
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 400 + delay);
  });
})();

// ---- NAV SCROLL BEHAVIOR ----
(function initNav() {
  const nav = $('#nav');
  if (!nav) return;

  let lastY = 0;
  let ticking = false;

  function updateNav() {
    const y = window.scrollY;
    if (y > 60) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
    lastY = y;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateNav);
      ticking = true;
    }
  }, { passive: true });

  // Mobile menu
  const burger = $('#navBurger');
  const links = $('#navLinks');
  if (burger && links) {
    burger.addEventListener('click', () => {
      const open = links.classList.toggle('nav--open');
      burger.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
      // Animate burger
      const spans = $$('span', burger);
      if (open) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.transform = '';
      }
    });

    // Close on link click
    $$('a', links).forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('nav--open');
        document.body.style.overflow = '';
        const spans = $$('span', burger);
        spans[0].style.transform = '';
        spans[1].style.transform = '';
      });
    });
  }
})();

// ---- PARALLAX ----
(function initParallax() {
  const hero = $('.hero__bg');
  const orbs = $$('.hero__gradient-orb');
  if (!hero) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < window.innerHeight * 1.5) {
          hero.style.transform = `translateY(${y * 0.4}px)`;
          orbs.forEach((orb, i) => {
            const speed = 0.08 + i * 0.04;
            orb.style.transform = `translateY(${y * speed}px)`;
          });
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

// ---- TESTIMONIAL CAROUSEL ----
(function initTestimonials() {
  const track = $('#testimonialTrack');
  const prevBtn = $('#testiPrev');
  const nextBtn = $('#testiNext');
  const dotsContainer = $('#testiDots');
  if (!track) return;

  const cards = $$('.testimonial-card', track);
  let current = 0;
  let autoTimer;

  // Create dots
  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function goTo(idx) {
    current = (idx + cards.length) % cards.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    $$('.testi-dot', dotsContainer).forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(() => goTo(current + 1), 5000);
  }
  function stopAuto() { clearInterval(autoTimer); }

  prevBtn.addEventListener('click', () => { goTo(current - 1); startAuto(); });
  nextBtn.addEventListener('click', () => { goTo(current + 1); startAuto(); });

  // Touch/swipe
  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      goTo(diff > 0 ? current + 1 : current - 1);
      startAuto();
    }
  });

  // Pause on hover
  const carousel = $('#testimonialCarousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', stopAuto);
    carousel.addEventListener('mouseleave', startAuto);
  }

  startAuto();
})();

// ---- PROCESS STEPS — sequential reveal ----
(function initProcessSteps() {
  const steps = $$('.process-step');
  if (!steps.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const allSteps = $$('.process-step');
        allSteps.forEach((step, i) => {
          setTimeout(() => {
            step.style.opacity = '1';
            step.style.transform = 'translateX(0)';
          }, i * 120);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.1 });

  steps.forEach(step => {
    step.style.opacity = '0';
    step.style.transform = 'translateX(20px)';
    step.style.transition = 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1), padding-left 0.4s cubic-bezier(0.16,1,0.3,1)';
  });

  if (steps[0]) observer.observe(steps[0].closest('.process__steps') || steps[0]);
})();

// ---- SERVICES STAGGER ----
(function initServiceCards() {
  const cards = $$('.service-card');
  if (!cards.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        cards.forEach((card, i) => {
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, i * 80);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.05 });

  cards.forEach(card => {
    if (!card.classList.contains('reveal-up')) {
      card.style.opacity = '0';
      card.style.transform = 'translateY(24px)';
      card.style.transition = 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1), background 0.4s, padding-left 0.3s';
    }
  });

  const grid = $('.services__grid');
  if (grid) observer.observe(grid);
})();

// ---- WHY FEATURES STAGGER ----
(function initWhyFeatures() {
  const features = $$('.why__feature');
  if (!features.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        features.forEach((f, i) => {
          setTimeout(() => {
            f.style.opacity = '1';
            f.style.transform = 'translateY(0)';
          }, i * 80);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.05 });

  features.forEach(f => {
    f.style.opacity = '0';
    f.style.transform = 'translateY(20px)';
    f.style.transition = 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1), background 0.4s';
  });

  const grid = $('.why__grid');
  if (grid) observer.observe(grid);
})();

// ---- NUMBER COUNTER ANIMATION ----
(function initCounters() {
  const metrics = $$('.hero__metric-value');
  if (!metrics.length) return;

  const parseValue = str => {
    const num = parseFloat(str.replace(/[^0-9.]/g, ''));
    const suffix = str.replace(/[0-9.]/g, '');
    return { num, suffix };
  };

  const animateCounter = (el, target, suffix, duration = 1600) => {
    const start = performance.now();
    const update = (time) => {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = target * eased;
      const display = target % 1 !== 0
        ? current.toFixed(1)
        : Math.round(current).toString();
      el.textContent = display + suffix;
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        metrics.forEach((el, i) => {
          const original = el.textContent;
          const { num, suffix } = parseValue(original);
          setTimeout(() => animateCounter(el, num, suffix), i * 150);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });

  const metricsSection = $('.hero__metrics');
  if (metricsSection) observer.observe(metricsSection);
})();

// ---- FORM INTERACTIONS ----
(function initForm() {
  const form = $('#contactForm');
  if (!form) return;

  // Floating label illusion via border glow + smooth transitions
  const inputs = $$('input, textarea, select', form);
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });
    input.addEventListener('blur', () => {
      input.parentElement.classList.remove('focused');
    });
  });

  // Submit
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = '<span>Sending...</span>';
    btn.disabled = true;
    btn.style.opacity = '0.7';

    // Simulate send
    setTimeout(() => {
      btn.innerHTML = '<span>Message Sent ✓</span>';
      btn.style.background = '#1a5c2e';
      btn.style.opacity = '1';
      setTimeout(() => {
        btn.innerHTML = original;
        btn.disabled = false;
        btn.style.background = '';
        btn.style.opacity = '';
        form.reset();
      }, 3500);
    }, 1500);
  });
})();

// ---- CASE CARD HOVER DEPTH ----
(function initCaseCards() {
  const cards = $$('.case-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 6;
      card.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg) translateZ(4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1), border-color 0.4s';
    });
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.15s ease, border-color 0.4s';
    });
  });
})();

// ---- SMOOTH ANCHOR SCROLL ----
(function initSmoothScroll() {
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const navH = document.getElementById('nav')?.offsetHeight || 80;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

// ---- SECTION ACTIVE HIGHLIGHT (NAV) ----
(function initActiveNav() {
  const navLinks = $$('.nav__links a[href^="#"]');
  const sections = navLinks
    .map(a => document.getElementById(a.getAttribute('href').slice(1)))
    .filter(Boolean);

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${id}`
            ? 'var(--white)'
            : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(sec => observer.observe(sec));
})();

// ---- PAGE LOAD TRANSITION ----
(function initPageLoad() {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.body.style.opacity = '1';
    }, 100);
  });
})();
