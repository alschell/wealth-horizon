import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { FinancialAccountInfo } from "@/context/OnboardingContext";
import { AccountFormProps } from "./types";
import { useAccountForm } from "@/components/onboarding/accounts/hooks/useAccountForm";
import { useLegalEntityMapping } from "@/components/onboarding/accounts/hooks/useLegalEntityMapping";
import { InputField, SearchableSelectField } from "@/components/onboarding/accounts/fields";
import { LEGAL_ENTITIES } from "@/components/onboarding/accounts/constants";

import AccountDetailsSection from "./sections/AccountDetailsSection";

const AccountForm: React.FC<AccountFormProps> = ({ onAddAccount }) => {
  const {
    newAccount,
    handleNewAccountChange,
    handleAccountSelectionChange,
    handleAddAccount
  } = useAccountForm(onAddAccount);

  const {
    getLegalEntities,
    handleLegalEntityChange,
    handleLeiChange
  } = useLegalEntityMapping(newAccount, handleAccountSelectionChange);

  // Create an adapter for handleLeiChange to handle direct string input
  const handleLeiStringChange = (value: string) => {
    handleLeiChange(value);
  };

  // Create an adapter for handleLeiChange to handle input event
  const handleLeiInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleLeiChange(e.target.value);
  };

  const legalEntitiesList = getLegalEntities();
  
  // Get all institutions from the mapping object
  const institutions = Object.keys(LEGAL_ENTITIES).sort();

  return (
    <Card className="p-5 border rounded-lg">
      <div className="grid grid-cols-1 gap-4">
        {/* LEI Field First */}
        <InputField
          id="legalEntityIdentifier"
          label="Legal Entity Identifier (LEI)"
          name="legalEntityIdentifier"
          value={newAccount.legalEntityIdentifier || ""}
          onChange={handleLeiInputChange}
          placeholder="e.g., 7H6GLXDRUGQFU57RNE97"
          required={false}
        />
        
        {/* Institution and Legal Entity Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SearchableSelectField
            id="institution"
            label="Institution"
            value={newAccount.institution || ""}
            placeholder="Select institution"
            options={institutions}
            onChange={value => handleAccountSelectionChange("institution", value)}
            allowCustomValue={true}
            required={true}
          />
          
          <SearchableSelectField
            id="legalEntity"
            label="Legal Entity"
            value={newAccount.legalEntity || ""}
            placeholder="Select legal entity"
            options={legalEntitiesList}
            onChange={handleLegalEntityChange}
            allowCustomValue={true}
            required={true}
          />
        </div>
        
        {/* Account Number/IBAN and SWIFT/BIC Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            id="accountNumber"
            label="Account Number/IBAN"
            name="accountNumber"
            value={newAccount.accountNumber || ""}
            onChange={handleNewAccountChange}
            placeholder="Enter account number or IBAN"
            required={true}
          />
          
          <InputField
            id="swiftCode"
            label="SWIFT/BIC Code"
            name="swiftCode"
            value={newAccount.swiftCode || ""}
            onChange={handleNewAccountChange}
            placeholder="Enter SWIFT or BIC code"
            required={false}
          />
        </div>
        
        {/* Account Name and Type Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            id="accountName"
            label="Account Name"
            name="accountName"
            value={newAccount.accountName || ""}
            onChange={handleNewAccountChange}
            placeholder="Enter account name"
            required={true}
          />
          
          <SearchableSelectField
            id="accountType"
            label="Account Type"
            value={newAccount.accountType || ""}
            placeholder="Select account type"
            options={["Cash", "Checking", "Savings", "Investment", "Credit Card", "Loan", "Other"]}
            onChange={value => handleAccountSelectionChange("accountType", value)}
            allowCustomValue={true}
            required={true}
          />
        </div>
        
        {/* Other Account Details */}
        <AccountDetailsSection 
          account={newAccount}
          onInputChange={handleNewAccountChange}
          onSelectionChange={handleAccountSelectionChange}
        />
        
        <div className="flex justify-end mt-6">
          <Button 
            type="button" 
            className="bg-black hover:bg-gray-800 text-white flex items-center"
            onClick={handleAddAccount}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Account
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AccountForm;
