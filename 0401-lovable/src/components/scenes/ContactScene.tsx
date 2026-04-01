import { useEffect, useRef, useState, type FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ContactScene = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-inner",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "top 45%",
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      className="scene-section py-32 lg:py-48"
      style={{ background: "hsl(var(--background))" }}
    >
      <div className="contact-inner container mx-auto px-6 lg:px-16 max-w-3xl">
        <div className="text-center mb-16">
          <span className="text-label block mb-4">Get In Touch</span>
          <div className="gold-line mx-auto mb-8" />
          <h2 className="text-display text-4xl md:text-5xl font-bold text-foreground">
            Let's Talk Precision
          </h2>
        </div>

        {submitted ? (
          <div className="text-center py-16">
            <div className="text-display text-2xl font-bold gold-accent mb-4">Thank You</div>
            <p className="text-body text-muted-foreground">
              We've received your message and will respond within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FloatingInput label="Full Name" name="name" required />
              <FloatingInput label="Email Address" name="email" type="email" required />
              <FloatingInput label="Company" name="company" />
              <FloatingInput label="Phone" name="phone" type="tel" />
            </div>
            <FloatingTextarea label="Your Message" name="message" required />
            <div className="text-center pt-4">
              <button
                type="submit"
                className="px-12 py-4 text-body text-sm uppercase tracking-widest font-medium transition-all duration-300 border"
                style={{
                  background: "hsl(var(--charcoal))",
                  color: "hsl(var(--background))",
                  borderColor: "hsl(var(--charcoal))",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "hsl(var(--gold))";
                  e.currentTarget.style.borderColor = "hsl(var(--gold))";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "hsl(var(--charcoal))";
                  e.currentTarget.style.borderColor = "hsl(var(--charcoal))";
                }}
              >
                Send Message
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

const FloatingInput = ({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) => (
  <div className="floating-label-input">
    <input type={type} name={name} placeholder=" " required={required} />
    <label>{label}</label>
  </div>
);

const FloatingTextarea = ({
  label,
  name,
  required = false,
}: {
  label: string;
  name: string;
  required?: boolean;
}) => (
  <div className="floating-label-input">
    <textarea name={name} rows={4} placeholder=" " required={required} />
    <label>{label}</label>
  </div>
);

export default ContactScene;
