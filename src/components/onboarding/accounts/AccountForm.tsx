
import { useState } from "react";
import { FinancialAccountInfo } from "@/context/OnboardingContext";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Plus, Wallet } from "lucide-react";
import AccountFormFields from "./AccountFormFields";

interface AccountFormProps {
  onAddAccount: (account: FinancialAccountInfo) => void;
}

const AccountForm = ({ onAddAccount }: AccountFormProps) => {
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

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Wallet className="h-5 w-5 text-black" />
        <h3 className="font-medium text-black">Add a new financial account</h3>
      </div>
      
      <AccountFormFields
        account={newAccount}
        onInputChange={handleNewAccountChange}
        onSelectionChange={handleAccountSelectionChange}
        onStatementsSelected={handleStatementsSelected}
      />
      
      <Button
        type="button"
        variant="outline"
        onClick={handleAddAccount}
        className="mt-2"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Account
      </Button>
    </div>
  );
};

export default AccountForm;
