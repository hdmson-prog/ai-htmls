import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const articles = [
  {
    date: "Mar 2026",
    title: "Next-Gen EV Bearing Line Launched",
    excerpt: "Our new HB-E series delivers 30% lower friction for electric drivetrains.",
  },
  {
    date: "Feb 2026",
    title: "ISO 16949 Recertification Achieved",
    excerpt: "Continuous quality excellence recognized by international auditors.",
  },
  {
    date: "Jan 2026",
    title: "Expansion into Southeast Asian Markets",
    excerpt: "New distribution partnerships across Vietnam, Thailand, and Indonesia.",
  },
];

const NewsScene = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".news-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          ease: "none",
          scrollTrigger: {
            trigger: ".news-grid",
            start: "top 80%",
            end: "top 40%",
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
          <span className="text-label block mb-4">Insights</span>
          <div className="gold-line mx-auto mb-8" />
          <h2 className="text-display text-4xl md:text-5xl font-bold text-foreground">
            Latest News
          </h2>
        </div>

        <div className="news-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((a) => (
            <article
              key={a.title}
              className="news-card surface-card p-8 group cursor-pointer transition-shadow duration-300 hover:shadow-lg"
            >
              <span className="text-label block mb-4">{a.date}</span>
              <h3 className="text-display text-xl font-semibold text-foreground mb-4 group-hover:text-gold transition-colors duration-300">
                {a.title}
              </h3>
              <p className="text-body text-muted-foreground text-sm">{a.excerpt}</p>
              <div
                className="h-px w-0 group-hover:w-full mt-6 transition-all duration-500"
                style={{ background: "hsl(var(--gold))" }}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsScene;
