import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bearingExploded from "@/assets/bearing-exploded.jpg";

gsap.registerPlugin(ScrollTrigger);

const EngineeringScene = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1500",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Image rotation illusion
      tl.fromTo(
        ".eng-image",
        { scale: 0.8, opacity: 0.5, rotate: -5 },
        { scale: 1, opacity: 1, rotate: 0, ease: "none", duration: 0.4 },
        0
      );

      // Labels appear
      tl.fromTo(
        ".eng-label",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, stagger: 0.1, ease: "none", duration: 0.3 },
        0.2
      );

      // Title
      tl.fromTo(
        ".eng-title",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, ease: "none", duration: 0.3 },
        0.5
      );

      // Lighting sweep
      tl.fromTo(
        ".eng-sweep",
        { x: "-100%", opacity: 0.3 },
        { x: "200%", opacity: 0, ease: "none", duration: 0.5 },
        0.4
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="scene-section h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "hsl(var(--surface))" }}
    >
      {/* Lighting sweep overlay */}
      <div
        className="eng-sweep absolute inset-0 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(var(--gold) / 0.15), transparent)",
          width: "50%",
        }}
      />

      <div className="container mx-auto px-6 lg:px-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Exploded view */}
          <div className="relative">
            <img
              src={bearingExploded}
              alt="Bearing exploded view"
              className="eng-image w-full max-w-lg mx-auto will-change-transform"
              loading="lazy"
              width={1200}
              height={800}
            />
            {/* Component labels */}
            <div className="eng-label absolute top-[15%] right-[10%] text-label text-xs">
              Outer Race →
            </div>
            <div className="eng-label absolute top-[40%] right-[5%] text-label text-xs">
              Ball Bearings →
            </div>
            <div className="eng-label absolute bottom-[30%] right-[10%] text-label text-xs">
              Inner Race →
            </div>
            <div className="eng-label absolute bottom-[15%] left-[10%] text-label text-xs">
              ← Seal Assembly
            </div>
          </div>

          {/* Text */}
          <div className="eng-title">
            <span className="text-label block mb-4">Engineering</span>
            <div className="gold-line mb-8" />
            <h2 className="text-display text-4xl md:text-5xl font-bold text-foreground mb-8">
              Anatomy of
              <br />
              <span className="gold-accent">Precision</span>
            </h2>
            <p className="text-body text-lg text-muted-foreground mb-6">
              Each component is engineered to work in perfect harmony. From the
              hardened steel races to the precision-ground ball bearings, every
              element is designed to deliver thousands of miles of silent, reliable
              performance.
            </p>
            <div className="grid grid-cols-2 gap-6 mt-10">
              <div>
                <div className="text-display text-2xl font-bold gold-accent">±2μm</div>
                <div className="text-body text-sm text-muted-foreground">Tolerance</div>
              </div>
              <div>
                <div className="text-display text-2xl font-bold gold-accent">200°C</div>
                <div className="text-body text-sm text-muted-foreground">Heat Resistance</div>
              </div>
              <div>
                <div className="text-display text-2xl font-bold gold-accent">150K km</div>
                <div className="text-body text-sm text-muted-foreground">Avg. Lifespan</div>
              </div>
              <div>
                <div className="text-display text-2xl font-bold gold-accent">62 HRC</div>
                <div className="text-body text-sm text-muted-foreground">Hardness Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EngineeringScene;
