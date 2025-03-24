
import { useState } from "react";
import { FinancialAccountInfo } from "@/context/OnboardingContext";
import { toast } from "@/components/ui/use-toast";

export function useAccountForm(onAddAccount: (account: FinancialAccountInfo) => void) {
  const [newAccount, setNewAccount] = useState<FinancialAccountInfo>({
    accountName: "",
    institution: "",
    accountType: "cash",
    accountSubtype: "",
    currency: "",
    approximateValue: "",
    statements: []
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
    // Validation
    if (!newAccount.accountName || !newAccount.institution || !newAccount.accountType) {
      toast({
        title: "Missing information",
        description: "Please fill in all required account fields.",
        variant: "destructive"
      });
      return;
    }

    // Add account
    onAddAccount(newAccount);

    // Reset form
    setNewAccount({
      accountName: "",
      institution: "",
      accountType: "cash",
      accountSubtype: "",
      currency: "",
      approximateValue: "",
      statements: []
    });

    toast({
      title: "Account added",
      description: `${newAccount.accountName} has been added successfully.`
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
