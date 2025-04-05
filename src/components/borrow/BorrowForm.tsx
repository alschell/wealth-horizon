
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const BorrowForm = () => {
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    facilityId: "",
    amount: "",
    currency: "USD",
    destinationAccount: "",
    purpose: "investment",
    notes: "",
    term: "revolving",
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formState.facilityId || !formState.amount || !formState.destinationAccount) {
      toast({
        title: "Validation Error",
        description: "Please fill out all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // Process the borrow request
    toast({
      title: "Borrow Request Submitted",
      description: `Your request for ${formState.currency} ${formState.amount} has been submitted for approval.`,
    });
    
    // Reset form
    setFormState({
      facilityId: "",
      amount: "",
      currency: "USD",
      destinationAccount: "",
      purpose: "investment",
      notes: "",
      term: "revolving",
    });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="facilityId">Select Facility</Label>
          <Select 
            value={formState.facilityId} 
            onValueChange={(value) => handleSelectChange("facilityId", value)}
          >
            <SelectTrigger id="facilityId">
              <SelectValue placeholder="Select a credit facility" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="facility-1">
                <div className="flex items-center justify-between w-full">
                  <span>Main Credit Line (JPM)</span>
                  <Badge className="ml-2 bg-green-100 text-green-800">$18.5M</Badge>
                </div>
              </SelectItem>
              <SelectItem value="facility-2">
                <div className="flex items-center justify-between w-full">
                  <span>Securities-Backed (UBS)</span>
                  <Badge className="ml-2 bg-green-100 text-green-800">$7.25M</Badge>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="destinationAccount">Destination Account</Label>
          <Select 
            value={formState.destinationAccount} 
            onValueChange={(value) => handleSelectChange("destinationAccount", value)}
          >
            <SelectTrigger id="destinationAccount">
              <SelectValue placeholder="Select destination account" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="account-1">Main Cash Account (JPM)</SelectItem>
              <SelectItem value="account-2">Trading Account (MS)</SelectItem>
              <SelectItem value="account-3">Euro Cash Account (CS)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <div className="relative">
            <Input
              id="amount"
              name="amount"
              type="text"
              placeholder="0.00"
              value={formState.amount}
              onChange={handleChange}
              className="pl-8"
            />
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="currency">Currency</Label>
          <Select 
            value={formState.currency} 
            onValueChange={(value) => handleSelectChange("currency", value)}
          >
            <SelectTrigger id="currency">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD - US Dollar</SelectItem>
              <SelectItem value="EUR">EUR - Euro</SelectItem>
              <SelectItem value="GBP">GBP - British Pound</SelectItem>
              <SelectItem value="CHF">CHF - Swiss Franc</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="purpose">Purpose</Label>
        <RadioGroup
          value={formState.purpose}
          onValueChange={(value) => handleSelectChange("purpose", value)}
          className="flex flex-col space-y-1"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="investment" id="purpose-investment" />
            <Label htmlFor="purpose-investment" className="font-normal cursor-pointer">Investment</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="liquidity" id="purpose-liquidity" />
            <Label htmlFor="purpose-liquidity" className="font-normal cursor-pointer">Liquidity Need</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="refinance" id="purpose-refinance" />
            <Label htmlFor="purpose-refinance" className="font-normal cursor-pointer">Refinance Existing Debt</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="other" id="purpose-other" />
            <Label htmlFor="purpose-other" className="font-normal cursor-pointer">Other</Label>
          </div>
        </RadioGroup>
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="additional-options">
          <AccordionTrigger>Additional Options</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label htmlFor="term">Term Type</Label>
                <RadioGroup
                  value={formState.term}
                  onValueChange={(value) => handleSelectChange("term", value)}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="revolving" id="term-revolving" />
                    <Label htmlFor="term-revolving" className="font-normal cursor-pointer">Revolving Credit</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="term" id="term-loan" />
                    <Label htmlFor="term-loan" className="font-normal cursor-pointer">Term Loan</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  placeholder="Add any additional notes or instructions"
                  value={formState.notes}
                  onChange={handleChange}
                  rows={3}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <div className="flex justify-end">
        <Button type="submit" className="w-full md:w-auto">Submit Borrow Request</Button>
      </div>
    </form>
  );
};

export default BorrowForm;
