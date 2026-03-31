"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"

const slides = [
  {
    id: 1,
    title: "Precision Engineering",
    subtitle: "Redefining Industry Standards",
    description: "World-class wheel hub bearings built for performance, durability, and reliability.",
    cta: "Explore Products",
  },
  {
    id: 2,
    title: "Innovation Driven",
    subtitle: "40 Years of Excellence",
    description: "Cutting-edge technology meets uncompromising quality in every bearing we manufacture.",
    cta: "Our Story",
  },
  {
    id: 3,
    title: "Global Solutions",
    subtitle: "Trusted Worldwide",
    description: "Serving automotive giants and industrial leaders across 60+ countries.",
    cta: "View Solutions",
  },
]

const bearingDots = Array.from({ length: 12 }, (_, i) => {
  const angle = (i * 30 * Math.PI) / 180
  return {
    cx: Number((200 + 105 * Math.cos(angle)).toFixed(2)),
    cy: Number((200 + 105 * Math.sin(angle)).toFixed(2)),
  }
})

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [progress, setProgress] = useState(0)

  const goToSlide = useCallback((index: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide(index)
    setProgress(0)
    setTimeout(() => setIsAnimating(false), 800)
  }, [isAnimating])

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length)
  }, [currentSlide, goToSlide])

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length)
  }, [currentSlide, goToSlide])

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide()
          return 0
        }
        return prev + 0.5
      })
    }, 50)

    return () => clearInterval(progressInterval)
  }, [nextSlide])

  return (
    <section className="relative h-screen overflow-hidden bg-primary">
      {/* Background Layers */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ${
            index === currentSlide
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105"
          }`}
        >
          {/* Geometric Pattern Background */}
          <div className="absolute inset-0 bg-primary">
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id={`grid-${slide.id}`} width="10" height="10" patternUnits="userSpaceOnUse">
                    <circle cx="5" cy="5" r="0.5" fill="currentColor" className="text-card" />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill={`url(#grid-${slide.id})`} />
              </svg>
            </div>
            {/* Large Bearing Graphic */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] opacity-5">
              <svg viewBox="0 0 400 400" className="w-full h-full text-card" fill="currentColor">
                <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="4" />
                <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" strokeWidth="3" />
                <circle cx="200" cy="200" r="120" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="200" cy="200" r="90" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="200" cy="200" r="60" fill="none" stroke="currentColor" strokeWidth="3" />
                <circle cx="200" cy="200" r="30" fill="currentColor" />
                {bearingDots.map((dot, i) => (
                  <circle
                    key={i}
                    cx={dot.cx}
                    cy={dot.cy}
                    r="15"
                    fill="currentColor"
                    opacity="0.5"
                  />
                ))}
              </svg>
            </div>
          </div>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`transition-all duration-700 ${
                  index === currentSlide
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8 absolute"
                }`}
              >
                <span className="inline-block text-accent text-sm font-semibold tracking-[0.3em] uppercase mb-4 animate-fade-in">
                  {slide.subtitle}
                </span>
                <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-card font-bold leading-tight mb-6">
                  <span className="text-balance">{slide.title}</span>
                </h1>
                <p className="text-card/80 text-lg md:text-xl max-w-xl leading-relaxed mb-8">
                  {slide.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#products"
                    className="group px-8 py-4 bg-card text-foreground text-sm font-semibold uppercase tracking-wider transition-all duration-300 hover:bg-accent hover:text-accent-foreground flex items-center gap-2"
                  >
                    {slide.cta}
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                  <button className="group px-8 py-4 border-2 border-card/30 text-card text-sm font-semibold uppercase tracking-wider transition-all duration-300 hover:border-card hover:bg-card/10 flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    Watch Video
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-8">
        <button
          onClick={prevSlide}
          className="w-12 h-12 border border-card/30 text-card flex items-center justify-center transition-all duration-300 hover:bg-card hover:text-foreground"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="relative w-16 h-1 bg-card/30 overflow-hidden"
            >
              <div
                className={`absolute inset-y-0 left-0 bg-card transition-all duration-100 ${
                  index === currentSlide ? "" : index < currentSlide ? "w-full" : "w-0"
                }`}
                style={{
                  width: index === currentSlide ? `${progress}%` : index < currentSlide ? "100%" : "0%",
                }}
              />
            </button>
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="w-12 h-12 border border-card/30 text-card flex items-center justify-center transition-all duration-300 hover:bg-card hover:text-foreground"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 right-8 z-20 hidden lg:flex flex-col items-center gap-2">
        <span className="text-card/60 text-xs tracking-[0.2em] uppercase rotate-90 origin-center translate-y-8">
          Scroll
        </span>
        <div className="w-px h-16 bg-card/30 relative overflow-hidden mt-12">
          <div className="absolute inset-x-0 top-0 h-1/2 bg-card animate-bounce" />
        </div>
      </div>
    </section>
  )
}
