import { useState, useEffect } from "react";
import { FinancialAccountInfo } from "@/types/onboarding";
import { LEGAL_ENTITIES } from "../constants/legalEntities";
import { toast } from "@/components/ui/use-toast";

interface UseAccountFormStateProps {
  onAddAccount: (account: FinancialAccountInfo) => void;
  initialAccount?: FinancialAccountInfo;
}

export const useAccountFormState = ({ onAddAccount, initialAccount }: UseAccountFormStateProps) => {
  // Initialize account state with default values or provided values
  const [newAccount, setNewAccount] = useState<FinancialAccountInfo>(
    initialAccount || {
      accountName: "",
      institution: "",
      accountType: "cash", // Set a valid default value
      legalEntity: "",
      legalEntityIdentifier: "",
      accountSubtype: "",
      currency: "",
      approximateValue: "", // Added missing property
      statements: []
    }
  );

  const defaultAccount: FinancialAccountInfo = {
    accountName: "",
    institution: "",
    accountType: "cash", // Changed from empty string to 'cash' to match the type
    legalEntity: "",
    legalEntityIdentifier: "",
    accountSubtype: "",
    currency: "",
    approximateValue: "",
    statements: []
  };

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Use the legal entities data
  const legalEntities = LEGAL_ENTITIES;

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAccount(prev => ({ ...prev, [name]: value }));
    
    // Clear error for the field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle selection changes
  const handleSelectionChange = (field: keyof FinancialAccountInfo, value: string) => {
    setNewAccount(prev => ({ ...prev, [field]: value }));
    
    // Clear error for the field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

    // If institution changes, we might want to reset the legal entity
    if (field === 'institution') {
      setNewAccount(prev => ({ ...prev, legalEntity: '', legalEntityIdentifier: '' }));
    }
  };

  // Handle legal entity change
  const handleLegalEntityChange = (value: string) => {
    // Update legal entity
    setNewAccount(prev => ({ ...prev, legalEntity: value, legalEntityIdentifier: '' }));
    
    // Clear errors
    if (errors.legalEntity) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.legalEntity;
        return newErrors;
      });
    }
  };

  // Handle LEI change
  const handleLeiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewAccount(prev => ({ ...prev, legalEntityIdentifier: value }));
  };

  // Handle file selection
  const handleFilesSelected = (files: File[]) => {
    setNewAccount(prev => ({ ...prev, statements: files }));
  };

  // Validate the form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!newAccount.accountName) {
      newErrors.accountName = 'Account name is required';
    }
    
    if (!newAccount.institution) {
      newErrors.institution = 'Institution is required';
    }
    
    if (!newAccount.accountType) {
      newErrors.accountType = 'Account type is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleAddAccount = () => {
    if (validateForm()) {
      onAddAccount(newAccount);
      setNewAccount(defaultAccount);
      toast({
        title: "Account added",
        description: `${newAccount.accountName} has been added successfully.`,
      });
    } else {
      toast({
        title: "Form validation failed",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
    }
  };

  return {
    newAccount,
    errors,
    legalEntities,
    handleInputChange,
    handleSelectionChange,
    handleLegalEntityChange,
    handleLeiChange,
    handleFilesSelected,
    handleAddAccount
  };
};
