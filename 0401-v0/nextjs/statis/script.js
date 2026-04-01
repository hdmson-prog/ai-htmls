(() => {
  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  const menuIcon = document.querySelector("[data-menu-icon]");
  const form = document.querySelector("[data-contact-form]");
  const formStatus = document.querySelector("[data-form-status]");
  const carousel = document.querySelector("[data-carousel]");
  const prevButton = document.querySelector("[data-carousel-prev]");
  const nextButton = document.querySelector("[data-carousel-next]");
  const progress = document.querySelector("[data-carousel-progress]");

  const setHeaderState = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 16);
  };

  const setMenuOpen = (open) => {
    if (!menuToggle || !mobileMenu || !menuIcon) return;
    menuToggle.setAttribute("aria-expanded", String(open));
    mobileMenu.hidden = !open;
    document.body.classList.toggle("nav-open", open);
    menuIcon.textContent = open ? "Close" : "Menu";
  };

  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      setMenuOpen(!isOpen);
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenuOpen(false));
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
  );

  revealElements.forEach((element) => revealObserver.observe(element));

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (formStatus) {
        formStatus.textContent = "Thanks. Your message has been captured locally for this static build.";
      }
      form.reset();
    });
  }

  if (carousel && progress) {
    const updateProgress = () => {
      const maxScroll = carousel.scrollWidth - carousel.clientWidth;
      const ratio = maxScroll > 0 ? carousel.scrollLeft / maxScroll : 0;
      progress.style.transform = `scaleX(${Math.max(0.18, Math.min(1, ratio + 0.18))})`;
      progress.style.transformOrigin = "left center";
    };

    const scrollByAmount = (direction) => {
      const card = carousel.querySelector(".carousel-item");
      const amount = card ? card.getBoundingClientRect().width + 16 : 320;
      carousel.scrollBy({ left: amount * direction, behavior: "smooth" });
    };

    carousel.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    if (prevButton) prevButton.addEventListener("click", () => scrollByAmount(-1));
    if (nextButton) nextButton.addEventListener("click", () => scrollByAmount(1));
  }
})();
