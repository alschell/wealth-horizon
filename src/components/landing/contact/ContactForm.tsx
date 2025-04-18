
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/context/TranslationContext";
import TranslatedText from "@/components/ui/translated-text";
import ContactFormFields from "./ContactFormFields";
import ContactSuccessModal from "./ContactSuccessModal";
import { industryOptions, inquiryOptions } from "./contactFormConstants";

const ContactForm: React.FC = () => {
  const { translate, currentLanguage } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [industry, setIndustry] = useState("");
  const [inquiry, setInquiry] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [translatedIndustryOptions, setTranslatedIndustryOptions] = useState<string[]>([]);
  const [translatedInquiryOptions, setTranslatedInquiryOptions] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      // Show success modal instead of toast
      setShowSuccessModal(true);
      
      // Reset form fields
      setEmail("");
      setFullName("");
      setCompany("");
      setIndustry("");
      setInquiry("");
      setMessage("");
      
      setIsSubmitting(false);
    }, 1000);
  };

  // Translate dropdown options when language changes
  useEffect(() => {
    const translateOptions = async () => {
      try {
        // Clear previous translations first to avoid stale data
        setTranslatedIndustryOptions([]);
        setTranslatedInquiryOptions([]);
        
        // Translate industry options
        const translatedIndustries = await Promise.all(
          industryOptions.map(option => translate(option))
        );
        setTranslatedIndustryOptions(translatedIndustries);

        // Translate inquiry options
        const translatedInquiries = await Promise.all(
          inquiryOptions.map(option => translate(option))
        );
        setTranslatedInquiryOptions(translatedInquiries);
      } catch (error) {
        console.error("Failed to translate options:", error);
      }
    };

    translateOptions();
  }, [translate, currentLanguage]);

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        <TranslatedText>Send us a message</TranslatedText>
      </h3>
      
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        <ContactFormFields 
          email={email}
          setEmail={setEmail}
          fullName={fullName}
          setFullName={setFullName}
          company={company}
          setCompany={setCompany}
          industry={industry}
          setIndustry={setIndustry}
          inquiry={inquiry}
          setInquiry={setInquiry}
          message={message}
          setMessage={setMessage}
          translatedIndustryOptions={translatedIndustryOptions}
          translatedInquiryOptions={translatedInquiryOptions}
          industryOptions={industryOptions}
          inquiryOptions={inquiryOptions}
        />
        
        <div className="mt-6 flex-shrink-0">
          <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
            {isSubmitting ? 
              <TranslatedText>Sending...</TranslatedText> : 
              <TranslatedText>Send Message</TranslatedText>
            }
          </Button>
        </div>
      </form>

      <ContactSuccessModal 
        showSuccessModal={showSuccessModal}
        setShowSuccessModal={setShowSuccessModal}
      />
    </div>
  );
};

export default ContactForm;
