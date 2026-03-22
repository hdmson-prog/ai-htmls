import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import chunmeeImg from "@/assets/product-chunmee.jpg";
import gunpowderImg from "@/assets/product-gunpowder.jpg";
import organicImg from "@/assets/product-organic.jpg";
import whiteTeaImg from "@/assets/category-white-tea.jpg";
import oolongImg from "@/assets/category-oolong.jpg";
import jasmineImg from "@/assets/category-jasmine.jpg";
import matchaImg from "@/assets/category-matcha.jpg";
import puerhImg from "@/assets/category-puerh.jpg";
import herbalImg from "@/assets/category-herbal.jpg";

const categories = [
  { name: "Chunmee", subtitle: "Eyebrow Tea", count: "12 Varieties", image: chunmeeImg },
  { name: "Gunpowder", subtitle: "Pearl Rolled", count: "8 Varieties", image: gunpowderImg },
  { name: "White Tea", subtitle: "Silver Needle", count: "6 Varieties", image: whiteTeaImg },
  { name: "Oolong", subtitle: "Semi-Oxidized", count: "9 Varieties", image: oolongImg },
  { name: "Jasmine", subtitle: "Scented Blossoms", count: "7 Varieties", image: jasmineImg },
  { name: "Matcha", subtitle: "Ceremonial Grade", count: "4 Varieties", image: matchaImg },
  { name: "Pu-erh", subtitle: "Aged & Fermented", count: "5 Varieties", image: puerhImg },
  { name: "Organic Leaf", subtitle: "Mountain Grown", count: "10 Varieties", image: organicImg },
  { name: "Herbal Blends", subtitle: "Wellness Infusions", count: "11 Varieties", image: herbalImg },
];

const CategoriesCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", checkScroll, { passive: true });
    return () => el?.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.7;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="py-20 md:py-28 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 xl:px-32">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="section-subheading font-display text-sm tracking-[0.3em] text-accent mb-4">
              Browse By Category
            </p>
            <h2 className="section-heading">Our Tea Categories</h2>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="w-11 h-11 flex items-center justify-center border border-border text-foreground hover:border-accent hover:text-accent transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="w-11 h-11 flex items-center justify-center border border-border text-foreground hover:border-accent hover:text-accent transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide pl-6 md:pl-12 lg:pl-20 xl:pl-32 pr-6 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((cat) => (
          <a
            key={cat.name}
            href="#featured-teas"
            className="group flex-shrink-0 w-[260px] md:w-[300px] snap-start"
          >
            <div className="image-frame aspect-[4/5] overflow-hidden relative">
              <img
                src={cat.image}
                alt={cat.name}
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 space-y-1">
                <p className="font-heading text-xl text-primary-foreground tracking-wide">{cat.name}</p>
                <p className="font-display text-sm text-gold-light italic">{cat.subtitle}</p>
                <p className="font-body text-xs tracking-widest uppercase text-primary-foreground/60 pt-1">
                  {cat.count}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Mobile scroll arrows */}
      <div className="flex sm:hidden justify-center gap-3 mt-6">
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className="w-10 h-10 flex items-center justify-center border border-border text-foreground hover:border-accent hover:text-accent transition-colors disabled:opacity-30"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className="w-10 h-10 flex items-center justify-center border border-border text-foreground hover:border-accent hover:text-accent transition-colors disabled:opacity-30"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

export default CategoriesCarousel;
