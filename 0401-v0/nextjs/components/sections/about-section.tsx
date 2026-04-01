'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '50+', label: 'Years of Excellence' },
  { value: '200M+', label: 'Bearings Produced' },
  { value: '45', label: 'Countries Served' },
  { value: '99.9%', label: 'Quality Rate' },
]

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    const image = imageRef.current
    const statsContainer = statsRef.current

    if (!section || !content || !image || !statsContainer) return

    // Create scroll-triggered animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      }
    })

    // Text content animation
    const textElements = content.querySelectorAll('.animate-text')
    tl.fromTo(textElements,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out' },
      0
    )

    // Image parallax on scroll
    gsap.to(image, {
      yPercent: -15,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      }
    })

    // Stats counter animation
    const statElements = statsContainer.querySelectorAll('.stat-value')
    statElements.forEach((stat) => {
      gsap.fromTo(stat,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: stat,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === section || trigger.vars.trigger === image) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <section 
      ref={sectionRef}
      id="about"
      className="relative py-32 lg:py-48 bg-background overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image Side */}
          <div className="relative order-2 lg:order-1">
            <div className="relative h-[500px] lg:h-[700px] overflow-hidden rounded-sm">
              <div 
                ref={imageRef}
                className="absolute inset-0 bg-gradient-to-tr from-secondary to-muted"
                style={{ height: '120%', top: '-10%' }}
              >
                {/* Placeholder for about image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 relative">
                    {/* Abstract engineering visual */}
                    <div className="absolute inset-0 rounded-full border-[3px] border-muted-foreground/20 animate-spin" style={{ animationDuration: '20s' }} />
                    <div className="absolute inset-4 rounded-full border-[2px] border-muted-foreground/15 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
                    <div className="absolute inset-8 rounded-full border-[2px] border-muted-foreground/10" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-muted-foreground/10 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating accent element */}
            <div className="absolute -bottom-8 -right-8 lg:right-8 w-32 h-32 bg-accent/30 rounded-sm" />
          </div>

          {/* Content Side */}
          <div ref={contentRef} className="order-1 lg:order-2 space-y-8">
            <p className="animate-text text-sm tracking-[0.3em] uppercase text-accent-foreground font-medium">
              About Us
            </p>
            
            <h2 className="animate-text text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-foreground leading-[1.2] text-balance">
              Where Engineering Meets Artistry
            </h2>
            
            <p className="animate-text text-lg text-muted-foreground leading-relaxed">
              At AXIOM Precision, we believe that the finest engineering is invisible. 
              Our wheel hub bearings perform flawlessly in the background, enabling 
              vehicles to deliver the smooth, silent, and reliable performance that 
              drivers expect.
            </p>
            
            <p className="animate-text text-lg text-muted-foreground leading-relaxed">
              Every bearing we produce undergoes rigorous testing and quality control, 
              meeting or exceeding OEM specifications. Our state-of-the-art facilities 
              combine traditional craftsmanship with cutting-edge automation.
            </p>

            {/* Stats Grid */}
            <div 
              ref={statsRef}
              className="animate-text grid grid-cols-2 gap-8 pt-8 border-t border-border"
            >
              {stats.map((stat, index) => (
                <div key={index} className="stat-value">
                  <p className="text-3xl md:text-4xl font-serif font-medium text-foreground">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
