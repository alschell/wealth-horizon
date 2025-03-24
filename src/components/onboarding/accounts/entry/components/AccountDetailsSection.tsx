
import React from "react";
import { FinancialAccountInfo } from "@/types/onboarding";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import CustomSearchableSelect from "@/components/ui/custom-searchable-select";
import { CURRENCIES, extractCurrencyCode } from "@/utils/constants/currencies";

interface AccountDetailsSectionProps {
  account: FinancialAccountInfo;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectionChange: (field: keyof FinancialAccountInfo, value: string) => void;
  extractCurrencyCode?: (currencyOption: string) => string;
  onFilesSelected?: (files: File[]) => void;
}

const AccountDetailsSection = ({
  account,
  onInputChange,
  onSelectionChange,
  extractCurrencyCode: propExtractCurrencyCode
}: AccountDetailsSectionProps) => {
  const handleCurrencyChange = (value: string) => {
    const code = propExtractCurrencyCode ? propExtractCurrencyCode(value) : extractCurrencyCode(value);
    onSelectionChange('currency', code);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="accountSubtype">
            Account Subtype (optional)
          </Label>
          <Input
            id="accountSubtype"
            name="accountSubtype"
            value={account.accountSubtype || ""}
            onChange={onInputChange}
            placeholder="e.g., Managed Account, Private Equity"
            className="h-11"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="currency">
            Primary Currency (optional)
          </Label>
          <CustomSearchableSelect
            id="currency"
            label=""
            value={account.currency || ""}
            onChange={handleCurrencyChange}
            placeholder="Select currency"
            options={CURRENCIES}
            className="h-11"
          />
        </div>
      </div>
    </div>
  );
};

export default AccountDetailsSection;
