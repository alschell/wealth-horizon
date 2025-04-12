import React, { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import BenefitsSection from "./BenefitsSection";
import TestimonialsSection from "./TestimonialsSection";
import CTASection from "./CTASection";
import FooterSection from "./FooterSection";
import { ContactFormSection } from "./contact";

const LandingLayout: React.FC = () => {
  const location = useLocation();
  const featuresRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>) => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <HeroSection onScrollToFeatures={() => scrollToSection(featuresRef)} />
      <div ref={featuresRef} id="features">
        <FeaturesSection id="features" />
      </div>
      <div ref={benefitsRef} id="benefits">
        <BenefitsSection />
      </div>
      <div ref={testimonialsRef} id="testimonials">
        <TestimonialsSection />
      </div>
      <div ref={contactRef} id="contact">
        <ContactFormSection />
      </div>
      <CTASection />
      <div ref={aboutRef} id="about">
        <FooterSection />
      </div>
    </div>
  );
};

export default LandingLayout;
