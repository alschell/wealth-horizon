
import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { LocalizedText, useLocalizedText } from "@/components/ui/localized-text";
import { useLanguage } from "@/context/LanguageContext";

const ContactInformation: React.FC = () => {
  const { t } = useLocalizedText();
  const { language } = useLanguage();
  const [, forceUpdate] = useState({});
  
  // Force re-render when language changes
  useEffect(() => {
    console.log(`ContactInformation detected language change to: ${language}`);
    forceUpdate({});
  }, [language]);
  
  // Listen for language change events
  useEffect(() => {
    const handleLanguageChange = () => {
      console.log("ContactInformation detected language change event");
      forceUpdate({});
    };
    
    window.addEventListener('languageChange', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);

  return (
    <div className="bg-gray-50 rounded-lg p-8 h-full">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        <LocalizedText textKey="contactInformation" fallback="Contact Information" />
      </h3>
      <div className="space-y-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-3 mt-1">
            <MapPin className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900">
              <LocalizedText textKey="ourAddress" fallback="Our Address" />
            </h4>
            <p className="mt-1 text-gray-600">
              <LocalizedText 
                textKey="companyAddress" 
                fallback="123 Financial District, Suite 1500, New York, NY 10005"
              />
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-3 mt-1">
            <Phone className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900">
              <LocalizedText textKey="phoneNumber" fallback="Phone Number" />
            </h4>
            <p className="mt-1 text-gray-600">
              <LocalizedText textKey="contactPhone" fallback="+1 (555) 123-4567" />
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-3 mt-1">
            <Mail className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900">
              <LocalizedText textKey="emailAddress" fallback="Email Address" />
            </h4>
            <p className="mt-1 text-gray-600">
              <LocalizedText textKey="contactEmail" fallback="contact@wealthhorizon.com" />
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 border-t border-gray-200 pt-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">
          <LocalizedText textKey="officeHours" fallback="Office Hours" />
        </h4>
        <p className="text-gray-600 mb-1">
          <LocalizedText textKey="weekdayHours" fallback="Monday-Friday: 9:00 AM - 6:00 PM EST" />
        </p>
        <p className="text-gray-600">
          <LocalizedText textKey="weekendClosed" fallback="Saturday-Sunday: Closed" />
        </p>
      </div>
    </div>
  );
};

export default ContactInformation;
