
import { useState, useCallback } from "react";
import { FinancialAccountInfo } from "@/types/onboarding";
import { useFormValidation } from "./form/useFormValidation";
import { useLegalEntityHandler } from "./form/useLegalEntityHandler";
import { AccountFormErrors, UseAccountFormStateProps, DEFAULT_ACCOUNT } from "./form/types";

export const useAccountFormState = ({
  onAddAccount,
  initialAccount
}: UseAccountFormStateProps) => {
  // Initialize account state with initial account or default values
  const [newAccount, setNewAccount] = useState<FinancialAccountInfo>(
    initialAccount || { ...DEFAULT_ACCOUNT }
  );
  
  // Use form validation hook
  const { errors, validateForm, setError, clearError } = useFormValidation();
  
  // Use legal entity handler
  const { handleLegalEntityChange } = useLegalEntityHandler(setNewAccount, clearError);
  
  // Account form handlers
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAccount(prev => ({ ...prev, [name]: value }));
    clearError(name);
  }, [clearError]);
  
  const handleSelectionChange = useCallback((field: keyof FinancialAccountInfo, value: string) => {
    setNewAccount(prev => ({ ...prev, [field]: value }));
    clearError(field as string);
  }, [clearError]);
  
  const handleLeiChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewAccount(prev => ({ ...prev, legalEntityIdentifier: value }));
    clearError('legalEntityIdentifier');
  }, [clearError]);
  
  const handleFilesSelected = useCallback((files: File[]) => {
    setNewAccount(prev => ({ ...prev, statements: files }));
  }, []);
  
  // Add account handler
  const handleAddAccount = useCallback(() => {
    if (validateForm(newAccount)) {
      onAddAccount(newAccount);
      setNewAccount({ ...DEFAULT_ACCOUNT });
    }
  }, [newAccount, onAddAccount, validateForm]);
  
  // Get all legal entities for mapping
  const legalEntities: Record<string, string[]> = {};
  
  // Check if form is valid (required fields filled)
  const isFormValid = Boolean(
    newAccount.institution && 
    newAccount.legalEntity && 
    newAccount.accountName
  );
  
  return {
    newAccount,
    errors,
    legalEntities,
    handleInputChange,
    handleSelectionChange,
    handleLegalEntityChange,
    handleLeiChange,
    handleFilesSelected,
    handleAddAccount,
    isFormValid
  };
};
