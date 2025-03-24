
import { useState } from "react";
import { FinancialAccountInfo } from "@/types/onboarding";
import { toast } from "@/components/ui/use-toast";
import { LEI_MAPPING, LEGAL_ENTITIES } from "../constants/legalEntityData";

interface UseAccountFormStateProps {
  onAddAccount: (account: FinancialAccountInfo) => void;
}

export const useAccountFormState = ({ onAddAccount }: UseAccountFormStateProps) => {
  const [newAccount, setNewAccount] = useState<FinancialAccountInfo>({
    accountName: "",
    institution: "",
    accountType: "cash",
    accountSubtype: "",
    currency: "",
    approximateValue: "",
    statements: []
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof FinancialAccountInfo, string>>>({});

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAccount({ ...newAccount, [name]: value });
    
    // Clear error when field is edited
    if (errors[name as keyof FinancialAccountInfo]) {
      setErrors({ ...errors, [name]: undefined });
    }
    
    // If this is the legal entity identifier field, try to populate institution and legal entity
    if (name === "legalEntityIdentifier" && value) {
      for (const [entityName, entityLei] of Object.entries(LEI_MAPPING)) {
        if (entityLei === value) {
          // Find the institution this entity belongs to
          for (const [instName, entities] of Object.entries(LEGAL_ENTITIES)) {
            if ((entities as string[]).includes(entityName)) {
              setNewAccount(prev => ({
                ...prev,
                institution: instName,
                legalEntity: entityName,
                legalEntityIdentifier: value
              }));
              break;
            }
          }
          break;
        }
      }
    }
  };

  // Handle selection change
  const handleSelectionChange = (field: keyof FinancialAccountInfo, value: string) => {
    setNewAccount({ ...newAccount, [field]: value });
    
    // Clear error when field is edited
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
    
    // If changing institution, reset legal entity
    if (field === "institution") {
      if (newAccount.legalEntity) {
        // Check if current legal entity belongs to new institution
        const entitiesForInstitution = LEGAL_ENTITIES[value] || [];
        if (!entitiesForInstitution.includes(newAccount.legalEntity)) {
          setNewAccount(prev => ({ 
            ...prev, 
            institution: value,
            legalEntity: undefined,
            legalEntityIdentifier: undefined
          }));
        }
      } else {
        setNewAccount(prev => ({ ...prev, institution: value }));
      }
    }
    
    // If setting legal entity, also set legal entity identifier if available
    if (field === "legalEntity" && LEI_MAPPING[value]) {
      setNewAccount(prev => ({ 
        ...prev, 
        legalEntity: value,
        legalEntityIdentifier: LEI_MAPPING[value] 
      }));
    }
  };

  // Get legal entities for the selected institution
  const getLegalEntities = () => {
    if (newAccount.institution && LEGAL_ENTITIES[newAccount.institution]) {
      return LEGAL_ENTITIES[newAccount.institution];
    }
    return [];
  };

  // Extract value from currency option (e.g., "USD - US Dollar" -> "USD")
  const extractCurrencyCode = (currencyOption: string) => {
    return currencyOption.split(" - ")[0];
  };

  // Handle file upload
  const handleFilesSelected = (files: File[]) => {
    setNewAccount({ ...newAccount, statements: files });
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Partial<Record<keyof FinancialAccountInfo, string>> = {};
    const requiredFields: (keyof FinancialAccountInfo)[] = [
      'accountName', 
      'institution', 
      'accountType'
    ];
    
    requiredFields.forEach(field => {
      if (!newAccount[field]) {
        newErrors[field] = 'This field is required';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Add new account
  const handleAddAccount = () => {
    if (!validateForm()) {
      toast({
        title: "Form validation failed",
        description: "Please check the form for errors.",
        variant: "destructive",
      });
      return;
    }
    
    onAddAccount(newAccount);
    
    toast({
      title: "Account added",
      description: `${newAccount.accountName} has been added successfully.`,
    });
    
    // Clear form after adding an account
    setNewAccount({
      accountName: "",
      institution: "",
      accountType: "cash",
      accountSubtype: "",
      currency: "",
      approximateValue: "",
      statements: []
    });
    setErrors({});
  };

  return {
    newAccount,
    errors,
    handleInputChange,
    handleSelectionChange,
    getLegalEntities,
    extractCurrencyCode,
    handleFilesSelected,
    handleAddAccount
  };
};
