import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import factory from "@/assets/factory.jpg";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "60+", label: "Years of Excellence" },
  { value: "50M+", label: "Bearings Produced" },
  { value: "120+", label: "Countries Served" },
  { value: "99.7%", label: "Quality Rating" },
];

const AboutScene = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text lines sequential animation
      gsap.fromTo(
        ".about-text-line",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "center center",
            scrub: 1,
          },
        }
      );

      // Image parallax
      gsap.fromTo(
        ".about-image",
        { y: 60 },
        {
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      // Stats reveal
      gsap.fromTo(
        ".stat-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: ".stats-grid",
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="scene-section py-32 lg:py-48"
      style={{ background: "hsl(var(--surface))" }}
    >
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24">
          {/* Text column */}
          <div>
            <span className="text-label about-text-line block mb-4">About Us</span>
            <div className="gold-line about-text-line mb-8" />
            <h2 className="text-display text-4xl md:text-5xl font-bold text-foreground about-text-line mb-8">
              Where Precision
              <br />
              Meets Innovation
            </h2>
            <p className="text-body text-lg text-muted-foreground about-text-line mb-6">
              Our state-of-the-art facilities combine traditional craftsmanship with
              cutting-edge technology. Every process, from forging to final inspection,
              is calibrated to tolerances measured in microns.
            </p>
            <p className="text-body text-muted-foreground about-text-line">
              We don't just manufacture bearings — we engineer confidence for the
              world's most demanding automotive applications.
            </p>
          </div>

          {/* Image column */}
          <div className="relative overflow-hidden h-[500px]">
            <img
              src={factory}
              alt="Manufacturing facility"
              className="about-image absolute inset-0 w-full h-full object-cover will-change-transform"
              loading="lazy"
              width={1200}
              height={800}
            />
          </div>
        </div>

        {/* Stats grid */}
        <div className="stats-grid grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 border-t pt-16" style={{ borderColor: "hsl(var(--border))" }}>
          {stats.map((stat) => (
            <div key={stat.label} className="stat-item text-center">
              <div className="text-display text-4xl md:text-5xl font-bold gold-accent mb-2">
                {stat.value}
              </div>
              <div className="text-body text-sm text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutScene;
