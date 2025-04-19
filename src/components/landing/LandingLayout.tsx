
import React, { useMemo } from "react";
import HeroSection from "./HeroSection";
import WhyWHSection from "./WhyWHSection";
import FeaturesSection from "./FeaturesSection";
import BenefitsSection from "./BenefitsSection";
import TestimonialsSection from "./TestimonialsSection";
import CTASection from "./CTASection";
import FooterSection from "./FooterSection";
import ContactFormSection from "./ContactFormSection";
import { useScrollToSection } from "@/hooks/useScrollToSection";

// Define all section IDs for better maintainability
const SECTION_IDS = [
  'why-wh',
  'features',
  'benefits',
  'testimonials',
  'contact',
  'about'
] as const;

type SectionId = typeof SECTION_IDS[number];

/**
 * Main landing page layout component that organizes all landing page sections
 */
const LandingLayout: React.FC = () => {
  // Create refs for each section using the hook
  const { sectionRefs, scrollToSection } = useScrollToSection<SectionId>(SECTION_IDS);
  
  // Memoize the section map to prevent unnecessary re-renders
  const sectionComponents = useMemo(() => ({
    'why-wh': <WhyWHSection />,
    'features': <FeaturesSection />,
    'benefits': <BenefitsSection />,
    'testimonials': <TestimonialsSection />,
    'contact': <ContactFormSection />,
    'about': <FooterSection />
  }), []);

  return (
    <div className="min-h-screen bg-white w-full">
      <HeroSection 
        onScrollToFeatures={() => scrollToSection(sectionRefs.features)} 
      />
      
      {SECTION_IDS.map((sectionId) => (
        <div key={sectionId} ref={sectionRefs[sectionId]} id={sectionId}>
          {sectionComponents[sectionId]}
        </div>
      ))}
      
      <CTASection />
    </div>
  );
};

export default LandingLayout;
