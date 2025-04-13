
import { useState, useCallback } from "react";
import { BeneficialOwnerInfo } from "@/types/onboarding";
import { useToast } from "@/components/ui/use-toast";

// Create a default owner structure
export const DEFAULT_OWNER: BeneficialOwnerInfo = {
  id: crypto.randomUUID(),
  firstName: "",
  lastName: "",
  relationship: "",
  ownershipPercentage: "",
  nationality: "",
  dateOfBirth: "",
  documents: [],
};

export interface UseOwnerFormCoreProps {
  onSubmit: (owner: BeneficialOwnerInfo) => void;
  initialOwner?: BeneficialOwnerInfo;
}

export const useOwnerFormCore = ({
  onSubmit,
  initialOwner
}: UseOwnerFormCoreProps) => {
  const { toast } = useToast();
  
  // Owner state
  const [owner, setOwner] = useState<BeneficialOwnerInfo>(
    initialOwner || { ...DEFAULT_OWNER, id: crypto.randomUUID() }
  );
  
  // Editing state
  const [isEditing, setIsEditing] = useState<boolean>(Boolean(initialOwner));
  
  // Error state
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Handle input changes
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOwner(prev => ({ ...prev, [name]: value }));
    
    // Clear error
    if (errors[name]) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  }, [errors]);
  
  // Handle selection changes
  const handleSelectionChange = useCallback((field: keyof BeneficialOwnerInfo, value: string) => {
    setOwner(prev => ({ ...prev, [field]: value }));
    
    // Clear error
    if (errors[field as string]) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[field as string];
        return updated;
      });
    }
  }, [errors]);
  
  // Handle date change
  const handleDateChange = useCallback((date?: Date) => {
    if (date) {
      setOwner(prev => ({ ...prev, dateOfBirth: date.toISOString() }));
      
      // Clear error
      if (errors.dateOfBirth) {
        setErrors(prev => {
          const updated = { ...prev };
          delete updated.dateOfBirth;
          return updated;
        });
      }
    }
  }, [errors]);
  
  // Handle document uploads
  const handleFilesSelected = useCallback((files: File[]) => {
    setOwner(prev => ({ ...prev, documents: files }));
    
    // Clear error
    if (errors.documents) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated.documents;
        return updated;
      });
    }
  }, [errors]);
  
  // Validate the owner
  const validateOwner = useCallback(() => {
    const newErrors: Record<string, string> = {};
    
    if (!owner.firstName) {
      newErrors.firstName = "First name is required";
    }
    
    if (!owner.lastName) {
      newErrors.lastName = "Last name is required";
    }
    
    if (!owner.relationship) {
      newErrors.relationship = "Relationship is required";
    }
    
    if (!owner.ownershipPercentage) {
      newErrors.ownershipPercentage = "Ownership percentage is required";
    } else if (isNaN(parseFloat(owner.ownershipPercentage))) {
      newErrors.ownershipPercentage = "Ownership percentage must be a number";
    }
    
    if (!owner.nationality) {
      newErrors.nationality = "Nationality is required";
    }
    
    if (!owner.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    }
    
    if (owner.documents.length === 0) {
      newErrors.documents = "At least one document is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [owner]);
  
  // Submit the form
  const handleSubmit = useCallback(() => {
    if (validateOwner()) {
      onSubmit(owner);
      
      // Reset the form
      setOwner({ ...DEFAULT_OWNER, id: crypto.randomUUID() });
      setIsEditing(false);
      
      toast({
        title: "Success",
        description: `Beneficial owner ${isEditing ? 'updated' : 'added'} successfully.`,
      });
    } else {
      toast({
        title: "Validation Error",
        description: "Please correct the errors in the form.",
        variant: "destructive"
      });
    }
  }, [owner, onSubmit, validateOwner, isEditing, toast]);
  
  // Reset the form
  const resetForm = useCallback(() => {
    setOwner({ ...DEFAULT_OWNER, id: crypto.randomUUID() });
    setIsEditing(false);
    setErrors({});
  }, []);
  
  // Check if form is valid (all required fields filled)
  const isFormValid = Boolean(
    owner.firstName &&
    owner.lastName &&
    owner.relationship &&
    owner.ownershipPercentage &&
    owner.nationality &&
    owner.dateOfBirth &&
    owner.documents.length > 0
  );
  
  return {
    owner,
    errors,
    isEditing,
    handleInputChange,
    handleSelectionChange,
    handleDateChange,
    handleFilesSelected,
    handleSubmit,
    resetForm,
    isFormValid,
    setOwner,
    setIsEditing,
    setErrors
  };
};
