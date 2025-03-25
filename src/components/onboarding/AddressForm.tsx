
import React, { useState, useEffect } from "react";
import { useOnboarding, AddressInfo } from "@/context/OnboardingContext";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { AddressFormHeader, AddressFormFields, AddressFormNavigation } from "./address";
import { validateRequiredFields } from "./common/utils/validation";

const AddressForm = () => {
  const { onboardingData, updateAddressInfo, setCurrentStep } = useOnboarding();
  const [formData, setFormData] = useState<AddressInfo>(onboardingData.addressInfo);
  const [errors, setErrors] = useState<Partial<Record<keyof AddressInfo, string>>>({});
  const [formTouched, setFormTouched] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);

  // Required fields for validation
  const requiredFields: (keyof AddressInfo)[] = [
    'streetAddress',
    'city', 
    'state',
    'postalCode', 
    'country'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (!formTouched) {
      setFormTouched(true);
    }
    
    // Clear error when field is edited
    if (errors[name as keyof AddressInfo]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleSelectChange = (field: keyof AddressInfo, value: string) => {
    setFormData({ ...formData, [field]: value });
    
    if (!formTouched) {
      setFormTouched(true);
    }
    
    // Clear error when field is edited
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  // Check for form validity whenever formData changes, but only if form has been touched
  useEffect(() => {
    if (formTouched) {
      const newErrors = validateRequiredFields(formData, requiredFields);
      setErrors(newErrors);
      setHasErrors(Object.keys(newErrors).length > 0);
    }
  }, [formData, formTouched]);

  const validateForm = () => {
    const newErrors = validateRequiredFields(formData, requiredFields);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormTouched(true);
    
    if (!validateForm()) {
      toast({
        title: "Form validation failed",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    updateAddressInfo(formData);
    setCurrentStep(3); // Move to legal documents step
    
    toast({
      title: "Information saved",
      description: "Address information has been saved successfully.",
    });
  };

  // Check if all required fields are filled
  const areAllRequiredFieldsFilled = requiredFields.every(field => 
    Boolean(formData[field])
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto"
    >
      <Card className="p-6 md:p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <AddressFormHeader />
          
          <AddressFormFields 
            address={formData}
            errors={formTouched ? errors : {}}
            onInputChange={handleInputChange}
            onSelectionChange={handleSelectChange}
          />

          <AddressFormNavigation hasErrors={!areAllRequiredFieldsFilled} />
        </form>
      </Card>
    </motion.div>
  );
};

export default AddressForm;
