
import React, { useRef } from "react";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import BenefitsSection from "./BenefitsSection";
import TestimonialsSection from "./TestimonialsSection";
import CTASection from "./CTASection";
import FooterSection from "./FooterSection";
import ContactFormSection from "./ContactFormSection";

const LandingLayout: React.FC = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>) => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <HeroSection onScrollToFeatures={() => scrollToSection(featuresRef)} />
      <div ref={featuresRef}>
        <FeaturesSection id="features" />
      </div>
      <div ref={benefitsRef}>
        <BenefitsSection />
      </div>
      <div ref={testimonialsRef}>
        <TestimonialsSection />
      </div>
      <div ref={contactRef}>
        <ContactFormSection />
      </div>
      <CTASection />
      <div ref={aboutRef}>
        <FooterSection />
      </div>
    </div>
  );
};

export default LandingLayout;
