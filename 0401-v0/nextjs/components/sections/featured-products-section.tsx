'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const products = [
  { name: 'AX-7200 Series', type: 'Gen 3 Hub Unit', rating: '150,000 km' },
  { name: 'AX-8400 Pro', type: 'Integrated Sensor', rating: '200,000 km' },
  { name: 'AX-9100 Elite', type: 'Low Friction', rating: '250,000 km' },
  { name: 'AX-5500 Standard', type: 'Multi-Purpose', rating: '120,000 km' },
  { name: 'AX-6800 HD', type: 'Heavy Duty', rating: '180,000 km' },
  { name: 'AX-9500 EV', type: 'Electric Optimized', rating: '300,000 km' },
  { name: 'AX-7700 Sport', type: 'Performance', rating: '100,000 km' },
  { name: 'AX-8200 Ceramic', type: 'Hybrid Ceramic', rating: '400,000 km' },
]

export function FeaturedProductsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const grid = gridRef.current

    if (!section || !grid) return

    // Title animation
    const title = section.querySelector('.section-title')
    if (title) {
      gsap.fromTo(title,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      )
    }

    // Products reveal by row
    const rows = grid.querySelectorAll('.product-row')
    rows.forEach((row, rowIndex) => {
      const items = row.querySelectorAll('.product-item')
      
      gsap.fromTo(items,
        { 
          y: 60, 
          opacity: 0, 
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          delay: rowIndex * 0.15,
        }
      )
    })

    // Lighting sweep effect simulation
    const sweepOverlay = section.querySelector('.sweep-overlay')
    if (sweepOverlay) {
      gsap.fromTo(sweepOverlay,
        { xPercent: -100 },
        {
          xPercent: 200,
          duration: 2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none none',
          }
        }
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === section || trigger.vars.trigger === title) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 lg:py-48 bg-background overflow-hidden"
    >
      {/* Sweep overlay for lighting effect */}
      <div className="sweep-overlay absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-accent/10 to-transparent pointer-events-none z-10" />

      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="section-title flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 lg:mb-24">
          <div>
            <p className="text-sm tracking-[0.3em] uppercase text-accent-foreground font-medium mb-4">
              Featured Products
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-foreground leading-[1.2]">
              Our Flagship Range
            </h2>
          </div>
          <a 
            href="#products" 
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground group"
          >
            View All Products
            <svg 
              className="w-4 h-4 transform transition-transform group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        {/* Products Grid - 4x2 */}
        <div ref={gridRef} className="space-y-6">
          {/* Row 1 */}
          <div className="product-row grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product, index) => (
              <div
                key={index}
                className="product-item group relative aspect-square bg-secondary rounded-sm overflow-hidden cursor-pointer"
              >
                {/* Product visual placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3/4 h-3/4 relative">
                    {/* Bearing ring visualization */}
                    <div className="absolute inset-0 rounded-full border-[12px] border-muted-foreground/15 transition-all duration-500 group-hover:border-accent/30" />
                    <div className="absolute inset-6 rounded-full border-[8px] border-muted-foreground/10 transition-all duration-500 group-hover:border-accent/20" />
                    <div className="absolute inset-12 rounded-full bg-muted-foreground/5 transition-all duration-500 group-hover:bg-accent/10" />
                  </div>
                </div>

                {/* Product info overlay */}
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-background/90 to-transparent translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <h4 className="text-lg font-medium text-foreground">{product.name}</h4>
                  <p className="text-sm text-muted-foreground">{product.type}</p>
                  <p className="text-xs text-accent-foreground mt-1">Rating: {product.rating}</p>
                </div>

                {/* Subtle border */}
                <div className="absolute inset-0 rounded-sm border border-border transition-colors duration-300 group-hover:border-accent/30" />
              </div>
            ))}
          </div>

          {/* Row 2 */}
          <div className="product-row grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(4, 8).map((product, index) => (
              <div
                key={index}
                className="product-item group relative aspect-square bg-secondary rounded-sm overflow-hidden cursor-pointer"
              >
                {/* Product visual placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3/4 h-3/4 relative">
                    {/* Bearing ring visualization */}
                    <div className="absolute inset-0 rounded-full border-[12px] border-muted-foreground/15 transition-all duration-500 group-hover:border-accent/30" />
                    <div className="absolute inset-6 rounded-full border-[8px] border-muted-foreground/10 transition-all duration-500 group-hover:border-accent/20" />
                    <div className="absolute inset-12 rounded-full bg-muted-foreground/5 transition-all duration-500 group-hover:bg-accent/10" />
                  </div>
                </div>

                {/* Product info overlay */}
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-background/90 to-transparent translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <h4 className="text-lg font-medium text-foreground">{product.name}</h4>
                  <p className="text-sm text-muted-foreground">{product.type}</p>
                  <p className="text-xs text-accent-foreground mt-1">Rating: {product.rating}</p>
                </div>

                {/* Subtle border */}
                <div className="absolute inset-0 rounded-sm border border-border transition-colors duration-300 group-hover:border-accent/30" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
