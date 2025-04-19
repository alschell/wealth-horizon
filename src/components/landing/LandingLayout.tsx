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
  const { sectionRefs, scrollToSection } = useScrollToSection(SECTION_IDS);
  
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
      <FooterSection />
    </div>
  );
};

export default LandingLayout;
