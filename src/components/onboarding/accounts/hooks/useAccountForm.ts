
import { useCallback } from "react";
import { FinancialAccountInfo } from "@/types/onboarding";
import { useAccountFormCore } from "./useAccountFormCore";
import { useLegalEntityMapping } from "./useLegalEntityMapping";

export const useAccountForm = (onAddAccount: (account: FinancialAccountInfo) => void) => {
  const core = useAccountFormCore({ 
    onSubmit: onAddAccount,
  });
  
  const { 
    account, 
    errors,
    handleInputChange, 
    handleSelectionChange,
    handleFilesSelected,
    validateAccount,
    isFormValid,
    setAccount
  } = core;
  
  // Use legal entity mapping to populate LEI values
  const { 
    getLegalEntities, 
    handleLegalEntityChange,
    handleLeiChange
  } = useLegalEntityMapping(account, handleSelectionChange);
  
  // Create adapter for legal entity change
  const onLegalEntityChange = useCallback((value: string) => {
    handleLegalEntityChange(value);
  }, [handleLegalEntityChange]);

  // Create adapter for LEI change
  const onLeiChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleLeiChange(e.target.value);
  }, [handleLeiChange]);
  
  // Add account handler with validation
  const handleAddAccount = useCallback(() => {
    if (validateAccount()) {
      onAddAccount(account);
    }
  }, [account, onAddAccount, validateAccount]);
  
  return {
    newAccount: account,
    errors,
    handleNewAccountChange: handleInputChange,
    handleAccountSelectionChange: handleSelectionChange,
    handleLegalEntityChange: onLegalEntityChange,
    handleLeiChange: onLeiChange,
    handleStatementsSelected: handleFilesSelected,
    handleAddAccount,
    isFormValid,
    getLegalEntities
  };
};
