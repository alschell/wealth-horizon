
import { FinancialAccountInfo } from "@/types/onboarding";
import { AccountFormErrors } from "./types";
import { useState } from "react";

export const useFormValidation = () => {
  const [errors, setErrors] = useState<AccountFormErrors>({});

  // Validate the form
  const validateForm = (account: FinancialAccountInfo): boolean => {
    const newErrors: AccountFormErrors = {};
    
    if (!account.accountName) {
      newErrors.accountName = 'Account name is required';
    }
    
    if (!account.institution) {
      newErrors.institution = 'Institution is required';
    }
    
    if (!account.accountType) {
      newErrors.accountType = 'Account type is required';
    }

    if (!account.legalEntityIdentifier) {
      newErrors.legalEntityIdentifier = 'Legal Entity Identifier is required';
    }

    if (!account.legalEntity) {
      newErrors.legalEntity = 'Legal Entity is required';
    }

    if (!account.accountSubtype) {
      newErrors.accountSubtype = 'Account Subtype is required';
    }

    if (!account.currency) {
      newErrors.currency = 'Currency is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Clear a specific error
  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return {
    errors,
    validateForm,
    clearError
  };
};
