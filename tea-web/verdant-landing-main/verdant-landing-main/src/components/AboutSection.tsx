import teaLeaves from "@/assets/tea-leaves-macro.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="image-frame aspect-[4/5] lg:aspect-[3/4]">
            <img
              src={teaLeaves}
              alt="Premium loose leaf green tea close-up"
              className="h-full w-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="space-y-6">
            <p className="section-subheading font-display text-sm tracking-[0.3em] text-accent">Our Heritage</p>
            <h2 className="section-heading">A Legacy Rooted in Nature</h2>
            <div className="gold-divider !mx-0 mt-4 mb-6" />
            <p className="section-body">
              Nestled among the misty peaks of ancient tea mountains, our plantations have cultivated the world's finest green teas for over a century. Every leaf tells a story of patience, tradition, and an unwavering commitment to purity.
            </p>
            <p className="section-body">
              From the first tender buds of spring to the careful art of processing, our master tea artisans honor techniques passed down through generations — ensuring each cup delivers an experience of extraordinary depth and elegance.
            </p>
            <div className="pt-4">
              <a
                href="#craftsmanship"
                className="inline-block font-body text-sm tracking-widest uppercase text-accent border-b border-accent pb-1 hover:text-gold-light hover:border-gold-light transition-colors duration-300"
              >
                Discover Our Process
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
