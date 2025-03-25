
import { BeneficialOwnerInfo } from "@/types/onboarding";

export const useFormValidation = (formData: BeneficialOwnerInfo) => {
  // Check if form is valid (all required fields filled and at least one document)
  const isFormValid = Boolean(
    formData.firstName &&
    formData.lastName &&
    formData.relationship &&
    formData.ownershipPercentage &&
    formData.nationality &&
    formData.dateOfBirth &&
    formData.documents.length > 0
  );
  
  return {
    isFormValid
  };
};
