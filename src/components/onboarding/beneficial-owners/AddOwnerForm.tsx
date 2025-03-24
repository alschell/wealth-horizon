
import React, { useState } from "react";
import { BeneficialOwnerInfo } from "@/context/OnboardingContext";
import { FormHeader, FormFooter, validateRequiredFields, isValidPercentage } from "@/components/onboarding/common";
import { FormLayout, FormSection } from "@/components/onboarding/common/layouts";
import { UserPlus } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import BeneficialOwnerFormFields from "./OwnerFormFields";

interface AddOwnerFormProps {
  onAddOwner: (owner: BeneficialOwnerInfo) => void;
  onCancel: () => void;
  existingOwner?: BeneficialOwnerInfo;
  isEdit?: boolean;
}

const AddOwnerForm: React.FC<AddOwnerFormProps> = ({
  onAddOwner,
  onCancel,
  existingOwner,
  isEdit = false
}) => {
  const [owner, setOwner] = useState<BeneficialOwnerInfo>(
    existingOwner || {
      firstName: "",
      lastName: "",
      relationship: "",
      ownershipPercentage: "",
      nationality: "",
      dateOfBirth: "",
      documents: []
    }
  );
  
  const [errors, setErrors] = useState<Partial<Record<keyof BeneficialOwnerInfo, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOwner({ ...owner, [name]: value });
    
    // Clear error when field is edited
    if (errors[name as keyof BeneficialOwnerInfo]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleSelectChange = (field: keyof BeneficialOwnerInfo, value: string) => {
    setOwner({ ...owner, [field]: value });
    
    // Clear error when field is edited
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const handleDateChange = (date?: Date) => {
    if (date) {
      setOwner({ ...owner, dateOfBirth: date.toISOString() });
      
      // Clear error when field is edited
      if (errors.dateOfBirth) {
        setErrors({ ...errors, dateOfBirth: undefined });
      }
    }
  };

  const handleFilesSelected = (files: File[]) => {
    setOwner({ ...owner, documents: files });
    
    // Clear error when field is edited
    if (errors.documents) {
      setErrors({ ...errors, documents: undefined });
    }
  };

  const validateForm = () => {
    // Define required fields
    const requiredFields: (keyof BeneficialOwnerInfo)[] = [
      'firstName',
      'lastName',
      'relationship',
      'ownershipPercentage',
      'nationality'
    ];
    
    // Validate required fields
    let newErrors = validateRequiredFields(owner, requiredFields);
    
    // Validate ownership percentage
    if (owner.ownershipPercentage && !isValidPercentage(owner.ownershipPercentage)) {
      newErrors.ownershipPercentage = 'Please enter a valid percentage (0-100)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Form validation failed",
        description: "Please check the form for errors.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate async operation
    setTimeout(() => {
      onAddOwner(owner);
      setIsSubmitting(false);
      toast({
        title: isEdit ? "Owner updated" : "Owner added",
        description: isEdit 
          ? `${owner.firstName} ${owner.lastName} has been updated.` 
          : `${owner.firstName} ${owner.lastName} has been added.`,
      });
    }, 500);
  };

  return (
    <FormLayout>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormHeader
          icon={<UserPlus className="h-7 w-7" />}
          title={isEdit ? "Edit Beneficial Owner" : "Add Beneficial Owner"}
          description="Provide details about individuals who own or control your entity."
        />

        <FormSection>
          <BeneficialOwnerFormFields
            owner={owner}
            errors={errors}
            onInputChange={handleInputChange}
            onSelectChange={handleSelectChange}
            onDateChange={handleDateChange}
            onFilesSelected={handleFilesSelected}
          />
        </FormSection>

        <div className="pt-4 border-t">
          <p className="text-sm text-gray-500 mb-6">
            Fields marked with <span className="text-red-500">*</span> are required.
          </p>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : isEdit ? "Update Owner" : "Add Owner"}
            </button>
          </div>
        </div>
      </form>
    </FormLayout>
  );
};

export default AddOwnerForm;
