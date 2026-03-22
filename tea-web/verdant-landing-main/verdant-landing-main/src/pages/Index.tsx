import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FeaturedTeas from "@/components/FeaturedTeas";
import CategoriesCarousel from "@/components/CategoriesCarousel";
import CraftsmanshipSection from "@/components/CraftsmanshipSection";
import TeaExperienceSection from "@/components/TeaExperienceSection";
import QualitySection from "@/components/QualitySection";
import ExportSection from "@/components/ExportSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <CategoriesCarousel />
      <FeaturedTeas />
      <CraftsmanshipSection />
      <TeaExperienceSection />
      <QualitySection />
      <ExportSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
