
import React, { useState, useEffect } from "react";
import { BeneficialOwnerInfo } from "@/context/OnboardingContext";
import { Button } from "@/components/ui/button";
import { Plus, Save } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import OwnerFormFields from "./OwnerFormFields";

interface AddOwnerFormProps {
  onAddOwner: (owner: BeneficialOwnerInfo) => void;
  ownerToEdit?: BeneficialOwnerInfo;
  isEditing?: boolean;
  onCancelEdit?: () => void;
}

const AddOwnerForm: React.FC<AddOwnerFormProps> = ({
  onAddOwner,
  ownerToEdit,
  isEditing = false,
  onCancelEdit
}) => {
  const emptyOwner: BeneficialOwnerInfo = {
    firstName: "",
    lastName: "",
    relationship: "",
    ownershipPercentage: "",
    nationality: "",
    dateOfBirth: "",
    documents: []
  };

  const [owner, setOwner] = useState<BeneficialOwnerInfo>(emptyOwner);
  const [errors, setErrors] = useState<Partial<Record<keyof BeneficialOwnerInfo, string>>>({});

  useEffect(() => {
    if (isEditing && ownerToEdit) {
      setOwner(ownerToEdit);
    } else {
      setOwner(emptyOwner);
    }
  }, [isEditing, ownerToEdit]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOwner({ ...owner, [name]: value });
    
    if (errors[name as keyof BeneficialOwnerInfo]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleSelectChange = (field: keyof BeneficialOwnerInfo, value: string) => {
    setOwner({ ...owner, [field]: value });
    
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const handleDateChange = (date?: Date) => {
    if (date) {
      setOwner({ ...owner, dateOfBirth: date.toISOString() });
    }
    
    if (errors.dateOfBirth) {
      setErrors({ ...errors, dateOfBirth: undefined });
    }
  };

  const handleFilesSelected = (files: File[]) => {
    setOwner({ ...owner, documents: files });
    
    if (errors.documents) {
      setErrors({ ...errors, documents: undefined });
    }
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
      if (!owner[field]) {
        newErrors[field] = 'This field is required';
      }
    });
    
    if (owner.ownershipPercentage) {
      const percentage = parseFloat(owner.ownershipPercentage);
      if (isNaN(percentage) || percentage < 0 || percentage > 100) {
        newErrors.ownershipPercentage = 'Please enter a valid percentage between 0 and 100';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      toast({
        title: "Form validation failed",
        description: "Please check the form for errors.",
        variant: "destructive",
      });
      return;
    }
    
    onAddOwner(owner);
    
    if (!isEditing) {
      setOwner(emptyOwner);
    }
    
    if (isEditing && onCancelEdit) {
      onCancelEdit();
    }
  };

  return (
    <div className="space-y-6 border p-4 rounded-md">
      <h3 className="font-medium flex items-center gap-2 text-gray-700">
        {isEditing ? 
          <Save className="h-5 w-5 text-gray-500" /> : 
          <Plus className="h-5 w-5 text-gray-500" />
        }
        {isEditing ? "Edit Beneficial Owner" : "Add a Beneficial Owner"}
      </h3>
      
      <OwnerFormFields
        owner={owner}
        errors={errors}
        onInputChange={handleInputChange}
        onSelectChange={handleSelectChange}
        onDateChange={handleDateChange}
        onFilesSelected={handleFilesSelected}
      />
      
      <div className="flex justify-end space-x-4">
        {isEditing && onCancelEdit && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancelEdit}
            className="border-gray-300"
          >
            Cancel
          </Button>
        )}
        <Button
          type="button"
          onClick={handleSubmit}
          className="bg-black hover:bg-gray-800 text-white"
        >
          {isEditing ? (
            <>
              <Save className="mr-2 h-4 w-4" />
              Update Owner
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Add Owner
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default AddOwnerForm;
