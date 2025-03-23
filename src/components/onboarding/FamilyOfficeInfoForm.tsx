
import { useState } from "react";
import { useOnboarding, FamilyOfficeInfo } from "@/context/OnboardingContext";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Building } from "lucide-react";
import FormFieldItem from "./family-office/FormFieldItem";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Define constant options for selects
const LEGAL_ENTITY_TYPES = [
  "Limited Liability Company (LLC)",
  "Corporation",
  "Partnership",
  "Trust",
  "Foundation",
  "S Corporation",
  "Limited Partnership (LP)",
  "Joint Venture",
  "Other"
];

const JURISDICTIONS = [
  "United States", "United Kingdom", "Switzerland", "Singapore", 
  "Hong Kong", "Cayman Islands", "British Virgin Islands", "Luxembourg",
  "Bermuda", "Liechtenstein", "Jersey", "Guernsey", "Isle of Man",
  "Bahamas", "Barbados", "Panama", "Monaco", "United Arab Emirates",
  "Canada", "Australia", "New Zealand", "Germany", "France", "Italy", "Spain"
];

const FamilyOfficeInfoForm = () => {
  const { onboardingData, updateFamilyOfficeInfo, setCurrentStep } = useOnboarding();
  const [formData, setFormData] = useState<FamilyOfficeInfo>(onboardingData.familyOfficeInfo);

  const handleFieldChange = (name: keyof FamilyOfficeInfo, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const requiredFields: (keyof FamilyOfficeInfo)[] = ['officeName', 'legalEntityType', 'jurisdiction', 'taxId'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing information",
        description: `Please complete all required fields.`,
        variant: "destructive",
      });
      return;
    }
    
    updateFamilyOfficeInfo(formData);
    setCurrentStep(1); // Move to primary contact step
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto"
    >
      <Card className="p-6 md:p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Building className="h-7 w-7 text-blue-600" />
            <h2 className="text-2xl font-bold">Family Office Information</h2>
          </div>
          
          <p className="text-gray-500">
            Please provide the details of your family office entity for KYC verification.
          </p>

          <div className="space-y-6">
            {/* Full width field */}
            <FormFieldItem
              index={0}
              label="Family Office Name"
              name="officeName"
              value={formData.officeName}
              onChange={handleFieldChange}
              placeholder="Smith Family Office LLC"
              required
              type="text"
            />
            
            {/* Two column layout for related fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormFieldItem
                index={1}
                label="Legal Entity Type"
                name="legalEntityType"
                value={formData.legalEntityType}
                onChange={handleFieldChange}
                type="searchableSelect"
                options={LEGAL_ENTITY_TYPES}
                required
              />

              <FormFieldItem
                index={2}
                label="Jurisdiction"
                name="jurisdiction"
                value={formData.jurisdiction}
                onChange={handleFieldChange}
                type="searchableSelect"
                options={JURISDICTIONS}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormFieldItem
                index={3}
                label="Registration Number"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleFieldChange}
                placeholder="e.g., LLC-12345678"
              />
              
              <FormFieldItem
                index={4}
                label="Tax ID Number"
                name="taxId"
                value={formData.taxId}
                onChange={handleFieldChange}
                placeholder="e.g., 12-3456789"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormFieldItem
                index={5}
                label="Year Established"
                name="yearEstablished"
                value={formData.yearEstablished}
                onChange={handleFieldChange}
                placeholder="e.g., 2015"
                type="text"
              />
              
              <FormFieldItem
                index={6}
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleFieldChange}
                placeholder="office@example.com"
                type="email"
              />
              
              <FormFieldItem
                index={7}
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleFieldChange}
                placeholder="+1 (555) 123-4567"
                type="text"
              />
            </div>
            
            <FormFieldItem
              index={8}
              label="Website"
              name="website"
              value={formData.website}
              onChange={handleFieldChange}
              placeholder="https://www.example.com"
              type="text"
            />
          </div>

          <div className="pt-4 border-t">
            <p className="text-sm text-gray-500 mb-6">
              Fields marked with <span className="text-red-500">*</span> are required.
            </p>
            <div className="flex justify-end">
              <Button 
                type="submit" 
                size="lg" 
                className="rounded-lg hover:shadow-md transition-shadow"
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </motion.div>
  );
};

export default FamilyOfficeInfoForm;
