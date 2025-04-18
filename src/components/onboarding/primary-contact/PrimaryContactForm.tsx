
import React, { useState, useEffect } from "react";
import { useOnboarding, PrimaryContactInfo } from "@/context/OnboardingContext";
import { toast } from "@/components/ui/use-toast";
import { FormLayout, FormSection } from "@/components/onboarding/common/layouts";
import { FormFooter } from "@/components/onboarding/common";
import { validateRequiredFields, isValidEmail } from "../common/utils/validation";
import { PrimaryContactFormHeader, PrimaryContactFormFields } from "./components";

const PrimaryContactForm: React.FC = () => {
  const { onboardingData, updatePrimaryContactInfo, setCurrentStep } = useOnboarding();
  const [formData, setFormData] = useState<PrimaryContactInfo>(onboardingData.primaryContactInfo);
  const [errors, setErrors] = useState<Partial<Record<keyof PrimaryContactInfo, string>>>({});
  const [formTouched, setFormTouched] = useState(false);

  const requiredFields: (keyof PrimaryContactInfo)[] = [
    'firstName', 
    'lastName', 
    'position', 
    'email', 
    'phone'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Check if all required fields are filled out properly - used for button activation
  const areAllRequiredFieldsFilled = requiredFields.every(field => 
    Boolean(formData[field])
  ) && formData.email && isValidEmail(formData.email);

  const validateForm = () => {
    const newErrors: Partial<Record<keyof PrimaryContactInfo, string>> = {};
    
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });
    
    // Email validation
    if (formData.email && !isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    setFormTouched(true);
    
    if (!validateForm()) {
      toast({
        title: "Form validation failed",
        description: "Please check the form for errors.",
        variant: "destructive",
      });
      return;
    }
    
    updatePrimaryContactInfo(formData);
    setCurrentStep(2); // Move to address step
    
    toast({
      title: "Information saved",
      description: "Primary contact information has been saved successfully.",
    });
  };

  return (
    <FormLayout>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-6">
        <PrimaryContactFormHeader />
        
        <FormSection>
          <PrimaryContactFormFields 
            formData={formData}
            errors={formTouched ? errors : {}}
            handleInputChange={handleInputChange}
          />
        </FormSection>

        <FormFooter
          onBack={() => setCurrentStep(0)}
          onSubmit={handleSubmit}
          disableContinue={!areAllRequiredFieldsFilled}
        />
      </form>
    </FormLayout>
  );
};

export default PrimaryContactForm;
