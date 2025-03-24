import React from "react";
import { FinancialAccountInfo } from "@/types/onboarding";
import { 
  InputField, 
  SearchableSelectField 
} from "../fields";
import { CURRENCIES } from "@/utils/constants/currencies";

interface AccountDetailsSectionProps {
  account: FinancialAccountInfo;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectionChange: (field: keyof FinancialAccountInfo, value: string) => void;
}

const AccountDetailsSection = ({
  account,
  onInputChange,
  onSelectionChange
}: AccountDetailsSectionProps) => {
  // Extract currency code from option (e.g., "USD - US Dollar" -> "USD")
  const extractCurrencyCode = (currencyOption: string) => {
    return currencyOption.split(" - ")[0];
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          id="accountSubtype"
          label="Account Subtype (optional)"
          name="accountSubtype"
          value={account.accountSubtype || ""}
          onChange={onInputChange}
          placeholder="e.g., Managed Account, Private Equity"
        />
        
        <SearchableSelectField
          id="currency"
          label="Primary Currency"
          value={account.currency}
          placeholder="Select currency"
          options={CURRENCIES.sort()}
          onChange={(value) => onSelectionChange("currency", extractCurrencyCode(value))}
        />
      </div>
      
      <InputField
        id="approximateValue"
        label="Approximate Value"
        name="approximateValue"
        value={account.approximateValue || ""}
        onChange={onInputChange}
        placeholder="e.g., 10,000,000"
      />
    </div>
  );
};

export default AccountDetailsSection;
