import { Shield, Leaf, Award, MapPin } from "lucide-react";

const qualities = [
  {
    icon: Leaf,
    title: "Certified Organic",
    description: "All teas grown without pesticides or synthetic fertilizers, certified to international organic standards.",
  },
  {
    icon: Shield,
    title: "Lab Tested Purity",
    description: "Every batch undergoes rigorous laboratory testing for purity, ensuring the highest safety standards.",
  },
  {
    icon: Award,
    title: "Premium Grade",
    description: "Only the top 5% of each harvest meets our exacting quality criteria for flavor, aroma, and appearance.",
  },
  {
    icon: MapPin,
    title: "Origin Traceable",
    description: "Full traceability from plantation to cup — know exactly where and when your tea was harvested.",
  },
];

const QualitySection = () => {
  return (
    <section className="section-padding bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-subheading font-display text-sm tracking-[0.3em] text-accent mb-4">Our Promise</p>
          <h2 className="section-heading">Quality & Origin</h2>
          <div className="gold-divider mt-6" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {qualities.map((q) => (
            <div key={q.title} className="text-center space-y-4 p-8 bg-card">
              <div className="w-14 h-14 mx-auto flex items-center justify-center border border-accent/30">
                <q.icon className="w-6 h-6 text-accent" strokeWidth={1.5} />
              </div>
              <h3 className="font-heading text-lg font-medium text-foreground">{q.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{q.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QualitySection;
