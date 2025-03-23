
import React, { useState } from "react";
import { useOnboarding, FamilyOfficeInfo } from "@/context/OnboardingContext";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Building, ArrowRight } from "lucide-react";
import { CustomSearchableSelect } from "@/components/ui/custom-searchable-select";
import { LEGAL_ENTITY_TYPES, JURISDICTIONS } from "./constants/formOptions";

const FamilyOfficeInfoForm = () => {
  const { onboardingData, updateFamilyOfficeInfo, setCurrentStep } = useOnboarding();
  const [formData, setFormData] = useState<FamilyOfficeInfo>(onboardingData.familyOfficeInfo);
  const [errors, setErrors] = useState<Partial<Record<keyof FamilyOfficeInfo, string>>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when field is edited
    if (errors[name as keyof FamilyOfficeInfo]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleSelectChange = (field: keyof FamilyOfficeInfo, value: string) => {
    setFormData({ ...formData, [field]: value });
    
    // Clear error when field is edited
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof FamilyOfficeInfo, string>> = {};
    const requiredFields: (keyof FamilyOfficeInfo)[] = [
      'officeName', 
      'legalEntityType', 
      'jurisdiction', 
      'taxId'
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });
    
    // Email validation if provided
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Form validation failed",
        description: "Please check the form for errors.",
        variant: "destructive",
      });
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
          <div className="flex items-center gap-3 mb-2">
            <Building className="h-7 w-7 text-blue-600" />
            <h2 className="text-2xl font-bold">Family Office Information</h2>
          </div>
          
          <p className="text-gray-500">
            Please provide the details of your family office entity for KYC verification.
          </p>

          <div className="space-y-6">
            {/* Family Office Name */}
            <div className="space-y-2">
              <Label htmlFor="officeName">
                Family Office Name<span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="officeName"
                name="officeName"
                value={formData.officeName}
                onChange={handleInputChange}
                placeholder="Smith Family Office LLC"
                className={`h-11 ${errors.officeName ? 'border-red-500' : ''}`}
              />
              {errors.officeName && (
                <p className="text-red-500 text-sm mt-1">{errors.officeName}</p>
              )}
            </div>
            
            {/* Two column layout for related fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CustomSearchableSelect
                id="legalEntityType"
                label="Legal Entity Type"
                value={formData.legalEntityType}
                onChange={(value) => handleSelectChange('legalEntityType', value)}
                placeholder="Select legal entity type"
                options={LEGAL_ENTITY_TYPES}
                required
                className={errors.legalEntityType ? 'error' : ''}
              />

              <CustomSearchableSelect
                id="jurisdiction"
                label="Jurisdiction"
                value={formData.jurisdiction}
                onChange={(value) => handleSelectChange('jurisdiction', value)}
                placeholder="Select jurisdiction"
                options={JURISDICTIONS}
                required
                className={errors.jurisdiction ? 'error' : ''}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="registrationNumber">
                  Registration Number
                </Label>
                <Input
                  id="registrationNumber"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  placeholder="e.g., LLC-12345678"
                  className="h-11"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="taxId">
                  Tax ID Number<span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="taxId"
                  name="taxId"
                  value={formData.taxId}
                  onChange={handleInputChange}
                  placeholder="e.g., 12-3456789"
                  className={`h-11 ${errors.taxId ? 'border-red-500' : ''}`}
                />
                {errors.taxId && (
                  <p className="text-red-500 text-sm mt-1">{errors.taxId}</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="yearEstablished">
                  Year Established
                </Label>
                <Input
                  id="yearEstablished"
                  name="yearEstablished"
                  value={formData.yearEstablished}
                  onChange={handleInputChange}
                  placeholder="e.g., 2015"
                  className="h-11"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="office@example.com"
                  className={`h-11 ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">
                  Phone
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 123-4567"
                  className="h-11"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="website">
                Website
              </Label>
              <Input
                id="website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="https://www.example.com"
                className="h-11"
              />
            </div>
          </div>

          <div className="pt-4 border-t">
            <p className="text-sm text-gray-500 mb-6">
              Fields marked with <span className="text-red-500">*</span> are required.
            </p>
            <div className="flex justify-end">
              <Button 
                type="submit" 
                size="lg" 
                className="rounded-lg hover:shadow-md transition-shadow bg-blue-600 hover:bg-blue-700 text-white"
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
