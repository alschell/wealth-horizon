
import React from "react";
import { FadeIn } from "@/components/ui/animation";
import ContactForm from "./ContactForm";
import ContactInformation from "./ContactInformation";
import TranslatedText from "@/components/ui/translated-text";

const ContactFormSection: React.FC = () => {
  return (
    <section className="w-full bg-white py-24" id="contact">
      <div className="max-w-[1400px] mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
              <TranslatedText>Contact Us</TranslatedText>
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-5xl mx-auto text-center">
              <TranslatedText>Have questions about how </TranslatedText>
              <span className="text-indigo-600">Wealth</span>
              <TranslatedText>Horizon can transform your wealth management?</TranslatedText>
            </p>
            <p className="mt-2 text-xl text-gray-600 text-center">
              <TranslatedText>Get in touch with our team.</TranslatedText>
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
