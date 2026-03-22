/* ═══════════════════════════════════════════════════════════════
   VERDANT HOUSE — main.js
   Vanilla JS only · No frameworks
═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── NAV: scroll state ──────────────────────────────────── */
  const nav = document.getElementById('nav');

  function updateNav() {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ─── NAV: mobile burger toggle ─────────────────────────── */
  const burger    = document.getElementById('navBurger');
  const mobileNav = document.getElementById('navMobile');

  burger.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Close mobile nav when a link is clicked
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
      burger.setAttribute('aria-expanded', false);
    });
  });

  /* ─── REVEAL ON SCROLL (Intersection Observer) ───────────── */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px'
    }
  );

  revealEls.forEach(el => revealObserver.observe(el));

  /* ─── HERO: staggered entrance (runs on load) ────────────── */
  const heroContent = document.querySelector('.hero__content');
  if (heroContent) {
    // Hero content reveals immediately on load
    requestAnimationFrame(() => {
      setTimeout(() => {
        heroContent.classList.add('visible');
      }, 200);
    });
  }

  /* ─── SMOOTH PARALLAX on hero texture ───────────────────── */
  const heroTexture = document.querySelector('.hero__img-inner .placeholder__texture');

  if (heroTexture && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const limit    = window.innerHeight;
      if (scrolled < limit) {
        heroTexture.style.transform = `translateY(${scrolled * 0.22}px)`;
      }
    }, { passive: true });
  }

  /* ─── MARQUEE: pause on hover ────────────────────────────── */
  const marqueeTrack = document.querySelector('.marquee__track');
  if (marqueeTrack) {
    marqueeTrack.addEventListener('mouseenter', () => {
      marqueeTrack.style.animationPlayState = 'paused';
    });
    marqueeTrack.addEventListener('mouseleave', () => {
      marqueeTrack.style.animationPlayState = 'running';
    });
  }

  /* ─── CONTACT FORM: submit handler ──────────────────────── */
  const submitBtn = document.getElementById('submitBtn');

  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const fields = {
        fname:    document.getElementById('fname'),
        lname:    document.getElementById('lname'),
        email:    document.getElementById('email'),
        company:  document.getElementById('company'),
        interest: document.getElementById('interest'),
      };

      // Simple validation
      let valid = true;

      Object.entries(fields).forEach(([key, el]) => {
        if (!el) return;
        const val = el.value.trim();

        if (!val) {
          valid = false;
          el.style.borderColor = '#c0392b';
          el.addEventListener('input', () => {
            el.style.borderColor = '';
          }, { once: true });
        }
      });

      // Email format check
      if (fields.email && fields.email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.value)) {
        valid = false;
        fields.email.style.borderColor = '#c0392b';
      }

      if (!valid) return;

      // Success state
      submitBtn.textContent  = 'Inquiry Sent ✓';
      submitBtn.style.background = '#3d6b50';
      submitBtn.style.borderColor = '#3d6b50';
      submitBtn.disabled = true;

      // Reset after 4 seconds
      setTimeout(() => {
        submitBtn.textContent  = 'Send Inquiry';
        submitBtn.style.background = '';
        submitBtn.style.borderColor = '';
        submitBtn.disabled = false;

        // Clear form
        ['fname','lname','company','email','interest','message'].forEach(id => {
          const el = document.getElementById(id);
          if (el) el.value = '';
        });
      }, 4000);
    });
  }

  /* ─── IMG FRAMES: hover shimmer effect ───────────────────── */
  const frames = document.querySelectorAll('.img-frame');

  frames.forEach(frame => {
    frame.addEventListener('mouseenter', function () {
      this.style.transition = 'box-shadow 0.4s ease';
      this.style.boxShadow  = '0 12px 48px rgba(26,30,23,0.14)';
    });
    frame.addEventListener('mouseleave', function () {
      this.style.boxShadow = '';
    });
  });

  /* ─── ACTIVE NAV LINK: highlight on scroll ───────────────── */
  const sections   = document.querySelectorAll('section[id]');
  const navLinks   = document.querySelectorAll('.nav__links a');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.style.color = link.getAttribute('href') === `#${id}`
              ? 'rgba(245,240,232,1)'
              : '';
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(s => sectionObserver.observe(s));

  /* ─── CRAFT BLOCKS: stagger number labels ────────────────── */
  // Already handled via CSS reveal delays; no extra JS needed

  /* ─── EXPERIENCE GRID: hover lift ───────────────────────── */
  document.querySelectorAll('.exp-item').forEach(item => {
    item.addEventListener('mouseenter', function () {
      this.querySelector('.exp-item__label').style.color = 'rgba(245,240,232,0.85)';
    });
    item.addEventListener('mouseleave', function () {
      this.querySelector('.exp-item__label').style.color = '';
    });
  });

  /* ─── TEA CARDS: subtle tilt on hover ────────────────────── */
  if (window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) {
    document.querySelectorAll('.tea-card').forEach(card => {
      card.addEventListener('mousemove', function (e) {
        const rect   = this.getBoundingClientRect();
        const cx     = rect.left + rect.width  / 2;
        const cy     = rect.top  + rect.height / 2;
        const dx     = (e.clientX - cx) / (rect.width  / 2);
        const dy     = (e.clientY - cy) / (rect.height / 2);
        const angle  = 3; // max tilt degrees
        this.style.transform = `
          translateY(-8px)
          rotateX(${(-dy * angle).toFixed(2)}deg)
          rotateY(${(dx * angle).toFixed(2)}deg)
        `;
        this.style.transition = 'transform 0.1s linear, box-shadow 0.4s ease';
      });

      card.addEventListener('mouseleave', function () {
        this.style.transform  = '';
        this.style.transition = 'transform 0.5s ease, box-shadow 0.4s ease';
      });
    });
  }

  /* ─── SCROLL PROGRESS: gold line on nav ──────────────────── */
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    height: 2px;
    background: linear-gradient(to right, #3d6b50, #b09060);
    z-index: 9999;
    width: 0%;
    transition: width 0.1s linear;
    pointer-events: none;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop    = window.scrollY;
    const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
    const progress     = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress.toFixed(1) + '%';
  }, { passive: true });

})();
