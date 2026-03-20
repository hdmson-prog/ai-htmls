const root = document.documentElement;
const navToggle = document.querySelector(".nav-toggle");
const header = document.querySelector(".site-header");
const materialRail = document.querySelector("[data-rail]");
const revealItems = document.querySelectorAll(".section, .system-card, .material-block, .application-card, .compliance-grid article, .contact-panel");

if (navToggle && header) {
  navToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

document.querySelectorAll('.site-nav a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => {
    header?.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

if (materialRail) {
  materialRail.addEventListener(
    "wheel",
    (event) => {
      if (window.innerWidth > 880) {
        materialRail.scrollLeft += event.deltaY;
      }
    },
    { passive: true }
  );
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealItems.forEach((item, index) => {
    item.classList.add("reveal");
    item.style.transitionDelay = `${Math.min(index * 35, 280)}ms`;
    observer.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

window.addEventListener("resize", () => {
  root.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
});

root.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
