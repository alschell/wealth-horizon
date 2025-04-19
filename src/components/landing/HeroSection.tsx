
import React, { useEffect } from "react";
import { ChevronDown, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, ScaleIn } from "@/components/ui/animation";
import DashboardAnimation from "@/components/animations/DashboardAnimation";
import TranslatedText from "@/components/ui/translated-text";

interface HeroSectionProps {
  onScrollToFeatures: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToFeatures }) => {
  useEffect(() => {
    console.log("HeroSection component mounted");
    console.log("HeroSection container:", document.querySelector('section.relative'));
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToWhyWH = () => {
    // Use the first implementation - directly access the element by ID
    const whySection = document.getElementById('benefits');
    
    if (whySection) {
      // Add logging for troubleshooting
      console.log("Found benefits section, scrolling to it:", whySection);
      // Scroll with a slight delay to ensure all elements are fully rendered
      setTimeout(() => {
        whySection.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      console.log("Benefits section not found, checking for alternatives");
      // If benefits section not found, try WhyWHSection as fallback
      const alternativeSection = document.querySelector('section#benefits');
      if (alternativeSection) {
        console.log("Found alternative benefits section, scrolling to it");
        alternativeSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Last resort - try features as fallback
        console.log("No benefits section found, trying features section");
        const featuresSection = document.getElementById('features');
        if (featuresSection) {
          featuresSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const keyFeatures = ["AI-native platform", "Real-time analytics", "SOC 2 certified"];

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white -z-10"></div>
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 lg:py-40 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeIn delay={0.2}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight text-left">
              <TranslatedText>Holistic wealth management for</TranslatedText>{" "}
              <span className="text-indigo-600">
                <TranslatedText>family offices</TranslatedText>
              </span>
              <TranslatedText> and </TranslatedText>
              <span className="text-indigo-600">
                <TranslatedText>institutions</TranslatedText>
              </span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-2xl text-left">
              <TranslatedText>All your wealth made actionable on one platform</TranslatedText><br />
              <TranslatedText>across all your banks, brokers and custodians</TranslatedText>
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-md px-8" onClick={scrollToContact}>
                <TranslatedText>Contact Us</TranslatedText>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-md px-8"
                onClick={scrollToWhyWH}
              >
                <TranslatedText>Learn More</TranslatedText>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 items-center text-sm text-gray-600">
              {keyFeatures.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-indigo-600" />
                  <TranslatedText>{item}</TranslatedText>
                </div>
              ))}
            </div>
          </FadeIn>

          <ScaleIn delay={0.4}>
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-100">
              <div className="relative aspect-[4/3]">
                <DashboardAnimation />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              </div>
            </div>
          </ScaleIn>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button
            onClick={onScrollToFeatures}
            aria-label="Scroll to features"
            className="p-2 rounded-full bg-white/80 shadow-md hover:bg-white transition-colors"
          >
            <ChevronDown size={24} className="text-gray-700" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
