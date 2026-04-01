import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import HeroScene from "@/components/scenes/HeroScene";
import BrandStoryScene from "@/components/scenes/BrandStoryScene";
import AboutScene from "@/components/scenes/AboutScene";
import ProductCategoriesScene from "@/components/scenes/ProductCategoriesScene";
import FeaturedProductsScene from "@/components/scenes/FeaturedProductsScene";
import WhyChooseUsScene from "@/components/scenes/WhyChooseUsScene";
import EngineeringScene from "@/components/scenes/EngineeringScene";
import CarouselScene from "@/components/scenes/CarouselScene";
import NewsScene from "@/components/scenes/NewsScene";
import ContactScene from "@/components/scenes/ContactScene";
import FooterScene from "@/components/scenes/FooterScene";
import SiteNavbar from "@/components/SiteNavbar";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div className="relative">
      <SiteNavbar />
      <main>
        <HeroScene />
        <BrandStoryScene />
        <AboutScene />
        <ProductCategoriesScene />
        <FeaturedProductsScene />
        <WhyChooseUsScene />
        <EngineeringScene />
        <CarouselScene />
        <NewsScene />
        <ContactScene />
      </main>
      <FooterScene />
    </div>
  );
};

export default Index;
