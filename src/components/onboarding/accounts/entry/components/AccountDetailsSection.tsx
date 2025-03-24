
import React from "react";
import { FinancialAccountInfo } from "@/types/onboarding";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CustomSearchableSelect } from "@/components/ui/custom-searchable-select";
import { CURRENCIES } from "@/utils/financialDataConstants";

interface AccountDetailsSectionProps {
  account: FinancialAccountInfo;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectionChange: (field: keyof FinancialAccountInfo, value: string) => void;
  extractCurrencyCode: (currencyOption: string) => string;
}

const AccountDetailsSection = ({
  account,
  onInputChange,
  onSelectionChange,
  extractCurrencyCode
}: AccountDetailsSectionProps) => {
  return (
    <>
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
        
        <CustomSearchableSelect
          id="currency"
          label="Primary Currency"
          value={account.currency}
          onChange={(value) => onSelectionChange('currency', extractCurrencyCode(value))}
          placeholder="Select currency"
          options={CURRENCIES.sort()}
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
          value={account.approximateValue || ""}
          onChange={onInputChange}
          placeholder="e.g., 10,000,000"
          className="h-11"
        />
      </div>
    </>
  );
};

export default AccountDetailsSection;
