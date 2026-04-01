'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const showcaseItems = [
  { title: 'Manufacturing Floor', category: 'Facilities' },
  { title: 'Quality Control Lab', category: 'Testing' },
  { title: 'R&D Center', category: 'Innovation' },
  { title: 'Assembly Line', category: 'Production' },
  { title: 'Global Logistics', category: 'Distribution' },
  { title: 'Customer Support', category: 'Service' },
]

export function ShowcaseCarouselSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    const itemsContainer = itemsRef.current

    if (!section || !track || !itemsContainer) return

    const items = itemsContainer.querySelectorAll('.carousel-item')
    const totalWidth = itemsContainer.scrollWidth - window.innerWidth

    // Horizontal scroll linked to vertical scroll
    gsap.to(itemsContainer, {
      x: -totalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${totalWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    })

    // Scale and opacity variation for each item
    items.forEach((item) => {
      const itemElement = item as HTMLElement

      gsap.fromTo(itemElement,
        { scale: 0.9, opacity: 0.5 },
        {
          scale: 1,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: itemElement,
            containerAnimation: gsap.getById('horizontal') as gsap.core.Tween,
            start: 'left center',
            end: 'center center',
            scrub: true,
          }
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === section) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen bg-secondary overflow-hidden"
    >
      {/* Header */}
      <div className="absolute top-12 left-0 right-0 z-10">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm tracking-[0.3em] uppercase text-accent-foreground font-medium mb-2">
                Inside AXIOM
              </p>
              <h2 className="text-2xl md:text-3xl font-serif font-medium text-foreground">
                Our World-Class Facilities
              </h2>
            </div>
            <p className="hidden md:block text-sm text-muted-foreground">
              Scroll to explore →
            </p>
          </div>
        </div>
      </div>

      {/* Carousel Track */}
      <div
        ref={trackRef}
        className="h-full flex items-center"
      >
        <div
          ref={itemsRef}
          className="flex gap-6 px-6 lg:px-12 py-24"
          style={{ width: 'max-content' }}
        >
          {showcaseItems.map((item, index) => (
            <div
              key={index}
              className="carousel-item relative w-[350px] md:w-[450px] lg:w-[550px] aspect-[4/3] flex-shrink-0 bg-background rounded-sm overflow-hidden group cursor-pointer"
            >
              {/* Image placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-muted to-secondary">
                {/* Abstract visual for each showcase item */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                  {index === 0 && (
                    <div className="grid grid-cols-4 gap-3">
                      {[...Array(16)].map((_, i) => (
                        <div key={i} className="w-8 h-8 bg-muted-foreground/20 rounded-sm" />
                      ))}
                    </div>
                  )}
                  {index === 1 && (
                    <div className="w-32 h-32 rounded-full border-8 border-muted-foreground/20 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full border-4 border-muted-foreground/20" />
                    </div>
                  )}
                  {index === 2 && (
                    <div className="space-y-2">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-3 bg-muted-foreground/20 rounded-full" style={{ width: `${120 - i * 15}px` }} />
                      ))}
                    </div>
                  )}
                  {index === 3 && (
                    <div className="flex gap-2">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-16 h-24 bg-muted-foreground/20 rounded-sm" />
                      ))}
                    </div>
                  )}
                  {index === 4 && (
                    <div className="relative w-32 h-32">
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-3 h-3 bg-muted-foreground/30 rounded-full"
                          style={{
                            top: `${(50 + 40 * Math.sin((i * Math.PI * 2) / 6)).toFixed(3)}%`,
                            left: `${(50 + 40 * Math.cos((i * Math.PI * 2) / 6)).toFixed(3)}%`,
                          }}
                        />
                      ))}
                    </div>
                  )}
                  {index === 5 && (
                    <div className="w-24 h-24 rounded-full bg-muted-foreground/20 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-muted-foreground/20" />
                    </div>
                  )}
                </div>
              </div>

              {/* Content overlay */}
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-foreground/80 to-transparent">
                <p className="text-xs tracking-[0.2em] uppercase text-primary-foreground/60 mb-1">
                  {item.category}
                </p>
                <h3 className="text-xl font-medium text-primary-foreground">
                  {item.title}
                </h3>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-foreground/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-12 left-0 right-0">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="h-px bg-border">
            <div className="h-full w-1/6 bg-foreground transition-all duration-300" />
          </div>
        </div>
      </div>
    </section>
  )
}
