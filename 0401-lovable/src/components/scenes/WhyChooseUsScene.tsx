import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bearingDetail from "@/assets/bearing-detail.jpg";
import factory from "@/assets/factory.jpg";
import heroBearing from "@/assets/hero-bearing.jpg";
import bearingExploded from "@/assets/bearing-exploded.jpg";

gsap.registerPlugin(ScrollTrigger);

const blocks = [
  {
    label: "Precision",
    title: "Micron-Level Accuracy",
    text: "Every bearing is machined to tolerances of ±2 microns. Our proprietary finishing process ensures perfect roundness and surface quality that exceeds ISO standards.",
    image: bearingDetail,
  },
  {
    label: "Durability",
    title: "Built to Outlast",
    text: "Advanced heat treatment and premium-grade steel give our bearings an operational lifespan that consistently exceeds industry benchmarks by 40%.",
    image: factory,
  },
  {
    label: "Innovation",
    title: "Future-Ready Engineering",
    text: "From sensor-integrated smart bearings to ultra-low friction designs for EVs, we're pioneering the next generation of automotive motion technology.",
    image: heroBearing,
  },
  {
    label: "Trust",
    title: "OEM-Grade Reliability",
    text: "Trusted by 8 of the world's top 10 automotive manufacturers. Every bearing carries our quality guarantee — backed by over 50 million units in the field.",
    image: bearingExploded,
  },
];

const WhyChooseUsScene = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      blocks.forEach((_, i) => {
        const block = `.why-block-${i}`;

        gsap.fromTo(
          `${block} .why-text`,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            ease: "none",
            scrollTrigger: {
              trigger: block,
              start: "top 70%",
              end: "top 30%",
              scrub: 1,
            },
          }
        );

        gsap.fromTo(
          `${block} .why-image`,
          { opacity: 0, x: 40, scale: 1.05 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: block,
              start: "top 70%",
              end: "top 30%",
              scrub: 1,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="scene-section py-32 lg:py-48"
      style={{ background: "hsl(var(--background))" }}
    >
      <div className="container mx-auto px-6 lg:px-16">
        <div className="text-center mb-24">
          <span className="text-label block mb-4">Why Choose Us</span>
          <div className="gold-line mx-auto mb-8" />
          <h2 className="text-display text-4xl md:text-5xl font-bold text-foreground">
            The Standard of Excellence
          </h2>
        </div>

        <div className="space-y-32 lg:space-y-48">
          {blocks.map((block, i) => (
            <div
              key={block.label}
              className={`why-block-${i} grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center ${
                i % 2 === 1 ? "lg:direction-rtl" : ""
              }`}
              style={i % 2 === 1 ? { direction: "rtl" } : {}}
            >
              <div className="why-text" style={{ direction: "ltr" }}>
                <span className="text-label block mb-3">{block.label}</span>
                <h3 className="text-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                  {block.title}
                </h3>
                <p className="text-body text-muted-foreground text-lg leading-relaxed">
                  {block.text}
                </p>
              </div>
              <div className="why-image overflow-hidden" style={{ direction: "ltr" }}>
                <img
                  src={block.image}
                  alt={block.title}
                  className="w-full h-80 lg:h-96 object-cover will-change-transform"
                  loading="lazy"
                  width={1200}
                  height={800}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsScene;
