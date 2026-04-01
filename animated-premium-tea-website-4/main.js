/**
 * MUSHA TEA main.js
 * GSAP + ScrollTrigger + Lenis motion layer
 */

(function () {
  'use strict';

  const docEl = document.documentElement;
  const body = document.body;
  const nav = document.getElementById('nav');
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeLinks = document.querySelectorAll('.nav__close-link');
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGSAP = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  const hasLenis = typeof window.Lenis !== 'undefined';

  docEl.classList.add('js-loaded');

  function setActiveSection(id) {
    const navLinks = document.querySelectorAll('.nav__links a');
    navLinks.forEach(function (link) {
      const href = link.getAttribute('href') || '';
      const isCurrent =
        href === '#' + id ||
        href === id + '.html' ||
        href.indexOf(id + '.html#') !== -1;

      link.classList.toggle('is-active', isCurrent);
    });
  }

  function updateNavState() {
    if (!nav) return;
    const scrollY = window.scrollY || docEl.scrollTop || 0;
    nav.classList.toggle('scrolled', scrollY > 40);
  }

  let lenis = null;

  if (hasLenis && !reduceMotion) {
    lenis = new window.Lenis({
      duration: 1.1,
      easing: function (t) {
        return 1 - Math.pow(1 - t, 3);
      },
      smooth: true,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.2,
    });

    lenis.on('scroll', function () {
      updateNavState();
      if (typeof window.ScrollTrigger !== 'undefined') {
        ScrollTrigger.update();
      }
    });
    requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    });
  } else {
    window.addEventListener('scroll', updateNavState, { passive: true });
  }

  updateNavState();

  function scrollToTarget(target, offset) {
    if (!target) return;

    if (lenis && !reduceMotion) {
      lenis.scrollTo(target, {
        offset: offset || 0,
        duration: 1.1,
      });
      return;
    }

    const top = target.getBoundingClientRect().top + window.scrollY - (offset || 0);
    window.scrollTo({ top: top, behavior: 'smooth' });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      scrollToTarget(target, nav ? nav.offsetHeight + 12 : 0);
      closeMobileMenu();
    });
  });

  function openMobileMenu() {
    if (!mobileMenu || !menuToggle) return;
    mobileMenu.classList.add('open');
    menuToggle.classList.add('active');
    body.classList.add('menu-open');
    body.style.overflow = 'hidden';

    if (hasGSAP) {
      gsap.fromTo(
        mobileMenu,
        { autoAlpha: 0, y: -12 },
        { autoAlpha: 1, y: 0, duration: 0.35, ease: 'power2.out' }
      );
    }
  }

  function closeMobileMenu() {
    if (!mobileMenu || !menuToggle) return;
    mobileMenu.classList.remove('open');
    menuToggle.classList.remove('active');
    body.classList.remove('menu-open');
    body.style.overflow = '';
  }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function () {
      if (mobileMenu.classList.contains('open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    closeLinks.forEach(function (link) {
      link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeMobileMenu();
      }
    });
  }

  function animateCount(el) {
    const raw = (el.textContent || '').trim();
    const unit = el.querySelector('.data-unit');
    const unitHTML = unit ? unit.outerHTML : '';
    const numeric = parseFloat(raw.replace(/[^0-9.]/g, ''));

    if (isNaN(numeric)) return;

    const state = { value: 0 };

    gsap.fromTo(
      state,
      { value: 0 },
      {
        value: numeric,
        duration: 1.4,
        ease: 'power3.out',
        onUpdate: function () {
          const current = numeric % 1 === 0 ? Math.round(state.value) : state.value.toFixed(1);
          el.innerHTML = current + unitHTML;
        },
        onComplete: function () {
          const finalValue = numeric % 1 === 0 ? Math.round(numeric) : numeric.toFixed(1);
          el.innerHTML = finalValue + unitHTML;
        },
      }
    );
  }

  function wireHoverLifts() {
    const liftCards = document.querySelectorAll(
      '.tea-card, .product-card, .news-card, .nav__mega-card, .archive-sidebar__panel, .info-panel'
    );

    liftCards.forEach(function (card) {
      if (!hasGSAP || reduceMotion) return;

      card.addEventListener('mouseenter', function () {
        gsap.to(card, { y: -6, duration: 0.35, ease: 'power2.out' });
      });

      card.addEventListener('mouseleave', function () {
        gsap.to(card, { y: 0, duration: 0.45, ease: 'power3.out' });
      });
    });
  }

  function initMotion() {
    if (!hasGSAP) return;

    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.defaults({ markers: false });
    gsap.ticker.lagSmoothing(0);

    const introTargets = [];
    if (nav) introTargets.push(nav);

    const hero = document.querySelector('.hero');
    const heroImage = hero ? hero.querySelector('.hero__image') : null;
    const heroContent = hero ? hero.querySelector('.hero__content') : null;
    const heroHint = hero ? hero.querySelector('.hero__scroll-hint') : null;
    const heroParts = heroContent
      ? heroContent.querySelectorAll('.hero__eyebrow, .hero__headline, .hero__rule, .hero__sub, .hero__cta')
      : [];

    if (heroContent) introTargets.push(heroContent);
    if (heroHint) introTargets.push(heroHint);

    const intro = gsap.timeline({
      defaults: { ease: 'power3.out' },
    });

    if (nav) {
      intro.fromTo(nav, { yPercent: -110, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1 }, 0);
    }

    if (heroImage) {
      gsap.set(heroImage, { scale: 1.12 });
      intro.to(heroImage, { scale: 1, duration: 1.3 }, 0.05);
    }

    if (heroParts.length) {
      intro.fromTo(
        heroParts,
        { y: 26, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.08 },
        0.15
      );
    }

    if (heroHint) {
      intro.fromTo(heroHint, { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7 }, 0.8);
    }

    document.querySelectorAll('.page-banner').forEach(function (banner) {
      const bg = banner.querySelector('.page-banner__bg');
      const content = banner.querySelector('.page-banner__content');
      if (bg && !reduceMotion) {
        gsap.fromTo(
          bg,
          { scale: 1.14, yPercent: -6 },
          {
            scale: 1.02,
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: banner,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      }

      if (content) {
        intro.fromTo(content, { y: 28, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9 }, 0.18);
      }
    });

    const revealTargets = gsap.utils.toArray('.reveal, .reveal-left, .reveal-right');
    revealTargets.forEach(function (el) {
      const isLeft = el.classList.contains('reveal-left');
      const isRight = el.classList.contains('reveal-right');
      const fromX = isLeft ? -56 : isRight ? 56 : 0;
      const fromY = fromX ? 0 : 34;

      gsap.fromTo(
        el,
        { autoAlpha: 0, x: fromX, y: fromY },
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          duration: 0.95,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    const batchGroups = [
      '.teas .tea-card',
      '.product-grid .product-card',
      '.news-grid .news-card',
      '.related-products__grid .product-card',
      '.related-products__grid .news-card',
      '.info-grid .info-panel',
      '.timeline__item',
      '.quality__cert',
      '.archive-sidebar__panel',
      '.global__stat',
      '.craft__step',
    ];

    batchGroups.forEach(function (selector) {
      const nodes = gsap.utils.toArray(selector);
      if (!nodes.length) return;

      ScrollTrigger.batch(nodes, {
        start: 'top 84%',
        interval: 0.12,
        batchMax: 4,
        onEnter: function (batch) {
          gsap.fromTo(
            batch,
            { autoAlpha: 0, y: 40 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              ease: 'power3.out',
              stagger: 0.1,
              overwrite: true,
            }
          );
        },
      });
    });

    const productCards = gsap.utils.toArray('.product-card, .news-card, .tea-card');
    productCards.forEach(function (card) {
      const media = card.querySelector('.product-card__media, .news-card__media, .tea-card__image, .img-placeholder');
      if (!media || reduceMotion) return;

      gsap.to(media, {
        yPercent: -4,
        scale: 1.06,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });

    const heroSection = document.querySelector('.hero');
    if (heroSection && !reduceMotion) {
      const heroFog = heroSection.querySelector('.img-placeholder__fog');
      if (heroImage) {
        gsap.to(heroImage, {
          yPercent: 10,
          scale: 1.08,
          ease: 'none',
          scrollTrigger: {
            trigger: heroSection,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.1,
          },
        });
      }
      if (heroContent) {
        gsap.to(heroContent, {
          yPercent: -18,
          ease: 'none',
          scrollTrigger: {
            trigger: heroSection,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.9,
          },
        });
      }
      if (heroFog) {
        gsap.to(heroFog, {
          xPercent: 8,
          yPercent: 4,
          ease: 'none',
          scrollTrigger: {
            trigger: heroSection,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }
    }

    document.querySelectorAll('.global').forEach(function (section) {
      const dots = section.querySelectorAll('.global__dot');
      if (!dots.length) return;

      gsap.set(dots, { autoAlpha: 0, scale: 0.35, transformOrigin: 'center center' });
      ScrollTrigger.create({
        trigger: section,
        start: 'top 72%',
        once: true,
        onEnter: function () {
          gsap.to(dots, {
            autoAlpha: 0.85,
            scale: 1,
            duration: 0.75,
            stagger: 0.14,
            ease: 'back.out(1.8)',
          });
        },
      });
    });

    document.querySelectorAll('.data-number').forEach(function (el) {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 80%',
        once: true,
        onEnter: function () {
          animateCount(el);
        },
      });
    });

    document.querySelectorAll('section[id]').forEach(function (section) {
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: function () {
          setActiveSection(section.id);
        },
        onEnterBack: function () {
          setActiveSection(section.id);
        },
      });
    });

    const footer = document.querySelector('.footer');
    if (footer) {
      gsap.fromTo(
        footer,
        { autoAlpha: 0, y: 38 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 92%',
          },
        }
      );
    }

    const floatingWidget = document.querySelector('.floating-widget');
    if (floatingWidget) {
      gsap.fromTo(
        floatingWidget,
        { autoAlpha: 0, x: 40 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
          },
        }
      );
    }

    const goTopButton = document.querySelector('.floating-widget__button--top');
    if (goTopButton) {
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: '+=420',
        toggleClass: { targets: goTopButton, className: 'is-visible' },
      });
    }

    const qualitySection = document.querySelector('.quality');
    if (qualitySection) {
      const certs = qualitySection.querySelectorAll('.quality__cert');
      if (certs.length) {
        gsap.fromTo(
          certs,
          { x: -24, autoAlpha: 0 },
          {
            x: 0,
            autoAlpha: 1,
            duration: 0.85,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: qualitySection,
              start: 'top 70%',
            },
          }
        );
      }
    }

    const contactSection = document.querySelector('.contact');
    if (contactSection) {
      gsap.fromTo(
        contactSection.querySelectorAll('.form-field, .contact__submit, .contact__image-caption'),
        { y: 18, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contactSection,
            start: 'top 78%',
          },
        }
      );
    }

    ScrollTrigger.refresh();
  }

  if (hasGSAP && !reduceMotion) {
    initMotion();
  } else {
    revealTargetsFallback();
  }

  function revealTargetsFallback() {
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(function (el) {
      el.classList.add('visible');
    });
    document.querySelectorAll('.data-number').forEach(function (el) {
      const unit = el.querySelector('.data-unit');
      if (!unit) return;
      const raw = (el.textContent || '').trim();
      const numeric = raw.replace(/[^0-9.]/g, '');
      if (numeric) {
        el.innerHTML = numeric + unit.outerHTML;
      }
    });
  }

  wireHoverLifts();

  if (contactForm && formSuccess) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const btn = contactForm.querySelector('.contact__submit');
      const btnText = btn ? btn.querySelector('span:first-child') : null;

      if (btnText) btnText.textContent = 'Sending...';
      if (btn) btn.disabled = true;

      if (hasGSAP) {
        gsap.timeline()
          .to(contactForm, { autoAlpha: 0, y: -12, duration: 0.45, ease: 'power2.out' })
          .set(contactForm, { display: 'none' })
          .set(formSuccess, { display: 'flex', autoAlpha: 0, y: 12 })
          .to(formSuccess, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' });
      } else {
        contactForm.style.display = 'none';
        formSuccess.style.display = 'flex';
      }
    });
  }

  if (lenis && !reduceMotion) {
    window.addEventListener('hashchange', function () {
      const target = document.querySelector(window.location.hash);
      if (target) {
        scrollToTarget(target, nav ? nav.offsetHeight + 12 : 0);
      }
    });
  }

  if (window.location.hash) {
    const hashTarget = document.querySelector(window.location.hash);
    if (hashTarget) {
      setTimeout(function () {
        scrollToTarget(hashTarget, nav ? nav.offsetHeight + 12 : 0);
      }, 0);
    }
  }
})();
