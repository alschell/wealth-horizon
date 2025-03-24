import React, { useState } from "react";
import { useOnboarding, BeneficialOwnerInfo } from "@/context/OnboardingContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Users, Plus, Trash2 } from "lucide-react";
import CustomSearchableSelect from "@/components/ui/custom-searchable-select";
import { COUNTRIES } from "./constants";
import FileUploader from "@/components/FileUploader";
import { DatePicker } from "@/components/ui/date-picker";

const BeneficialOwnersForm = () => {
  const { onboardingData, addBeneficialOwner, removeBeneficialOwner, setCurrentStep } = useOnboarding();
  const [owners, setOwners] = useState<BeneficialOwnerInfo[]>(onboardingData.beneficialOwners);
  const [newOwner, setNewOwner] = useState<BeneficialOwnerInfo>({
    firstName: "",
    lastName: "",
    relationship: "",
    ownershipPercentage: "",
    nationality: "",
    dateOfBirth: "",
    documents: []
  });
  const [errors, setErrors] = useState<Partial<Record<keyof BeneficialOwnerInfo, string>>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewOwner({ ...newOwner, [name]: value });
    
    if (errors[name as keyof BeneficialOwnerInfo]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleSelectChange = (field: keyof BeneficialOwnerInfo, value: string) => {
    setNewOwner({ ...newOwner, [field]: value });
    
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const handleDateChange = (date?: Date) => {
    if (date) {
      setNewOwner({ ...newOwner, dateOfBirth: date.toISOString() });
    }
    
    if (errors.dateOfBirth) {
      setErrors({ ...errors, dateOfBirth: undefined });
    }
  };

  const handleFilesSelected = (files: File[]) => {
    setNewOwner({ ...newOwner, documents: files });
    
    if (errors.documents) {
      setErrors({ ...errors, documents: undefined });
    }
  };

  const resetForm = () => {
    setNewOwner({
      firstName: "",
      lastName: "",
      relationship: "",
      ownershipPercentage: "",
      nationality: "",
      dateOfBirth: "",
      documents: []
    });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof BeneficialOwnerInfo, string>> = {};
    const requiredFields: (keyof BeneficialOwnerInfo)[] = [
      'firstName', 
      'lastName', 
      'relationship', 
      'ownershipPercentage',
      'nationality'
    ];
    
    requiredFields.forEach(field => {
      if (!newOwner[field]) {
        newErrors[field] = 'This field is required';
      }
    });
    
    if (newOwner.ownershipPercentage) {
      const percentage = parseFloat(newOwner.ownershipPercentage);
      if (isNaN(percentage) || percentage < 0 || percentage > 100) {
        newErrors.ownershipPercentage = 'Please enter a valid percentage between 0 and 100';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddOwner = () => {
    if (!validateForm()) {
      toast({
        title: "Form validation failed",
        description: "Please check the form for errors.",
        variant: "destructive",
      });
      return;
    }
    
    const updatedOwners = [...owners, newOwner];
    setOwners(updatedOwners);
    addBeneficialOwner(newOwner);
    
    toast({
      title: "Owner added",
      description: `${newOwner.firstName} ${newOwner.lastName} has been added as a beneficial owner.`,
    });
    
    resetForm();
  };

  const handleRemoveOwner = (index: number) => {
    const updatedOwners = owners.filter((_, i) => i !== index);
    setOwners(updatedOwners);
    removeBeneficialOwner(index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setCurrentStep(6);
    
    toast({
      title: "Information saved",
      description: "Beneficial owner information has been saved successfully.",
    });
  };

  const dateOfBirthValue = newOwner.dateOfBirth ? new Date(newOwner.dateOfBirth) : undefined;

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
            <Users className="h-7 w-7 text-black" />
            <h2 className="text-2xl font-bold text-black">Beneficial Owners</h2>
          </div>
          <p className="text-gray-500">
            Please provide information about individuals who own or control 25% or more of your entity.
          </p>

          {owners.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-medium text-gray-700">Current Beneficial Owners</h3>
              
              {owners.map((owner, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-4 border rounded-md bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">{owner.firstName} {owner.lastName}</p>
                      <p className="text-sm text-gray-500">
                        {owner.relationship} · {owner.ownershipPercentage}% ownership · {owner.nationality}
                      </p>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveOwner(index)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-6 border p-4 rounded-md">
            <h3 className="font-medium flex items-center gap-2 text-gray-700">
              <Plus className="h-5 w-5 text-gray-500" />
              Add a Beneficial Owner
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">
                  First Name<span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={newOwner.firstName}
                  onChange={handleInputChange}
                  placeholder="John"
                  className={`h-11 ${errors.firstName ? 'border-red-500' : ''}`}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">
                  Last Name<span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={newOwner.lastName}
                  onChange={handleInputChange}
                  placeholder="Smith"
                  className={`h-11 ${errors.lastName ? 'border-red-500' : ''}`}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="relationship">
                  Relationship<span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="relationship"
                  name="relationship"
                  value={newOwner.relationship}
                  onChange={handleInputChange}
                  placeholder="e.g., Director, Shareholder"
                  className={`h-11 ${errors.relationship ? 'border-red-500' : ''}`}
                />
                {errors.relationship && (
                  <p className="text-red-500 text-sm mt-1">{errors.relationship}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="ownershipPercentage">
                  Ownership Percentage<span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="ownershipPercentage"
                  name="ownershipPercentage"
                  value={newOwner.ownershipPercentage}
                  onChange={handleInputChange}
                  placeholder="e.g., 51"
                  className={`h-11 ${errors.ownershipPercentage ? 'border-red-500' : ''}`}
                />
                {errors.ownershipPercentage && (
                  <p className="text-red-500 text-sm mt-1">{errors.ownershipPercentage}</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CustomSearchableSelect
                id="nationality"
                label="Nationality"
                value={newOwner.nationality}
                onChange={(value) => handleSelectChange('nationality', value)}
                placeholder="Select nationality"
                options={COUNTRIES}
                required
                className={errors.nationality ? 'error' : ''}
              />

              <DatePicker
                label="Date of Birth"
                placeholder="Select date of birth"
                value={dateOfBirthValue}
                onChange={handleDateChange}
                className="w-full"
              />
            </div>
            
            <div className="space-y-3">
              <Label>Identification Documents</Label>
              <FileUploader
                accept="application/pdf,image/*"
                multiple={true}
                maxSize={5}
                onFilesSelected={handleFilesSelected}
                existingFiles={newOwner.documents}
                label="Upload ID Documents"
              />
            </div>
            
            <Button
              type="button"
              onClick={handleAddOwner}
              className="w-full md:w-auto bg-black hover:bg-gray-800 text-white"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Owner
            </Button>
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
                onClick={() => setCurrentStep(4)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button 
                type="submit" 
                size="lg" 
                className="rounded-lg hover:shadow-md transition-shadow bg-black hover:bg-gray-800 text-white"
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

export default BeneficialOwnersForm;
