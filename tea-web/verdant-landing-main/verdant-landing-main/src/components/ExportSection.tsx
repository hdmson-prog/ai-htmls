import exportMap from "@/assets/export-map.jpg";

const stats = [
  { value: "40+", label: "Countries Served" },
  { value: "5,000", label: "Tons Annual Capacity" },
  { value: "130+", label: "Years of Heritage" },
  { value: "100%", label: "Quality Guaranteed" },
];

const ExportSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-subheading font-display text-sm tracking-[0.3em] text-accent mb-4">Global Reach</p>
          <h2 className="section-heading">Worldwide Supply</h2>
          <div className="gold-divider mt-6" />
        </div>
        <div className="image-frame aspect-[16/8] mb-16 max-w-5xl mx-auto">
          <img
            src={exportMap}
            alt="Global export markets map"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label} className="space-y-2">
              <p className="font-heading text-3xl md:text-4xl font-semibold text-accent">{s.value}</p>
              <p className="font-body text-sm tracking-wider uppercase text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExportSection;
