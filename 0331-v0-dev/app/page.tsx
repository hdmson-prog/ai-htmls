"use client"

import { Header } from "@/components/header"
import { HeroSlider } from "@/components/hero-slider"
import { AboutSection } from "@/components/about-section"
import { ProductCategories } from "@/components/product-categories"
import { FeaturedProducts } from "@/components/featured-products"
import { WhyChooseUs } from "@/components/why-choose-us"
import { ImageShowcase } from "@/components/image-showcase"
import { NewsSection } from "@/components/news-section"
import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSlider />
      <AboutSection />
      <ProductCategories />
      <FeaturedProducts />
      <WhyChooseUs />
      <ImageShowcase />
      <NewsSection />
      <ContactForm />
      <Footer />
    </main>
  )
}
