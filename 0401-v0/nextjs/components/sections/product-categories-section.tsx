'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const categories = [
  {
    title: 'Passenger Vehicles',
    description: 'Premium bearings engineered for comfort and performance',
    specs: '15-22mm bore diameter',
  },
  {
    title: 'Commercial Fleet',
    description: 'Heavy-duty solutions for maximum durability',
    specs: '25-35mm bore diameter',
  },
  {
    title: 'Performance & Racing',
    description: 'Ultra-precision for extreme conditions',
    specs: 'Ceramic hybrid options',
  },
  {
    title: 'Electric Vehicles',
    description: 'Optimized for EV-specific requirements',
    specs: 'Low noise design',
  },
]

export function ProductCategoriesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const cardsContainer = cardsRef.current

    if (!section || !cardsContainer) return

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

    // Cards staggered reveal with scale and depth
    const cards = cardsContainer.querySelectorAll('.category-card')
    cards.forEach((card, index) => {
      gsap.fromTo(card,
        { 
          y: 80, 
          opacity: 0, 
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
          delay: index * 0.1,
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === section || cards.item(0) === trigger.vars.trigger) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <section 
      ref={sectionRef}
      id="products"
      className="relative py-32 lg:py-48 bg-secondary overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="section-title max-w-3xl mb-16 lg:mb-24">
          <p className="text-sm tracking-[0.3em] uppercase text-accent-foreground font-medium mb-4">
            Product Range
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-foreground leading-[1.2] text-balance">
            Solutions for Every Application
          </h2>
        </div>

        {/* Categories Grid */}
        <div 
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((category, index) => (
            <div
              key={index}
              className="category-card group relative bg-card rounded-sm p-8 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 cursor-pointer"
            >
              {/* Card number */}
              <span className="text-6xl font-serif font-medium text-muted/50 absolute top-6 right-6">
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Content */}
              <div className="relative z-10 pt-16">
                <h3 className="text-xl font-medium text-foreground mb-3">
                  {category.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {category.description}
                </p>
                <p className="text-xs tracking-wide text-accent-foreground font-medium">
                  {category.specs}
                </p>
              </div>

              {/* Hover arrow */}
              <div className="absolute bottom-8 right-8 w-10 h-10 rounded-full bg-foreground flex items-center justify-center opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                <ArrowUpRight className="w-4 h-4 text-background" />
              </div>

              {/* Border accent on hover */}
              <div className="absolute inset-0 rounded-sm border border-transparent transition-colors duration-300 group-hover:border-accent/50" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
