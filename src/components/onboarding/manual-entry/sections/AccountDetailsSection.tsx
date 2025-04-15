
import React from "react";
import { FinancialAccountInfo } from "@/context/OnboardingContext";
import { 
  InputField, 
  SelectField,
  SearchableSelectField 
} from "@/components/onboarding/accounts/fields";
import { CURRENCIES } from "@/utils/constants/currencies";

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
  // Create an adapter function that converts the SelectField's onChange to work with our onSelectionChange
  const handleSelectChange = (name: keyof FinancialAccountInfo) => (value: string) => {
    onSelectionChange(name, value);
  };

  // Convert Currency objects to string representations for the component
  const currencyOptions = CURRENCIES.map(currency => `${currency.code} - ${currency.name}`);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      <SearchableSelectField
        id="currency"
        label="Currency"
        value={account.currency}
        onChange={handleSelectChange("currency")}
        options={currencyOptions}
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
