
import React from "react";
import { FinancialAccountInfo } from "@/types/onboarding";
import { InputField, SelectField } from "@/components/onboarding/common/fields";
import { ACCOUNT_TYPES } from "../constants";

export interface BasicInfoSectionProps {
  account: FinancialAccountInfo;
  errors?: Record<string, string>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectionChange: (field: keyof FinancialAccountInfo, value: string) => void;
}

const BasicInfoSection = ({
  account,
  errors = {},
  onInputChange,
  onSelectionChange
}: BasicInfoSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <InputField
          id="accountName"
          label="Account Name"
          name="accountName"
          value={account.accountName || ""}
          onChange={onInputChange}
          placeholder="Enter account name"
          required={true}
          error={errors.accountName}
        />
      </div>
      
      <div className="space-y-2">
        <SelectField
          id="accountType"
          label="Account Type"
          value={account.accountType || ""}
          placeholder="Select account type"
          options={ACCOUNT_TYPES}
          required={true}
          onChange={(value) => onSelectionChange("accountType", value)}
          error={errors.accountType}
        />
      </div>
    </div>
  );
};

export default BasicInfoSection;
