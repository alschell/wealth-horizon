
import { useState } from "react";
import { FinancialAccountInfo } from "@/context/OnboardingContext";
import { toast } from "@/components/ui/use-toast";

export function useAccountForm(onAddAccount: (account: FinancialAccountInfo) => void) {
  const [newAccount, setNewAccount] = useState<FinancialAccountInfo>({
    accountName: "",
    institution: "",
    accountType: "other", // Changed from empty string to "other" as a default valid value
    accountSubtype: "",
    currency: "",
    approximateValue: "",
    statements: [],
    legalEntity: "", // Add missing required properties
    legalEntityIdentifier: "",
    accountNumber: "", // Add accountNumber field
    swiftCode: "" // Add swiftCode field
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
    // Validation - now only checking for institution, legalEntity and accountNumber
    if (!newAccount.institution || !newAccount.legalEntity || !newAccount.accountNumber) {
      toast({
        title: "Missing information",
        description: "Please fill in all required account fields.",
        variant: "destructive"
      });
      return;
    }

    // Add account
    onAddAccount(newAccount);

    // Reset form with all required fields
    setNewAccount({
      accountName: "",
      institution: "",
      accountType: "other", // Changed from empty string to "other" to match type definition
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
      description: `${newAccount.accountName || "New account"} has been added successfully.`
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
