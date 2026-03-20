const body = document.body;
const navToggle = document.querySelector(".nav-toggle");
const primaryNav = document.querySelector(".primary-nav");
const submenuToggle = document.querySelector(".submenu-toggle");
const submenuParent = document.querySelector(".has-submenu");
const searchToggle = document.querySelector(".search-toggle");
const searchPanel = document.querySelector(".search-panel");
const searchInput = document.querySelector("#search-input");
const languageSelect = document.querySelector("#language-select");
const revealItems = document.querySelectorAll(".reveal");

if (navToggle && primaryNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    primaryNav.classList.toggle("is-open", !isOpen);
  });
}

if (submenuToggle && submenuParent) {
  submenuToggle.addEventListener("click", () => {
    const isOpen = submenuToggle.getAttribute("aria-expanded") === "true";
    submenuToggle.setAttribute("aria-expanded", String(!isOpen));
    submenuParent.classList.toggle("is-open", !isOpen);
  });
}

if (searchToggle && searchPanel) {
  searchToggle.addEventListener("click", () => {
    const isOpen = searchToggle.getAttribute("aria-expanded") === "true";
    searchToggle.setAttribute("aria-expanded", String(!isOpen));
    searchPanel.hidden = isOpen;
    searchPanel.classList.toggle("is-open", !isOpen);

    if (!isOpen) {
      window.setTimeout(() => searchInput?.focus(), 250);
    }
  });
}

document.addEventListener("click", (event) => {
  if (submenuParent && !submenuParent.contains(event.target)) {
    submenuParent.classList.remove("is-open");
    submenuToggle?.setAttribute("aria-expanded", "false");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    submenuParent?.classList.remove("is-open");
    submenuToggle?.setAttribute("aria-expanded", "false");

    if (searchPanel?.classList.contains("is-open")) {
      searchPanel.classList.remove("is-open");
      searchPanel.hidden = true;
      searchToggle?.setAttribute("aria-expanded", "false");
      searchToggle?.focus();
    }
  }
});

if (languageSelect) {
  languageSelect.addEventListener("change", () => {
    body.setAttribute("data-language", languageSelect.value);
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -40px 0px",
  }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 70, 280)}ms`;
  revealObserver.observe(item);
});
