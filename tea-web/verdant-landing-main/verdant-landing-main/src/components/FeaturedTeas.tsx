import chunmeeImg from "@/assets/product-chunmee.jpg";
import gunpowderImg from "@/assets/product-gunpowder.jpg";
import organicImg from "@/assets/product-organic.jpg";
import packagingImg from "@/assets/product-packaging.jpg";

const teas = [
  {
    name: "Chunmee Supreme",
    origin: "Zhejiang Province",
    profile: "Plum-like sweetness with a smooth, lingering finish",
    image: chunmeeImg,
    alt: "Chunmee green tea leaves in ceramic bowl",
  },
  {
    name: "Gunpowder Pearl",
    origin: "Pingshui Region",
    profile: "Bold, slightly smoky with a clean mineral depth",
    image: gunpowderImg,
    alt: "Gunpowder green tea pellets",
  },
  {
    name: "Organic Spring Leaf",
    origin: "Huangshan Mountains",
    profile: "Delicate, floral with notes of fresh chestnut",
    image: organicImg,
    alt: "Organic loose leaf green tea",
  },
  {
    name: "Heritage Collection",
    origin: "Private Label",
    profile: "Custom blends crafted for discerning partners worldwide",
    image: packagingImg,
    alt: "Premium tea packaging collection",
  },
];

const FeaturedTeas = () => {
  return (
    <section id="featured-teas" className="section-padding bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-subheading font-display text-sm tracking-[0.3em] text-accent mb-4">The Collection</p>
          <h2 className="section-heading">Our Finest Teas</h2>
          <div className="gold-divider mt-6" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teas.map((tea) => (
            <div key={tea.name} className="group bg-card">
              <div className="image-frame aspect-square overflow-hidden">
                <img
                  src={tea.image}
                  alt={tea.alt}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="p-6 space-y-3">
                <p className="font-display text-xs tracking-[0.25em] uppercase text-accent">{tea.origin}</p>
                <h3 className="font-heading text-xl font-medium text-foreground">{tea.name}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{tea.profile}</p>
                <a
                  href="#contact"
                  className="inline-block pt-2 font-body text-xs tracking-widest uppercase text-accent border-b border-accent/40 pb-0.5 hover:border-accent transition-colors duration-300"
                >
                  Explore
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTeas;
