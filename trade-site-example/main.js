    'use strict';

    /* ── Scroll: header shadow & hero animation trigger ── */
    const header = document.getElementById('header');
    const revealEls = document.querySelectorAll('.reveal');

    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    };

    /* ── Intersection Observer for reveal animations ── */
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));

    if (header) {
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    /* ── Search toggle ── */
    const searchToggle = document.getElementById('searchToggle');
    const searchBar    = document.getElementById('searchBar');
    const searchInput  = document.getElementById('searchInput');
    const searchClose  = document.getElementById('searchClose');

    if (searchToggle && searchBar && searchInput && searchClose) {
      searchToggle.addEventListener('click', () => {
        const isOpen = searchBar.classList.toggle('open');
        searchToggle.setAttribute('aria-expanded', isOpen);
        searchBar.setAttribute('aria-hidden', !isOpen);
        if (isOpen) { setTimeout(() => searchInput.focus(), 350); }
      });

      searchClose.addEventListener('click', () => {
        searchBar.classList.remove('open');
        searchToggle.setAttribute('aria-expanded', 'false');
        searchBar.setAttribute('aria-hidden', 'true');
        searchToggle.focus();
      });

      document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && searchBar.classList.contains('open')) {
          searchBar.classList.remove('open');
          searchToggle.setAttribute('aria-expanded', 'false');
          searchBar.setAttribute('aria-hidden', 'true');
          searchToggle.focus();
        }
      });
    }

    /* ── Mobile nav ── */
    const hamburger    = document.getElementById('hamburger');
    const mobileNav    = document.getElementById('mobileNav');
    const mobileClose  = document.getElementById('mobileNavClose');

    if (hamburger && mobileNav && mobileClose) {
      const openMobileNav = () => {
        mobileNav.classList.add('open');
        mobileNav.setAttribute('aria-hidden', 'false');
        hamburger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        mobileClose.focus();
      };
      const closeMobileNav = () => {
        mobileNav.classList.remove('open');
        mobileNav.setAttribute('aria-hidden', 'true');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        hamburger.focus();
      };

      hamburger.addEventListener('click', openMobileNav);
      mobileClose.addEventListener('click', closeMobileNav);

      document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && mobileNav.classList.contains('open')) closeMobileNav();
      });
    }

    /* ── Animated counter for stats ── */
    const counters = document.querySelectorAll('.trust-stat-value');
    if (counters.length) {
      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const rawText = el.textContent;
            const match = rawText.match(/([\d.]+)/);
            if (!match) return;
            const target = parseFloat(match[1]);
            const suffix = rawText.replace(match[1], '').trim();
            const isDecimal = target !== Math.floor(target);
            const duration = 1600;
            const start = performance.now();
            const animate = (now) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = target * eased;
              el.textContent = isDecimal
                ? current.toFixed(1) + suffix
                : Math.floor(current) + suffix;
              if (progress < 1) requestAnimationFrame(animate);
              else el.textContent = rawText;
            };
            requestAnimationFrame(animate);
            counterObserver.unobserve(el);
          }
        });
      }, { threshold: 0.5 });
      counters.forEach(el => counterObserver.observe(el));
    }

    /* ── Trigger hero reveals immediately ── */
    setTimeout(() => {
      document.querySelectorAll('.hero .reveal').forEach(el => el.classList.add('visible'));
    }, 120);

    /* Product detail interactions */
    const productPage = document.querySelector('.product-page');
    if (productPage) {
      const gallery = productPage.querySelector('.product-gallery');
      const galleryImages = gallery ? Array.from(gallery.querySelectorAll('.product-gallery-image')) : [];
      const galleryThumbs = gallery ? Array.from(gallery.querySelectorAll('.product-thumb')) : [];
      const tabNav = productPage.querySelector('.product-tab-nav');
      const tabButtons = tabNav ? Array.from(tabNav.querySelectorAll('.product-tab')) : [];
      const tabPanels = Array.from(productPage.querySelectorAll('.product-tab-panel'));

      const setActiveGallery = (id) => {
        galleryImages.forEach((image) => {
          const isActive = image.dataset.galleryImage === id;
          image.classList.toggle('is-active', isActive);
          image.setAttribute('aria-hidden', String(!isActive));
        });
        galleryThumbs.forEach((thumb) => {
          thumb.classList.toggle('is-active', thumb.dataset.galleryThumb === id);
        });
      };

      galleryThumbs.forEach((thumb) => {
        const target = thumb.dataset.galleryThumb;
        const activate = () => setActiveGallery(target);
        thumb.addEventListener('mouseenter', activate);
        thumb.addEventListener('focus', activate);
        thumb.addEventListener('click', activate);
      });

      const setActiveTab = (targetId) => {
        tabButtons.forEach((button) => {
          const isActive = button.dataset.tabTarget === targetId;
          button.classList.toggle('is-active', isActive);
          button.setAttribute('aria-selected', String(isActive));
        });

        tabPanels.forEach((panel) => {
          const isActive = panel.id === targetId;
          panel.classList.toggle('is-active', isActive);
          panel.hidden = !isActive;
        });
      };

      tabButtons.forEach((button) => {
        button.addEventListener('click', () => setActiveTab(button.dataset.tabTarget));
      });
    }
