
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    companyType: "",
    inquiryType: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill out all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setShowSuccessModal(true);
      
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          company: "",
          companyType: "",
          inquiryType: "",
          message: ""
        });
        setIsSuccess(false);
      }, 2000);
    }, 1000);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200 h-[600px] flex flex-col">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h3>
        
        <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <Input 
              id="name" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              required 
              placeholder="John Doe" 
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <Input 
              id="email" 
              name="email"
              type="email" 
              value={formData.email}
              onChange={handleChange}
              required 
              placeholder="john@example.com" 
            />
          </div>
          
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
              Company
            </label>
            <Input 
              id="company" 
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Your Company" 
            />
          </div>
          
          <div>
            <label htmlFor="companyType" className="block text-sm font-medium text-gray-700 mb-1">
              Type of Company
            </label>
            <Select
              value={formData.companyType}
              onValueChange={(value) => handleSelectChange("companyType", value)}
            >
              <SelectTrigger id="companyType" className="w-full">
                <SelectValue placeholder="Select company type" />
              </SelectTrigger>
              <SelectContent>
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
              Type of Inquiry
            </label>
            <Select
              value={formData.inquiryType}
              onValueChange={(value) => handleSelectChange("inquiryType", value)}
            >
              <SelectTrigger id="inquiryType" className="w-full">
                <SelectValue placeholder="Select inquiry type" />
              </SelectTrigger>
              <SelectContent>
                {inquiryTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-1 flex flex-col">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message <span className="text-red-500">*</span>
            </label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Tell us about your needs and how we can help"
              className="resize-none flex-1"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full flex items-center justify-center gap-2"
            disabled={isSubmitting || isSuccess}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending Message...
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle className="h-5 w-5" />
                Message Sent!
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </div>

      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="max-w-md p-0 overflow-hidden rounded-xl border-none" hideCloseButton>
          <div className="bg-gradient-to-br from-indigo-50 to-white p-6 flex flex-col items-center justify-center min-h-[250px]">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-gray-50 p-3">
                <CheckCircle className="h-8 w-8 text-[#4E46DC]" />
              </div>
            </div>
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-center">Message Sent Successfully</DialogTitle>
              <DialogDescription className="text-center text-gray-600 mt-2">
                Thank you for your message.
                <br />
                We will get back to you within 1-2 working days.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-6">
              <Button 
                onClick={closeSuccessModal}
                className="px-8 bg-black hover:bg-gray-800"
              >
                Close
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContactForm;
