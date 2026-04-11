const header = document.querySelector("[data-header]");
const heroBg = document.querySelector("[data-hero-bg]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const filters = Array.from(document.querySelectorAll("[data-filter]"));
const portfolioItems = Array.from(document.querySelectorAll(".portfolio-item"));
const processSteps = Array.from(document.querySelectorAll(".process-step"));
const processPanels = Array.from(document.querySelectorAll("[data-step-panel]"));
const progressBar = document.querySelector("[data-progress-bar]");
const stepLabel = document.querySelector("[data-step-label]");
const prevButton = document.querySelector("[data-step-prev]");
const nextButton = document.querySelector("[data-step-next]");
const testimonialCards = Array.from(document.querySelectorAll("[data-testimonial]"));
const testimonialDots = Array.from(document.querySelectorAll("[data-testimonial-dot]"));
const contactForm = document.querySelector("[data-contact-form]");
const contactSubmit = document.querySelector("[data-contact-submit]");
const formStatus = document.querySelector("[data-form-status]");
const newsletterForm = document.querySelector("[data-newsletter-form]");
const yearNode = document.querySelector("[data-year]");
const testimonialShell = document.querySelector(".testimonial-shell");

const processCount = processPanels.length;
const testimonialCount = testimonialCards.length;

let activeProcessIndex = 0;
let activeTestimonialIndex = 0;
let testimonialTimer = window.setInterval(nextTestimonial, 6000);

yearNode.textContent = new Date().getFullYear();

function setHeaderState() {
  header.classList.toggle("is-scrolled", window.scrollY > 48);
}

function setHeroParallax() {
  if (!heroBg) return;
  const offset = Math.min(window.scrollY * 0.22, 160);
  heroBg.style.transform = `scale(1.08) translate3d(0, ${offset}px, 0)`;
}

function toggleMobileMenu(forceOpen) {
  const shouldOpen = typeof forceOpen === "boolean" ? forceOpen : !mobileMenu.classList.contains("is-open");
  mobileMenu.classList.toggle("is-open", shouldOpen);
  menuToggle.setAttribute("aria-expanded", String(shouldOpen));

  const lines = menuToggle.querySelectorAll("span");
  lines[0].style.transform = shouldOpen ? "translateY(7px) rotate(45deg)" : "";
  lines[1].style.opacity = shouldOpen ? "0" : "";
  lines[2].style.transform = shouldOpen ? "translateY(-7px) rotate(-45deg)" : "";
}

function setProcessStep(index) {
  activeProcessIndex = (index + processCount) % processCount;

  processSteps.forEach((step, stepIndex) => {
    const isActive = stepIndex === activeProcessIndex;
    step.classList.toggle("is-active", isActive);
    step.setAttribute("aria-selected", String(isActive));
  });

  processPanels.forEach((panel, panelIndex) => {
    panel.classList.toggle("is-active", panelIndex === activeProcessIndex);
  });

  progressBar.style.width = `${((activeProcessIndex + 1) / processCount) * 100}%`;
  stepLabel.textContent = `Step ${activeProcessIndex + 1} of ${processCount}`;
}

function setTestimonial(index) {
  activeTestimonialIndex = (index + testimonialCount) % testimonialCount;

  testimonialCards.forEach((card, cardIndex) => {
    card.classList.toggle("is-active", cardIndex === activeTestimonialIndex);
  });

  testimonialDots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === activeTestimonialIndex;
    dot.classList.toggle("is-active", isActive);
    dot.setAttribute("aria-selected", String(isActive));
  });
}

function nextTestimonial() {
  setTestimonial(activeTestimonialIndex + 1);
}

function restartTestimonialTimer() {
  window.clearInterval(testimonialTimer);
  testimonialTimer = window.setInterval(nextTestimonial, 6000);
}

window.addEventListener("scroll", () => {
  setHeaderState();
  setHeroParallax();
});

setHeaderState();
setHeroParallax();
setProcessStep(0);
setTestimonial(0);

menuToggle.addEventListener("click", () => toggleMobileMenu());

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => toggleMobileMenu(false));
});

filters.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.filter;

    filters.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    portfolioItems.forEach((item) => {
      const shouldShow = selected === "All" || item.dataset.category === selected;
      item.classList.toggle("hidden", !shouldShow);
    });
  });
});

processSteps.forEach((button) => {
  button.addEventListener("click", () => {
    setProcessStep(Number(button.dataset.step));
  });
});

prevButton.addEventListener("click", () => setProcessStep(activeProcessIndex - 1));
nextButton.addEventListener("click", () => setProcessStep(activeProcessIndex + 1));

testimonialDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    setTestimonial(Number(dot.dataset.testimonialDot));
    restartTestimonialTimer();
  });
});

testimonialShell.addEventListener("mouseenter", () => window.clearInterval(testimonialTimer));
testimonialShell.addEventListener("mouseleave", restartTestimonialTimer);

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  contactSubmit.textContent = "Message Sent!";
  formStatus.textContent = "Thanks. We will respond within 24 hours.";
  contactForm.reset();

  window.setTimeout(() => {
    contactSubmit.textContent = "Send Message";
    formStatus.textContent = "";
  }, 3000);
});

newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  newsletterForm.reset();
});
