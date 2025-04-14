
import React, { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import HeroSection from "./HeroSection";
import WhySection from "./WhySection";
import FeaturesSection from "./FeaturesSection";
import BenefitsSection from "./BenefitsSection";
import TestimonialsSection from "./TestimonialsSection";
import CTASection from "./CTASection";
import FooterSection from "./FooterSection";
import { ContactFormSection } from "./contact";

const LandingLayout: React.FC = () => {
  const location = useLocation();
  const whyRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  
  // Safe access to language context with fallback
  const [language, setLanguage] = useState<string>('en');
  const [languageContextAvailable, setLanguageContextAvailable] = useState<boolean>(false);
  const [renderKey, setRenderKey] = useState<number>(0); // Used to force re-render
  
  // Try to safely access the language context
  useEffect(() => {
    try {
      const { language: contextLanguage } = useLanguage();
      console.log(`LandingLayout detected language: ${contextLanguage}`);
      setLanguage(contextLanguage);
      setLanguageContextAvailable(true);
    } catch (error) {
      console.error("LandingLayout: Language context not available", error);
      setLanguageContextAvailable(false);
    }
  }, []);
  
  // Listen for language change events
  useEffect(() => {
    const handleLanguageChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail?.language) {
        console.log(`LandingLayout detected language change event to: ${customEvent.detail.language}`);
        setLanguage(customEvent.detail.language);
        // Increment render key to force complete re-render
        setRenderKey(prev => prev + 1);
      }
    };
    
    window.addEventListener('languageChange', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);
  
  // Force re-render when language changes if context is available
  useEffect(() => {
    if (!languageContextAvailable) return;
    
    try {
      const { language: contextLanguage } = useLanguage();
      console.log(`LandingLayout detected language change to: ${contextLanguage}`);
      setLanguage(contextLanguage);
      
      // More aggressive re-rendering strategy
      setRenderKey(prev => prev + 1);
      
      // Additional timeout to ensure all child components have updated
      const timer = setTimeout(() => {
        console.log("Forcing re-render of LandingLayout");
        setRenderKey(prev => prev + 1); // Force state update to trigger re-render
      }, 100);
      return () => clearTimeout(timer);
    } catch (error) {
      console.error("LandingLayout: Error accessing language context after initial mount", error);
    }
  }, [languageContextAvailable, language]);

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
    <div key={`landing-layout-${language}-${renderKey}`} className="min-h-screen bg-white w-full">
      <HeroSection onScrollToFeatures={() => scrollToSection(featuresRef)} />
      <div ref={whyRef} id="why">
        <WhySection />
      </div>
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
