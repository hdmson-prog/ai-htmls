import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const SiteNavbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power3.out" }
    );
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 lg:px-16 py-5"
      style={{
        background: scrolled ? "hsl(var(--background) / 0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid hsl(var(--border))" : "1px solid transparent",
      }}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-display text-xl font-bold text-foreground tracking-tight">
          APEX<span className="gold-accent">BEARING</span>
        </div>
        <div className="hidden md:flex items-center gap-10">
          {["Products", "Engineering", "About", "Contact"].map((item) => (
            <span
              key={item}
              className="text-body text-xs uppercase tracking-widest text-muted-foreground cursor-pointer transition-colors duration-300 hover:text-foreground"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default SiteNavbar;
