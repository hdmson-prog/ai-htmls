import roastingImg from "@/assets/craftsmanship-roasting.jpg";
import sortingImg from "@/assets/craftsmanship-sorting.jpg";
import dryingImg from "@/assets/craftsmanship-drying.jpg";

const steps = [
  {
    title: "Hand Roasting",
    description:
      "Our master artisans roast each batch by hand in traditional woks, carefully monitoring temperature and timing to unlock the tea's deepest flavors and aromas.",
    image: roastingImg,
    alt: "Tea master hand-roasting leaves in traditional wok",
  },
  {
    title: "Artisan Sorting",
    description:
      "Every leaf is inspected and sorted by experienced hands, ensuring only the most pristine buds and leaves make it into our final blends — a testament to uncompromising quality.",
    image: sortingImg,
    alt: "Hand sorting premium tea leaves on bamboo tray",
  },
  {
    title: "Natural Drying",
    description:
      "Spread across bamboo racks in sun-drenched pavilions, our tea leaves dry slowly and naturally, preserving the subtle essence that defines each variety.",
    image: dryingImg,
    alt: "Tea leaves drying on bamboo racks",
  },
];

const CraftsmanshipSection = () => {
  return (
    <section id="craftsmanship" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="section-subheading font-display text-sm tracking-[0.3em] text-accent mb-4">The Process</p>
          <h2 className="section-heading">Centuries of Craftsmanship</h2>
          <div className="gold-divider mt-6" />
        </div>
        <div className="space-y-24">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                i % 2 === 1 ? "lg:[direction:rtl]" : ""
              }`}
            >
              <div className="image-frame aspect-[16/10] lg:[direction:ltr]">
                <img
                  src={step.image}
                  alt={step.alt}
                  className="h-full w-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="space-y-5 lg:[direction:ltr]">
                <span className="font-display text-6xl text-accent/20 font-light">0{i + 1}</span>
                <h3 className="font-heading text-2xl md:text-3xl font-medium text-foreground -mt-4">{step.title}</h3>
                <div className="w-10 h-px bg-accent" />
                <p className="section-body">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CraftsmanshipSection;
