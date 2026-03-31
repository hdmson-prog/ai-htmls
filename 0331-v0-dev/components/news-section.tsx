"use client"

import { useEffect, useRef, useState } from "react"
import { Calendar, ArrowRight, User } from "lucide-react"

const news = [
  {
    id: 1,
    title: "Precision Bearings Announces $50M Expansion of Manufacturing Facility",
    excerpt:
      "New state-of-the-art production lines will increase capacity by 40% to meet growing global demand.",
    category: "Corporate",
    date: "March 28, 2026",
    author: "Press Office",
    featured: true,
  },
  {
    id: 2,
    title: "New WH-5000 Series Sets Industry Benchmark for Performance",
    excerpt:
      "Revolutionary bearing design achieves 30% longer lifespan and 25% improved load capacity.",
    category: "Products",
    date: "March 22, 2026",
    author: "R&D Team",
    featured: false,
  },
  {
    id: 3,
    title: "Precision Bearings Partners with Major EV Manufacturer",
    excerpt:
      "Strategic agreement to supply next-generation bearings for electric vehicle platforms.",
    category: "Partnerships",
    date: "March 15, 2026",
    author: "Business Development",
    featured: false,
  },
  {
    id: 4,
    title: "Sustainability Report 2025: Carbon Neutral by 2030",
    excerpt:
      "Company unveils comprehensive roadmap to achieve net-zero emissions across all operations.",
    category: "Sustainability",
    date: "March 10, 2026",
    author: "ESG Committee",
    featured: false,
  },
]

export function NewsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

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

  const featuredNews = news.find((n) => n.featured)
  const otherNews = news.filter((n) => !n.featured)

  return (
    <section id="news" ref={sectionRef} className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div
          className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div>
            <span className="inline-block text-accent text-sm font-semibold tracking-[0.3em] uppercase mb-4">
              News & Insights
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground font-bold leading-tight">
              <span className="text-balance">Latest Updates</span>
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent transition-colors uppercase tracking-wider"
          >
            View All News
            <span className="w-8 h-px bg-current" />
          </a>
        </div>

        {/* News Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Featured Article */}
          {featuredNews && (
            <div
              className={`group transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
            >
              <article className="h-full bg-card border border-border overflow-hidden hover:shadow-xl hover:border-accent/30 transition-all duration-300">
                {/* Image Placeholder */}
                <div className="relative aspect-[16/10] bg-secondary overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-3 rounded-full border-2 border-dashed border-border flex items-center justify-center">
                        <svg
                          viewBox="0 0 24 24"
                          className="w-10 h-10 text-muted-foreground/30"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <circle cx="9" cy="9" r="2" />
                          <path d="M21 15l-5-5L5 21" />
                        </svg>
                      </div>
                      <p className="text-muted-foreground/60 text-sm">Featured Image</p>
                    </div>
                  </div>
                  <span className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-accent text-accent-foreground">
                    {featuredNews.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {featuredNews.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {featuredNews.author}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors leading-tight">
                    {featuredNews.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {featuredNews.excerpt}
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 uppercase tracking-wider transition-colors"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </article>
            </div>
          )}

          {/* Other Articles */}
          <div className="space-y-6">
            {otherNews.map((article, index) => (
              <article
                key={article.id}
                className={`group flex gap-6 bg-card border border-border p-6 hover:shadow-lg hover:border-accent/30 transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
              >
                {/* Image Placeholder */}
                <div className="hidden sm:block relative w-32 h-32 flex-shrink-0 bg-secondary">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-8 h-8 text-muted-foreground/30"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="9" cy="9" r="2" />
                      <path d="M21 15l-5-5L5 21" />
                    </svg>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                    <span className="px-2 py-0.5 bg-secondary text-foreground font-medium">
                      {article.category}
                    </span>
                    <span>{article.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors leading-tight line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
