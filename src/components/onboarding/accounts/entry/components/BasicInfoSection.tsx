
import React from "react";
import { FinancialAccountInfo } from "@/types/onboarding";
import InputField from "@/components/onboarding/common/fields/InputField";
import SelectField from "@/components/onboarding/common/fields/SelectField";
import SearchableSelectField from "@/components/onboarding/common/fields/SearchableSelectField";
import { ACCOUNT_TYPES } from "../constants/accountTypes";

interface BasicInfoSectionProps {
  account: FinancialAccountInfo;
  errors: Record<string, string>;
  institutions: string[];
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectionChange: (field: keyof FinancialAccountInfo, value: string) => void;
}

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
  account,
  errors,
  institutions,
  handleInputChange,
  handleSelectionChange
}) => {
  // Account subtypes based on the selected account type
  const getAccountSubtypes = () => {
    switch (account.accountType) {
      case "investment":
        return ["Managed", "Self-directed", "Brokerage", "Advisory", "Other"];
      case "portfolio":
        return ["Public Equities", "Fixed Income", "Alternative", "Mixed", "Other"];
      case "custody":
        return ["Cash", "Securities", "Precious Metals", "Other"];
      default:
        return ["Standard", "Premium", "Other"];
    }
  };

  // Currencies for selection
  const currencies = [
    "USD", "EUR", "GBP", "JPY", "CHF", "CAD", "AUD", "CNY", 
    "HKD", "SGD", "SEK", "NOK", "DKK", "NZD", "MXN", "BRL"
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Basic Account Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
        <InputField
          id="accountName"
          label="Account Name"
          value={account.accountName}
          placeholder="e.g., Family Office Operating Account"
          onChange={handleInputChange}
          required
          error={errors.accountName}
        />
        
        <SearchableSelectField
          id="institution"
          label="Institution"
          value={account.institution}
          placeholder="Select or enter institution"
          options={institutions}
          onChange={(value) => handleSelectionChange("institution", value)}
          allowCustomValue={true}
          required
          error={errors.institution}
        />
        
        <SelectField
          id="accountType"
          label="Account Type"
          value={account.accountType}
          placeholder="Select account type"
          options={ACCOUNT_TYPES}
          onChange={(value) => handleSelectionChange("accountType", value)}
          required
          error={errors.accountType}
        />
        
        {account.accountType && !["cash", "checking", "savings"].includes(account.accountType) && (
          <SelectField
            id="accountSubtype"
            label="Account Subtype"
            value={account.accountSubtype}
            placeholder="Select account subtype"
            options={getAccountSubtypes()}
            onChange={(value) => handleSelectionChange("accountSubtype", value)}
            error={errors.accountSubtype}
          />
        )}
        
        <SelectField
          id="currency"
          label="Primary Currency"
          value={account.currency}
          placeholder="Select currency"
          options={currencies}
          onChange={(value) => handleSelectionChange("currency", value)}
          error={errors.currency}
        />
        
        <InputField
          id="approximateValue"
          label="Approximate Value"
          value={account.approximateValue}
          placeholder="e.g., 1,000,000"
          onChange={handleInputChange}
          error={errors.approximateValue}
        />
      </div>
    </div>
  );
};

export default BasicInfoSection;
