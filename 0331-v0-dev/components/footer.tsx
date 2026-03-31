"use client"

import { Facebook, Twitter, Linkedin, Youtube, Instagram, ArrowUp, MapPin } from "lucide-react"

const footerLinks = {
  products: [
    { name: "Automotive Bearings", href: "#" },
    { name: "Commercial Vehicle", href: "#" },
    { name: "Industrial Series", href: "#" },
    { name: "Specialty Bearings", href: "#" },
    { name: "New Products", href: "#" },
  ],
  company: [
    { name: "About Us", href: "#" },
    { name: "Leadership Team", href: "#" },
    { name: "History", href: "#" },
    { name: "Manufacturing", href: "#" },
    { name: "Sustainability", href: "#" },
  ],
  resources: [
    { name: "Technical Specs", href: "#" },
    { name: "Product Catalogs", href: "#" },
    { name: "Installation Guides", href: "#" },
    { name: "FAQs", href: "#" },
    { name: "Downloads", href: "#" },
  ],
  support: [
    { name: "Contact Us", href: "#" },
    { name: "Find a Distributor", href: "#" },
    { name: "Technical Support", href: "#" },
    { name: "Warranty Info", href: "#" },
    { name: "Request Quote", href: "#" },
  ],
}

const offices = [
  { region: "Americas", city: "Detroit, USA" },
  { region: "Europe", city: "Stuttgart, Germany" },
  { region: "Asia Pacific", city: "Shanghai, China" },
]

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Instagram, href: "#", label: "Instagram" },
]

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-12">
        <div className="grid lg:grid-cols-6 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary-foreground rounded-full flex items-center justify-center">
                <svg
                  viewBox="0 0 40 40"
                  className="w-8 h-8 text-primary"
                  fill="currentColor"
                >
                  <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="20" cy="20" r="12" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="20" cy="20" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="20" cy="20" r="3" fill="currentColor" />
                </svg>
              </div>
              <div>
                <span className="block text-xl font-bold tracking-tight">PRECISION</span>
                <span className="block text-xs tracking-[0.3em] uppercase opacity-70">
                  Bearings
                </span>
              </div>
            </div>

            <p className="text-primary-foreground/70 leading-relaxed mb-8 max-w-sm">
              World-class wheel hub bearing manufacturer delivering precision engineering 
              and innovation since 1985. Trusted by automotive leaders worldwide.
            </p>

            {/* Global Offices */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
                Global Offices
              </h4>
              {offices.map((office) => (
                <div key={office.region} className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span className="text-primary-foreground/70">
                    <span className="text-primary-foreground">{office.region}:</span> {office.city}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-16 pt-12 border-t border-primary-foreground/10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-lg font-bold mb-2">Stay Updated</h4>
              <p className="text-sm text-primary-foreground/70">
                Subscribe to receive product updates, industry news, and exclusive offers.
              </p>
            </div>
            <form className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-accent transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-accent text-accent-foreground font-semibold uppercase tracking-wider text-sm hover:bg-accent/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="text-sm text-primary-foreground/60 text-center md:text-left">
              &copy; {new Date().getFullYear()} Precision Bearings Inc. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                Terms of Use
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                Cookie Policy
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                Accessibility
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/60 hover:bg-primary-foreground/10 hover:text-primary-foreground hover:border-primary-foreground/40 transition-all duration-200"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-accent text-accent-foreground flex items-center justify-center shadow-lg hover:bg-accent/90 transition-all duration-300 z-50"
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  )
}
