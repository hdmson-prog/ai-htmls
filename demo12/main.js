const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });
}

const form = document.querySelector('.form');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    form.reset();
    alert('Project inquiry received. Our specification team will respond within 2 business days.');
  });
}

const heroSlider = document.querySelector('.hero-slider');
if (heroSlider) {
  const slides = Array.from(heroSlider.querySelectorAll('.hero-slide'));
  const dots = Array.from(heroSlider.querySelectorAll('.hero-dot'));
  const track = heroSlider.querySelector('.hero-track');
  const prevButton = heroSlider.querySelector('.hero-control.prev');
  const nextButton = heroSlider.querySelector('.hero-control.next');
  let index = 0;

  const updateHeight = () => {
    if (!track) return;
    track.style.height = `${slides[index].offsetHeight}px`;
  };

  const setSlide = (nextIndex) => {
    slides[index].classList.remove('is-active');
    dots[index].classList.remove('is-active');
    dots[index].setAttribute('aria-selected', 'false');

    index = (nextIndex + slides.length) % slides.length;

    slides[index].classList.add('is-active');
    dots[index].classList.add('is-active');
    dots[index].setAttribute('aria-selected', 'true');
    updateHeight();
  };

  if (prevButton && nextButton) {
    prevButton.addEventListener('click', () => setSlide(index - 1));
    nextButton.addEventListener('click', () => setSlide(index + 1));
  }

  dots.forEach((dot, dotIndex) => {
    dot.addEventListener('click', () => setSlide(dotIndex));
  });

  requestAnimationFrame(updateHeight);
  window.addEventListener('resize', updateHeight);
}
