
import React from "react";
import { FinancialAccountInfo } from "@/types/onboarding";
import { 
  InputField, 
  SearchableSelectField 
} from "@/components/onboarding/common/fields";
import { CURRENCIES, extractCurrencyCode } from "@/utils/constants/currencies";

interface AccountDetailsSectionProps {
  account: FinancialAccountInfo;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectionChange: (field: keyof FinancialAccountInfo, value: string) => void;
  errors?: Record<string, string>; // Add the errors prop with optional flag
}

const AccountDetailsSection = ({
  account,
  onInputChange,
  onSelectionChange,
  errors = {} // Default to empty object if not provided
}: AccountDetailsSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          id="accountSubtype"
          label="Account Subtype"
          name="accountSubtype"
          value={account.accountSubtype || ""}
          onChange={onInputChange}
          placeholder="e.g., Managed Account, Private Equity"
          required={false}
          error={errors.accountSubtype}
        />
        
        <SearchableSelectField
          id="currency"
          label="Primary Currency"
          value={account.currency || ""}
          placeholder="Select currency"
          options={CURRENCIES}
          onChange={(value) => onSelectionChange("currency", extractCurrencyCode(value))}
          required={false}
          error={errors.currency}
        />
      </div>
    </div>
  );
};

export default AccountDetailsSection;
