'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
  })
  const [focusedField, setFocusedField] = useState<string | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    const form = formRef.current

    if (!section || !form) return

    // Gentle reveal animation
    const elements = section.querySelectorAll('.animate-reveal')
    elements.forEach((el, index) => {
      gsap.fromTo(el,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
          delay: index * 0.05,
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formState)
  }

  const inputClasses = (fieldName: string) => `
    w-full bg-transparent border-b-2 py-4 text-foreground placeholder-transparent
    focus:outline-none transition-colors duration-300
    ${focusedField === fieldName || formState[fieldName as keyof typeof formState] 
      ? 'border-foreground' 
      : 'border-border hover:border-muted-foreground'
    }
  `

  const labelClasses = (fieldName: string) => `
    absolute left-0 transition-all duration-300 pointer-events-none
    ${focusedField === fieldName || formState[fieldName as keyof typeof formState]
      ? '-top-4 text-xs text-accent-foreground'
      : 'top-4 text-base text-muted-foreground'
    }
  `

  return (
    <section 
      ref={sectionRef}
      id="contact"
      className="relative py-32 lg:py-48 bg-secondary overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column - Info */}
          <div className="space-y-12">
            <div>
              <p className="animate-reveal text-sm tracking-[0.3em] uppercase text-accent-foreground font-medium mb-4">
                Get in Touch
              </p>
              <h2 className="animate-reveal text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-foreground leading-[1.2] text-balance">
                Let&apos;s Build Something Extraordinary
              </h2>
            </div>

            <p className="animate-reveal text-lg text-muted-foreground leading-relaxed max-w-md">
              Whether you&apos;re looking for a trusted OEM partner or need technical consultation, 
              our team is ready to help you achieve your engineering goals.
            </p>

            <div className="animate-reveal space-y-6 pt-8 border-t border-border">
              <div>
                <p className="text-sm text-muted-foreground mb-1">General Inquiries</p>
                <a href="mailto:info@axiomprecision.com" className="text-foreground hover:text-muted-foreground transition-colors">
                  info@axiomprecision.com
                </a>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Technical Support</p>
                <a href="mailto:support@axiomprecision.com" className="text-foreground hover:text-muted-foreground transition-colors">
                  support@axiomprecision.com
                </a>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Headquarters</p>
                <p className="text-foreground">
                  Stuttgart, Germany
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="animate-reveal">
            <form 
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              {/* Name */}
              <div className="relative">
                <label htmlFor="name" className={labelClasses('name')}>
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className={inputClasses('name')}
                  required
                />
              </div>

              {/* Email */}
              <div className="relative">
                <label htmlFor="email" className={labelClasses('email')}>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className={inputClasses('email')}
                  required
                />
              </div>

              {/* Company & Phone Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative">
                  <label htmlFor="company" className={labelClasses('company')}>
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formState.company}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('company')}
                    onBlur={() => setFocusedField(null)}
                    className={inputClasses('company')}
                  />
                </div>
                <div className="relative">
                  <label htmlFor="phone" className={labelClasses('phone')}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formState.phone}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    className={inputClasses('phone')}
                  />
                </div>
              </div>

              {/* Message */}
              <div className="relative">
                <label htmlFor="message" className={labelClasses('message')}>
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formState.message}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  className={`${inputClasses('message')} resize-none`}
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full md:w-auto px-12 py-4 bg-foreground text-background font-medium rounded-sm hover:bg-foreground/90 transition-colors duration-300 mt-4"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
