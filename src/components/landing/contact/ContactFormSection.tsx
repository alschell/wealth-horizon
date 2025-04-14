
import React, { useState, useEffect } from "react";
import { FadeIn } from "@/components/ui/animation";
import ContactForm from "./ContactForm";
import ContactInformation from "./ContactInformation";
import { LocalizedText, useLocalizedText } from "@/components/ui/localized-text";
import { useLanguage } from "@/context/LanguageContext";

const ContactFormSection: React.FC = () => {
  const { t } = useLocalizedText();
  const { language } = useLanguage();
  const [, forceUpdate] = useState({});
  
  // Force re-render when language changes
  useEffect(() => {
    const handleLanguageChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      console.log('ContactFormSection detected language change:', customEvent.detail?.language);
      forceUpdate({});
    };
    
    window.addEventListener('languageChange', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);
  
  // Also force re-render when language context changes directly
  useEffect(() => {
    console.log(`ContactFormSection detected language context change: ${language}`);
    forceUpdate({});
  }, [language]);
  
  return (
    <section className="py-24 bg-white" id="contact">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              <LocalizedText textKey="contactUs" fallback="Contact Us" />
            </h2>
            <p className="mt-4 text-xl text-gray-600 mx-auto max-w-5xl">
              <LocalizedText 
                textKey="contactUsSubtitle" 
                fallback="Have questions about how WealthHorizon can transform your wealth management?"
                html={true}
              />
            </p>
            <p className="mt-2 text-xl text-gray-600">
              <LocalizedText textKey="getInTouch" fallback="Get in touch with our team." />
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          <FadeIn delay={0.2} className="lg:col-span-3">
            <ContactForm />
          </FadeIn>

          <FadeIn delay={0.4} className="lg:col-span-2">
            <ContactInformation />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
