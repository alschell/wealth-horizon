
import React from "react";
import { FadeIn } from "@/components/ui/animation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import TranslatedText from "@/components/ui/translated-text";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    alert("Thank you for your message. Our team will contact you shortly.");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900">
              <TranslatedText>Contact Sales</TranslatedText>
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              <TranslatedText>
                Get in touch with our sales team to learn how Wealth Horizon can transform your wealth management operations.
              </TranslatedText>
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <FadeIn delay={0.2}>
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                <TranslatedText>Send us a message</TranslatedText>
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      <TranslatedText>Full Name</TranslatedText>
                    </label>
                    <Input id="name" required placeholder="John Doe" />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                      <TranslatedText>Company</TranslatedText>
                    </label>
                    <Input id="company" required placeholder="Your Company" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      <TranslatedText>Email Address</TranslatedText>
                    </label>
                    <Input id="email" type="email" required placeholder="john@example.com" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      <TranslatedText>Phone Number</TranslatedText>
                    </label>
                    <Input id="phone" placeholder="+1 (555) 123-4567" />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    <TranslatedText>Message</TranslatedText>
                  </label>
                  <Textarea
                    id="message"
                    required
                    placeholder="Tell us about your needs and how we can help"
                    rows={6}
                  />
                </div>
                <Button type="submit" className="w-full">
                  <TranslatedText>Send Message</TranslatedText>
                </Button>
              </form>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  <TranslatedText>Get in Touch</TranslatedText>
                </h2>
                <p className="text-gray-600">
                  <TranslatedText>
                    Our team of wealth management experts is ready to answer your questions and provide personalized guidance for your organization.
                  </TranslatedText>
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      <TranslatedText>Email Us</TranslatedText>
                    </h3>
                    <p className="text-gray-600">sales@wealthhorizon.ai</p>
                    <p className="text-gray-600">support@wealthhorizon.ai</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      <TranslatedText>Call Us</TranslatedText>
                    </h3>
                    <p className="text-gray-600">+1 (831) 273 1336</p>
                    <p className="text-gray-600">
                      <TranslatedText>Monday-Friday, 9am-6pm EST</TranslatedText>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      <TranslatedText>Visit Us</TranslatedText>
                    </h3>
                    <p className="text-gray-600">
                      8 The Green STE B<br />
                      Dover, DE 19901<br />
                      <TranslatedText>United States</TranslatedText>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-600 rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-3">
                  <TranslatedText>Schedule a Demo</TranslatedText>
                </h3>
                <p className="mb-6">
                  <TranslatedText>
                    See Wealth Horizon in action with a personalized demo tailored to your organization's needs.
                  </TranslatedText>
                </p>
                <Button className="bg-white text-indigo-600 hover:bg-gray-100">
                  <TranslatedText>Book a Demo</TranslatedText>
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};

export default Contact;
