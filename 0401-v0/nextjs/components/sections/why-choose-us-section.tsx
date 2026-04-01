'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    title: 'Precision Manufacturing',
    description: 'Every bearing is manufactured to tolerances of 0.001mm, ensuring perfect fit and optimal performance across all applications.',
    highlight: '0.001mm tolerance',
  },
  {
    title: 'Advanced Materials',
    description: 'We use only the highest grade steel and ceramic materials, sourced from certified suppliers and rigorously tested.',
    highlight: 'Grade 10 Chrome Steel',
  },
  {
    title: 'Comprehensive Testing',
    description: 'Each product undergoes 47 quality checkpoints before leaving our facility, including load testing and acoustic analysis.',
    highlight: '47 Quality Checks',
  },
  {
    title: 'Global Support',
    description: 'Our technical support team is available 24/7 across all time zones, with regional warehouses ensuring rapid delivery.',
    highlight: '24/7 Global Coverage',
  },
]

export function WhyChooseUsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const blocksRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const blocksContainer = blocksRef.current

    if (!section || !blocksContainer) return

    const blocks = blocksContainer.querySelectorAll('.feature-block')

    // Create pinned story blocks
    blocks.forEach((block, index) => {
      const content = block.querySelector('.block-content')
      const image = block.querySelector('.block-image')
      const textElements = block.querySelectorAll('.animate-in')

      // Pin each block with overlap transition
      ScrollTrigger.create({
        trigger: block,
        start: 'top top',
        end: index === blocks.length - 1 ? 'bottom bottom' : 'bottom top',
        pin: index !== blocks.length - 1,
        pinSpacing: index !== blocks.length - 1,
      })

      // Content animation timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: block,
          start: 'top 80%',
          end: 'center center',
          scrub: 1,
        }
      })

      // Text lines animate
      tl.fromTo(textElements,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, ease: 'none' },
        0
      )

      // Image subtle movement
      if (image) {
        tl.fromTo(image,
          { scale: 1.05, y: 20 },
          { scale: 1, y: 0, ease: 'none' },
          0
        )
      }

      // Fade out current block as next comes in (except last)
      if (index < blocks.length - 1) {
        gsap.to(content, {
          opacity: 0.3,
          scale: 0.98,
          ease: 'none',
          scrollTrigger: {
            trigger: block,
            start: 'bottom 80%',
            end: 'bottom 20%',
            scrub: 1,
          }
        })
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        blocks.forEach(block => {
          if (trigger.vars.trigger === block) {
            trigger.kill()
          }
        })
      })
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-secondary"
    >
      {/* Section intro */}
      <div className="py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-sm tracking-[0.3em] uppercase text-accent-foreground font-medium mb-4">
              Why Choose Us
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-foreground leading-[1.2] text-balance">
              Excellence in Every Detail
            </h2>
          </div>
        </div>
      </div>

      {/* Feature blocks */}
      <div ref={blocksRef}>
        {features.map((feature, index) => (
          <div
            key={index}
            className="feature-block relative min-h-screen bg-secondary"
          >
            <div className="block-content h-screen flex items-center">
              <div className="container mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                  {/* Text Content */}
                  <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <span className="animate-in text-6xl md:text-7xl font-serif font-medium text-muted-foreground/30">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <h3 className="animate-in text-2xl md:text-3xl lg:text-4xl font-serif font-medium text-foreground leading-[1.2]">
                      {feature.title}
                    </h3>

                    <p className="animate-in text-lg text-muted-foreground leading-relaxed max-w-lg">
                      {feature.description}
                    </p>

                    <div className="animate-in pt-4">
                      <span className="inline-block px-4 py-2 bg-accent/20 text-accent-foreground text-sm font-medium rounded-sm">
                        {feature.highlight}
                      </span>
                    </div>
                  </div>

                  {/* Image Placeholder */}
                  <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="block-image relative aspect-[4/3] bg-background rounded-sm overflow-hidden">
                      {/* Abstract visual for each feature */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        {index === 0 && (
                          // Precision - concentric circles
                          <div className="relative w-48 h-48">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className="absolute rounded-full border border-muted-foreground/20"
                                style={{
                                  inset: `${i * 20}px`,
                                }}
                              />
                            ))}
                          </div>
                        )}
                        {index === 1 && (
                          // Materials - hexagonal pattern
                          <div className="grid grid-cols-3 gap-2">
                            {[...Array(9)].map((_, i) => (
                              <div
                                key={i}
                                className="w-12 h-12 bg-muted-foreground/10 rounded-sm transform rotate-45"
                              />
                            ))}
                          </div>
                        )}
                        {index === 2 && (
                          // Testing - progress bars
                          <div className="w-48 space-y-3">
                            {[85, 92, 78, 95, 88].map((width, i) => (
                              <div key={i} className="h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-muted-foreground/30 rounded-full"
                                  style={{ width: `${width}%` }}
                                />
                              </div>
                            ))}
                          </div>
                        )}
                        {index === 3 && (
                          // Global - connected nodes
                          <div className="relative w-48 h-48">
                            {[...Array(6)].map((_, i) => (
                              <div
                                key={i}
                                className="absolute w-4 h-4 bg-muted-foreground/20 rounded-full"
                                style={{
                                  top: `${(50 + 40 * Math.sin((i * Math.PI * 2) / 6)).toFixed(3)}%`,
                                  left: `${(50 + 40 * Math.cos((i * Math.PI * 2) / 6)).toFixed(3)}%`,
                                  transform: 'translate(-50%, -50%)',
                                }}
                              />
                            ))}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-8 h-8 bg-muted-foreground/30 rounded-full" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
