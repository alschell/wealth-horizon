
import { useState } from "react";
import { FinancialAccountInfo } from "@/context/OnboardingContext";
import { toast } from "@/components/ui/use-toast";

export function useAccountForm(onAddAccount: (account: FinancialAccountInfo) => void) {
  const [newAccount, setNewAccount] = useState<FinancialAccountInfo>({
    accountName: "",
    institution: "",
    accountType: "other", // Changed from "" to "other" to satisfy the type requirement
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

  // Add new account
  const handleAddAccount = () => {
    // Validation - checking for institution, legalEntity and accountNumber
    if (!newAccount.institution || !newAccount.legalEntity || !newAccount.accountNumber) {
      toast({
        title: "Missing information",
        description: "Please fill in all required account fields.",
        variant: "destructive"
      });
      return;
    }

    // Special validation for "Other" institution
    if (newAccount.institution === "Other (Manual Entry)" || newAccount.institution === "") {
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
      accountType: "other", // Changed from "" to "other" to satisfy the type requirement
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
    handleNewAccountChange,
    handleAccountSelectionChange,
    handleStatementsSelected,
    handleAddAccount
  };
}
