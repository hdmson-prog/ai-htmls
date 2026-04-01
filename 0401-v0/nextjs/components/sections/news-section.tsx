'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const newsItems = [
  {
    date: 'March 2026',
    category: 'Innovation',
    title: 'AXIOM Unveils Next-Generation EV Bearing Technology',
    excerpt: 'Our new ceramic hybrid bearings achieve 40% reduction in friction for electric vehicles.',
  },
  {
    date: 'February 2026',
    category: 'Partnership',
    title: 'Strategic Alliance with Leading European OEM',
    excerpt: 'Expanded partnership to supply premium bearings for luxury vehicle line.',
  },
  {
    date: 'January 2026',
    category: 'Sustainability',
    title: 'Carbon Neutral Manufacturing Milestone Achieved',
    excerpt: 'All production facilities now operate with 100% renewable energy sources.',
  },
]

export function NewsSection() {
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

    // Cards staggered reveal - calm animation
    const cards = cardsContainer.querySelectorAll('.news-card')
    cards.forEach((card, index) => {
      gsap.fromTo(card,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
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
        if (trigger.vars.trigger === section || trigger.vars.trigger === title) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <section 
      ref={sectionRef}
      id="news"
      className="relative py-32 lg:py-48 bg-background overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="section-title flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-sm tracking-[0.3em] uppercase text-accent-foreground font-medium mb-4">
              News & Insights
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-foreground leading-[1.2]">
              Latest Updates
            </h2>
          </div>
          <a 
            href="#" 
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground group"
          >
            View All News
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

        {/* News Cards */}
        <div 
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {newsItems.map((item, index) => (
            <article
              key={index}
              className="news-card group cursor-pointer"
            >
              {/* Image placeholder */}
              <div className="relative aspect-[3/2] bg-secondary rounded-sm overflow-hidden mb-6">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border-2 border-muted-foreground/10" />
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-foreground/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-foreground flex items-center justify-center">
                    <ArrowUpRight className="w-5 h-5 text-background" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-muted-foreground">{item.date}</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                  <span className="text-accent-foreground font-medium">{item.category}</span>
                </div>

                <h3 className="text-xl font-medium text-foreground leading-tight group-hover:text-muted-foreground transition-colors">
                  {item.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
