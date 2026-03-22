import heroImage from "@/assets/hero-tea-plantation.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Misty green tea plantation at sunrise"
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/20 to-charcoal/60" />
      </div>
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
        <p className="fade-in font-display text-sm md:text-base tracking-[0.35em] uppercase text-gold-light mb-6">
          Since 1892 · Premium Green Tea
        </p>
        <h1 className="fade-in fade-in-delay-1 font-heading text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-medium text-primary-foreground leading-[1.1] max-w-4xl text-balance">
          The Art of <br className="hidden md:block" />
          <em className="italic">Pure</em> Green Tea
        </h1>
        <div className="fade-in fade-in-delay-2 w-12 h-px bg-accent mt-8 mb-8" />
        <p className="fade-in fade-in-delay-2 font-body text-base md:text-lg text-primary-foreground/80 max-w-xl leading-relaxed">
          Hand-picked from ancient mountain terraces, our teas embody centuries of craftsmanship and the pristine purity of nature.
        </p>
        <div className="fade-in fade-in-delay-3 flex flex-col sm:flex-row gap-4 mt-10">
          <a
            href="#featured-teas"
            className="px-10 py-3.5 bg-accent text-accent-foreground font-body text-sm tracking-widest uppercase hover:bg-gold-light transition-colors duration-300"
          >
            Explore Our Teas
          </a>
          <a
            href="#about"
            className="px-10 py-3.5 border border-primary-foreground/30 text-primary-foreground font-body text-sm tracking-widest uppercase hover:bg-primary-foreground/10 transition-colors duration-300"
          >
            Our Story
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
