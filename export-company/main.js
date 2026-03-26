/**
 * NEXFOR Industrial — main.js
 * Vanilla JS: Scroll reveals, parallax, nav behavior, form, animations
 */

'use strict';

/* ═══════════════════════════════════════════════════════════
   UTILITIES
   ═══════════════════════════════════════════════════════════ */
const qs  = (sel, ctx = document) => ctx.querySelector(sel);
const qsa = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

const onReady = fn => {
  if (document.readyState !== 'loading') fn();
  else document.addEventListener('DOMContentLoaded', fn);
};

/* ═══════════════════════════════════════════════════════════
   SCROLL REVEAL — IntersectionObserver
   ═══════════════════════════════════════════════════════════ */
function initScrollReveal() {
  const items = qsa('.reveal-up, .reveal-left, .reveal-right, .reveal-stagger');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  items.forEach(el => observer.observe(el));
}

/* ═══════════════════════════════════════════════════════════
   HERO STAGGER — fires on load
   ═══════════════════════════════════════════════════════════ */
function initHeroStagger() {
  const staggerItems = qsa('.hero .reveal-stagger');
  staggerItems.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, 200 + i * 120);
  });
}

/* ═══════════════════════════════════════════════════════════
   STICKY NAV
   ═══════════════════════════════════════════════════════════ */
function initStickyNav() {
  const header = qs('#site-header');
  if (!header) return;

  let lastScrollY = 0;
  let ticking = false;

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const y = window.scrollY;
        header.classList.toggle('scrolled', y > 40);
        lastScrollY = y;
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ═══════════════════════════════════════════════════════════
   MOBILE NAV
   ═══════════════════════════════════════════════════════════ */
function initMobileNav() {
  const btn = qs('#nav-hamburger');
  const header = qs('#site-header');
  if (!btn || !header) return;

  let open = false;

  // Create mobile menu overlay
  const overlay = document.createElement('div');
  overlay.className = 'mobile-nav-overlay';
  overlay.innerHTML = `
    <nav class="mobile-nav">
      <ul>
        <li><a href="#about">Company</a></li>
        <li><a href="#products">Products</a></li>
        <li><a href="#capabilities">Capabilities</a></li>
        <li><a href="#industries">Industries</a></li>
        <li><a href="#quality">Quality</a></li>
        <li><a href="#network">Global Network</a></li>
      </ul>
      <a href="#contact" class="mobile-nav-cta">Request a Quote</a>
    </nav>
  `;

  // Inject mobile nav styles
  const style = document.createElement('style');
  style.textContent = `
    .mobile-nav-overlay {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 999;
      background: rgba(13,14,16,0.97);
      backdrop-filter: blur(20px);
      align-items: center;
      justify-content: center;
      flex-direction: column;
      opacity: 0;
      transition: opacity 0.3s;
    }
    .mobile-nav-overlay.open {
      display: flex;
      opacity: 1;
    }
    .mobile-nav ul {
      list-style: none;
      text-align: center;
      margin: 0;
      padding: 0;
    }
    .mobile-nav ul li {
      margin: 1.2rem 0;
    }
    .mobile-nav ul a {
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 2rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #eef0f4;
      text-decoration: none;
      transition: color 0.2s;
    }
    .mobile-nav ul a:hover { color: #1e6bff; }
    .mobile-nav-cta {
      display: inline-block;
      margin-top: 2rem;
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 0.9rem;
      font-weight: 600;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: #fff;
      background: #1e6bff;
      padding: 0.85rem 2.5rem;
      text-decoration: none;
      clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%);
      transition: background 0.2s;
    }
    .mobile-nav-cta:hover { background: #1558d6; }
    .site-header.nav-open .nav-hamburger span:nth-child(1) {
      transform: translateY(7px) rotate(45deg);
    }
    .site-header.nav-open .nav-hamburger span:nth-child(2) {
      opacity: 0;
    }
    .site-header.nav-open .nav-hamburger span:nth-child(3) {
      transform: translateY(-7px) rotate(-45deg);
    }
    .nav-hamburger span { transition: all 0.3s; }
  `;
  document.head.appendChild(style);
  document.body.appendChild(overlay);

  const toggle = () => {
    open = !open;
    header.classList.toggle('nav-open', open);
    overlay.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };

  btn.addEventListener('click', toggle);

  // Close on link click
  qsa('a', overlay).forEach(a => {
    a.addEventListener('click', () => {
      if (open) toggle();
    });
  });

  // Close on ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && open) toggle();
  });
}

/* ═══════════════════════════════════════════════════════════
   SMOOTH SCROLL — offset for fixed nav
   ═══════════════════════════════════════════════════════════ */
function initSmoothScroll() {
  const NAV_HEIGHT = 80;

  qsa('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = qs(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ═══════════════════════════════════════════════════════════
   PARALLAX — hero only (performance-safe)
   ═══════════════════════════════════════════════════════════ */
function initParallax() {
  const heroMedia = qs('.hero-media');
  if (!heroMedia) return;

  let ticking = false;
  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < window.innerHeight) {
          heroMedia.style.transform = `translateY(${y * 0.35}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ═══════════════════════════════════════════════════════════
   COUNTER ANIMATION — stats
   ═══════════════════════════════════════════════════════════ */
function initCounters() {
  const counterEls = qsa('.stat-num, .metric-val, .nm-val, .badge-num');

  const parseVal = str => {
    const num = parseFloat(str.replace(/[^0-9.]/g, ''));
    const suffix = str.replace(/[0-9.,]/g, '').trim();
    return { num, suffix };
  };

  const animateCounter = (el, target, suffix, duration = 1600) => {
    const start = performance.now();
    const isFloat = target % 1 !== 0;

    const step = now => {
      const elapsed = now - start;
      const progress = clamp(elapsed / duration, 0, 1);
      // Easing: ease-out-expo
      const ease = 1 - Math.pow(2, -10 * progress);
      const current = target * ease;
      el.textContent = (isFloat ? current.toFixed(1) : Math.round(current)) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        if (el.dataset.counted) return;
        el.dataset.counted = '1';

        const text = el.textContent;
        if (!text || !text.match(/\d/)) return;

        const { num, suffix } = parseVal(text);
        if (isNaN(num)) return;

        animateCounter(el, num, suffix);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counterEls.forEach(el => observer.observe(el));
}

/* ═══════════════════════════════════════════════════════════
   PRODUCT CARD HOVER — subtle 3D tilt
   ═══════════════════════════════════════════════════════════ */
function initCardTilt() {
  const cards = qsa('.product-card, .industry-tile, .quality-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const rotX = clamp(y * -6, -4, 4);
      const rotY = clamp(x * 6, -4, 4);
      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-3px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ═══════════════════════════════════════════════════════════
   TICKER — ensure seamless loop
   ═══════════════════════════════════════════════════════════ */
function initTicker() {
  const track = qs('.ticker-track');
  if (!track) return;
  // CSS handles the animation, just ensure content is wide enough
  // Already duplicated in HTML for seamless looping
}

/* ═══════════════════════════════════════════════════════════
   ACTIVE NAV HIGHLIGHT — scroll spy
   ═══════════════════════════════════════════════════════════ */
function initScrollSpy() {
  const sections = qsa('section[id]');
  const navLinks = qsa('.nav-links a');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-80px 0px -60% 0px'
  });

  sections.forEach(s => observer.observe(s));

  // Inject active link style
  const style = document.createElement('style');
  style.textContent = `.nav-links a.active { color: #eef0f4; }`;
  document.head.appendChild(style);
}

/* ═══════════════════════════════════════════════════════════
   RFQ FORM HANDLING
   ═══════════════════════════════════════════════════════════ */
function initForm() {
  const form = qs('#rfq-form');
  const success = qs('#form-success');
  const submitBtn = qs('#submit-btn');
  if (!form) return;

  // Input focus effects
  qsa('.form-group input, .form-group select, .form-group textarea').forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });
    input.addEventListener('blur', () => {
      input.parentElement.classList.remove('focused');
      if (input.value) input.parentElement.classList.add('has-value');
      else input.parentElement.classList.remove('has-value');
    });
  });

  // Form submission (demo — no actual server call)
  form.addEventListener('submit', async e => {
    e.preventDefault();

    // Basic validation
    const required = qsa('[required]', form);
    let valid = true;
    required.forEach(field => {
      if (!field.value.trim()) {
        field.style.borderColor = '#ef4444';
        valid = false;
        field.addEventListener('input', () => {
          field.style.borderColor = '';
        }, { once: true });
      }
    });

    if (!valid) {
      // Shake animation
      form.style.animation = 'shake 0.4s ease';
      setTimeout(() => form.style.animation = '', 400);
      return;
    }

    // Loading state
    submitBtn.disabled = true;
    const btnText = qs('.btn-text', submitBtn);
    const btnTextOriginal = btnText.textContent;
    btnText.textContent = 'Sending…';

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Success state
    form.hidden = true;
    success.hidden = false;

    // Add shake animation to document
    if (!document.querySelector('#shake-style')) {
      const s = document.createElement('style');
      s.id = 'shake-style';
      s.textContent = `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-8px); }
          40%       { transform: translateX(8px); }
          60%       { transform: translateX(-5px); }
          80%       { transform: translateX(5px); }
        }
      `;
      document.head.appendChild(s);
    }
  });
}

/* ═══════════════════════════════════════════════════════════
   CAPABILITY BLOCKS — enhanced parallax on scroll
   ═══════════════════════════════════════════════════════════ */
function initCapabilityParallax() {
  const caps = qsa('.cap-placeholder');
  if (!caps.length) return;

  const onScroll = () => {
    caps.forEach(cap => {
      const rect = cap.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      const offset = clamp(center * 0.08, -20, 20);
      cap.style.transform = `translateY(${offset}px)`;
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ═══════════════════════════════════════════════════════════
   MAP DOT INTERACTION
   ═══════════════════════════════════════════════════════════ */
function initMapInteraction() {
  const mapDots = qsa('.map-dot');
  const mapRegions = qsa('.map-region');

  mapRegions.forEach(region => {
    region.style.cursor = 'pointer';
    region.addEventListener('mouseenter', () => {
      region.style.fill = 'rgba(30, 107, 255, 0.4)';
    });
    region.addEventListener('mouseleave', () => {
      region.style.fill = '';
    });
  });
}

/* ═══════════════════════════════════════════════════════════
   PLACEHOLDER HOVER RIPPLE EFFECT
   ═══════════════════════════════════════════════════════════ */
function initPlaceholderEffects() {
  const placeholders = qsa('.img-placeholder');

  placeholders.forEach(ph => {
    ph.addEventListener('mouseenter', () => {
      ph.style.backgroundPosition = '100% 100%';
    });
    ph.addEventListener('mouseleave', () => {
      ph.style.backgroundPosition = '';
    });
  });
}

/* ═══════════════════════════════════════════════════════════
   PROGRESS LINE — thin top indicator
   ═══════════════════════════════════════════════════════════ */
function initScrollProgress() {
  const bar = document.createElement('div');
  bar.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    height: 2px;
    background: #1e6bff;
    z-index: 2000;
    transform-origin: left;
    transform: scaleX(0);
    transition: transform 0.1s linear;
    pointer-events: none;
  `;
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const progress = total > 0 ? window.scrollY / total : 0;
    bar.style.transform = `scaleX(${progress})`;
  }, { passive: true });
}

/* ═══════════════════════════════════════════════════════════
   WHY ITEMS — stagger on scroll into view
   ═══════════════════════════════════════════════════════════ */
function initWhyItemsReveal() {
  const items = qsa('.why-item');

  const style = document.createElement('style');
  style.textContent = `
    .why-item {
      opacity: 0;
      transform: translateX(30px);
      transition: opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1);
    }
    .why-item.visible {
      opacity: 1;
      transform: translateX(0);
    }
  `;
  document.head.appendChild(style);

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const siblings = qsa('.why-item', entry.target.closest('.why-items'));
        siblings.forEach((item, i) => {
          setTimeout(() => item.classList.add('visible'), i * 80);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  if (items.length) observer.observe(items[0]);
}

/* ═══════════════════════════════════════════════════════════
   QUALITY PROCESS — step-by-step reveal
   ═══════════════════════════════════════════════════════════ */
function initQualityProcess() {
  const steps = qsa('.qp-step');
  const arrows = qsa('.qp-arrow');

  const allEls = [];
  steps.forEach((step, i) => {
    allEls.push(step);
    if (arrows[i]) allEls.push(arrows[i]);
  });

  const style = document.createElement('style');
  style.textContent = `
    .qp-step, .qp-arrow {
      opacity: 0;
      transform: translateX(-15px);
      transition: opacity 0.5s ease, transform 0.5s ease;
    }
    .qp-step.visible, .qp-arrow.visible {
      opacity: 1;
      transform: translateX(0);
    }
  `;
  document.head.appendChild(style);

  const processEl = qs('.quality-process');
  if (!processEl) return;

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      allEls.forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 80);
      });
      observer.unobserve(processEl);
    }
  }, { threshold: 0.3 });

  observer.observe(processEl);
}

/* ═══════════════════════════════════════════════════════════
   NETWORK REGIONS — bar fill animation
   ═══════════════════════════════════════════════════════════ */
function initNetworkBars() {
  const regions = qsa('.network-region');

  // Inject bar styles
  const style = document.createElement('style');
  style.textContent = `
    .network-region {
      position: relative;
    }
    .network-region::after {
      content: '';
      position: absolute;
      left: 0; bottom: 0;
      height: 1px;
      width: 0%;
      background: rgba(30,107,255,0.4);
      transition: width 1s cubic-bezier(0.16,1,0.3,1);
    }
    .network-region.bar-animated::after {
      width: var(--bar-width, 0%);
    }
  `;
  document.head.appendChild(style);

  const percents = ['32%','28%','18%','12%','10%'];
  regions.forEach((r, i) => {
    r.style.setProperty('--bar-width', percents[i] || '0%');
  });

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      regions.forEach((r, i) => {
        setTimeout(() => r.classList.add('bar-animated'), i * 120);
      });
      observer.unobserve(entries[0].target);
    }
  }, { threshold: 0.3 });

  const networkSection = qs('.network');
  if (networkSection) observer.observe(networkSection);
}

/* ═══════════════════════════════════════════════════════════
   INITIALIZATION
   ═══════════════════════════════════════════════════════════ */
onReady(() => {
  initStickyNav();
  initMobileNav();
  initSmoothScroll();
  initScrollReveal();
  initHeroStagger();
  initParallax();
  initCounters();
  initCardTilt();
  initTicker();
  initScrollSpy();
  initForm();
  initCapabilityParallax();
  initMapInteraction();
  initPlaceholderEffects();
  initScrollProgress();
  initWhyItemsReveal();
  initQualityProcess();
  initNetworkBars();
});
