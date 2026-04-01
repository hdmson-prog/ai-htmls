import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { title: "Passenger Vehicles", desc: "Premium hub units for sedans, SUVs, and crossovers", image: product1 },
  { title: "Commercial Trucks", desc: "Heavy-duty bearings for long-haul reliability", image: product2 },
  { title: "Performance Racing", desc: "Precision-tuned for extreme speed and heat", image: product3 },
  { title: "Electric Vehicles", desc: "Next-gen bearings for the EV revolution", image: product4 },
];

const ProductCategoriesScene = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".category-card",
        { opacity: 0, y: 80, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: ".categories-grid",
            start: "top 75%",
            end: "top 25%",
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
      style={{ background: "hsl(var(--background))" }}
    >
      <div className="container mx-auto px-6 lg:px-16">
        <div className="text-center mb-20">
          <span className="text-label block mb-4">Product Range</span>
          <div className="gold-line mx-auto mb-8" />
          <h2 className="text-display text-4xl md:text-5xl font-bold text-foreground">
            Built for Every Road
          </h2>
        </div>

        <div className="categories-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="category-card group surface-card overflow-hidden cursor-pointer transition-shadow duration-500 hover:shadow-2xl"
            >
              <div className="relative overflow-hidden h-64">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  width={600}
                  height={600}
                />
              </div>
              <div className="p-6">
                <h3 className="text-display text-lg font-semibold text-foreground mb-2">
                  {cat.title}
                </h3>
                <p className="text-body text-sm text-muted-foreground">{cat.desc}</p>
              </div>
              <div
                className="h-0.5 w-0 group-hover:w-full transition-all duration-500"
                style={{ background: "hsl(var(--gold))" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategoriesScene;
