import teaRoomImg from "@/assets/tea-room.jpg";
import { useState } from "react";

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-padding bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-subheading font-display text-sm tracking-[0.3em] text-accent mb-4">Get in Touch</p>
          <h2 className="section-heading">Private Inquiry</h2>
          <div className="gold-divider mt-6" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
          <div className="image-frame aspect-[4/3] lg:aspect-auto">
            <img
              src={teaRoomImg}
              alt="Elegant tea room environment"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="flex items-center">
            {submitted ? (
              <div className="text-center w-full space-y-4">
                <p className="font-heading text-2xl text-foreground">Thank You</p>
                <p className="section-body">We will be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="w-full space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-2 block">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full bg-transparent border-b border-border py-3 font-body text-sm text-foreground focus:border-accent focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-2 block">
                      Company
                    </label>
                    <input
                      type="text"
                      className="w-full bg-transparent border-b border-border py-3 font-body text-sm text-foreground focus:border-accent focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-2 block">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full bg-transparent border-b border-border py-3 font-body text-sm text-foreground focus:border-accent focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-2 block">
                    Interest
                  </label>
                  <select className="w-full bg-transparent border-b border-border py-3 font-body text-sm text-foreground focus:border-accent focus:outline-none transition-colors">
                    <option>Wholesale Inquiry</option>
                    <option>Private Label</option>
                    <option>Export Partnership</option>
                    <option>General Inquiry</option>
                  </select>
                </div>
                <div>
                  <label className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-2 block">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full bg-transparent border-b border-border py-3 font-body text-sm text-foreground focus:border-accent focus:outline-none transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-12 py-3.5 bg-primary text-primary-foreground font-body text-sm tracking-widest uppercase hover:bg-forest/90 transition-colors duration-300"
                >
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
