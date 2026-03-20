const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -8% 0px"
  }
);

revealElements.forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index * 60, 280)}ms`;
  revealObserver.observe(element);
});

const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = contactForm.querySelector("button");

    if (!button) {
      return;
    }

    const originalLabel = button.textContent;
    button.textContent = "RFQ Received";
    button.disabled = true;

    window.setTimeout(() => {
      button.textContent = originalLabel;
      button.disabled = false;
      contactForm.reset();
    }, 2200);
  });
}
