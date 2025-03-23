
import React, { useState } from "react";
import { useOnboarding, AddressInfo } from "@/context/OnboardingContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, MapPin } from "lucide-react";
import { CustomSelect } from "@/components/ui/custom-select";
import { CustomSearchableSelect } from "@/components/ui/custom-searchable-select";
import { COUNTRIES, US_STATES } from "./constants/formOptions";

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
    const requiredFields: (keyof AddressInfo)[] = [
      'streetAddress', 
      'city', 
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
        description: "Please check the form for errors.",
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
          <div className="flex items-center gap-3 mb-2">
            <MapPin className="h-7 w-7 text-blue-600" />
            <h2 className="text-2xl font-bold">Address Information</h2>
          </div>
          <p className="text-gray-500">
            Please provide the current address for your family office.
          </p>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="streetAddress">
                Street Address<span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="streetAddress"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleInputChange}
                placeholder="123 Main Street, Apt 4B"
                className={`h-11 ${errors.streetAddress ? 'border-red-500' : ''}`}
              />
              {errors.streetAddress && (
                <p className="text-red-500 text-sm mt-1">{errors.streetAddress}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">
                  City<span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="New York"
                  className={`h-11 ${errors.city ? 'border-red-500' : ''}`}
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                )}
              </div>

              <CustomSelect
                id="state"
                label="State/Province"
                value={formData.state}
                onChange={(value) => handleSelectChange('state', value)}
                placeholder="Select state"
                options={US_STATES}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="postalCode">
                  Postal Code<span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  placeholder="10001"
                  className={`h-11 ${errors.postalCode ? 'border-red-500' : ''}`}
                />
                {errors.postalCode && (
                  <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
                )}
              </div>

              <CustomSearchableSelect
                id="country"
                label="Country"
                value={formData.country}
                onChange={(value) => handleSelectChange('country', value)}
                placeholder="Select country"
                options={COUNTRIES}
                required
                className={errors.country ? 'error' : ''}
              />
            </div>
          </div>

          <div className="pt-4 border-t">
            <p className="text-sm text-gray-500 mb-6">
              Fields marked with <span className="text-red-500">*</span> are required.
            </p>
            <div className="flex justify-between">
              <Button 
                type="button" 
                variant="outline"
                size="lg" 
                className="rounded-lg"
                onClick={() => setCurrentStep(1)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
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

export default AddressForm;
