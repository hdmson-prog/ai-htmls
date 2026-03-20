const nav = document.querySelector(".nav");
const navToggle = document.querySelector(".nav__toggle");
const submenuToggles = document.querySelectorAll(".submenu__toggle");
const searchTrigger = document.querySelector(".search-trigger");
const searchPanel = document.querySelector("#search-panel");
const searchInput = document.querySelector("#site-search");
const languageSwitcher = document.querySelector(".language-switcher");
const languageToggle = document.querySelector(".language-switcher__toggle");

if (nav && navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

submenuToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const parent = toggle.closest(".has-submenu");
    const isOpen = parent.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
});

if (searchTrigger && searchPanel) {
  searchTrigger.addEventListener("click", () => {
    const expanded = searchTrigger.getAttribute("aria-expanded") === "true";
    searchTrigger.setAttribute("aria-expanded", String(!expanded));
    searchPanel.hidden = expanded;

    if (!expanded && searchInput) {
      window.setTimeout(() => searchInput.focus(), 120);
    }
  });
}

if (languageSwitcher && languageToggle) {
  languageToggle.addEventListener("click", () => {
    const isOpen = languageSwitcher.classList.toggle("is-open");
    languageToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

document.addEventListener("click", (event) => {
  const target = event.target;

  if (!(target instanceof Element)) {
    return;
  }

  if (languageSwitcher && !languageSwitcher.contains(target)) {
    languageSwitcher.classList.remove("is-open");
    languageToggle?.setAttribute("aria-expanded", "false");
  }

  document.querySelectorAll(".has-submenu").forEach((item) => {
    if (!item.contains(target)) {
      item.classList.remove("is-open");
      item.querySelector(".submenu__toggle")?.setAttribute("aria-expanded", "false");
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") {
    return;
  }

  searchPanel.hidden = true;
  searchTrigger?.setAttribute("aria-expanded", "false");
  languageSwitcher?.classList.remove("is-open");
  languageToggle?.setAttribute("aria-expanded", "false");

  document.querySelectorAll(".has-submenu").forEach((item) => {
    item.classList.remove("is-open");
    item.querySelector(".submenu__toggle")?.setAttribute("aria-expanded", "false");
  });
});

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries, revealObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.18,
    rootMargin: "0px 0px -40px 0px"
  });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
