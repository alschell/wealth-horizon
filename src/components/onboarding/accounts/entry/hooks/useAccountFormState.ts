
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { FinancialAccountInfo } from "@/types/onboarding";
import { LEGAL_ENTITIES } from "../constants/legalEntities";

// Import our refactored hooks and types
import { DEFAULT_ACCOUNT, UseAccountFormStateProps, UseAccountFormStateReturn } from "./form/types";
import { useLeiHandler } from "./form/useLeiHandler";
import { useFormValidation } from "./form/useFormValidation";
import { useLegalEntityHandler } from "./form/useLegalEntityHandler";
import { useInputHandlers } from "./form/useInputHandlers";

export const useAccountFormState = ({ onAddAccount, initialAccount }: UseAccountFormStateProps): UseAccountFormStateReturn => {
  // Initialize account state with default values or provided values
  const [newAccount, setNewAccount] = useState<FinancialAccountInfo>(
    initialAccount || { ...DEFAULT_ACCOUNT }
  );

  // Get validation utilities
  const { errors, validateForm, clearError } = useFormValidation();

  // Get LEI handler
  const { handleLeiInputChange, handleLeiChange } = useLeiHandler(setNewAccount);

  // Get legal entity handler
  const { handleLegalEntityChange } = useLegalEntityHandler(setNewAccount, clearError);

  // Get input handlers
  const { handleInputChange, handleSelectionChange, handleFilesSelected } = useInputHandlers(
    setNewAccount,
    handleLeiInputChange,
    clearError
  );

  // Use the legal entities data
  const legalEntities = LEGAL_ENTITIES;

  // Handle form submission
  const handleAddAccount = () => {
    if (validateForm(newAccount)) {
      onAddAccount(newAccount);
      setNewAccount({ ...DEFAULT_ACCOUNT });
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
