(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const menuButton = document.querySelector(".menu-toggle");
  const primaryNav = document.querySelector(".primary-nav");

  if (menuButton && primaryNav) {
    menuButton.addEventListener("click", () => {
      const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isExpanded));
      primaryNav.classList.toggle("is-open", !isExpanded);
    });

    primaryNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuButton.setAttribute("aria-expanded", "false");
        primaryNav.classList.remove("is-open");
      });
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768) {
        menuButton.setAttribute("aria-expanded", "false");
        primaryNav.classList.remove("is-open");
      }
    });
  }

  const revealEls = document.querySelectorAll(".reveal");

  if (revealEls.length) {
    if (reduceMotion) {
      revealEls.forEach((el) => el.classList.add("is-visible"));
    } else {
      const revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          });
        },
        {
          rootMargin: "0px 0px -10% 0px",
          threshold: 0.16,
        }
      );

      revealEls.forEach((el) => revealObserver.observe(el));
    }
  }

  const parallaxNodes = document.querySelectorAll("[data-parallax]");
  if (parallaxNodes.length && !reduceMotion) {
    let ticking = false;

    const renderParallax = () => {
      const scrollY = window.scrollY;
      parallaxNodes.forEach((node) => {
        const speed = Number(node.getAttribute("data-parallax")) || 0.1;
        node.style.transform = `translate3d(0, ${-scrollY * speed}px, 0)`;
      });
      ticking = false;
    };

    const requestParallax = () => {
      if (ticking) {
        return;
      }
      ticking = true;
      window.requestAnimationFrame(renderParallax);
    };

    window.addEventListener("scroll", requestParallax, { passive: true });
    renderParallax();
  }

  const carousel = document.querySelector("[data-carousel]");
  if (carousel) {
    const slides = Array.from(carousel.querySelectorAll("[data-slide]"));
    const dots = Array.from(carousel.querySelectorAll(".dot"));
    const prev = carousel.querySelector(".carousel-btn.prev");
    const next = carousel.querySelector(".carousel-btn.next");
    let index = 0;
    let timer = null;

    const setSlide = (targetIndex) => {
      index = (targetIndex + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle("is-active", slideIndex === index);
      });
      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle("is-active", dotIndex === index);
        dot.setAttribute("aria-selected", String(dotIndex === index));
      });
    };

    const startAutoplay = () => {
      if (reduceMotion) {
        return;
      }
      stopAutoplay();
      timer = window.setInterval(() => {
        setSlide(index + 1);
      }, 5600);
    };

    const stopAutoplay = () => {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    };

    prev?.addEventListener("click", () => {
      setSlide(index - 1);
      startAutoplay();
    });

    next?.addEventListener("click", () => {
      setSlide(index + 1);
      startAutoplay();
    });

    dots.forEach((dot, dotIndex) => {
      dot.addEventListener("click", () => {
        setSlide(dotIndex);
        startAutoplay();
      });
    });

    carousel.addEventListener("mouseenter", stopAutoplay);
    carousel.addEventListener("mouseleave", startAutoplay);
    carousel.addEventListener("focusin", stopAutoplay);
    carousel.addEventListener("focusout", startAutoplay);

    setSlide(0);
    startAutoplay();
  }

  const regionButtons = Array.from(document.querySelectorAll(".region-btn"));
  const mapBadge = document.getElementById("map-badge");

  const regionData = {
    americas: {
      title: "Americas Regional Office",
      subtitle: "New York, USA",
    },
    emea: {
      title: "EMEA Regional Office",
      subtitle: "Milan, Italy",
    },
    apac: {
      title: "APAC Regional Office",
      subtitle: "Singapore",
    },
  };

  if (regionButtons.length && mapBadge) {
    const updateRegion = (region) => {
      const nextData = regionData[region];
      if (!nextData) {
        return;
      }
      mapBadge.innerHTML = `<h3>${nextData.title}</h3><p>${nextData.subtitle}</p>`;
      regionButtons.forEach((button) => {
        button.classList.toggle("is-active", button.dataset.region === region);
      });
    };

    regionButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const targetRegion = button.dataset.region;
        updateRegion(targetRegion);
      });
    });
  }
})();

