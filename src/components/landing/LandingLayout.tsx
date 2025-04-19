
import React from "react";
import HeroSection from "./HeroSection";
import WhyWHSection from "./WhyWHSection";
import FeaturesSection from "./FeaturesSection";
import TestimonialsSection from "./TestimonialsSection";
import CTASection from "./CTASection";
import FooterSection from "./FooterSection";
import { ContactFormSection } from "./contact";
import BenefitsSection from "./BenefitsSection";
import { useScrollToSection } from "@/hooks/useScrollToSection";

// Define section IDs
const SECTION_IDS = ['benefits', 'features', 'testimonials', 'contact', 'about'];

const LandingLayout: React.FC = () => {
  // Create refs for each section
  const { sectionRefs, scrollToSection } = useScrollToSection(SECTION_IDS);

  return (
    <div className="min-h-screen bg-white w-full">
      <HeroSection 
        onScrollToFeatures={() => scrollToSection(sectionRefs.features)} 
      />
      
      {/* Explicitly add an id="benefits" to the WhyWHSection div wrapper */}
      <div ref={sectionRefs.benefits} id="benefits">
        <WhyWHSection />
      </div>
      
      <div ref={sectionRefs.features} id="features">
        <FeaturesSection />
      </div>
      
      <div ref={sectionRefs.testimonials} id="testimonials">
        <TestimonialsSection />
      </div>
      
      <div ref={sectionRefs.contact} id="contact">
        <ContactFormSection />
      </div>
      
      <CTASection />
      
      <div ref={sectionRefs.about} id="about">
        <FooterSection />
      </div>
    </div>
  );
};

export default LandingLayout;
