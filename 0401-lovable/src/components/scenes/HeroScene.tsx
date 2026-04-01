import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroBearing from "@/assets/hero-bearing.jpg";

gsap.registerPlugin(ScrollTrigger);

const HeroScene = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2000",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Image slow zoom + slight rotation
      tl.fromTo(
        imageRef.current,
        { scale: 1, y: 0 },
        { scale: 1.3, y: -40, ease: "none", duration: 1 },
        0
      );

      // Title scale up and fade out
      tl.fromTo(
        titleRef.current,
        { opacity: 1, scale: 1, y: 0 },
        { opacity: 0, scale: 1.1, y: -60, ease: "none", duration: 0.6 },
        0.3
      );

      // Subtitle fade
      tl.fromTo(
        subtitleRef.current,
        { opacity: 1, y: 0 },
        { opacity: 0, y: -40, ease: "none", duration: 0.5 },
        0.4
      );

      // Label fade
      tl.fromTo(
        labelRef.current,
        { opacity: 1 },
        { opacity: 0, ease: "none", duration: 0.4 },
        0.3
      );

      // Overlay darkens slightly at end
      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 0.3, ease: "none", duration: 0.4 },
        0.6
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="scene-section h-screen flex items-center justify-center"
      style={{ background: "hsl(var(--surface))" }}
    >
      {/* Background overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: "hsl(var(--charcoal))" }}
      />

      {/* Product image */}
      <img
        ref={imageRef}
        src={heroBearing}
        alt="Precision wheel hub bearing"
        className="absolute inset-0 w-full h-full object-contain z-0 will-change-transform"
        width={1920}
        height={1080}
      />

      {/* Text content */}
      <div className="relative z-20 text-center px-6 max-w-4xl">
        <span ref={labelRef} className="text-label block mb-6">
          Precision Engineered Since 1962
        </span>
        <h1
          ref={titleRef}
          className="text-display text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6"
        >
          Engineered for
          <br />
          <span className="gold-accent">Perfection</span>
        </h1>
        <p
          ref={subtitleRef}
          className="text-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          World-class wheel hub bearings built with relentless precision
          and uncompromising quality.
        </p>
      </div>
    </section>
  );
};

export default HeroScene;
