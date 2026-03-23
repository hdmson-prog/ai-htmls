"use strict";

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#site-nav");
const navLinks = nav ? [...nav.querySelectorAll("a")] : [];
const revealNodes = [...document.querySelectorAll(".reveal")];
const sections = [...document.querySelectorAll("main section[id]")];
const finishesTrack = document.querySelector("#finishes-track");
const scrollButtons = [...document.querySelectorAll("[data-scroll]")];

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if ("IntersectionObserver" in window && revealNodes.length > 0) {
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
    { threshold: 0.18 }
  );

  revealNodes.forEach((node) => revealObserver.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add("is-visible"));
}

if ("IntersectionObserver" in window && sections.length > 0 && navLinks.length > 0) {
  const navMap = new Map(
    navLinks
      .map((link) => {
        const id = link.getAttribute("href")?.replace("#", "");
        return [id, link];
      })
      .filter(([id]) => Boolean(id))
  );

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => link.classList.remove("active"));
        if (id && navMap.has(id)) {
          navMap.get(id).classList.add("active");
        }
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px",
      threshold: 0.01
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

if (finishesTrack && scrollButtons.length > 0) {
  const getStep = () => {
    const firstCard = finishesTrack.querySelector(".finish-card");
    return firstCard
      ? firstCard.getBoundingClientRect().width + 20
      : 300;
  };

  scrollButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.dataset.scroll === "next" ? 1 : -1;
      finishesTrack.scrollBy({
        left: direction * getStep(),
        behavior: "smooth"
      });
    });
  });
}

