'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const parts = [
  { name: 'Outer Race', angle: 0, distance: 0 },
  { name: 'Inner Race', angle: 0, distance: 0 },
  { name: 'Ball Bearings', angle: 0, distance: 0 },
  { name: 'Cage Assembly', angle: 0, distance: 0 },
  { name: 'Seal System', angle: 0, distance: 0 },
]

export function EngineeringSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const partsRef = useRef<HTMLDivElement>(null)
  const labelsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const container = containerRef.current
    const partsContainer = partsRef.current
    const labelsContainer = labelsRef.current

    if (!section || !container || !partsContainer || !labelsContainer) return

    const partElements = partsContainer.querySelectorAll('.exploded-part')
    const labelElements = labelsContainer.querySelectorAll('.part-label')

    // Create pinned scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=300%',
        scrub: true,
        pin: true,
        anticipatePin: 1,
      }
    })

    // Phase 1: Intro text
    tl.fromTo(container.querySelector('.intro-text'),
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.3, ease: 'none' },
      0
    )

    // Phase 2: Explode parts
    partElements.forEach((part, index) => {
      const direction = index % 2 === 0 ? 1 : -1
      const yOffset = (index - 2) * 60
      
      tl.fromTo(part,
        { y: 0, opacity: 0.5, scale: 1 },
        { 
          y: yOffset * direction, 
          opacity: 1, 
          scale: 1.05,
          duration: 0.4, 
          ease: 'none' 
        },
        0.2
      )
    })

    // Phase 3: Show labels
    labelElements.forEach((label, index) => {
      tl.fromTo(label,
        { opacity: 0, x: index % 2 === 0 ? -30 : 30 },
        { opacity: 1, x: 0, duration: 0.2, ease: 'none' },
        0.4 + index * 0.05
      )
    })

    // Phase 4: Reassemble and fade intro text
    tl.to(container.querySelector('.intro-text'),
      { opacity: 0, duration: 0.2, ease: 'none' },
      0.7
    )

    partElements.forEach((part) => {
      tl.to(part,
        { y: 0, scale: 1, duration: 0.3, ease: 'none' },
        0.8
      )
    })

    // Phase 5: Final highlight
    tl.to(partsContainer,
      { scale: 1.1, duration: 0.2, ease: 'none' },
      0.9
    )

    labelElements.forEach((label) => {
      tl.to(label,
        { opacity: 0, duration: 0.15, ease: 'none' },
        0.85
      )
    })

    // Final text
    tl.fromTo(container.querySelector('.final-text'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.1, ease: 'none' },
      0.95
    )

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
      id="engineering"
      className="relative h-screen bg-background overflow-hidden"
    >
      <div 
        ref={containerRef}
        className="h-full flex items-center justify-center"
      >
        {/* Intro Text */}
        <div className="intro-text absolute top-1/4 left-1/2 -translate-x-1/2 text-center z-20 max-w-2xl px-6">
          <p className="text-sm tracking-[0.3em] uppercase text-accent-foreground font-medium mb-4">
            Engineering Excellence
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-foreground leading-[1.2]">
            Anatomy of Precision
          </h2>
        </div>

        {/* Exploded View Container */}
        <div className="relative w-[400px] h-[400px] md:w-[500px] md:h-[500px]">
          {/* Parts */}
          <div ref={partsRef} className="absolute inset-0 flex items-center justify-center">
            {parts.map((part, index) => (
              <div
                key={index}
                className="exploded-part absolute"
                style={{
                  width: `${320 - index * 40}px`,
                  height: `${320 - index * 40}px`,
                }}
              >
                {/* Visual representation */}
                {index === 0 && (
                  // Outer Race
                  <div className="w-full h-full rounded-full border-[24px] border-muted-foreground/20" />
                )}
                {index === 1 && (
                  // Inner Race
                  <div className="w-full h-full rounded-full border-[16px] border-muted-foreground/25" />
                )}
                {index === 2 && (
                  // Ball Bearings
                  <div className="w-full h-full relative">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-muted-foreground/40 to-muted-foreground/20"
                        style={{
                          top: '50%',
                          left: '50%',
                          transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-${100 - index * 15}px)`,
                        }}
                      />
                    ))}
                  </div>
                )}
                {index === 3 && (
                  // Cage Assembly
                  <div className="w-full h-full rounded-full border-[4px] border-dashed border-muted-foreground/15" />
                )}
                {index === 4 && (
                  // Seal System
                  <div className="w-full h-full rounded-full bg-muted-foreground/5" />
                )}
              </div>
            ))}
          </div>

          {/* Labels */}
          <div ref={labelsRef} className="absolute inset-0 pointer-events-none">
            {parts.map((part, index) => {
              const positions = [
                { top: '10%', right: '-40%' },
                { top: '30%', left: '-40%' },
                { bottom: '30%', right: '-40%' },
                { bottom: '10%', left: '-40%' },
                { top: '50%', right: '-45%' },
              ]
              return (
                <div
                  key={index}
                  className="part-label absolute opacity-0 whitespace-nowrap"
                  style={positions[index] as React.CSSProperties}
                >
                  <div className={`flex items-center gap-3 ${index % 2 === 0 ? '' : 'flex-row-reverse'}`}>
                    <div className={`w-16 h-px bg-muted-foreground/30 ${index % 2 === 0 ? '' : ''}`} />
                    <div className={index % 2 === 0 ? 'text-left' : 'text-right'}>
                      <p className="text-sm font-medium text-foreground">{part.name}</p>
                      <p className="text-xs text-muted-foreground">Component {index + 1}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Final Text */}
        <div className="final-text absolute bottom-1/4 left-1/2 -translate-x-1/2 text-center z-20 max-w-2xl px-6 opacity-0">
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Every component engineered to work in perfect harmony, 
            delivering uncompromising performance for millions of revolutions.
          </p>
        </div>
      </div>
    </section>
  )
}
