(function () {
  'use strict';

  /* ---- NAV SCROLL BEHAVIOUR ---- */
  const nav = document.getElementById('mainNav');
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- HAMBURGER / MOBILE MENU ---- */
  const hamburger = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  let menuOpen = false;

  const toggleMenu = (open) => {
    menuOpen = open;
    mobileMenu.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    mobileMenu.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
    const spans = hamburger.querySelectorAll('span');
    if (open) {
      spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  };

  hamburger.addEventListener('click', () => toggleMenu(!menuOpen));
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  /* ---- SCROLL REVEAL ---- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => revealObs.observe(el));

  /* ---- TEST BAR ANIMATIONS ---- */
  const barObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const width = fill.dataset.width;
        fill.style.width = width + '%';
        barObs.unobserve(fill);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.test-bar__fill').forEach(fill => barObs.observe(fill));

  /* ---- PRODUCT FILTER ---- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      productCards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.style.display = match ? '' : 'none';
      });
    });
  });

  /* ---- SMOOTH ANCHOR NAVIGATION ---- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ---- PARALLAX HERO ---- */
  const heroBg = document.querySelector('.hero__bg');
  const heroHub = document.querySelector('.hero__hub-visual');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      heroBg.style.transform = `translateY(${y * 0.25}px)`;
      if (heroHub) heroHub.style.transform = `translateY(calc(-50% + ${y * 0.12}px))`;
    }, { passive: true });
  }

  /* ---- RFQ FORM ---- */
  const rfqForm = document.getElementById('rfqForm');
  if (rfqForm) {
    rfqForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = rfqForm.querySelector('.form-submit');
      btn.textContent = '✓ Request Submitted — We\'ll contact you within 24 hours';
      btn.style.background = 'var(--c-accent-amber-dim)';
      btn.disabled = true;
    });
  }

  /* ---- COUNTER ANIMATION ---- */
  const counters = document.querySelectorAll('.trust-stat__value');
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;
        const num = parseFloat(text.replace(/[^0-9.]/g, ''));
        if (isNaN(num) || num === 0) return;
        const suffix = text.replace(/[0-9.]/g, '').trim();
        const duration = 1200;
        const steps = 60;
        const step = num / steps;
        let current = 0;
        const interval = setInterval(() => {
          current = Math.min(current + step, num);
          const display = Number.isInteger(num) ? Math.round(current) : current.toFixed(1);
          el.innerHTML = display + suffix;
          if (current >= num) clearInterval(interval);
        }, duration / steps);
        counterObs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObs.observe(c));

})();
