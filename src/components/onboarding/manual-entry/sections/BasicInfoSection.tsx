
import React from "react";
import { FinancialAccountInfo } from "@/context/OnboardingContext";
import { 
  InputField, 
  SelectField 
} from "@/components/onboarding/accounts/fields";

// Account types for select field
const ACCOUNT_TYPES = [
  "Cash",
  "Checking",
  "Savings",
  "Brokerage",
  "Investment",
  "Portfolio",
  "Custody",
  "Trust",
  "Retirement",
  "Private Equity",
  "Hedge Fund",
  "Venture Capital",
  "Real Estate",
  "Fixed Income",
  "Credit",
  "Other"
];

interface BasicInfoSectionProps {
  account: FinancialAccountInfo;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectionChange: (field: keyof FinancialAccountInfo, value: string) => void;
}

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
  account,
  onInputChange,
  onSelectionChange
}) => {
  // Create an adapter function that converts the SelectField's onChange to work with our onSelectionChange
  const handleSelectChange = (name: keyof FinancialAccountInfo) => (value: string) => {
    onSelectionChange(name, value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <InputField
        id="accountName"
        label="Account Name"
        name="accountName"
        value={account.accountName}
        onChange={onInputChange}
        placeholder="Enter account name"
        required={false}
      />
      
      <SelectField
        id="accountType"
        label="Account Type"
        name="accountType"
        value={account.accountType}
        onChange={handleSelectChange("accountType")}
        options={ACCOUNT_TYPES}
        placeholder="Select account type"
        required={false}
      />
    </div>
  );
};

export default BasicInfoSection;
