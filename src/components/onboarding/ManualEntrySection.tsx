
import { useState } from "react";
import { FinancialAccountInfo } from "@/context/OnboardingContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Plus, Wallet } from "lucide-react";
import FileUploader from "@/components/FileUploader";
import { INSTITUTIONS, CURRENCIES } from "@/utils/financialDataConstants";
import AccountCard from "./AccountCard";

interface ManualEntrySectionProps {
  financialAccounts: FinancialAccountInfo[];
  addFinancialAccount: (account: FinancialAccountInfo) => void;
  removeFinancialAccount: (index: number) => void;
}

const ManualEntrySection = ({ 
  financialAccounts, 
  addFinancialAccount, 
  removeFinancialAccount 
}: ManualEntrySectionProps) => {

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
    addFinancialAccount(newAccount);

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
    <div className="space-y-4 mt-4">
      {/* List of added accounts */}
      {financialAccounts.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-medium">Added Financial Accounts</h3>
          <div className="space-y-2">
            {financialAccounts.map((account, index) => (
              <AccountCard 
                key={index}
                account={account}
                index={index}
                onRemove={() => removeFinancialAccount(index)}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Add new account form */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Wallet className="h-5 w-5 text-gray-500" />
          <h3 className="font-medium">Add a new financial account</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="accountName">Account Name*</Label>
            <Input
              id="accountName"
              name="accountName"
              value={newAccount.accountName}
              onChange={handleNewAccountChange}
              placeholder="e.g., Main Investment Portfolio at UBS"
              className="h-11"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="institution">Institution*</Label>
            <Select
              value={newAccount.institution}
              onValueChange={(value) => handleAccountSelectionChange("institution", value)}
            >
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Select institution" />
              </SelectTrigger>
              <SelectContent>
                {INSTITUTIONS.map((institution) => (
                  <SelectItem key={institution} value={institution}>
                    {institution}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="accountType">Account Type*</Label>
            <Select
              value={newAccount.accountType}
              onValueChange={(value) => handleAccountSelectionChange("accountType", value)}
            >
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Select account type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">Cash Account</SelectItem>
                <SelectItem value="portfolio">Investment Portfolio</SelectItem>
                <SelectItem value="custody">Custody Account</SelectItem>
                <SelectItem value="broker">Brokerage Account</SelectItem>
                <SelectItem value="investment">Investment Fund</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="accountSubtype">Account Subtype (optional)</Label>
            <Input
              id="accountSubtype"
              name="accountSubtype"
              value={newAccount.accountSubtype || ""}
              onChange={handleNewAccountChange}
              placeholder="e.g., Managed Account, Private Equity"
              className="h-11"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="currency">Primary Currency</Label>
            <Select
              value={newAccount.currency}
              onValueChange={(value) => handleAccountSelectionChange("currency", value)}
            >
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {CURRENCIES.map((currency) => (
                  <SelectItem key={currency} value={currency.split(" - ")[0]}>
                    {currency}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="approximateValue">Approximate Value</Label>
            <Input
              id="approximateValue"
              name="approximateValue"
              value={newAccount.approximateValue || ""}
              onChange={handleNewAccountChange}
              placeholder="e.g., 10,000,000"
              type="text"
              className="h-11"
            />
          </div>
        </div>
        
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
    </div>
  );
};

export default ManualEntrySection;
