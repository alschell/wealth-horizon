
import { useState } from "react";
import { FinancialAccountInfo } from "@/types/onboarding";

export const useFormValidation = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validate required fields
  const validateForm = (account: FinancialAccountInfo): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // The only required field is institution
    if (!account.institution) {
      newErrors.institution = "Institution is required";
      isValid = false;
    }

    // Validate LEI format if provided
    if (account.legalEntityIdentifier && !/^[A-Z0-9]{20}$/.test(account.legalEntityIdentifier)) {
      newErrors.legalEntityIdentifier = "LEI must be 20 alphanumeric characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Clear a specific error
  const clearError = (field: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  // Set a specific error
  const setError = (field: string, message: string) => {
    setErrors(prev => ({
      ...prev,
      [field]: message
    }));
  };

  return {
    errors,
    validateForm,
    clearError,
    setError
  };
};
