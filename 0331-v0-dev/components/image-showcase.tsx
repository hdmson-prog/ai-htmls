"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"

const images = [
  { id: 1, title: "Manufacturing Facility", category: "Factory" },
  { id: 2, title: "Quality Control Lab", category: "Testing" },
  { id: 3, title: "CNC Machining Center", category: "Production" },
  { id: 4, title: "R&D Department", category: "Innovation" },
  { id: 5, title: "Warehouse Operations", category: "Logistics" },
  { id: 6, title: "Assembly Line", category: "Production" },
  { id: 7, title: "Global Headquarters", category: "Corporate" },
  { id: 8, title: "Training Center", category: "Education" },
]

export function ImageShowcase() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  const itemsToShow = 4

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % (images.length - itemsToShow + 1))
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + (images.length - itemsToShow + 1)) % (images.length - itemsToShow + 1))
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      nextSlide()
    }, 4000)

    return () => clearInterval(interval)
  }, [isPaused, nextSlide])

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div
          className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div>
            <span className="inline-block text-accent text-sm font-semibold tracking-[0.3em] uppercase mb-4">
              Gallery
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground font-bold leading-tight">
              <span className="text-balance">Inside Our Operations</span>
            </h2>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-4">
            <button
              onClick={prevSlide}
              className="w-12 h-12 border border-border bg-card text-foreground flex items-center justify-center transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:border-primary"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 border border-border bg-card text-foreground flex items-center justify-center transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:border-primary"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={carouselRef}
        className={`transition-all duration-700 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
            }}
          >
            {images.map((image, index) => (
              <div
                key={image.id}
                className="w-full md:w-1/2 lg:w-1/4 flex-shrink-0 px-3"
              >
                <div
                  className={`group relative aspect-[4/3] bg-card overflow-hidden cursor-pointer transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center bg-muted">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-3 rounded-full border-2 border-dashed border-border flex items-center justify-center">
                        <svg
                          viewBox="0 0 24 24"
                          className="w-8 h-8 text-muted-foreground/40"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <circle cx="9" cy="9" r="2" />
                          <path d="M21 15l-5-5L5 21" />
                        </svg>
                      </div>
                      <p className="text-muted-foreground/60 text-xs">
                        {image.title}
                      </p>
                    </div>
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-primary/80 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-14 h-14 border-2 border-card rounded-full flex items-center justify-center mb-4 transform scale-50 group-hover:scale-100 transition-transform duration-300">
                      <ZoomIn className="w-6 h-6 text-card" />
                    </div>
                    <span className="text-xs text-accent font-semibold tracking-wider uppercase mb-1">
                      {image.category}
                    </span>
                    <span className="text-card font-medium text-lg">
                      {image.title}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-8">
          <div className="flex justify-center gap-2">
            {Array.from({ length: images.length - itemsToShow + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1 transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-accent"
                    : "w-4 bg-border hover:bg-muted-foreground"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
