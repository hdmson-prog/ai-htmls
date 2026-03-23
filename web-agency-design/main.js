const header = document.querySelector(".site-header");
const revealItems = document.querySelectorAll(".reveal");
const parallaxTarget = document.querySelector("[data-parallax]");
const mediaFrames = document.querySelectorAll(".media-frame");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const updateHeaderState = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
};

const activateRevealObserver = () => {
    if (reducedMotion.matches) {
        revealItems.forEach((item) => item.classList.add("is-visible"));
        return;
    }

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
            rootMargin: "0px 0px -8% 0px",
        }
    );

    revealItems.forEach((item) => observer.observe(item));
};

const updateParallax = () => {
    if (!parallaxTarget || reducedMotion.matches) return;
    const offset = Math.min(window.scrollY * 0.08, 34);
    parallaxTarget.style.transform = `translate3d(0, ${offset}px, 0)`;
};

const addInteractiveTilt = () => {
    if (reducedMotion.matches) return;

    mediaFrames.forEach((frame) => {
        frame.addEventListener("pointermove", (event) => {
            const rect = frame.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width;
            const y = (event.clientY - rect.top) / rect.height;
            const rotateY = (x - 0.5) * 8;
            const rotateX = (0.5 - y) * 7;

            frame.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        frame.addEventListener("pointerleave", () => {
            frame.style.transform = "";
        });
    });
};

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
        const targetId = anchor.getAttribute("href");
        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);
        if (!target) return;

        event.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 96;
        window.scrollTo({ top, behavior: reducedMotion.matches ? "auto" : "smooth" });
    });
});

window.addEventListener("scroll", () => {
    updateHeaderState();
    updateParallax();
});

window.addEventListener("load", () => {
    updateHeaderState();
    updateParallax();
    activateRevealObserver();
    addInteractiveTilt();
});
