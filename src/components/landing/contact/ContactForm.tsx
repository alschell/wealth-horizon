
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TranslatedText } from "@/components/ui/translated-text";

const ContactForm: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic
    console.log("Form submitted");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            <TranslatedText>First Name</TranslatedText>
          </label>
          <Input 
            id="firstName" 
            name="firstName" 
            required 
            className="w-full" 
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            <TranslatedText>Last Name</TranslatedText>
          </label>
          <Input 
            id="lastName" 
            name="lastName" 
            required 
            className="w-full" 
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          <TranslatedText>Email</TranslatedText>
        </label>
        <Input 
          id="email" 
          name="email" 
          type="email" 
          required 
          className="w-full" 
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="company" className="block text-sm font-medium text-gray-700">
          <TranslatedText>Company</TranslatedText>
        </label>
        <Input 
          id="company" 
          name="company" 
          className="w-full" 
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="interest" className="block text-sm font-medium text-gray-700">
          <TranslatedText>I'm interested in</TranslatedText>
        </label>
        <Select name="interest">
          <SelectTrigger>
            <SelectValue placeholder={<TranslatedText>Select an option</TranslatedText>} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="demo"><TranslatedText>Product Demo</TranslatedText></SelectItem>
            <SelectItem value="pricing"><TranslatedText>Pricing Information</TranslatedText></SelectItem>
            <SelectItem value="partnership"><TranslatedText>Partnership Opportunities</TranslatedText></SelectItem>
            <SelectItem value="support"><TranslatedText>Technical Support</TranslatedText></SelectItem>
            <SelectItem value="other"><TranslatedText>Other</TranslatedText></SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          <TranslatedText>Message</TranslatedText>
        </label>
        <Textarea 
          id="message" 
          name="message" 
          rows={4} 
          required 
          className="w-full" 
        />
      </div>
      
      <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
        <TranslatedText>Send Message</TranslatedText>
      </Button>
    </form>
  );
};

export default ContactForm;
