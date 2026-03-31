"use client"

import { useEffect, useRef, useState } from "react"
import { CheckCircle2, Award, Globe2, Users } from "lucide-react"

const features = [
  "ISO 9001:2015 Certified Manufacturing",
  "Advanced CNC Machining Technology",
  "Proprietary Heat Treatment Process",
  "Zero-Defect Quality Assurance",
  "24/7 Global Technical Support",
  "Custom Engineering Solutions",
]

const stats = [
  { icon: Award, value: "40+", label: "Years Experience" },
  { icon: Globe2, value: "60+", label: "Countries Served" },
  { icon: Users, value: "500+", label: "OEM Partners" },
]

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-24 lg:py-32 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Content */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            <span className="inline-block text-accent text-sm font-semibold tracking-[0.3em] uppercase mb-4">
              About Us
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground font-bold leading-tight mb-6">
              <span className="text-balance">Engineering Excellence Since 1985</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              For over four decades, we have been at the forefront of precision bearing manufacturing. 
              Our commitment to innovation, quality, and customer satisfaction has made us a trusted 
              partner for automotive manufacturers and industrial leaders worldwide.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-10">
              From our state-of-the-art facilities, we produce wheel hub bearings that meet the 
              most demanding specifications. Every bearing undergoes rigorous testing to ensure 
              optimal performance under extreme conditions.
            </p>

            {/* Features List */}
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {features.map((feature, index) => (
                <div
                  key={feature}
                  className={`flex items-center gap-3 transition-all duration-500`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-sm text-foreground font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-border">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`transition-all duration-700`}
                  style={{ transitionDelay: `${index * 150 + 400}ms` }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <stat.icon className="w-6 h-6 text-accent" />
                    <span className="text-3xl font-bold text-foreground">{stat.value}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image Placeholder */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            <div className="relative aspect-[4/5] bg-secondary overflow-hidden">
              {/* Placeholder with geometric pattern */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full border-4 border-dashed border-border flex items-center justify-center">
                    <svg
                      viewBox="0 0 100 100"
                      className="w-16 h-16 text-muted-foreground/40"
                      fill="currentColor"
                    >
                      <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
                      <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="2" />
                      <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="2" />
                      <circle cx="50" cy="50" r="5" fill="currentColor" />
                    </svg>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Replace with company image
                  </p>
                  <p className="text-muted-foreground/60 text-xs mt-2">
                    Recommended: 800x1000px
                  </p>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/10" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 border-2 border-accent/20" />
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-8 -left-8 bg-primary text-primary-foreground p-6 shadow-2xl">
              <div className="text-4xl font-bold">40+</div>
              <div className="text-sm opacity-80">Years of Excellence</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
