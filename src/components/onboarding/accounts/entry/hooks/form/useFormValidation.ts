
import { FinancialAccountInfo } from "@/types/onboarding";
import { AccountFormErrors } from "./types";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { validateRequiredFields } from "@/components/onboarding/common/utils/validation";

export const useFormValidation = () => {
  const [errors, setErrors] = useState<AccountFormErrors>({});

  // Validate the form with improved validation logic
  const validateForm = (account: FinancialAccountInfo): boolean => {
    try {
      const requiredFields: (keyof FinancialAccountInfo)[] = [
        'accountName',
        'institution',
        'accountType',
        'legalEntity',
        'legalEntityIdentifier',
        'accountSubtype',
        'currency'
      ];
      
      // Use the common validation utility
      const baseErrors = validateRequiredFields(account, requiredFields);
      
      // Additional custom validations
      const customErrors: AccountFormErrors = {};
      
      // Validate LEI format if provided
      if (account.legalEntityIdentifier && !/^[A-Z0-9]{20}$/.test(account.legalEntityIdentifier)) {
        customErrors.legalEntityIdentifier = 'LEI must be 20 characters of letters and numbers';
      }
      
      // Validate approximate value is a number if provided
      if (account.approximateValue && isNaN(Number(account.approximateValue))) {
        customErrors.approximateValue = 'Approximate value must be a number';
      }
      
      // Combine all errors
      const newErrors = { ...baseErrors, ...customErrors };
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    } catch (error) {
      console.error("Error in validateForm:", error);
      toast({
        title: "Validation Error",
        description: "An error occurred during form validation. Please check your inputs.",
        variant: "destructive"
      });
      return false;
    }
  };

  // Clear a specific error
  const clearError = (field: string) => {
    try {
      if (errors[field]) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    } catch (error) {
      console.error("Error in clearError:", error);
    }
  };

  // Manually set an error
  const setError = (field: string, message: string) => {
    try {
      setErrors(prev => ({
        ...prev,
        [field]: message
      }));
    } catch (error) {
      console.error("Error in setError:", error);
    }
  };

  return {
    errors,
    validateForm,
    clearError,
    setError
  };
};
