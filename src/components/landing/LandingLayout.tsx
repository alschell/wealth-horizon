
import React, { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
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
  
  // Force re-render when language changes
  const { language } = useLanguage();
  const [, forceUpdate] = useState({});
  
  // Re-render when language changes
  useEffect(() => {
    console.log(`LandingLayout detected language change to: ${language}`);
    // More aggressive re-rendering strategy
    forceUpdate({});
    // Let's try to trigger re-renders in child components too
    const timer = setTimeout(() => {
      forceUpdate({});
    }, 100);
    return () => clearTimeout(timer);
  }, [language]);

  // Handle hash-based navigation
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
  }, [location.hash]);

  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>) => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Add a key based on language to force complete re-render of the component tree
  return (
    <div key={`landing-layout-${language}`} className="min-h-screen bg-white w-full">
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
