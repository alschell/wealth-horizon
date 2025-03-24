
import { useState, useEffect } from "react";
import { FinancialAccountInfo } from "@/types/onboarding";
import { LEGAL_ENTITIES } from "../constants/legalEntities";
import { LEI_MAPPING } from "../constants/leiMappings";
import { toast } from "@/components/ui/use-toast";

interface UseAccountFormStateProps {
  onAddAccount: (account: FinancialAccountInfo) => void;
  initialAccount?: FinancialAccountInfo;
}

export const useAccountFormState = ({ onAddAccount, initialAccount }: UseAccountFormStateProps) => {
  // Initialize account state with default values or provided values with proper typing
  const [newAccount, setNewAccount] = useState<FinancialAccountInfo>(
    initialAccount || {
      accountName: "",
      institution: "",
      accountType: "other", // Use a valid value from the enum instead of empty string
      legalEntity: "",
      legalEntityIdentifier: "",
      accountSubtype: "",
      currency: "",
      approximateValue: "",
      statements: []
    }
  );

  const defaultAccount: FinancialAccountInfo = {
    accountName: "",
    institution: "",
    accountType: "other", // Use a valid value from the enum instead of empty string
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
    
    // Special handling for LEI field
    if (name === 'legalEntityIdentifier') {
      handleLeiInputChange(value);
    } else {
      setNewAccount(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error for the field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle LEI input change with auto-population
  const handleLeiInputChange = (value: string) => {
    setNewAccount(prev => ({ ...prev, legalEntityIdentifier: value }));
    
    // Auto-populate institution and legal entity from LEI
    if (value) {
      // Check if this LEI exists in our mapping
      for (const [entityName, lei] of Object.entries(LEI_MAPPING)) {
        if (lei === value) {
          // Found a match, now find which institution it belongs to
          for (const [institution, entities] of Object.entries(LEGAL_ENTITIES)) {
            if (entities.includes(entityName)) {
              setNewAccount(prev => ({
                ...prev,
                legalEntityIdentifier: value,
                institution: institution,
                legalEntity: entityName
              }));
              
              // Notify user of auto-population
              toast({
                title: "Fields auto-populated",
                description: `Institution and legal entity were set based on the provided LEI.`,
              });
              return;
            }
          }
        }
      }
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
      setNewAccount(prev => ({ ...prev, legalEntity: '' }));
    }
  };

  // Handle legal entity change
  const handleLegalEntityChange = (value: string) => {
    // Update legal entity
    setNewAccount(prev => ({ ...prev, legalEntity: value }));
    
    // If we have an LEI mapping for this entity, auto-populate it
    if (LEI_MAPPING[value]) {
      setNewAccount(prev => ({ 
        ...prev, 
        legalEntity: value,
        legalEntityIdentifier: LEI_MAPPING[value] 
      }));
    }
    
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
    handleLeiInputChange(e.target.value);
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

    if (!newAccount.legalEntityIdentifier) {
      newErrors.legalEntityIdentifier = 'Legal Entity Identifier is required';
    }

    if (!newAccount.legalEntity) {
      newErrors.legalEntity = 'Legal Entity is required';
    }

    if (!newAccount.accountSubtype) {
      newErrors.accountSubtype = 'Account Subtype is required';
    }

    if (!newAccount.currency) {
      newErrors.currency = 'Currency is required';
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
