
import React from "react";
import { FinancialAccountInfo } from "@/types/onboarding";
import { 
  InputField, 
  SearchableSelectField, 
  SelectField 
} from "../fields";
import { ACCOUNT_TYPES } from "@/utils/constants/accountTypes";

interface BasicInfoSectionProps {
  account: FinancialAccountInfo;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectionChange: (field: keyof FinancialAccountInfo, value: string) => void;
  errors?: Record<string, string>; // Add the errors prop with optional flag
}

const BasicInfoSection = ({
  account,
  onInputChange,
  onSelectionChange,
  errors = {} // Default to empty object if not provided
}: BasicInfoSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          id="accountName"
          label="Account Name"
          name="accountName"
          value={account.accountName || ""}
          onChange={onInputChange}
          placeholder="e.g., Main Investment Portfolio at UBS"
          required={false}
          error={errors.accountName}
        />
        
        <SelectField
          id="accountType"
          label="Account Type"
          value={account.accountType || ""}
          placeholder="Select account type"
          options={ACCOUNT_TYPES}
          onChange={(value) => onSelectionChange("accountType", value)}
          required={false}
          error={errors.accountType}
        />
      </div>
    </div>
  );
};

export default BasicInfoSection;
