
import React from "react";
import { FinancialAccountInfo } from "@/types/onboarding";
import { 
  InputField, 
  SearchableSelectField 
} from "@/components/onboarding/common/fields";
import { ACCOUNT_TYPES } from "@/utils/constants";
import { AccountFormErrors } from "../hooks/form/types";

interface BasicInfoSectionProps {
  account: FinancialAccountInfo;
  errors?: AccountFormErrors;
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
          value={account.accountName}
          onChange={onInputChange}
          placeholder="Enter account name"
          required={false}
          error={errors.accountName}
        />
      </div>
      
      <div className="space-y-2">
        <SearchableSelectField
          id="accountType"
          label="Account Type"
          value={account.accountType || ""}
          placeholder="Select account type"
          options={ACCOUNT_TYPES}
          required={false}
          error={errors.accountType}
          onChange={(value) => onSelectionChange("accountType", value)}
          allowCustomValue={true}
        />
      </div>
    </div>
  );
};

export default BasicInfoSection;
