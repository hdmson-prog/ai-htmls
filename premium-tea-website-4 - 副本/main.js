/**
 * MŪSHA TEA — main.js
 * Vanilla JS · Scroll reveals · Nav · Form · Parallax hints
 */

(function () {
  'use strict';

  /* ─── NAVIGATION: SCROLL STATE ─── */
  const nav = document.getElementById('nav');

  function onScroll() {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load

  /* ─── NAVIGATION: MOBILE MENU ─── */
  const menuToggle  = document.getElementById('menuToggle');
  const mobileMenu  = document.getElementById('mobileMenu');
  const closeLinks  = document.querySelectorAll('.nav__close-link');

  function openMenu() {
    mobileMenu.classList.add('open');
    menuToggle.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    menuToggle.classList.remove('active');
    document.body.style.overflow = '';
  }

  menuToggle.addEventListener('click', function () {
    if (mobileMenu.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  closeLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  /* ─── SCROLL REVEAL: INTERSECTION OBSERVER ─── */
  const revealSelectors = '.reveal, .reveal-left, .reveal-right';
  const revealEls = document.querySelectorAll(revealSelectors);

  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // stagger siblings by their index within the same parent
          const siblings = Array.from(
            entry.target.parentElement.querySelectorAll(revealSelectors)
          );
          const idx = siblings.indexOf(entry.target);
          const delay = Math.min(idx * 80, 300); // max 300ms stagger

          setTimeout(function () {
            entry.target.classList.add('visible');
          }, delay);

          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px',
    }
  );

  revealEls.forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ─── LIGHT PARALLAX: HERO FOG ─── */
  const heroSection = document.querySelector('.hero');

  if (heroSection && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    window.addEventListener('scroll', function () {
      const scrolled = window.scrollY;
      const heroH = heroSection.offsetHeight;
      if (scrolled < heroH) {
        const pct = scrolled / heroH;
        const heroImage = heroSection.querySelector('.hero__image');
        if (heroImage) {
          heroImage.style.transform = 'scale(1) translateY(' + (pct * 14) + '%)';
        }
        const heroContent = heroSection.querySelector('.hero__content');
        if (heroContent) {
          heroContent.style.transform = 'translateY(' + (pct * 28) + 'px)';
          heroContent.style.opacity = String(1 - pct * 1.6);
        }
      }
    }, { passive: true });
  }

  /* ─── TEA CARD: SUBTLE IMAGE SCALE ON HOVER ─── */
  const teaCards = document.querySelectorAll('.tea-card');

  teaCards.forEach(function (card) {
    const gradient = card.querySelector('.img-placeholder__gradient');
    if (!gradient) return;

    card.addEventListener('mouseenter', function () {
      gradient.style.transform = 'scale(1.05)';
      gradient.style.transition = 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });

    card.addEventListener('mouseleave', function () {
      gradient.style.transform = 'scale(1)';
    });
  });

  /* ─── CONTACT FORM ─── */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm && formSuccess) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const btn = contactForm.querySelector('.contact__submit');
      const btnText = btn.querySelector('span:first-child');
      btnText.textContent = 'Sending…';
      btn.disabled = true;
      btn.style.opacity = '0.6';

      // Simulate async (replace with real fetch in production)
      setTimeout(function () {
        contactForm.style.opacity = '0';
        contactForm.style.transform = 'translateY(-10px)';
        contactForm.style.transition = 'opacity 0.5s, transform 0.5s';

        setTimeout(function () {
          contactForm.style.display = 'none';
          formSuccess.classList.add('visible');
          formSuccess.style.opacity = '0';
          formSuccess.style.transform = 'translateY(10px)';
          formSuccess.style.transition = 'opacity 0.6s, transform 0.6s';

          requestAnimationFrame(function () {
            requestAnimationFrame(function () {
              formSuccess.style.opacity = '1';
              formSuccess.style.transform = 'translateY(0)';
            });
          });
        }, 500);
      }, 1200);
    });
  }

  /* ─── SECTION TAG: ACTIVE NAV HIGHLIGHT ─── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a');

  const sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            link.style.color = '';
            if (link.getAttribute('href') === '#' + id) {
              link.style.color = 'var(--jade-light)';
            }
          });
        }
      });
    },
    {
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0,
    }
  );

  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });

  /* ─── SMOOTH ANCHOR SCROLL (for older browsers) ─── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ─── CRAFT STEPS: STAGGERED ENTRY ─── */
  const craftSteps = document.querySelectorAll('.craft__step');

  const craftObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translate(0)';
          craftObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  craftSteps.forEach(function (step) {
    craftObserver.observe(step);
  });

  /* ─── GLOBAL MAP DOTS: STAGGERED FADE ─── */
  const mapDots = document.querySelectorAll('.global__dot');

  const mapObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          mapDots.forEach(function (dot, i) {
            setTimeout(function () {
              dot.style.opacity = '0.75';
              dot.style.transform = 'translate(-50%, -50%) scale(1)';
            }, i * 180);
          });
          mapObserver.disconnect();
        }
      });
    },
    { threshold: 0.2 }
  );

  // Initially hide dots
  mapDots.forEach(function (dot) {
    dot.style.opacity = '0';
    dot.style.transform = 'translate(-50%, -50%) scale(0)';
    dot.style.transition = 'opacity 0.5s, transform 0.5s var(--ease-silk)';
  });

  const globalSection = document.querySelector('.global');
  if (globalSection) {
    mapObserver.observe(globalSection);
  }

  /* ─── NUMBERS: COUNT-UP ANIMATION ─── */
  function animateNumber(el, target, suffix, duration) {
    var start = 0;
    var startTime = null;
    var isFloat = target % 1 !== 0;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
      var current = Math.floor(eased * target);

      el.textContent = current + (suffix || '');

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target + (suffix || '');
      }
    }

    requestAnimationFrame(step);
  }

  const dataNumbers = document.querySelectorAll('.data-number');

  const counterObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var text = el.textContent.trim();
          // Preserve the data-unit child
          var unitEl = el.querySelector('.data-unit');
          var numText = text.replace(/[^0-9.]/g, '');
          var num = parseFloat(numText);

          if (!isNaN(num) && num > 1) {
            if (unitEl) {
              var unitHTML = unitEl.outerHTML;
              var suffix = unitEl.textContent;
              var interval = setInterval(function () { }, 0);
              clearInterval(interval);
              var startTime2 = null;
              var duration = 1600;

              function step2(timestamp) {
                if (!startTime2) startTime2 = timestamp;
                var progress = Math.min((timestamp - startTime2) / duration, 1);
                var eased = 1 - Math.pow(1 - progress, 3);
                var current = Math.floor(eased * num);
                el.innerHTML = current + unitHTML;
                if (progress < 1) {
                  requestAnimationFrame(step2);
                } else {
                  el.innerHTML = num + unitHTML;
                }
              }
              requestAnimationFrame(step2);
            }
          }
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  dataNumbers.forEach(function (el) {
    counterObserver.observe(el);
  });

  /* ─── ACCESSIBILITY: FOCUS VISIBLE ─── */
  document.body.addEventListener('mousedown', function () {
    document.body.classList.add('using-mouse');
  });

  document.body.addEventListener('keydown', function () {
    document.body.classList.remove('using-mouse');
  });

  /* ─── INIT COMPLETE ─── */
  document.documentElement.classList.add('js-loaded');

  const goTopButton = document.querySelector('.floating-widget__button--top');

  function updateGoTopButton() {
    if (!goTopButton) return;
    if (window.scrollY > 420) {
      goTopButton.classList.add('is-visible');
    } else {
      goTopButton.classList.remove('is-visible');
    }
  }

  if (goTopButton) {
    window.addEventListener('scroll', updateGoTopButton, { passive: true });
    updateGoTopButton();

    goTopButton.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

})();
