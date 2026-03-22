import brewingImg from "@/assets/tea-brewing.jpg";
import teaSetImg from "@/assets/tea-set.jpg";
import servingImg from "@/assets/tea-serving.jpg";
import lifestyleImg from "@/assets/tea-lifestyle.jpg";

const experiences = [
  { label: "The Brewing Ritual", image: brewingImg, alt: "Elegant tea brewing" },
  { label: "Traditional Tea Sets", image: teaSetImg, alt: "Ceramic tea set arrangement" },
  { label: "The Art of Serving", image: servingImg, alt: "Pouring green tea" },
  { label: "Moments of Calm", image: lifestyleImg, alt: "Tea lifestyle scene" },
];

const TeaExperienceSection = () => {
  return (
    <section className="section-padding bg-primary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-display text-sm tracking-[0.3em] uppercase text-gold-light mb-4">The Ritual</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium text-primary-foreground">
            A Tea Experience
          </h2>
          <div className="w-16 h-px bg-accent mx-auto mt-6" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {experiences.map((exp) => (
            <div key={exp.label} className="group relative">
              <div className="image-frame aspect-[3/4] overflow-hidden">
                <img
                  src={exp.image}
                  alt={exp.alt}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
              </div>
              <p className="absolute bottom-4 left-4 right-4 font-display text-sm md:text-base tracking-wider text-primary-foreground">
                {exp.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeaExperienceSection;
