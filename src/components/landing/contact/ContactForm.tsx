
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import CustomSearchableSelect from "@/components/ui/custom-searchable-select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Check } from "lucide-react";

const ContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [industry, setIndustry] = useState("");
  const [inquiry, setInquiry] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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

  // Sort industry options alphabetically, keeping "Other" at the end
  const industryOptions = [
    "Advisor",
    "Aggregator",
    "Asset Manager",
    "Broker Dealer",
    "Family Office",
    "Institutional",
    "Other"
  ];

  // Define the inquiry options in the EXACT order specified - preserving this order exactly
  // These must be in this specific, non-alphabetical order
  const inquiryOptions = [
    "Speak with a sales representative",
    "Request a demo",
    "Get information on our partnership program",
    "Other"
  ];

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Send us a message</h3>
      
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        <div className="space-y-6 flex-grow">
          <div className="space-y-2">
            <Label htmlFor="email">
              Email<span className="text-indigo-600 ml-1">*</span>
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
              Full name<span className="text-indigo-600 ml-1">*</span>
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
              Company<span className="text-indigo-600 ml-1">*</span>
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
              Industry<span className="text-indigo-600 ml-1">*</span>
            </Label>
            <CustomSearchableSelect 
              id="industry"
              label=""
              value={industry}
              placeholder="Select your industry"
              options={industryOptions}
              onChange={(value) => setIndustry(value)}
              required={true}
              allowCustomValue
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="inquiry-type">
              Type of inquiry<span className="text-indigo-600 ml-1">*</span>
            </Label>
            <CustomSearchableSelect 
              id="inquiry-type"
              label=""
              value={inquiry}
              placeholder="Select inquiry type"
              options={inquiryOptions}
              onChange={(value) => setInquiry(value)}
              required={true}
              allowCustomValue
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">
              Message<span className="text-indigo-600 ml-1">*</span>
            </Label>
            <div className="h-[144px]">
              <Textarea 
                id="message" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help you?"
                className="h-full w-full resize-none focus-visible:outline-none focus-visible:ring-0 focus-visible:border-black"
                required
              />
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex-shrink-0">
          <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </div>
      </form>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center">
            <div className="mx-auto bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <DialogTitle className="text-xl font-semibold">Message sent successfully</DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-2 py-4">
            <p className="text-gray-700">Your message has been sent.</p>
            <p className="text-gray-600">We will get back to you within 1-2 working days.</p>
          </div>
          <DialogFooter className="flex justify-center">
            <Button 
              onClick={() => setShowSuccessModal(false)}
              className="bg-black text-white hover:bg-gray-800"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactForm;
