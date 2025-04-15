
import React from "react";
import { FadeIn } from "@/components/ui/animation";
import ContactForm from "./ContactForm";
import ContactInformation from "./ContactInformation";
import SocialLinks from "./SocialLinks";
import { TranslatedText } from "@/components/ui/translated-text";

export const ContactFormSection: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50" id="contact">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              <TranslatedText>Contact Us</TranslatedText>
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              <TranslatedText>
                Have questions or ready to elevate your wealth management? Our team is here to help.
              </TranslatedText>
            </p>
          </div>
        </FadeIn>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <FadeIn className="lg:col-span-3">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <ContactForm />
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2} className="lg:col-span-2">
            <div className="bg-white p-8 rounded-xl shadow-sm mb-8">
              <ContactInformation />
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <SocialLinks />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
