
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/animation";
import { LocalizedText, useLocalizedText } from "@/components/ui/localized-text";
import { useLanguage } from "@/context/LanguageContext";

const CTASection: React.FC = () => {
  const { t } = useLocalizedText();
  // Add direct dependency on language to force re-renders
  const { language } = useLanguage();
  const [, forceUpdate] = useState({});
  
  // Force re-render when language changes
  useEffect(() => {
    console.log(`CTASection detected language change to: ${language}`);
    forceUpdate({});
  }, [language]);
  
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-indigo-600">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              <LocalizedText 
                textKey="readyToOptimize" 
                fallback="Ready to Optimize Your Wealth Management?" 
              />
            </h2>
            <p className="mt-4 text-xl text-indigo-100 max-w-2xl">
              <LocalizedText
                textKey="joinLeading"
                fallback="Join leading family offices and institutions that have transformed their operations with"
              />
              {" "}
              <span className="font-semibold">
                <span className="text-indigo-200">Wealth</span>
                <span className="text-white">Horizon</span>
              </span>.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <Button 
                size="lg" 
                className="bg-black hover:bg-gray-800 text-white text-md px-8"
                onClick={scrollToContact}
              >
                <LocalizedText textKey="contactUs" fallback="Contact Us" />
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
