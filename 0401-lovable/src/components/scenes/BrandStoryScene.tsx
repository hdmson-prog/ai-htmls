import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bearingDetail from "@/assets/bearing-detail.jpg";

gsap.registerPlugin(ScrollTrigger);

const BrandStoryScene = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        },
      });

      // Clip-path reveal
      tl.fromTo(
        revealRef.current,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", ease: "none", duration: 0.5 },
        0
      );

      // Text lines emerge
      tl.fromTo(
        textRef.current?.querySelectorAll(".reveal-line") || [],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.1, ease: "none", duration: 0.4 },
        0.2
      );

      // Image subtle motion
      tl.fromTo(
        imageRef.current,
        { opacity: 0, x: 40, scale: 1.05 },
        { opacity: 1, x: 0, scale: 1, ease: "none", duration: 0.5 },
        0.3
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="scene-section min-h-screen flex items-center py-32"
      style={{ background: "hsl(var(--background))" }}
    >
      <div ref={revealRef} className="container mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div ref={textRef}>
            <span className="text-label reveal-line block mb-4">Our Legacy</span>
            <div className="gold-line reveal-line mb-8" />
            <h2 className="text-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground reveal-line mb-8">
              Six Decades of
              <br />
              Engineering Excellence
            </h2>
            <p className="text-body text-lg text-muted-foreground reveal-line mb-6">
              From a single workshop to a global leader, we've spent over 60 years
              perfecting the art and science of wheel hub bearing manufacturing.
            </p>
            <p className="text-body text-muted-foreground reveal-line">
              Every bearing that leaves our facility carries the weight of decades of
              research, innovation, and an unwavering commitment to precision that
              our partners across the world have come to trust.
            </p>
          </div>
          <div className="relative overflow-hidden">
            <img
              ref={imageRef}
              src={bearingDetail}
              alt="Precision bearing detail"
              className="w-full h-auto will-change-transform"
              loading="lazy"
              width={1200}
              height={800}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStoryScene;
