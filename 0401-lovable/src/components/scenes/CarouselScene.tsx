import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import bearingDetail from "@/assets/bearing-detail.jpg";
import heroBearing from "@/assets/hero-bearing.jpg";

gsap.registerPlugin(ScrollTrigger);

const images = [product1, product2, product3, product4, bearingDetail, heroBearing];

const CarouselScene = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const scrollWidth = track.scrollWidth - track.clientWidth;

      gsap.to(track, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1500",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="scene-section h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "hsl(var(--background))" }}
    >
      <div className="container mx-auto px-6 lg:px-16 mb-12">
        <span className="text-label block mb-4">Gallery</span>
        <div className="gold-line mb-6" />
        <h2 className="text-display text-3xl md:text-4xl font-bold text-foreground">
          Crafted with Care
        </h2>
      </div>

      <div ref={trackRef} className="flex gap-6 px-6 lg:px-16 will-change-transform">
        {images.map((img, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[350px] md:w-[450px] lg:w-[550px] overflow-hidden"
          >
            <img
              src={img}
              alt={`Showcase ${i + 1}`}
              className="w-full h-[300px] md:h-[400px] object-cover"
              loading="lazy"
              width={600}
              height={400}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CarouselScene;
