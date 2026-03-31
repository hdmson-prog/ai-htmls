"use client"

import { useEffect, useRef, useState } from "react"
import { ShoppingCart, Eye, Star } from "lucide-react"

const products = [
  {
    id: 1,
    name: "WH-2000 Pro Series",
    category: "Front Wheel Hub",
    price: "$189.00",
    rating: 5,
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "WH-3500 Heavy Duty",
    category: "Rear Wheel Hub",
    price: "$245.00",
    rating: 5,
    badge: "New",
  },
  {
    id: 3,
    name: "WH-1200 Standard",
    category: "Front Wheel Hub",
    price: "$129.00",
    rating: 4,
    badge: null,
  },
  {
    id: 4,
    name: "WH-4000 Performance",
    category: "Racing Series",
    price: "$389.00",
    rating: 5,
    badge: "Premium",
  },
  {
    id: 5,
    name: "WH-2500 Commercial",
    category: "Truck Series",
    price: "$275.00",
    rating: 5,
    badge: null,
  },
  {
    id: 6,
    name: "WH-1800 Compact",
    category: "City Vehicles",
    price: "$159.00",
    rating: 4,
    badge: "Popular",
  },
  {
    id: 7,
    name: "WH-5000 Industrial",
    category: "Heavy Machinery",
    price: "$445.00",
    rating: 5,
    badge: "Premium",
  },
  {
    id: 8,
    name: "WH-3000 Hybrid",
    category: "Electric Vehicles",
    price: "$299.00",
    rating: 5,
    badge: "Eco",
  },
]

export function FeaturedProducts() {
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
    <section ref={sectionRef} className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div
          className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div>
            <span className="inline-block text-accent text-sm font-semibold tracking-[0.3em] uppercase mb-4">
              Featured Products
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground font-bold leading-tight">
              <span className="text-balance">Our Premium Selection</span>
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent transition-colors uppercase tracking-wider"
          >
            View All Products
            <span className="w-8 h-px bg-current" />
          </a>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`group relative bg-card border border-border overflow-hidden transition-all duration-500 hover:shadow-xl hover:border-accent/30 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 50 + 100}ms` }}
            >
              {/* Badge */}
              {product.badge && (
                <span className="absolute top-4 left-4 z-10 px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-accent text-accent-foreground">
                  {product.badge}
                </span>
              )}

              {/* Product Image Placeholder */}
              <div className="relative aspect-square bg-secondary overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    viewBox="0 0 100 100"
                    className="w-24 h-24 text-muted-foreground/20 group-hover:text-accent/30 transition-colors duration-500"
                    fill="currentColor"
                  >
                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
                    <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="1" />
                    <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="1" />
                    <circle cx="50" cy="50" r="8" fill="currentColor" />
                    {[...Array(8)].map((_, i) => (
                      <circle
                        key={i}
                        cx={50 + 30 * Math.cos((i * 45 * Math.PI) / 180)}
                        cy={50 + 30 * Math.sin((i * 45 * Math.PI) / 180)}
                        r="4"
                        fill="currentColor"
                        opacity="0.5"
                      />
                    ))}
                  </svg>
                </div>

                {/* Quick Actions */}
                <div className="absolute inset-0 bg-primary/80 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-12 h-12 bg-card text-foreground flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                    <Eye className="w-5 h-5" />
                  </button>
                  <button className="w-12 h-12 bg-card text-foreground flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  {product.category}
                </span>
                <h3 className="text-lg font-bold text-foreground mt-2 mb-2 group-hover:text-accent transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < product.rating
                          ? "text-accent fill-accent"
                          : "text-border"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-foreground">
                    {product.price}
                  </span>
                  <button className="text-xs font-semibold text-accent hover:text-accent/80 uppercase tracking-wider transition-colors">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
