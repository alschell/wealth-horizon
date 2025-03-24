
import { useState, useEffect } from "react";
import { FinancialAccountInfo } from "@/types/onboarding";
import { toast } from "@/components/ui/use-toast";

interface UseAccountFormStateProps {
  onAddAccount: (account: FinancialAccountInfo) => void;
  initialAccount?: FinancialAccountInfo;
}

interface FormErrors {
  accountName?: string;
  institution?: string;
  accountType?: string;
  currency?: string;
}

export const useAccountFormState = ({ onAddAccount, initialAccount }: UseAccountFormStateProps) => {
  const [newAccount, setNewAccount] = useState<FinancialAccountInfo>(
    initialAccount || {
      accountName: "",
      institution: "",
      accountType: "cash",
      accountSubtype: "",
      currency: "",
      approximateValue: "",
      statements: [],
      legalEntity: "",
      legalEntityIdentifier: "",
    }
  );
  const [errors, setErrors] = useState<FormErrors>({});

  // Update form state when initialAccount changes (for editing)
  useEffect(() => {
    if (initialAccount) {
      setNewAccount(initialAccount);
    }
  }, [initialAccount]);

  const validateForm = () => {
    const formErrors: FormErrors = {};
    
    if (!newAccount.accountName.trim()) {
      formErrors.accountName = "Account name is required";
    }
    
    if (!newAccount.institution.trim()) {
      formErrors.institution = "Institution is required";
    }
    
    if (!newAccount.accountType) {
      formErrors.accountType = "Account type is required";
    }
    
    if (!newAccount.currency) {
      formErrors.currency = "Currency is required";
    }
    
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAccount(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSelectionChange = (field: keyof FinancialAccountInfo, value: string) => {
    setNewAccount(prev => ({ ...prev, [field]: value }));
    
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleFilesSelected = (files: File[]) => {
    setNewAccount(prev => ({ ...prev, statements: files }));
  };

  const handleAddAccount = () => {
    if (validateForm()) {
      onAddAccount(newAccount);
      
      // Only reset form if not editing
      if (!initialAccount) {
        setNewAccount({
          accountName: "",
          institution: "",
          accountType: "cash",
          accountSubtype: "",
          currency: "",
          approximateValue: "",
          statements: [],
          legalEntity: "",
          legalEntityIdentifier: "",
        });
      }
      
      toast({
        title: initialAccount ? "Account updated" : "Account added",
        description: `Financial account has been ${initialAccount ? "updated" : "added"} successfully.`,
      });
    } else {
      toast({
        title: "Required fields missing",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
    }
  };

  return {
    newAccount,
    setNewAccount,
    errors,
    handleInputChange,
    handleSelectionChange,
    handleFilesSelected,
    handleAddAccount,
  };
};
