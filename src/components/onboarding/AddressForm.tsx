
import React, { useState } from "react";
import { useOnboarding, AddressInfo } from "@/context/OnboardingContext";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { AddressFormHeader, AddressFormFields, AddressFormNavigation } from "./address";

const AddressForm = () => {
  const { onboardingData, updateAddressInfo, setCurrentStep } = useOnboarding();
  const [formData, setFormData] = useState<AddressInfo>(onboardingData.addressInfo);
  const [errors, setErrors] = useState<Partial<Record<keyof AddressInfo, string>>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when field is edited
    if (errors[name as keyof AddressInfo]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleSelectChange = (field: keyof AddressInfo, value: string) => {
    setFormData({ ...formData, [field]: value });
    
    // Clear error when field is edited
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof AddressInfo, string>> = {};
    // Make all fields required
    const requiredFields: (keyof AddressInfo)[] = [
      'streetAddress', 
      'addressLine2',
      'city', 
      'state',
      'postalCode', 
      'country'
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
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
            errors={errors}
            onInputChange={handleInputChange}
            onSelectionChange={handleSelectChange}
          />

          <AddressFormNavigation hasErrors={Object.keys(errors).length > 0} />
        </form>
      </Card>
    </motion.div>
  );
};

export default AddressForm;
