
import React, { useState } from "react";
import { useOnboarding, FamilyOfficeInfo } from "@/context/OnboardingContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Building2, ArrowRight } from "lucide-react";
import { validateFamilyOfficeInfo } from "./validationUtils";
import FormHeader from "./FormHeader";
import BasicInfoSection from "./sections/BasicInfoSection";
import EntityDetailsSection from "./sections/EntityDetailsSection";
import ContactInfoSection from "./sections/ContactInfoSection";

const FamilyOfficeInfoForm = () => {
  const { onboardingData, updateFamilyOfficeInfo, setCurrentStep } = useOnboarding();
  const [formData, setFormData] = useState<FamilyOfficeInfo>(onboardingData.familyOfficeInfo);
  const [errors, setErrors] = useState<Partial<Record<keyof FamilyOfficeInfo, string>>>({});

  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
    
    // Clear error when field is edited
    if (errors[name as keyof FamilyOfficeInfo]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateFamilyOfficeInfo(formData)) {
      return;
    }
    
    updateFamilyOfficeInfo(formData);
    setCurrentStep(1); // Move to primary contact step
    
    toast({
      title: "Information saved",
      description: "Family office information has been saved successfully.",
    });
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
          <FormHeader 
            title="Family Office Information"
            description="Please provide the details of your family office entity for KYC verification."
            icon={<Building2 className="h-7 w-7 text-black" />}
          />
          
          <div className="space-y-6">
            {/* Basic Information */}
            <BasicInfoSection 
              formData={formData}
              onChange={handleInputChange}
              errors={errors}
            />
            
            {/* Entity Details */}
            <EntityDetailsSection 
              formData={formData}
              onChange={handleInputChange}
              errors={errors}
            />
            
            {/* Contact Information */}
            <ContactInfoSection 
              formData={formData}
              onChange={handleInputChange}
              errors={errors}
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
                className="rounded-lg hover:shadow-md transition-shadow bg-[#86CEFA] hover:bg-[#5ba8d6] text-white"
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
