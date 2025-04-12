
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const companyTypes = [
  "Aggregator",
  "Asset Manager",
  "Advisor",
  "Broker Dealer",
  "Family Office",
  "Institutional",
  "Other"
];

const inquiryTypes = [
  "Speak with a sales representative",
  "Request a demo",
  "Get information on our partnership program",
  "Other"
];

const ContactForm: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Your message has been sent! We'll get back to you soon.");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
      <h3 className="text-xl font-semibold">Send us a message</h3>
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Full name <span className="text-red-500">*</span>
        </label>
        <Input id="name" placeholder="Your name" required />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email address <span className="text-red-500">*</span>
        </label>
        <Input id="email" type="email" placeholder="Your email" required />
      </div>
      
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
          Company <span className="text-red-500">*</span>
        </label>
        <Input id="company" placeholder="Your company" required />
      </div>

      <div>
        <label htmlFor="companyType" className="block text-sm font-medium text-gray-700 mb-1">
          Type of company <span className="text-red-500">*</span>
        </label>
        <Select required>
          <SelectTrigger id="companyType" className="h-11">
            <SelectValue placeholder="Select company type" />
          </SelectTrigger>
          <SelectContent className="bg-white z-[9999]">
            {companyTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-1">
          Type of inquiry <span className="text-red-500">*</span>
        </label>
        <Select required>
          <SelectTrigger id="inquiryType" className="h-11">
            <SelectValue placeholder="Select inquiry type" />
          </SelectTrigger>
          <SelectContent className="bg-white z-[9999]">
            {inquiryTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Message <span className="text-red-500">*</span>
        </label>
        <Textarea
          id="message"
          placeholder="Tell us how we can help..."
          className="min-h-[120px]"
          required
        />
      </div>
      
      <Button type="submit" className="w-full">
        Send Message
      </Button>
    </form>
  );
};

export default ContactForm;
