/* ════════════════════════════════════════
   VOID Studio — main.js
   Vanilla JS | No frameworks
════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── CUSTOM CURSOR ─── */
  const cursor = document.getElementById('cursor');
  const cursorFollower = document.getElementById('cursorFollower');
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hover state
  const hoverTargets = document.querySelectorAll('a, button, .work-card, .service-card, .logo-placeholder, .testi-card, .process-step');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  /* ─── NAV SCROLL ─── */
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });

  /* ─── MOBILE MENU ─── */
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  let menuOpen = false;

  navToggle.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle('open', menuOpen);
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    // animate spans
    const spans = navToggle.querySelectorAll('span');
    if (menuOpen) {
      spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
      spans[1].style.transform = 'translateY(-6.5px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.transform = '';
    }
  });

  // Close on mobile link click
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      menuOpen = false;
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
      const spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.transform = '';
    });
  });

  /* ─── SCROLL REVEAL ─── */
  const revealEls = document.querySelectorAll('.reveal, .cs-label');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Stagger siblings
        const siblings = entry.target.parentElement.querySelectorAll('.reveal');
        siblings.forEach((sib, i) => {
          if (!sib.classList.contains('visible')) {
            setTimeout(() => sib.classList.add('visible'), i * 80);
          }
        });
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ─── HERO HEADLINE ANIMATION ─── */
  const heroLines = document.querySelectorAll('.hero-headline .line');
  heroLines.forEach((line, i) => {
    line.style.opacity = '0';
    line.style.transform = 'translateY(40px)';
    line.style.transition = `opacity .9s cubic-bezier(0.16,1,0.3,1) ${i * 0.15 + 0.2}s, transform .9s cubic-bezier(0.16,1,0.3,1) ${i * 0.15 + 0.2}s`;
    setTimeout(() => {
      line.style.opacity = '1';
      line.style.transform = 'translateY(0)';
    }, 100);
  });

  /* ─── TICKER PAUSE ON HOVER ─── */
  const ticker = document.querySelector('.ticker-track');
  if (ticker) {
    ticker.addEventListener('mouseenter', () => {
      ticker.style.animationPlayState = 'paused';
    });
    ticker.addEventListener('mouseleave', () => {
      ticker.style.animationPlayState = 'running';
    });
  }

  /* ─── WORK CARD INDEX STAGGER ─── */
  const workCards = document.querySelectorAll('.work-card');
  const workObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = parseInt(entry.target.dataset.index || '1');
        entry.target.style.transitionDelay = `${(idx - 1) * 0.1}s`;
        workObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  workCards.forEach(card => workObserver.observe(card));

  /* ─── SMOOTH SCROLL FOR ANCHOR LINKS ─── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ─── PROCESS STEP HOVER HIGHLIGHT ─── */
  const processSteps = document.querySelectorAll('.process-step');
  processSteps.forEach((step) => {
    step.addEventListener('mouseenter', () => {
      processSteps.forEach(s => {
        if (s !== step) s.style.opacity = '0.5';
      });
    });
    step.addEventListener('mouseleave', () => {
      processSteps.forEach(s => { s.style.opacity = ''; });
    });
  });

  /* ─── PARALLAX HERO VISUAL ─── */
  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual && window.innerWidth > 900) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      heroVisual.style.transform = `translateY(${scrolled * 0.15}px)`;
    }, { passive: true });
  }

  /* ─── STAT COUNTER ANIMATION ─── */
  function animateCounter(el, target, suffix, duration) {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        el.textContent = target + suffix;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(start) + suffix;
      }
    }, 16);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNums = entry.target.querySelectorAll('.stat-num');
        statNums.forEach(num => {
          const text = num.textContent;
          const match = text.match(/(\d+)(\S*)/);
          if (match) {
            animateCounter(num, parseInt(match[1]), match[2], 1200);
          }
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) statsObserver.observe(heroStats);

  /* ─── SERVICE CARD GLOW ─── */
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', x + '%');
      card.style.setProperty('--mouse-y', y + '%');
    });
  });

  /* ─── TESTIMONIAL CARD HOVER TILT ─── */
  const testiCards = document.querySelectorAll('.testi-card');
  testiCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-4px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ─── CTA SECTION MOUSE PARALLAX ─── */
  const ctaSection = document.querySelector('.cta-section');
  if (ctaSection) {
    ctaSection.addEventListener('mousemove', (e) => {
      const rect = ctaSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const a1 = ctaSection.querySelector('.cta-abstract-1');
      const a2 = ctaSection.querySelector('.cta-abstract-2');
      const a3 = ctaSection.querySelector('.cta-abstract-3');
      if (a1) a1.style.transform = `translate(calc(-50% + ${x * 30}px), calc(-50% + ${y * 30}px))`;
      if (a2) a2.style.transform = `translate(${x * -20}px, ${y * -20}px)`;
      if (a3) a3.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
    });
  }

  /* ─── WORK CARD MOUSE TRACK ─── */
  workCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.querySelector('.work-card-img').style.transform = `scale(1.02) rotateX(${-y * 2}deg) rotateY(${x * 2}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.querySelector('.work-card-img').style.transform = '';
    });
  });

  /* ─── PAGE LOAD ANIMATION ─── */
  document.documentElement.style.opacity = '0';
  document.documentElement.style.transition = 'opacity .5s ease';
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.documentElement.style.opacity = '1';
    }, 50);
  });

  /* ─── ACTIVE NAV LINK ─── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.style.color = 'var(--white)';
          }
        });
      }
    });
  }, { rootMargin: '-50% 0px -50% 0px' });

  sections.forEach(section => activeObserver.observe(section));

})();
