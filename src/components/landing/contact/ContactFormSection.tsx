
import React from "react";
import { FadeIn } from "@/components/ui/animation";
import ContactForm from "./ContactForm";
import ContactInformation from "./ContactInformation";

const ContactFormSection: React.FC = () => {
  return (
    <section className="py-24 bg-white" id="contact">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Contact Us</h2>
            <p className="mt-4 text-xl text-gray-600 mx-auto" style={{ maxWidth: "720px" }}>
              Have questions about how <span className="text-indigo-600">Wealth</span>Horizon can transform your wealth management?
            </p>
            <p className="mt-2 text-xl text-gray-600">
              Get in touch with our team.
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
