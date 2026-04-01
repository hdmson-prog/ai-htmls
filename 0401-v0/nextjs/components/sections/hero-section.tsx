'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subheadingRef = useRef<HTMLParagraphElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const heading = headingRef.current
    const subheading = subheadingRef.current
    const imageContainer = imageContainerRef.current
    const scrollIndicator = scrollIndicatorRef.current
    const overlay = overlayRef.current

    if (!section || !heading || !subheading || !imageContainer || !scrollIndicator || !overlay) return

    // Initial load animation
    const tl = gsap.timeline({ delay: 0.3 })

    tl.fromTo(imageContainer,
      { scale: 1.3, opacity: 0 },
      { scale: 1, opacity: 1, duration: 2, ease: 'power3.out' }
    )
      .fromTo(heading.querySelectorAll('.word'),
        { y: 120, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: 'power3.out' },
        '-=1.5'
      )
      .fromTo(subheading,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        '-=0.8'
      )
      .fromTo(scrollIndicator,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      )

    // Scroll-driven animation (pinned)
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=150%',
        scrub: true,
        pin: true,
        anticipatePin: 1,
      }
    })

    scrollTl
      .to(imageContainer, {
        scale: 1.15,
        ease: 'none',
      }, 0)
      .to(overlay, {
        opacity: 0.6,
        ease: 'none',
      }, 0)
      .to(heading, {
        y: -100,
        opacity: 0,
        ease: 'none',
      }, 0)
      .to(subheading, {
        y: -50,
        opacity: 0,
        ease: 'none',
      }, 0.1)
      .to(scrollIndicator, {
        opacity: 0,
        ease: 'none',
      }, 0)

    // Scroll indicator bounce
    gsap.to(scrollIndicator.querySelector('.bounce'), {
      y: 8,
      repeat: -1,
      yoyo: true,
      duration: 1,
      ease: 'power1.inOut',
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
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background Image Container */}
      <div
        ref={imageContainerRef}
        className="absolute inset-0 w-full h-full"
      >
        {/* Placeholder for product imagery - using gradient as placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-muted to-secondary">
          {/* Simulated bearing layers for parallax effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-[600px] h-[600px] md:w-[800px] md:h-[800px]">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border-[40px] md:border-[60px] border-muted-foreground/10" />
              {/* Middle ring */}
              <div className="absolute inset-16 md:inset-24 rounded-full border-[30px] md:border-[40px] border-muted-foreground/15" />
              {/* Inner ring */}
              <div className="absolute inset-32 md:inset-48 rounded-full border-[20px] md:border-[30px] border-muted-foreground/20" />
              {/* Center hub */}
              <div className="absolute inset-48 md:inset-64 rounded-full bg-gradient-to-br from-muted-foreground/10 to-muted-foreground/5" />
              {/* Ball bearings - subtle metallic dots */}
              {[...Array(12)].map((_, i) => {
                const angle = (i * 30) * (Math.PI / 180)
                const radius = 180
                return (
                  <div
                    key={i}
                    className="absolute w-4 h-4 md:w-6 md:h-6 rounded-full bg-gradient-to-br from-muted-foreground/30 to-muted-foreground/10"
                    style={{
                      top: `calc(50% + ${(Math.sin(angle) * radius).toFixed(3)}px)`,
                      left: `calc(50% + ${(Math.cos(angle) * radius).toFixed(3)}px)`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-background opacity-30"
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <h1
          ref={headingRef}
          className="text-4xl md:text-6xl lg:text-8xl font-serif font-medium text-foreground leading-[1.1] tracking-tight max-w-5xl"
        >
          <span className="word inline-block overflow-hidden">
            <span className="inline-block">Precision</span>
          </span>{' '}
          <span className="word inline-block overflow-hidden">
            <span className="inline-block">in</span>
          </span>{' '}
          <span className="word inline-block overflow-hidden">
            <span className="inline-block">Every</span>
          </span>
          <br />
          <span className="word inline-block overflow-hidden">
            <span className="inline-block">Revolution</span>
          </span>
        </h1>

        <p
          ref={subheadingRef}
          className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
        >
          Engineering excellence for the world&apos;s most demanding automotive applications.
          Where every micron matters.
        </p>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
          Scroll to Explore
        </span>
        <div className="bounce">
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>
    </section>
  )
}
