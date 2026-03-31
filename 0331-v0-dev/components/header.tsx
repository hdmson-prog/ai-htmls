"use client"

import { useState, useEffect } from "react"
import { Menu, X, ChevronDown } from "lucide-react"

const navItems = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Products", href: "#products", hasDropdown: true },
  { name: "Solutions", href: "#solutions" },
  { name: "News", href: "#news" },
  { name: "Contact", href: "#contact" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-card/95 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
              isScrolled ? "bg-primary" : "bg-card"
            }`}>
              <svg
                viewBox="0 0 40 40"
                className={`w-8 h-8 transition-colors duration-300 ${
                  isScrolled ? "text-primary-foreground" : "text-primary"
                }`}
                fill="currentColor"
              >
                <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="20" cy="20" r="12" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="20" cy="20" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="20" cy="20" r="3" fill="currentColor" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <span className={`block text-xl font-bold tracking-tight transition-colors duration-300 ${
                isScrolled ? "text-foreground" : "text-card"
              }`}>
                PRECISION
              </span>
              <span className={`block text-xs tracking-[0.3em] uppercase transition-colors duration-300 ${
                isScrolled ? "text-muted-foreground" : "text-card/70"
              }`}>
                Bearings
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`relative flex items-center gap-1 text-sm font-medium tracking-wide uppercase transition-all duration-300 group ${
                  isScrolled
                    ? "text-foreground hover:text-accent"
                    : "text-card hover:text-card/70"
                }`}
              >
                {item.name}
                {item.hasDropdown && <ChevronDown className="w-3 h-3" />}
                <span className={`absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full ${
                  isScrolled ? "bg-accent" : "bg-card"
                }`} />
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#contact"
              className={`px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                isScrolled
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-card text-foreground hover:bg-card/90"
              }`}
            >
              Get Quote
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 transition-colors ${
              isScrolled ? "text-foreground" : "text-card"
            }`}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            isMobileMenuOpen ? "max-h-96 opacity-100 mt-6" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col gap-4 pb-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-sm font-medium tracking-wide uppercase transition-colors ${
                  isScrolled
                    ? "text-foreground hover:text-accent"
                    : "text-card hover:text-card/70"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <a
              href="#contact"
              className="mt-4 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-center bg-accent text-accent-foreground"
            >
              Get Quote
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}
