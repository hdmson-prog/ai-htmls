'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'
import { Header } from '@/components/header'
import { HeroSection } from '@/components/sections/hero-section'
import { BrandStorySection } from '@/components/sections/brand-story-section'
import { AboutSection } from '@/components/sections/about-section'
import { ProductCategoriesSection } from '@/components/sections/product-categories-section'
import { FeaturedProductsSection } from '@/components/sections/featured-products-section'
import { WhyChooseUsSection } from '@/components/sections/why-choose-us-section'
import { EngineeringSection } from '@/components/sections/engineering-section'
import { ShowcaseCarouselSection } from '@/components/sections/showcase-carousel-section'
import { NewsSection } from '@/components/sections/news-section'
import { ContactSection } from '@/components/sections/contact-section'
import { FooterSection } from '@/components/sections/footer-section'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    })

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    // Refresh ScrollTrigger after everything is loaded
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)

    return () => {
      lenis.destroy()
      clearTimeout(timer)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <main ref={mainRef} className="relative">
      <Header />
      <HeroSection />
      <BrandStorySection />
      <AboutSection />
      <ProductCategoriesSection />
      <FeaturedProductsSection />
      <WhyChooseUsSection />
      <EngineeringSection />
      <ShowcaseCarouselSection />
      <NewsSection />
      <ContactSection />
      <FooterSection />
    </main>
  )
}
