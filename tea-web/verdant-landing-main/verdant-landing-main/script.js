const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector("#mobile-menu");

if (menuToggle && mobileMenu) {
  const closeMenu = () => {
    menuToggle.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    mobileMenu.classList.remove("is-open");
    mobileMenu.hidden = true;
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    mobileMenu.classList.toggle("is-open", isOpen);
    mobileMenu.hidden = !isOpen;
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

const updateScrollButtons = (trackId) => {
  const track = document.getElementById(trackId);
  if (!track) return;

  const canScrollLeft = track.scrollLeft > 4;
  const canScrollRight = track.scrollLeft < track.scrollWidth - track.clientWidth - 4;

  document.querySelectorAll(`[data-scroll-target="${trackId}"]`).forEach((button) => {
    const isLeft = button.getAttribute("data-direction") === "left";
    button.disabled = isLeft ? !canScrollLeft : !canScrollRight;
  });
};

document.querySelectorAll("[data-scroll-target]").forEach((button) => {
  const trackId = button.getAttribute("data-scroll-target");
  if (!trackId) return;

  const track = document.getElementById(trackId);
  if (!track) return;

  if (track.dataset.bound !== "true") {
    track.dataset.bound = "true";
    updateScrollButtons(trackId);
    track.addEventListener("scroll", () => updateScrollButtons(trackId), { passive: true });
    window.addEventListener("resize", () => updateScrollButtons(trackId));
  }

  button.addEventListener("click", () => {
    const direction = button.getAttribute("data-direction");
    if (!direction) return;

    const distance = track.clientWidth * 0.7;
    track.scrollBy({
      left: direction === "left" ? -distance : distance,
      behavior: "smooth",
    });
  });
});

const contactForm = document.getElementById("contact-form");
const contactSuccess = document.getElementById("contact-success");

if (contactForm && contactSuccess) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    contactForm.hidden = true;
    contactSuccess.hidden = false;
  });
}
