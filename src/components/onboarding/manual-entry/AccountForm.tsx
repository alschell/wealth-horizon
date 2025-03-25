import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { FinancialAccountInfo } from "@/context/OnboardingContext";
import { AccountFormProps } from "./types";
import { useAccountForm } from "@/components/onboarding/accounts/hooks/useAccountForm";
import { useLegalEntityMapping } from "@/components/onboarding/accounts/hooks/useLegalEntityMapping";
import { InputField, SearchableSelectField, SelectField } from "@/components/onboarding/common/fields";
import { LEGAL_ENTITIES } from "@/components/onboarding/accounts/constants";
import { INSTITUTIONS } from "@/utils/constants/institutions";
import { ACCOUNT_TYPES } from "@/utils/constants/accountTypes";

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

  const [showOtherInstitution, setShowOtherInstitution] = useState(false);

  const handleLeiStringChange = (value: string) => {
    handleLeiChange(value);
  };

  const handleLeiInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleLeiChange(e.target.value);
  };

  const handleInstitutionChange = (value: string) => {
    handleAccountSelectionChange("institution", value);
    setShowOtherInstitution(value === "Other");
  };

  const legalEntitiesList = getLegalEntities();
  
  const isFormValid = Boolean(
    newAccount.institution && 
    newAccount.legalEntity && 
    newAccount.accountNumber
  );
  
  return (
    <Card className="p-5 border rounded-lg">
      <div className="grid grid-cols-1 gap-5">
        <InputField
          id="legalEntityIdentifier"
          label="Legal Entity Identifier (LEI)"
          name="legalEntityIdentifier"
          value={newAccount.legalEntityIdentifier || ""}
          onChange={handleLeiInputChange}
          placeholder="e.g., 7H6GLXDRUGQFU57RNE97"
          required={false}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SearchableSelectField
            id="institution"
            label="Institution"
            value={newAccount.institution || ""}
            placeholder="Select institution"
            options={INSTITUTIONS}
            onChange={handleInstitutionChange}
            allowCustomValue={false}
            required={true}
          />
          
          {showOtherInstitution && (
            <InputField
              id="customInstitution"
              label="Institution name"
              name="institution"
              value={newAccount.institution === "Other" ? "" : newAccount.institution || ""}
              onChange={(e) => handleAccountSelectionChange("institution", e.target.value)}
              placeholder="Enter institution name"
              required={true}
            />
          )}
          
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            id="accountName"
            label="Account Name"
            name="accountName"
            value={newAccount.accountName || ""}
            onChange={handleNewAccountChange}
            placeholder="Enter account name"
            required={false}
          />
          
          <SelectField
            id="accountType"
            label="Account Type"
            value={newAccount.accountType || ""}
            placeholder="Select account type"
            options={ACCOUNT_TYPES}
            onChange={(value) => handleAccountSelectionChange("accountType", value)}
            required={false}
          />
        </div>
        
        <AccountDetailsSection 
          account={newAccount}
          onInputChange={handleNewAccountChange}
          onSelectionChange={handleAccountSelectionChange}
        />
        
        <div className="flex justify-end mt-4">
          <Button 
            type="button" 
            className={`flex items-center ${!isFormValid ? 'bg-gray-300 text-gray-500' : 'bg-black hover:bg-gray-800 text-white'}`}
            onClick={handleAddAccount}
            disabled={!isFormValid}
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
