
import { useState, useEffect } from "react";
import { FinancialAccountInfo } from "@/types/onboarding";
import { toast } from "@/components/ui/use-toast";
import { LEGAL_ENTITIES, LEI_MAPPING } from "../constants";

interface UseAccountFormStateProps {
  onAddAccount: (account: FinancialAccountInfo) => void;
  initialAccount?: FinancialAccountInfo;
}

export function useAccountFormState({ onAddAccount, initialAccount }: UseAccountFormStateProps) {
  const defaultAccount: FinancialAccountInfo = {
    accountName: "",
    institution: "",
    accountType: "cash", // Setting a valid default value instead of empty string
    accountSubtype: "",
    currency: "",
    approximateValue: "",
    statements: []
  };
  
  const [newAccount, setNewAccount] = useState<FinancialAccountInfo>(initialAccount || defaultAccount);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [legalEntities, setLegalEntities] = useState<string[]>([]);

  // Update legal entities when institution changes
  useEffect(() => {
    if (newAccount.institution && LEGAL_ENTITIES[newAccount.institution]) {
      setLegalEntities(LEGAL_ENTITIES[newAccount.institution]);
    } else {
      setLegalEntities([]);
    }
  }, [newAccount.institution]);

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

    // Clear legal entity if institution changes
    if (field === 'institution') {
      setNewAccount(prev => ({ ...prev, legalEntity: '', legalEntityIdentifier: '' }));
    }
  };

  // Handle legal entity selection
  const handleLegalEntityChange = (value: string) => {
    setNewAccount(prev => ({ ...prev, legalEntity: value }));
    
    // Update LEI if available
    if (LEI_MAPPING[value]) {
      setNewAccount(prev => ({ ...prev, legalEntityIdentifier: LEI_MAPPING[value] }));
    }
  };

  // Handle LEI change
  const handleLeiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewAccount(prev => ({ ...prev, legalEntityIdentifier: value }));
    
    // Try to find and populate institution and legal entity from LEI
    if (value) {
      for (const [entityName, entityLei] of Object.entries(LEI_MAPPING)) {
        if (entityLei === value) {
          // Find the institution this entity belongs to
          for (const [instName, entities] of Object.entries(LEGAL_ENTITIES)) {
            if (entities.includes(entityName)) {
              setNewAccount(prev => ({ 
                ...prev, 
                institution: instName,
                legalEntity: entityName
              }));
              break;
            }
          }
          break;
        }
      }
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
    legalEntities,
    handleInputChange,
    handleSelectionChange,
    handleLegalEntityChange,
    handleLeiChange,
    handleFilesSelected,
    handleAddAccount
  };
}
