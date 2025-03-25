
import React from "react";
import { FinancialAccountInfo } from "@/types/onboarding";
import { InputField } from "@/components/onboarding/common/fields";

interface BasicInfoSectionProps {
  account: FinancialAccountInfo;
  errors: Record<string, string>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectionChange: (field: keyof FinancialAccountInfo, value: string) => void;
}

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
  account,
  errors,
  onInputChange,
  onSelectionChange
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Basic Information</h3>
      
      <div className="grid grid-cols-1 gap-4">
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
    </div>
  );
};

export default BasicInfoSection;
