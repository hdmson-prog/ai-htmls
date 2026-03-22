const Footer = () => {
  return (
    <footer className="bg-primary px-6 py-16 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <p className="font-heading text-2xl tracking-wider text-primary-foreground">
              VERDANT<span className="text-accent">.</span>
            </p>
            <p className="font-body text-sm text-primary-foreground/60 leading-relaxed max-w-xs">
              Premium green tea cultivated with care, crafted with heritage, delivered with excellence.
            </p>
          </div>
          <div className="space-y-4">
            <p className="font-body text-xs tracking-widest uppercase text-accent">Navigation</p>
            <div className="space-y-2">
              {["Our Story", "The Collection", "Craftsmanship", "Quality", "Contact"].map((l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase().replace(/\s/g, "-")}`}
                  className="block font-body text-sm text-primary-foreground/60 hover:text-accent transition-colors"
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <p className="font-body text-xs tracking-widest uppercase text-accent">Contact</p>
            <div className="space-y-2 font-body text-sm text-primary-foreground/60">
              <p>info@verdanttea.com</p>
              <p>+86 571 8888 9999</p>
              <p>Hangzhou, Zhejiang Province<br />China</p>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-primary-foreground/40">
            © 2026 Verdant Tea Co. All rights reserved.
          </p>
          <p className="font-display text-xs italic text-primary-foreground/30 tracking-wider">
            From mountain to cup, with reverence.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
