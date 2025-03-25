
import React from "react";
import { FinancialAccountInfo } from "@/context/OnboardingContext";
import { InputField } from "@/components/onboarding/common/fields";

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
      <InputField
        id="accountName"
        label="Account Name"
        name="accountName"
        value={account.accountName || ""}
        onChange={onInputChange}
        placeholder="Enter account name"
        required={false}
      />
    </div>
  );
};

export default BasicInfoSection;
