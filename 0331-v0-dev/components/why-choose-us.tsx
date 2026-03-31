"use client"

import { useEffect, useRef, useState } from "react"
import { Check, Shield, Cog, Truck, HeadphonesIcon } from "lucide-react"

const reasons = [
  {
    id: 1,
    icon: Shield,
    title: "Unmatched Quality",
    description:
      "Every bearing is manufactured to exceed industry standards, ensuring optimal performance and longevity in the most demanding conditions.",
    features: [
      "100% Quality Inspection",
      "Advanced Material Testing",
      "Lifetime Warranty Available",
      "ISO 9001:2015 Certified",
    ],
  },
  {
    id: 2,
    icon: Cog,
    title: "Advanced Technology",
    description:
      "State-of-the-art manufacturing facilities equipped with the latest CNC machinery and precision engineering tools.",
    features: [
      "Automated Production Lines",
      "AI-Powered Quality Control",
      "Real-Time Monitoring",
      "Continuous R&D Investment",
    ],
  },
  {
    id: 3,
    icon: Truck,
    title: "Global Distribution",
    description:
      "Extensive logistics network ensures rapid delivery to customers worldwide, with strategically located warehouses.",
    features: [
      "60+ Countries Served",
      "24-Hour Express Shipping",
      "Regional Warehouses",
      "Track & Trace System",
    ],
  },
  {
    id: 4,
    icon: HeadphonesIcon,
    title: "Expert Support",
    description:
      "Dedicated technical team available around the clock to provide guidance, troubleshooting, and customized solutions.",
    features: [
      "24/7 Technical Hotline",
      "On-Site Training Available",
      "Custom Engineering Support",
      "Multilingual Team",
    ],
  },
]

export function WhyChooseUs() {
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

  return (
    <section id="solutions" ref={sectionRef} className="py-24 lg:py-32 bg-primary text-primary-foreground overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-20 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block text-accent text-sm font-semibold tracking-[0.3em] uppercase mb-4">
            Why Choose Us
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-6">
            <span className="text-balance">The Precision Bearings Advantage</span>
          </h2>
          <p className="text-primary-foreground/70 text-lg leading-relaxed">
            Discover why leading manufacturers and distributors trust us for their 
            wheel hub bearing needs.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="space-y-24">
          {reasons.map((reason, index) => (
            <div
              key={reason.id}
              className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Content */}
              <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                {/* Icon */}
                <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                  <reason.icon className="w-8 h-8 text-accent" />
                </div>

                {/* Number Badge */}
                <span className="inline-block text-sm font-bold tracking-wider text-accent mb-4">
                  0{reason.id}
                </span>

                <h3 className="font-serif text-3xl md:text-4xl font-bold mb-6">
                  {reason.title}
                </h3>
                <p className="text-primary-foreground/70 text-lg leading-relaxed mb-8">
                  {reason.description}
                </p>

                {/* Features List */}
                <ul className="grid sm:grid-cols-2 gap-4">
                  {reason.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-accent" />
                      </div>
                      <span className="text-sm text-primary-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Image Placeholder */}
              <div className={`relative ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                <div className="relative aspect-[4/3] bg-primary-foreground/5 overflow-hidden">
                  {/* Placeholder Content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full border-2 border-dashed border-primary-foreground/20 flex items-center justify-center">
                        <reason.icon className="w-10 h-10 text-primary-foreground/30" />
                      </div>
                      <p className="text-primary-foreground/40 text-sm">
                        Replace with relevant image
                      </p>
                    </div>
                  </div>

                  {/* Decorative Lines */}
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
                </div>

                {/* Floating Stats */}
                <div className={`absolute -bottom-6 ${index % 2 === 1 ? "-right-6 lg:right-auto lg:-left-6" : "-right-6"} bg-accent text-accent-foreground p-6`}>
                  <div className="text-3xl font-bold">
                    {index === 0 && "99.9%"}
                    {index === 1 && "50M+"}
                    {index === 2 && "48h"}
                    {index === 3 && "24/7"}
                  </div>
                  <div className="text-sm opacity-80">
                    {index === 0 && "Quality Rate"}
                    {index === 1 && "Units Produced"}
                    {index === 2 && "Avg Delivery"}
                    {index === 3 && "Support"}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
