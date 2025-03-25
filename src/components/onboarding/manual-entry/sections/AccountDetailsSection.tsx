
import React from "react";
import { FinancialAccountInfo } from "@/context/OnboardingContext";
import { 
  InputField, 
  SelectField 
} from "@/components/onboarding/accounts/fields";

// Currencies for select field
const CURRENCIES = [
  "USD", "EUR", "GBP", "JPY", "CHF", "CAD", "AUD", "CNY", "HKD", "SGD"
];

interface AccountDetailsSectionProps {
  account: FinancialAccountInfo;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectionChange: (field: keyof FinancialAccountInfo, value: string) => void;
}

const AccountDetailsSection: React.FC<AccountDetailsSectionProps> = ({
  account,
  onInputChange,
  onSelectionChange
}) => {
  // Adapter function to transform select handler to fit SelectField's expected format
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    onSelectionChange(name as keyof FinancialAccountInfo, value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      <SelectField
        id="currency"
        label="Currency"
        name="currency"
        value={account.currency}
        onChange={handleSelectChange}
        options={CURRENCIES}
        placeholder="Select currency"
        required={false}
      />
      
      <InputField
        id="approximateValue"
        label="Approximate Value"
        name="approximateValue"
        value={account.approximateValue}
        onChange={onInputChange}
        placeholder="Enter value"
        required={false}
        type="text"
      />
      
      <InputField
        id="accountSubtype"
        label="Account Subtype"
        name="accountSubtype"
        value={account.accountSubtype}
        onChange={onInputChange}
        placeholder="E.g., Retirement"
        required={false}
      />
    </div>
  );
};

export default AccountDetailsSection;
