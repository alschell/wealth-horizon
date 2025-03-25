
import { useState } from "react";
import { FinancialAccountInfo } from "@/types/onboarding";

export const useFormValidation = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (account: FinancialAccountInfo): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // Required fields
    if (!account.institution) {
      newErrors.institution = "Institution is required";
      isValid = false;
    }

    if (!account.legalEntity) {
      newErrors.legalEntity = "Legal Entity is required";
      isValid = false;
    }

    // Validate LEI format if provided
    if (account.legalEntityIdentifier && account.legalEntityIdentifier.length > 0) {
      if (account.legalEntityIdentifier.length !== 20) {
        newErrors.legalEntityIdentifier = "LEI must be 20 characters";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const setError = (field: string, message: string) => {
    setErrors(prev => ({ ...prev, [field]: message }));
  };

  const clearError = (field: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  return {
    errors,
    validateForm,
    setError,
    clearError
  };
};
