
import { useState } from "react";
import { FinancialAccountInfo } from "@/types/onboarding";
import { toast } from "@/components/ui/use-toast";

interface UseAccountFormStateProps {
  onAddAccount: (account: FinancialAccountInfo) => void;
  initialAccount?: FinancialAccountInfo;
}

export function useAccountFormState({ onAddAccount, initialAccount }: UseAccountFormStateProps) {
  const defaultAccount: FinancialAccountInfo = {
    accountName: "",
    institution: "",
    accountType: "cash",
    accountSubtype: "",
    currency: "",
    approximateValue: "",
    statements: []
  };
  
  const [newAccount, setNewAccount] = useState<FinancialAccountInfo>(initialAccount || defaultAccount);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAccount(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle selection change
  const handleSelectionChange = (field: keyof FinancialAccountInfo, value: string) => {
    setNewAccount(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user selects
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Handle file selection
  const handleFilesSelected = (files: File[]) => {
    setNewAccount(prev => ({ ...prev, statements: files }));
  };

  // Validate the account
  const validateAccount = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!newAccount.accountName.trim()) {
      newErrors.accountName = "Account name is required";
    }
    
    if (!newAccount.institution) {
      newErrors.institution = "Institution is required";
    }
    
    if (!newAccount.accountType) {
      newErrors.accountType = "Account type is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Add or update account
  const handleAddAccount = () => {
    if (!validateAccount()) {
      toast({
        title: "Please fix the errors",
        description: "There are some required fields that need to be filled.",
        variant: "destructive"
      });
      return;
    }
    
    onAddAccount(newAccount);
    
    // Reset form if not editing
    if (!initialAccount) {
      setNewAccount(defaultAccount);
    }
    
    toast({
      title: initialAccount ? "Account updated" : "Account added",
      description: initialAccount 
        ? `${newAccount.accountName} has been updated successfully.` 
        : `${newAccount.accountName} has been added successfully.`
    });
  };

  return {
    newAccount,
    errors,
    handleInputChange,
    handleSelectionChange,
    handleFilesSelected,
    handleAddAccount
  };
}
