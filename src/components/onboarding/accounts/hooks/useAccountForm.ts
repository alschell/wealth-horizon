
import { useState, useCallback } from "react";
import { FinancialAccountInfo } from "@/types/onboarding";
import { toast } from "@/components/ui/use-toast";

export const useAccountForm = (onAddAccount: (account: FinancialAccountInfo) => void) => {
  const defaultAccount: FinancialAccountInfo = {
    accountName: "",
    institution: "",
    accountType: "other", // Default is "other"
    legalEntity: "",
    legalEntityIdentifier: "",
    accountSubtype: "",
    currency: "",
    approximateValue: "",
    statements: [],
    accountNumber: "", // Added missing property
    swiftCode: ""      // Added missing property
  };
  
  const [newAccount, setNewAccount] = useState<FinancialAccountInfo>(defaultAccount);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle input changes
  const handleNewAccountChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAccount(prev => ({ ...prev, [name]: value }));
    // Clear error for this field if exists
    if (errors[name]) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  }, [errors]);

  // Handle selection changes
  const handleAccountSelectionChange = useCallback((field: keyof FinancialAccountInfo, value: string) => {
    setNewAccount(prev => ({ ...prev, [field]: value }));
    // Clear error for this field if exists
    if (errors[field as string]) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[field as string];
        return updated;
      });
    }
  }, [errors]);

  // Handle legal entity changes
  const handleLegalEntityChange = useCallback((value: string) => {
    setNewAccount(prev => ({ ...prev, legalEntity: value }));
    // Clear error for this field if exists
    if (errors.legalEntity) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated.legalEntity;
        return updated;
      });
    }
  }, [errors]);

  // Handle LEI changes
  const handleLeiChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewAccount(prev => ({ ...prev, legalEntityIdentifier: value }));
  }, []);

  // Handle file selection
  const handleStatementsSelected = useCallback((files: File[]) => {
    setNewAccount(prev => ({ ...prev, statements: files }));
  }, []);

  // Validate the account
  const validateAccount = useCallback(() => {
    const newErrors: Record<string, string> = {};
    
    if (!newAccount.accountName) {
      newErrors.accountName = "Account name is required";
    }
    
    if (!newAccount.institution) {
      newErrors.institution = "Institution is required";
    }
    
    if (!newAccount.legalEntity) {
      newErrors.legalEntity = "Legal entity is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [newAccount]);

  // Add account handler
  const handleAddAccount = useCallback(() => {
    if (validateAccount()) {
      onAddAccount(newAccount);
      setNewAccount(defaultAccount);
      toast({
        title: "Account added",
        description: "Financial account has been added successfully.",
      });
    }
  }, [newAccount, onAddAccount, validateAccount, defaultAccount]);

  // Check if form is valid
  const isFormValid = Boolean(
    newAccount.accountName && 
    newAccount.institution && 
    newAccount.legalEntity
  );

  return {
    newAccount,
    errors,
    handleNewAccountChange,
    handleAccountSelectionChange,
    handleLegalEntityChange,
    handleLeiChange,
    handleStatementsSelected,
    handleAddAccount,
    isFormValid
  };
};
