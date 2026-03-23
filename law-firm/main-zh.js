/* ═══════════════════════════════════════════════════════════
   奥尔德顿·维尔 — main-zh.js
   Chinese version with localised UI strings
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── NAV: Scroll state ─── */
  const nav = document.getElementById('nav');

  function updateNav () {
    nav.classList.toggle('scrolled', window.scrollY > 60);
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

  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      burger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

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
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ─── Hero immediate reveal ─── */
  const heroContent = document.querySelector('.hero__content');
  if (heroContent) {
    setTimeout(function () { heroContent.classList.add('is-visible'); }, 200);
  }

  /* ─── Staggered card reveals ─── */
  document.querySelectorAll('.practice-card').forEach(function (card, i) {
    card.style.transitionDelay = (i * 0.08) + 's';
  });
  document.querySelectorAll('.team-card').forEach(function (card, i) {
    card.style.transitionDelay = (i * 0.07) + 's';
  });

  /* ─── Smooth anchor scroll ─── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - (nav ? nav.offsetHeight : 0);
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ─── Active nav link tracking ─── */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');

  function setActiveNavLink () {
    let current = '';
    const scrollY = window.scrollY + window.innerHeight * 0.4;
    sections.forEach(function (s) {
      if (s.offsetTop <= scrollY) current = s.getAttribute('id');
    });
    navAnchors.forEach(function (link) {
      link.classList.toggle('nav__link--active', link.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', setActiveNavLink, { passive: true });
  setActiveNavLink();

  /* ─── FORM: Submit handler with Chinese messages ─── */
  const form = document.querySelector('.contact__form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      let valid = true;

      form.querySelectorAll('input[type="text"], input[type="email"], select, textarea').forEach(function (field) {
        const group = field.closest('.form-group');
        group.classList.remove('form-group--error');
        if (!field.value.trim()) {
          group.classList.add('form-group--error');
          valid = false;
        }
      });

      const emailField = form.querySelector('input[type="email"]');
      if (emailField && emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
        emailField.closest('.form-group').classList.add('form-group--error');
        valid = false;
      }

      if (!valid) return;

      btn.disabled = true;
      btn.textContent = '正在提交……';

      setTimeout(function () {
        btn.textContent = '申请已收到，我们将尽快与您联系';
        btn.style.background = '#2a7d5f';
        btn.style.borderColor = '#2a7d5f';
        btn.style.fontSize = '0.75rem';

        setTimeout(function () {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.style.borderColor = '';
          btn.style.fontSize = '';
          btn.disabled = false;
          form.reset();
        }, 5000);
      }, 1600);
    });

    form.querySelectorAll('input, select, textarea').forEach(function (field) {
      field.addEventListener('input', function () {
        this.closest('.form-group').classList.remove('form-group--error');
      });
    });
  }

  /* ─── Hero parallax ─── */
  const heroImg = document.querySelector('.hero__img');
  if (heroImg && window.innerWidth > 768) {
    window.addEventListener('scroll', function () {
      if (window.scrollY < window.innerHeight * 1.5) {
        heroImg.style.transform = 'translateY(' + window.scrollY * 0.25 + 'px)';
      }
    }, { passive: true });
  }

  /* ─── Marquee pause on hover ─── */
  const marqueeTrack = document.querySelector('.marquee__track');
  if (marqueeTrack) {
    marqueeTrack.addEventListener('mouseenter', function () {
      this.style.animationPlayState = 'paused';
    });
    marqueeTrack.addEventListener('mouseleave', function () {
      this.style.animationPlayState = 'running';
    });
  }

  /* ─── Number counter animation ─── */
  function animateCounter (el, target, suffix) {
    const duration = 1800;
    const startTime = performance.now();
    function step (now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      el.textContent = Math.round(target * eased).toLocaleString('zh-CN') + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const statNumbers = document.querySelectorAll('.about__stat strong, .global__metrics div strong');
  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const el = entry.target;
            const raw = el.textContent.trim();
            const suffix = raw.includes('+') ? '+' : '';
            const num = parseInt(raw.replace(/[^0-9]/g, ''), 10);
            if (!isNaN(num)) animateCounter(el, num, suffix);
            counterObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );
    statNumbers.forEach(function (el) { counterObserver.observe(el); });
  }

  /* ─── Placeholder hover ─── */
  document.querySelectorAll('.img-placeholder').forEach(function (p) {
    p.addEventListener('mouseenter', function () {
      this.style.transition = 'filter 0.4s ease';
      this.style.filter = 'brightness(1.1)';
    });
    p.addEventListener('mouseleave', function () {
      this.style.filter = '';
    });
  });

})();
