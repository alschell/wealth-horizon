
import React from "react";
import { FinancialAccountInfo } from "@/types/onboarding";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import CustomSearchableSelect from "@/components/ui/custom-searchable-select";
import { CURRENCIES, extractCurrencyCode } from "@/utils/constants/currencies";
import DocumentsSection from "./DocumentsSection";

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
  extractCurrencyCode: propExtractCurrencyCode,
  onFilesSelected
}: AccountDetailsSectionProps) => {
  const handleCurrencyChange = (value: string) => {
    const code = propExtractCurrencyCode ? propExtractCurrencyCode(value) : extractCurrencyCode(value);
    onSelectionChange('currency', code);
  };

  const handleFilesSelected = (files: File[]) => {
    if (onFilesSelected) {
      onFilesSelected(files);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="accountSubtype" className="flex items-center">
            Account Subtype
            <span className="text-red-500 ml-1">*</span>
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
          <Label htmlFor="currency" className="flex items-center">
            Primary Currency
            <span className="text-red-500 ml-1">*</span>
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

      {onFilesSelected && (
        <div className="mt-4">
          <DocumentsSection 
            files={account.statements || []}
            onStatementsSelected={handleFilesSelected}
          />
        </div>
      )}
    </div>
  );
};

export default AccountDetailsSection;
