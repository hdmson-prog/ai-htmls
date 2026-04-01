'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function BrandStorySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const revealRef = useRef<HTMLDivElement>(null)
  const textLinesRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    const reveal = revealRef.current
    const textLines = textLinesRef.current
    const image = imageRef.current

    if (!section || !content || !reveal || !textLines || !image) return

    // Pinned reveal animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=200%',
        scrub: true,
        pin: true,
        anticipatePin: 1,
      }
    })

    // Clip-path reveal from left
    tl.fromTo(reveal,
      { clipPath: 'inset(0 100% 0 0)' },
      { clipPath: 'inset(0 0% 0 0)', ease: 'none', duration: 1 },
      0
    )

    // Text lines reveal staggered
    const lines = textLines.querySelectorAll('.text-line')
    tl.fromTo(lines,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.15, ease: 'none', duration: 0.5 },
      0.3
    )

    // Image parallax
    tl.fromTo(image,
      { y: 80, scale: 1.1 },
      { y: -40, scale: 1, ease: 'none', duration: 1 },
      0
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
      className="relative h-screen w-full overflow-hidden bg-secondary"
    >
      {/* Reveal Container */}
      <div 
        ref={revealRef}
        className="absolute inset-0 bg-background"
      >
        <div 
          ref={contentRef}
          className="h-full w-full flex items-center"
        >
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Text Content */}
              <div ref={textLinesRef} className="space-y-8">
                <p className="text-line text-sm tracking-[0.3em] uppercase text-accent-foreground font-medium">
                  Our Legacy
                </p>
                
                <h2 className="text-line text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-foreground leading-[1.2] text-balance">
                  Five Decades of Engineering Excellence
                </h2>
                
                <p className="text-line text-lg text-muted-foreground leading-relaxed">
                  Since 1974, AXIOM Precision has been at the forefront of bearing technology, 
                  partnering with the world&apos;s leading automotive manufacturers to deliver 
                  components that define the standard for quality and performance.
                </p>
                
                <p className="text-line text-lg text-muted-foreground leading-relaxed">
                  Our commitment to precision engineering has made us the trusted choice 
                  for applications where failure is not an option.
                </p>

                <div className="text-line pt-4">
                  <a 
                    href="#about" 
                    className="inline-flex items-center gap-3 text-sm font-medium text-foreground group"
                  >
                    <span className="relative">
                      Discover Our Story
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full" />
                    </span>
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
              </div>

              {/* Image */}
              <div className="relative h-[400px] lg:h-[600px] overflow-hidden rounded-sm">
                <div 
                  ref={imageRef}
                  className="absolute inset-0 bg-gradient-to-br from-muted to-secondary"
                >
                  {/* Placeholder for manufacturing/facility image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3/4 h-3/4 relative">
                      {/* Simulated precision machinery aesthetic */}
                      <div className="absolute inset-0 grid grid-cols-3 gap-2">
                        {[...Array(9)].map((_, i) => (
                          <div 
                            key={i}
                            className="bg-muted-foreground/5 rounded-sm"
                            style={{
                              animationDelay: `${i * 0.1}s`,
                            }}
                          />
                        ))}
                      </div>
                      {/* Central highlight */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full border-4 border-muted-foreground/10" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background (revealed from) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-6xl md:text-8xl font-serif text-muted-foreground/20 tracking-widest">
          1974
        </p>
      </div>
    </section>
  )
}
