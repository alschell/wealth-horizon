
import { useState, useMemo } from "react";
import { FinancialAccountInfo } from "@/context/OnboardingContext";
import { toast } from "@/components/ui/use-toast";

export function useAccountForm(onAddAccount: (account: FinancialAccountInfo) => void) {
  const [newAccount, setNewAccount] = useState<FinancialAccountInfo>({
    accountName: "",
    institution: "",
    accountType: "", // Changed from "other" to empty string to ensure placeholder shows
    accountSubtype: "",
    currency: "",
    approximateValue: "",
    statements: [],
    legalEntity: "",
    legalEntityIdentifier: "",
    accountNumber: "",
    swiftCode: ""
  });

  // Handle new account input
  const handleNewAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAccount({
      ...newAccount,
      [name]: value
    });
  };

  // Handle account selection changes
  const handleAccountSelectionChange = (field: keyof FinancialAccountInfo, value: string) => {
    setNewAccount({
      ...newAccount,
      [field]: value
    });
  };

  // Handle account statements
  const handleStatementsSelected = (files: File[]) => {
    setNewAccount({
      ...newAccount,
      statements: files
    });
  };

  // Check if form is valid (required fields filled)
  const isFormValid = useMemo(() => {
    return Boolean(
      newAccount.institution && 
      newAccount.legalEntity && 
      newAccount.accountNumber
    );
  }, [newAccount.institution, newAccount.legalEntity, newAccount.accountNumber]);

  // Add new account
  const handleAddAccount = () => {
    // Validation - checking for institution, legalEntity and accountNumber
    if (!isFormValid) {
      toast({
        title: "Missing information",
        description: "Please fill in all required account fields.",
        variant: "destructive"
      });
      return;
    }

    // Special validation for "Other" institution
    if (newAccount.institution === "Other" && newAccount.legalEntity === "Other Legal Entity") {
      toast({
        title: "Missing information",
        description: "Please enter a valid institution name.",
        variant: "destructive"
      });
      return;
    }

    // Add account
    onAddAccount(newAccount);

    // Reset form with default values
    setNewAccount({
      accountName: "",
      institution: "",
      accountType: "", // Reset to empty string instead of "other"
      accountSubtype: "",
      currency: "",
      approximateValue: "",
      statements: [],
      legalEntity: "",
      legalEntityIdentifier: "",
      accountNumber: "",
      swiftCode: ""
    });

    toast({
      title: "Account added",
      description: "Financial account has been added successfully."
    });
  };

  return {
    newAccount,
    isFormValid,
    handleNewAccountChange,
    handleAccountSelectionChange,
    handleStatementsSelected,
    handleAddAccount
  };
}
