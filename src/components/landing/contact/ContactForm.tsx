
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LocalizedText, useLocalizedText } from "@/components/ui/localized-text";
import { useLanguage } from "@/context/LanguageContext";

const ContactForm: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useLocalizedText();
  const { language } = useLanguage();
  const [, forceUpdate] = useState({});
  
  // Force re-render when language changes
  useEffect(() => {
    console.log(`ContactForm detected language change to: ${language}`);
    forceUpdate({});
  }, [language]);
  
  // Listen for language change events
  useEffect(() => {
    const handleLanguageChange = () => {
      console.log("ContactForm detected language change event");
      forceUpdate({});
    };
    
    window.addEventListener('languageChange', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log({ firstName, lastName, email, message });
      setFirstName("");
      setLastName("");
      setEmail("");
      setMessage("");
      setIsSubmitting(false);
      // Here you would typically send the data to your backend
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        <LocalizedText textKey="sendUsAMessage" fallback="Send us a message" />
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            <LocalizedText textKey="firstName" fallback="First Name" />
          </label>
          <Input
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            <LocalizedText textKey="lastName" fallback="Last Name" />
          </label>
          <Input
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full"
            required
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          <LocalizedText textKey="email" fallback="Email" />
        </label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full"
          required
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          <LocalizedText textKey="message" fallback="Message" />
        </label>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full min-h-[120px]"
          required
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full py-3 px-5 font-semibold bg-indigo-600 hover:bg-indigo-700 text-white"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <LocalizedText textKey="submitting" fallback="Submitting..." />
          </span>
        ) : (
          <LocalizedText textKey="sendMessage" fallback="Send Message" />
        )}
      </Button>
    </form>
  );
};

export default ContactForm;
