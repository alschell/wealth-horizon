
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import CustomSearchableSelect from "@/components/ui/custom-searchable-select";

const ContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [inquiry, setInquiry] = useState("");
  const [company, setCompany] = useState("");
  const [industry, setIndustry] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      // Show success message
      toast.success("Your message has been sent! We'll be in touch shortly.");
      
      // Reset form fields
      setFullName("");
      setEmail("");
      setPhone("");
      setInquiry("");
      setCompany("");
      setIndustry("");
      setMessage("");
      
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200" style={{ minHeight: '840px' }}>
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Send us a message</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="full-name">Full name<span className="text-red-500 ml-1">*</span></Label>
          <Input 
            id="full-name" 
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="John Doe" 
            required 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="company">Company<span className="text-red-500 ml-1">*</span></Label>
          <Input 
            id="company" 
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Your company" 
            required 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="industry">Industry<span className="text-red-500 ml-1">*</span></Label>
          <CustomSearchableSelect 
            id="industry"
            label="Industry"
            value={industry}
            placeholder="Select your industry"
            options={[
              "Banking & Financial Services",
              "Family Office",
              "Wealth Management",
              "Private Equity",
              "Hedge Fund",
              "Insurance",
              "Real Estate",
              "Technology",
              "Legal Services",
              "Other"
            ]}
            onChange={(value) => setIndustry(value)}
            required
            allowCustomValue
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="inquiry-type">Type of inquiry<span className="text-red-500 ml-1">*</span></Label>
          <CustomSearchableSelect 
            id="inquiry-type"
            label="Type of inquiry"
            value={inquiry}
            placeholder="Select inquiry type"
            options={[
              "Speak with a sales representative",
              "Request a demo",
              "Get information on our partnership program",
              "Other"
            ]}
            onChange={(value) => setInquiry(value)}
            required
            allowCustomValue
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email<span className="text-red-500 ml-1">*</span></Label>
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
            <Label htmlFor="phone">Phone<span className="text-red-500 ml-1">*</span></Label>
            <Input 
              id="phone" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 000-0000" 
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="message">Message<span className="text-red-500 ml-1">*</span></Label>
          <Textarea 
            id="message" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="How can we help you?"
            rows={6}
            required
            className="focus-visible:outline-none focus-visible:ring-0 focus-visible:border-black"
          />
        </div>
        
        <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
