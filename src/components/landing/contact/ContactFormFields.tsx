
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import CustomSearchableSelect from "@/components/ui/custom-searchable-select";
import TranslatedText from "@/components/ui/translated-text";

interface ContactFormFieldsProps {
  email: string;
  setEmail: (value: string) => void;
  fullName: string;
  setFullName: (value: string) => void;
  company: string;
  setCompany: (value: string) => void;
  industry: string;
  setIndustry: (value: string) => void;
  inquiry: string;
  setInquiry: (value: string) => void;
  message: string;
  setMessage: (value: string) => void;
  translatedIndustryOptions: string[];
  translatedInquiryOptions: string[];
  industryOptions: string[];
  inquiryOptions: string[];
}

const ContactFormFields: React.FC<ContactFormFieldsProps> = ({
  email,
  setEmail,
  fullName,
  setFullName,
  company,
  setCompany,
  industry,
  setIndustry,
  inquiry,
  setInquiry,
  message,
  setMessage,
  translatedIndustryOptions,
  translatedInquiryOptions,
  industryOptions,
  inquiryOptions
}) => {
  return (
    <div className="space-y-6 flex-grow">
      <div className="space-y-2">
        <Label htmlFor="email">
          <TranslatedText>Email</TranslatedText><span className="text-indigo-600 ml-1">*</span>
        </Label>
        <Input 
          id="email" 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="john@example.com" 
          required 
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="full-name">
          <TranslatedText>Full name</TranslatedText><span className="text-indigo-600 ml-1">*</span>
        </Label>
        <Input 
          id="full-name" 
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="John Doe" 
          required 
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="company">
          <TranslatedText>Company</TranslatedText><span className="text-indigo-600 ml-1">*</span>
        </Label>
        <Input 
          id="company" 
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Your company" 
          required 
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="industry">
          <TranslatedText>Industry</TranslatedText><span className="text-indigo-600 ml-1">*</span>
        </Label>
        <CustomSearchableSelect 
          id="industry"
          label=""
          value={industry}
          placeholder="Select your industry"
          options={translatedIndustryOptions.length > 0 ? translatedIndustryOptions : industryOptions}
          onChange={(value) => setIndustry(value)}
          required={true}
          allowCustomValue
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="inquiry-type">
          <TranslatedText>Type of inquiry</TranslatedText><span className="text-indigo-600 ml-1">*</span>
        </Label>
        <CustomSearchableSelect 
          id="inquiry-type"
          label=""
          value={inquiry}
          placeholder="Select inquiry type"
          options={translatedInquiryOptions.length > 0 ? translatedInquiryOptions : inquiryOptions}
          onChange={(value) => setInquiry(value)}
          required={true}
          allowCustomValue
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="message">
          <TranslatedText>Message</TranslatedText><span className="text-indigo-600 ml-1">*</span>
        </Label>
        <div className="h-[144px]">
          <Textarea 
            id="message" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="How can we help you?"
            className="h-full w-full resize-none focus-visible:outline-none focus-visible:ring-0 focus-visible:border-black focus-visible:border-2"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default ContactFormFields;
