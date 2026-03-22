const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".site-nav a");
const observedItems = document.querySelectorAll(".section-observe");

if (navToggle && header) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    header.classList.toggle("is-open", !expanded);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      header.classList.remove("is-open");
    });
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
    rootMargin: "0px 0px -8% 0px"
  }
);

observedItems.forEach((item) => revealObserver.observe(item));

const inquiryForm = document.querySelector(".inquiry-form");

if (inquiryForm) {
  inquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const submitButton = inquiryForm.querySelector("button[type='submit']");

    if (submitButton) {
      const originalText = submitButton.textContent;
      submitButton.textContent = "Inquiry Sent";
      submitButton.disabled = true;

      window.setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        inquiryForm.reset();
      }, 1800);
    }
  });
}
