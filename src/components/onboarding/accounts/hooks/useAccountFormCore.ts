
import { useState, useCallback } from "react";
import { FinancialAccountInfo } from "@/types/onboarding";
import { toast } from "@/components/ui/use-toast";

// Default account structure with all required fields
export const DEFAULT_ACCOUNT: FinancialAccountInfo = {
  accountName: "",
  institution: "",
  accountType: "other", // Default is "other"
  legalEntity: "",
  legalEntityIdentifier: "",
  accountSubtype: "",
  currency: "",
  approximateValue: "",
  statements: [],
  accountNumber: "",
  swiftCode: ""
};

export interface UseAccountFormCoreProps {
  onSubmit: (account: FinancialAccountInfo) => void;
  initialAccount?: FinancialAccountInfo;
}

export const useAccountFormCore = ({
  onSubmit,
  initialAccount
}: UseAccountFormCoreProps) => {
  // Initialize account state with initial account or default values
  const [account, setAccount] = useState<FinancialAccountInfo>(
    initialAccount || { ...DEFAULT_ACCOUNT }
  );
  
  // Form validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Handle input changes
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccount(prev => ({ ...prev, [name]: value }));
    
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
  const handleSelectionChange = useCallback((field: keyof FinancialAccountInfo, value: string) => {
    setAccount(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field if exists
    if (errors[field as string]) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[field as string];
        return updated;
      });
    }
  }, [errors]);

  // Handle file selection
  const handleFilesSelected = useCallback((files: File[]) => {
    setAccount(prev => ({ ...prev, statements: files }));
  }, []);

  // Validate the account
  const validateAccount = useCallback(() => {
    const newErrors: Record<string, string> = {};
    
    if (!account.accountName) {
      newErrors.accountName = "Account name is required";
    }
    
    if (!account.institution) {
      newErrors.institution = "Institution is required";
    }
    
    if (!account.legalEntity) {
      newErrors.legalEntity = "Legal entity is required";
    }
    
    // If account number is filled, check swiftCode for international accounts
    if (account.accountNumber && !account.accountNumber.startsWith('US') && !account.swiftCode) {
      newErrors.swiftCode = "SWIFT/BIC code is required for international accounts";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [account]);

  // Form submission handler
  const handleSubmit = useCallback(() => {
    if (validateAccount()) {
      onSubmit(account);
      setAccount({ ...DEFAULT_ACCOUNT });
      toast({
        title: "Success",
        description: "Account information has been saved successfully.",
      });
    } else {
      toast({
        title: "Validation Error",
        description: "Please correct the errors in the form.",
        variant: "destructive"
      });
    }
  }, [account, onSubmit, validateAccount]);

  // Reset the form
  const resetForm = useCallback(() => {
    setAccount({ ...DEFAULT_ACCOUNT });
    setErrors({});
  }, []);

  // Check if form is valid
  const isFormValid = Boolean(
    account.accountName && 
    account.institution && 
    account.legalEntity
  );

  return {
    account,
    errors,
    handleInputChange,
    handleSelectionChange,
    handleFilesSelected,
    handleSubmit,
    validateAccount,
    resetForm,
    isFormValid,
    setAccount,
    setErrors
  };
};
