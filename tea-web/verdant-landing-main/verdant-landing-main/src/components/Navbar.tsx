import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Our Story", href: "#about" },
  { label: "Teas", href: "#featured-teas" },
  { label: "Craftsmanship", href: "#craftsmanship" },
  { label: "Quality", href: "#quality" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-charcoal/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="#" className="font-heading text-xl tracking-wider text-primary-foreground">
          VERDANT<span className="text-accent">.</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="font-body text-xs tracking-widest uppercase text-primary-foreground/70 hover:text-accent transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-primary-foreground"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-charcoal/95 backdrop-blur-md px-6 pb-6 space-y-4">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block font-body text-sm tracking-widest uppercase text-primary-foreground/70 hover:text-accent transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
