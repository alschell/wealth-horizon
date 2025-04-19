
import React from 'react';
import ContactForm from './ContactForm';
import TranslatedText from '@/components/ui/translated-text';

export const ContactFormSection: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center mx-auto">
            <TranslatedText>Have questions about how WealthHorizon can transform your wealth management?</TranslatedText>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center">
            <TranslatedText>Get in touch with our team.</TranslatedText>
          </p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
};

export default ContactFormSection;
