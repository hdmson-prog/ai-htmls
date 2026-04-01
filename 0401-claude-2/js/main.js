    // ============================================================
    // CUSTOM CURSOR
    // ============================================================
    const cursor = document.getElementById('cursor');
    const cursorRing = document.getElementById('cursor-ring');
    let cx = window.innerWidth / 2, cy = window.innerHeight / 2;
    let rx = cx, ry = cy;

    document.addEventListener('mousemove', (e) => {
      cx = e.clientX; cy = e.clientY;
      gsap.to(cursor, { x: cx, y: cy, duration: 0.1, ease: 'none' });
    });

    function animateRing() {
      rx += (cx - rx) * 0.1;
      ry += (cy - ry) * 0.1;
      gsap.set(cursorRing, { x: rx, y: ry });
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // ============================================================
    // SCROLL PROGRESS BAR
    // ============================================================
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        gsap.set('#progress-bar', { width: (self.progress * 100) + '%' });
      }
    });

    // ============================================================
    // LENIS SMOOTH SCROLL
    // ============================================================
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
    });

    function lenisRaf(time) {
      lenis.raf(time);
      requestAnimationFrame(lenisRaf);
    }
    requestAnimationFrame(lenisRaf);

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    // ============================================================
    // REGISTER SCROLLTRIGGER
    // ============================================================
    gsap.registerPlugin(ScrollTrigger);

    // ============================================================
    // SCENE 1 — HERO CINEMATIC INTRO
    // Entry animations
    // ============================================================
    const heroTL = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTL
      .to('#hero-eyebrow', { opacity: 1, y: 0, duration: 1.2 }, 0.3)
      .to('#hero-title', { opacity: 1, y: 0, duration: 1.4 }, 0.5)
      .to('#hero-sub', { opacity: 1, duration: 1.2 }, 0.9)
      .to('#hero-scroll-ind', { opacity: 1, duration: 1 }, 1.2)
      .to('#hero-scroll-bar', { opacity: 1, duration: 0.8 }, 1.2)
      .to('#hero-stats', { opacity: 1, duration: 1 }, 1.0);

    // Hero pinned scroll animation
    const heroPinTL = gsap.timeline({
      scrollTrigger: {
        trigger: '#scene-hero',
        start: 'top top',
        end: '+=2000',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    });

    heroPinTL
      // Product slow zoom out from center
      .fromTo('#hero-product', { scale: 1.05, rotation: 0 }, { scale: 0.9, rotation: 8, ease: 'none' }, 0)
      // Rings expand with scroll
      .fromTo('#hero-ring-outer', { scale: 1 }, { scale: 1.15, ease: 'none' }, 0)
      .fromTo('#hero-ring-mid', { scale: 1 }, { scale: 1.2, ease: 'none' }, 0)
      .fromTo('#hero-ring-inner', { scale: 1 }, { scale: 1.25, ease: 'none' }, 0)
      // Parallax background shift
      .fromTo('#hero-bg-layer', { y: 0 }, { y: -80, ease: 'none' }, 0)
      // Content fades and shifts left
      .to('.hero-content', { x: -40, opacity: 0, ease: 'none', duration: 0.4 }, 0.5)
      .to('.hero-stats', { y: 30, opacity: 0, ease: 'none', duration: 0.3 }, 0.6)
      .to('#hero-scroll-ind', { y: 20, opacity: 0, ease: 'none', duration: 0.3 }, 0.6);

    // ============================================================
    // SCENE 2 — BRAND STORY REVEAL
    // ============================================================
    const storyTL = gsap.timeline({
      scrollTrigger: {
        trigger: '#scene-story',
        start: 'top 75%',
        end: 'center 40%',
        scrub: 0.8,
      }
    });

    storyTL
      .to('#story-num', { opacity: 1, x: 0, duration: 0.4, ease: 'none' }, 0)
      .to('#story-line1', { y: 0, opacity: 1, duration: 0.5, ease: 'none' }, 0.1)
      .to('#story-line2', { y: 0, opacity: 1, duration: 0.5, ease: 'none' }, 0.25)
      .to('#story-line3', { y: 0, opacity: 1, duration: 0.5, ease: 'none' }, 0.4)
      .to('#story-rule', { width: '80px', duration: 0.3, ease: 'none' }, 0.55)
      .to('#story-body', { opacity: 1, y: 0, duration: 0.4, ease: 'none' }, 0.65)
      // Clip-path reveal of right image
      .to('#story-img-wrap', { clipPath: 'inset(0 0% 0 0)', duration: 0.7, ease: 'none' }, 0.1)
      // Subtle parallax on image
      .fromTo('#story-img-inner', { y: '5%' }, { y: '-5%', ease: 'none', duration: 1 }, 0);

    // ============================================================
    // SCENE 3 — ABOUT US
    // ============================================================
    const aboutTL = gsap.timeline({
      scrollTrigger: {
        trigger: '#scene-about',
        start: 'top 75%',
        end: 'center 30%',
        scrub: 0.8,
      }
    });

    aboutTL
      .to('#about-eyebrow', { opacity: 1, y: 0, ease: 'none', duration: 0.3 }, 0)
      .to('#about-l1', { y: 0, opacity: 1, ease: 'none', duration: 0.4 }, 0.1)
      .to('#about-l2', { y: 0, opacity: 1, ease: 'none', duration: 0.4 }, 0.22)
      .to('#about-l3', { y: 0, opacity: 1, ease: 'none', duration: 0.4 }, 0.34)
      .to('#about-p1', { opacity: 1, y: 0, ease: 'none', duration: 0.4 }, 0.48)
      .to('#about-p2', { opacity: 1, y: 0, ease: 'none', duration: 0.4 }, 0.6)
      // Parallax on right image
      .fromTo('#about-img', { scale: 1.08, y: '3%' }, { scale: 1, y: '-3%', ease: 'none', duration: 1 }, 0);

    // ============================================================
    // SCENE 4 — PRODUCT CATEGORIES
    // ============================================================
    const catTL = gsap.timeline({
      scrollTrigger: {
        trigger: '#scene-categories',
        start: 'top 80%',
        end: 'center 40%',
        scrub: 0.8,
      }
    });

    catTL
      .to('#cat-eyebrow', { opacity: 1, y: 0, ease: 'none', duration: 0.3 }, 0)
      .to('#cat-title', { opacity: 1, y: 0, ease: 'none', duration: 0.4 }, 0.1)
      .to('#cat-view-all', { opacity: 1, ease: 'none', duration: 0.3 }, 0.2)
      // Staggered card reveal
      .to('#cat-1', { opacity: 1, y: 0, scale: 1, ease: 'none', duration: 0.4 }, 0.28)
      .to('#cat-2', { opacity: 1, y: 0, scale: 1, ease: 'none', duration: 0.4 }, 0.42)
      .to('#cat-3', { opacity: 1, y: 0, scale: 1, ease: 'none', duration: 0.4 }, 0.56)
      .to('#cat-4', { opacity: 1, y: 0, scale: 1, ease: 'none', duration: 0.4 }, 0.70);

    // ============================================================
    // SCENE 5 — FEATURED PRODUCTS
    // ============================================================
    const prodTL = gsap.timeline({
      scrollTrigger: {
        trigger: '#scene-products',
        start: 'top 80%',
        end: 'center 30%',
        scrub: 0.8,
      }
    });

    prodTL
      .to('#prod-eyebrow', { opacity: 1, y: 0, ease: 'none', duration: 0.3 }, 0)
      .to('#prod-title', { opacity: 1, y: 0, ease: 'none', duration: 0.4 }, 0.1)
      .to('#prod-view-all', { opacity: 1, ease: 'none', duration: 0.3 }, 0.2)
      // Row 1 stagger
      .to(['#prod-1', '#prod-2', '#prod-3', '#prod-4'], {
        opacity: 1, scale: 1, ease: 'none', duration: 0.5, stagger: 0.12
      }, 0.28)
      // Row 2 stagger (starts after row 1)
      .to(['#prod-5', '#prod-6', '#prod-7', '#prod-8'], {
        opacity: 1, scale: 1, ease: 'none', duration: 0.5, stagger: 0.12
      }, 0.68);

    // ============================================================
    // SCENE 6 — WHY CHOOSE US (individual block triggers)
    // ============================================================
    ['1', '2', '3', '4'].forEach((n) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: `#why-${n}`,
          start: 'top 75%',
          end: 'center 35%',
          scrub: 0.8,
        }
      });
      tl
        .to(`#why-num-${n}`, { opacity: 1, x: 0, ease: 'none', duration: 0.4 }, 0)
        .to(`#why-tag-${n}`, { opacity: 1, y: 0, ease: 'none', duration: 0.3 }, 0.1)
        .to(`#why-h${n}a`, { y: 0, opacity: 1, ease: 'none', duration: 0.4 }, 0.2)
        .to(`#why-h${n}b`, { y: 0, opacity: 1, ease: 'none', duration: 0.4 }, 0.35)
        .to(`#why-p${n}`, { opacity: 1, y: 0, ease: 'none', duration: 0.4 }, 0.5)
        // Parallax on visual
        .fromTo(`#why-vis-${n}`, { y: '6%' }, { y: '-6%', ease: 'none', duration: 1 }, 0);
    });

    // ============================================================
    // SCENE 7 — ENGINEERING EXPLODED VIEW
    // ============================================================
    const engTL = gsap.timeline({
      scrollTrigger: {
        trigger: '#scene-engineering',
        start: 'top 80%',
        end: 'center 30%',
        scrub: 1,
      }
    });

    engTL
      .to('#eng-eyebrow', { opacity: 1, y: 0, ease: 'none', duration: 0.3 }, 0)
      .to('#eng-title', { opacity: 1, y: 0, ease: 'none', duration: 0.4 }, 0.1)
      .to('#eng-para', { opacity: 1, ease: 'none', duration: 0.4 }, 0.28)
      .to('#eng-s1', { opacity: 1, x: 0, ease: 'none', duration: 0.35 }, 0.4)
      .to('#eng-s2', { opacity: 1, x: 0, ease: 'none', duration: 0.35 }, 0.52)
      .to('#eng-s3', { opacity: 1, x: 0, ease: 'none', duration: 0.35 }, 0.64)
      .to('#eng-s4', { opacity: 1, x: 0, ease: 'none', duration: 0.35 }, 0.76)
      // Exploded layer separation
      .fromTo('#eng-layer-5', { y: -60, opacity: 0 }, { y: 0, opacity: 1, ease: 'none', duration: 0.5 }, 0.1)
      .fromTo('#eng-layer-4', { y: -30, opacity: 0 }, { y: 0, opacity: 1, ease: 'none', duration: 0.5 }, 0.25)
      .fromTo('#eng-layer-3', { y: 0, opacity: 0 }, { y: 0, opacity: 1, ease: 'none', duration: 0.5 }, 0.4)
      .fromTo('#eng-layer-2', { y: 30, opacity: 0 }, { y: 0, opacity: 1, ease: 'none', duration: 0.5 }, 0.55)
      .fromTo('#eng-layer-1', { y: 60, opacity: 0 }, { y: 0, opacity: 1, ease: 'none', duration: 0.5 }, 0.7);

    // Slow rotation of engineering visual on scroll
    gsap.to('#eng-right', {
      rotationY: 12,
      rotationX: -5,
      ease: 'none',
      scrollTrigger: {
        trigger: '#scene-engineering',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
      }
    });

    // ============================================================
    // SCENE 8 — GALLERY (horizontal drift + drag)
    // ============================================================
    const galTL = gsap.timeline({
      scrollTrigger: {
        trigger: '#scene-gallery',
        start: 'top 80%',
        end: 'center 40%',
        scrub: 0.8,
      }
    });

    galTL
      .to('#gal-eyebrow', { opacity: 1, y: 0, ease: 'none', duration: 0.3 }, 0)
      .to('#gal-title', { opacity: 1, y: 0, ease: 'none', duration: 0.4 }, 0.1);

    // Scroll-linked horizontal drift
    gsap.to('#gallery-rail', {
      x: -320,
      ease: 'none',
      scrollTrigger: {
        trigger: '#scene-gallery',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
      }
    });

    // Gallery active state based on scroll position
    ScrollTrigger.create({
      trigger: '#scene-gallery',
      start: 'top 60%',
      onEnter: () => {
        document.querySelectorAll('.gallery-item').forEach((item, i) => {
          gsap.to(item, { opacity: i === 0 ? 1 : 0.6, scale: i === 0 ? 1 : 0.97, delay: i * 0.1 });
        });
      }
    });

    // Drag-to-scroll gallery
    (function () {
      const rail = document.getElementById('gallery-rail');
      let isDown = false, startX, scrollLeft;
      rail.addEventListener('mousedown', (e) => {
        isDown = true; rail.classList.add('active');
        startX = e.pageX - rail.offsetLeft;
        scrollLeft = rail.scrollLeft;
      });
      document.addEventListener('mouseup', () => { isDown = false; rail.classList.remove('active'); });
      document.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - rail.offsetLeft;
        const walk = (x - startX) * 1.5;
        gsap.to(rail, { x: `+=${walk * 0.15}`, ease: 'power2.out', duration: 0.5 });
      });
    })();

    // ============================================================
    // SCENE 9 — NEWS
    // ============================================================
    const newsTL = gsap.timeline({
      scrollTrigger: {
        trigger: '#scene-news',
        start: 'top 80%',
        end: 'center 40%',
        scrub: 0.8,
      }
    });

    newsTL
      .to('#news-eyebrow', { opacity: 1, y: 0, ease: 'none', duration: 0.3 }, 0)
      .to('#news-title', { opacity: 1, y: 0, ease: 'none', duration: 0.4 }, 0.1)
      .to('#news-1', { opacity: 1, y: 0, ease: 'none', duration: 0.4 }, 0.3)
      .to('#news-2', { opacity: 1, y: 0, ease: 'none', duration: 0.4 }, 0.45)
      .to('#news-3', { opacity: 1, y: 0, ease: 'none', duration: 0.4 }, 0.6);

    // ============================================================
    // SCENE 10 — CONTACT FORM
    // ============================================================
    const contactTL = gsap.timeline({
      scrollTrigger: {
        trigger: '#scene-contact',
        start: 'top 75%',
        end: 'center 40%',
        scrub: 0.8,
      }
    });

    contactTL
      .to('#contact-eyebrow', { opacity: 1, y: 0, ease: 'none', duration: 0.3 }, 0)
      .to('#contact-title', { opacity: 1, y: 0, ease: 'none', duration: 0.4 }, 0.1)
      .to('#contact-detail', { opacity: 1, ease: 'none', duration: 0.4 }, 0.25)
      // Form groups stagger
      .to(['#fg-1', '#fg-2', '#fg-3', '#fg-4', '#fg-5', '#fg-6'], {
        opacity: 1, y: 0, ease: 'none', stagger: 0.1, duration: 0.35
      }, 0.2)
      .to('#form-submit', { opacity: 1, y: 0, ease: 'none', duration: 0.35 }, 0.8);

    // Form validation
    document.getElementById('contact-form').addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      const name = document.getElementById('f-name');
      const email = document.getElementById('f-email');
      const msg = document.getElementById('f-message');

      const show = (id, field) => {
        document.getElementById(id).style.display = 'block';
        field.style.borderColor = '#c0392b';
        valid = false;
      };
      const hide = (id, field) => {
        document.getElementById(id).style.display = 'none';
        field.style.borderColor = '';
      };

      name.value.trim() ? hide('err-name', name) : show('err-name', name);
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) ? hide('err-email', email) : show('err-email', email);
      msg.value.trim() ? hide('err-msg', msg) : show('err-msg', msg);

      if (valid) {
        const btn = document.getElementById('form-submit');
        btn.querySelector('span').textContent = 'Message Sent ✓';
        gsap.to(btn, { background: '#2d5016', duration: 0.5 });
        setTimeout(() => {
          btn.querySelector('span').textContent = 'Send Enquiry';
          gsap.to(btn, { background: 'var(--text)', duration: 0.5 });
          this.reset();
        }, 3000);
      }
    });

    // ============================================================
    // NAV scroll fade
    // ============================================================
    ScrollTrigger.create({
      start: 100,
      onUpdate: (self) => {
        const nav = document.getElementById('nav');
        if (self.direction === 1 && self.progress > 0) {
          nav.style.opacity = '0.85';
        } else {
          nav.style.opacity = '1';
        }
      }
    });

    // ============================================================
    // BEARING ROTATION — subtle continuous rotation on SVG
    // ============================================================
    gsap.to('#bearing-balls', {
      rotation: 360,
      transformOrigin: '270px 264px',
      duration: 20,
      ease: 'none',
      repeat: -1,
    });

    gsap.to('#hub-bolts', {
      rotation: 360,
      transformOrigin: '270px 264px',
      duration: 12,
      ease: 'none',
      repeat: -1,
    });

    // Slow reverse ring on hero product
    gsap.to('#hero-product svg', {
      rotation: -6,
      duration: 8,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true,
    });

    // ============================================================
    // REFRESH on load
    // ============================================================
    window.addEventListener('load', () => { ScrollTrigger.refresh(); });