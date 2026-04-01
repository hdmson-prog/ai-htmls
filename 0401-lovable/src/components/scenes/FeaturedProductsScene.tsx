import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

gsap.registerPlugin(ScrollTrigger);

const products = [
  { name: "HB-X200 Gen III", series: "Passenger", spec: "ABS Compatible", image: product1 },
  { name: "HB-T500 Pro", series: "Heavy Duty", spec: "Extended Life", image: product2 },
  { name: "HB-R100 Elite", series: "Performance", spec: "High RPM", image: product3 },
  { name: "HB-E300 Silent", series: "EV Series", spec: "Ultra-Low Friction", image: product4 },
  { name: "HB-X250 Sport", series: "Passenger", spec: "Track Ready", image: product1 },
  { name: "HB-T600 Max", series: "Heavy Duty", spec: "Corrosion Shield", image: product2 },
  { name: "HB-R200 Ultra", series: "Performance", spec: "Ceramic Hybrid", image: product3 },
  { name: "HB-E400 Flux", series: "EV Series", spec: "Regen Compatible", image: product4 },
];

const FeaturedProductsScene = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Row 1
      gsap.fromTo(
        ".product-row-1 .product-card",
        { opacity: 0, scale: 0.95, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: ".product-row-1",
            start: "top 80%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );

      // Row 2
      gsap.fromTo(
        ".product-row-2 .product-card",
        { opacity: 0, scale: 0.95, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: ".product-row-2",
            start: "top 80%",
            end: "top 30%",
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
        <div className="text-center mb-20">
          <span className="text-label block mb-4">Featured Products</span>
          <div className="gold-line mx-auto mb-8" />
          <h2 className="text-display text-4xl md:text-5xl font-bold text-foreground">
            The Precision Lineup
          </h2>
        </div>

        {/* Row 1 */}
        <div className="product-row-1 grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.name} product={p} />
          ))}
        </div>

        {/* Row 2 */}
        <div className="product-row-2 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {products.slice(4).map((p) => (
            <ProductCard key={p.name} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProductCard = ({ product }: { product: typeof products[0] }) => (
  <div className="product-card surface-card overflow-hidden group cursor-pointer">
    <div className="relative overflow-hidden aspect-square bg-muted">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
        width={600}
        height={600}
      />
      <div
        className="absolute top-3 left-3 px-2 py-1 text-xs uppercase tracking-wider"
        style={{ background: "hsl(var(--gold) / 0.9)", color: "hsl(var(--background))" }}
      >
        {product.series}
      </div>
    </div>
    <div className="p-4">
      <h4 className="text-display font-semibold text-foreground text-sm mb-1">{product.name}</h4>
      <p className="text-body text-xs text-muted-foreground">{product.spec}</p>
    </div>
  </div>
);

export default FeaturedProductsScene;
