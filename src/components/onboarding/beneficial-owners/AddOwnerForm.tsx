
import React, { useState } from "react";
import { BeneficialOwnerInfo } from "@/context/OnboardingContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import OwnerFormFields from "./OwnerFormFields";

interface AddOwnerFormProps {
  onAddOwner: (owner: BeneficialOwnerInfo) => void;
}

const AddOwnerForm: React.FC<AddOwnerFormProps> = ({ onAddOwner }) => {
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
    
    onAddOwner(newOwner);
    resetForm();
  };

  return (
    <div className="space-y-6 border p-4 rounded-md">
      <h3 className="font-medium flex items-center gap-2 text-gray-700">
        <Plus className="h-5 w-5 text-gray-500" />
        Add a Beneficial Owner
      </h3>
      
      <OwnerFormFields 
        owner={newOwner}
        errors={errors}
        onInputChange={handleInputChange}
        onSelectChange={handleSelectChange}
        onDateChange={handleDateChange}
        onFilesSelected={handleFilesSelected}
      />
      
      <Button
        type="button"
        onClick={handleAddOwner}
        className="w-full md:w-auto bg-black hover:bg-gray-800 text-white"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Owner
      </Button>
    </div>
  );
};

export default AddOwnerForm;
