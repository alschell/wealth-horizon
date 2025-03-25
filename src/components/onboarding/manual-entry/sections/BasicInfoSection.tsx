
import React from "react";
import { FinancialAccountInfo } from "@/context/OnboardingContext";
import { InputField, SelectField } from "@/components/onboarding/common/fields";
import { ACCOUNT_TYPES } from "@/utils/constants/accountTypes";

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
  return (
    <div className="grid grid-cols-1 gap-4 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          id="accountName"
          label="Account Name"
          name="accountName"
          value={account.accountName || ""}
          onChange={onInputChange}
          placeholder="Enter account name"
          required={false}
        />
        
        <SelectField
          id="accountType"
          label="Account Type"
          value={account.accountType || ""}
          placeholder="Select account type"
          options={ACCOUNT_TYPES}
          onChange={(value) => onSelectionChange("accountType", value)}
          required={false}
        />
      </div>
    </div>
  );
};

export default BasicInfoSection;
