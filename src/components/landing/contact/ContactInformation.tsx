
import React from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { TranslatedText } from "@/components/ui/translated-text";

const ContactInformation: React.FC = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">
        <TranslatedText>Get in Touch</TranslatedText>
      </h3>
      <p className="text-gray-600">
        <TranslatedText>
          Have questions about our platform? Our team is ready to assist you.
          Reach out to us through any of the channels below.
        </TranslatedText>
      </p>
      
      <div className="space-y-4">
        <div className="flex items-start">
          <MapPin className="mr-3 h-5 w-5 text-indigo-600 mt-0.5" />
          <div>
            <h4 className="font-medium">
              <TranslatedText>Visit Us</TranslatedText>
            </h4>
            <p className="text-gray-600">
              <TranslatedText>
                123 Finance Street, Suite 400<br />
                New York, NY 10001<br />
                United States
              </TranslatedText>
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Phone className="mr-3 h-5 w-5 text-indigo-600 mt-0.5" />
          <div>
            <h4 className="font-medium">
              <TranslatedText>Call Us</TranslatedText>
            </h4>
            <p className="text-gray-600">+1 (555) 123-4567</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Mail className="mr-3 h-5 w-5 text-indigo-600 mt-0.5" />
          <div>
            <h4 className="font-medium">
              <TranslatedText>Email Us</TranslatedText>
            </h4>
            <p className="text-gray-600">contact@wealthhorizon.com</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Clock className="mr-3 h-5 w-5 text-indigo-600 mt-0.5" />
          <div>
            <h4 className="font-medium">
              <TranslatedText>Business Hours</TranslatedText>
            </h4>
            <p className="text-gray-600">
              <TranslatedText>Monday - Friday: 9:00 AM - 6:00 PM EST</TranslatedText>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
