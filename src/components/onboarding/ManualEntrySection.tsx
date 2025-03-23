
import React, { useState } from "react";
import { FinancialAccountInfo } from "@/context/OnboardingContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Plus, Trash2, Wallet } from "lucide-react";
import { CustomSearchableSelect } from "@/components/ui/custom-searchable-select";
import { INSTITUTIONS, ACCOUNT_TYPES, CURRENCIES } from "./constants/formOptions";
import FileUploader from "@/components/FileUploader";

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
  const [errors, setErrors] = useState<Partial<Record<keyof FinancialAccountInfo, string>>>({});

  // Clear form after adding an account
  const resetForm = () => {
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

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAccount({ ...newAccount, [name]: value });
    
    // Clear error when field is edited
    if (errors[name as keyof FinancialAccountInfo]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  // Handle selection change
  const handleSelectionChange = (field: keyof FinancialAccountInfo, value: string) => {
    setNewAccount({ ...newAccount, [field]: value });
    
    // Clear error when field is edited
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
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
    
    addFinancialAccount(newAccount);
    
    toast({
      title: "Account added",
      description: `${newAccount.accountName} has been added successfully.`,
    });
    
    resetForm();
  };

  // Extract value from currency option (e.g., "USD - US Dollar" -> "USD")
  const extractCurrencyCode = (currencyOption: string) => {
    return currencyOption.split(" - ")[0];
  };

  // Map account type to appropriate label for display
  const getAccountTypeLabel = (type: string) => {
    // Capitalize first letter
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <div className="space-y-6">
      {/* List of existing accounts */}
      {financialAccounts.length > 0 && (
        <div className="space-y-4 mb-8">
          <h3 className="font-medium text-gray-700">Your Financial Accounts</h3>
          
          {financialAccounts.map((account, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-4 border rounded-md bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <Wallet className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">{account.accountName}</p>
                  <p className="text-sm text-gray-500">
                    {account.institution} · {getAccountTypeLabel(account.accountType)}
                    {account.currency && ` · ${account.currency}`}
                  </p>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFinancialAccount(index)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
      
      {/* Form to add a new account */}
      <div className="space-y-6 border p-4 rounded-md">
        <h3 className="font-medium flex items-center gap-2 text-gray-700">
          <Wallet className="h-5 w-5 text-gray-500" />
          Add a new financial account
        </h3>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="accountName">
              Account Name<span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="accountName"
              name="accountName"
              value={newAccount.accountName}
              onChange={handleInputChange}
              placeholder="e.g., Main Investment Portfolio at UBS"
              className={`h-11 ${errors.accountName ? 'border-red-500' : ''}`}
            />
            {errors.accountName && (
              <p className="text-red-500 text-sm mt-1">{errors.accountName}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomSearchableSelect
              id="institution"
              label="Institution"
              value={newAccount.institution}
              onChange={(value) => handleSelectionChange('institution', value)}
              placeholder="Select institution"
              options={INSTITUTIONS}
              required
              className={errors.institution ? 'error' : ''}
            />
            
            <CustomSearchableSelect
              id="accountType"
              label="Account Type"
              value={getAccountTypeLabel(newAccount.accountType)}
              onChange={(value) => handleSelectionChange('accountType', value.toLowerCase() as any)}
              placeholder="Select account type"
              options={ACCOUNT_TYPES}
              required
              className={errors.accountType ? 'error' : ''}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="accountSubtype">
                Account Subtype (optional)
              </Label>
              <Input
                id="accountSubtype"
                name="accountSubtype"
                value={newAccount.accountSubtype || ""}
                onChange={handleInputChange}
                placeholder="e.g., Managed Account, Private Equity"
                className="h-11"
              />
            </div>
            
            <CustomSearchableSelect
              id="currency"
              label="Primary Currency"
              value={newAccount.currency}
              onChange={(value) => handleSelectionChange('currency', extractCurrencyCode(value))}
              placeholder="Select currency"
              options={CURRENCIES}
              className=""
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="approximateValue">
              Approximate Value
            </Label>
            <Input
              id="approximateValue"
              name="approximateValue"
              value={newAccount.approximateValue || ""}
              onChange={handleInputChange}
              placeholder="e.g., 10,000,000"
              className="h-11"
            />
          </div>
          
          <div className="space-y-3">
            <Label>Account Statements</Label>
            <FileUploader
              accept="application/pdf,image/*"
              multiple={true}
              maxSize={5}
              onFilesSelected={handleFilesSelected}
              existingFiles={newAccount.statements}
              label="Upload Account Statements"
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
