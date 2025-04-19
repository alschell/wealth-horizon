
import React from "react";
import { FadeIn } from "@/components/ui/animation";
import ContactForm from "./ContactForm";
import ContactInformation from "./ContactInformation";
import TranslatedText from "@/components/ui/translated-text";

const ContactFormSection: React.FC = () => {
  return (
    <section className="py-24 bg-white" id="contact">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              <TranslatedText>Contact Us</TranslatedText>
            </h2>
            <p className="mt-4 text-xl text-gray-600 mx-auto max-w-3xl">
              <TranslatedText>Have questions about how </TranslatedText>
              <span className="text-indigo-600">Wealth</span>
              <span className="text-gray-900">Horizon</span>
              <TranslatedText> can transform your wealth management?</TranslatedText>
            </p>
            <p className="mt-2 text-xl text-gray-600">
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
