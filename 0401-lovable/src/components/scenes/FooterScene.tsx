const FooterScene = () => {
  return (
    <footer
      className="py-20 lg:py-28"
      style={{ background: "hsl(var(--charcoal))", color: "hsl(var(--metallic-light))" }}
    >
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <h3 className="text-display text-xl font-bold mb-4" style={{ color: "hsl(var(--background))" }}>
              APEX<span className="gold-accent">BEARING</span>
            </h3>
            <p className="text-body text-sm leading-relaxed" style={{ color: "hsl(var(--metallic))" }}>
              Global leader in precision wheel hub bearing manufacturing since 1962.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-body text-xs uppercase tracking-widest font-medium mb-4" style={{ color: "hsl(var(--gold))" }}>
              Products
            </h4>
            <ul className="space-y-2 text-body text-sm" style={{ color: "hsl(var(--metallic))" }}>
              <li>Passenger Vehicle Bearings</li>
              <li>Commercial Truck Bearings</li>
              <li>Performance Racing Series</li>
              <li>EV-Optimized Bearings</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-body text-xs uppercase tracking-widest font-medium mb-4" style={{ color: "hsl(var(--gold))" }}>
              Company
            </h4>
            <ul className="space-y-2 text-body text-sm" style={{ color: "hsl(var(--metallic))" }}>
              <li>About Us</li>
              <li>Engineering</li>
              <li>Quality Assurance</li>
              <li>Careers</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-body text-xs uppercase tracking-widest font-medium mb-4" style={{ color: "hsl(var(--gold))" }}>
              Contact
            </h4>
            <ul className="space-y-2 text-body text-sm" style={{ color: "hsl(var(--metallic))" }}>
              <li>info@apexbearing.com</li>
              <li>+49 (0) 711 555 0000</li>
              <li>Stuttgart, Germany</li>
            </ul>
          </div>
        </div>

        <div
          className="border-t pt-8 flex flex-col md:flex-row justify-between items-center text-body text-xs"
          style={{ borderColor: "hsl(var(--charcoal-light))", color: "hsl(var(--metallic))" }}
        >
          <span>© 2026 ApexBearing GmbH. All rights reserved.</span>
          <span className="mt-2 md:mt-0">Precision. Performance. Trust.</span>
        </div>
      </div>
    </footer>
  );
};

export default FooterScene;
