"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"

const categories = [
  {
    id: 1,
    title: "Automotive Bearings",
    description: "High-performance wheel hub bearings for passenger vehicles",
    count: "120+ SKUs",
  },
  {
    id: 2,
    title: "Commercial Vehicle",
    description: "Heavy-duty bearings for trucks and commercial fleets",
    count: "85+ SKUs",
  },
  {
    id: 3,
    title: "Industrial Series",
    description: "Precision bearings for industrial machinery applications",
    count: "200+ SKUs",
  },
  {
    id: 4,
    title: "Specialty Bearings",
    description: "Custom solutions for aerospace and marine industries",
    count: "50+ SKUs",
  },
]

export function ProductCategories() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="products" ref={sectionRef} className="py-24 lg:py-32 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block text-accent text-sm font-semibold tracking-[0.3em] uppercase mb-4">
            Product Categories
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground font-bold leading-tight mb-6">
            <span className="text-balance">Comprehensive Bearing Solutions</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            From automotive to aerospace, our diverse product range meets the demanding 
            requirements of modern industries.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={`group relative bg-card p-8 transition-all duration-500 hover:shadow-xl cursor-pointer ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 100 + 200}ms` }}
            >
              {/* Category Number */}
              <span className="absolute top-6 right-6 text-6xl font-bold text-border/50 group-hover:text-accent/20 transition-colors duration-300">
                {String(category.id).padStart(2, "0")}
              </span>

              {/* Icon Placeholder */}
              <div className="w-16 h-16 mb-6 bg-secondary rounded-lg flex items-center justify-center group-hover:bg-accent/10 transition-colors duration-300">
                <svg
                  viewBox="0 0 40 40"
                  className="w-8 h-8 text-primary group-hover:text-accent transition-colors duration-300"
                  fill="currentColor"
                >
                  <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="20" cy="20" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="20" cy="20" r="4" fill="currentColor" />
                </svg>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                {category.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {category.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-accent tracking-wider uppercase">
                  {category.count}
                </span>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
              </div>

              {/* Hover Border */}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
