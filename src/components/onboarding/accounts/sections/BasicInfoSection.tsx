
import React from "react";
import { FinancialAccountInfo } from "@/types/onboarding";
import { 
  InputField, 
  SearchableSelectField 
} from "../fields";
import { INSTITUTIONS, ACCOUNT_TYPES } from "@/utils/constants";

interface BasicInfoSectionProps {
  account: FinancialAccountInfo;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectionChange: (field: keyof FinancialAccountInfo, value: string) => void;
}

const BasicInfoSection = ({
  account,
  onInputChange,
  onSelectionChange
}: BasicInfoSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2 md:col-span-2">
        <InputField
          id="accountName"
          label="Account Name"
          name="accountName"
          value={account.accountName}
          onChange={onInputChange}
          placeholder="e.g., Main Investment Portfolio at UBS"
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SearchableSelectField
          id="institution"
          label="Institution"
          value={account.institution}
          placeholder="Select institution"
          options={INSTITUTIONS.sort()}
          required
          onChange={(value) => onSelectionChange("institution", value)}
          allowCustomValue={true}
        />
        
        <SearchableSelectField
          id="accountType"
          label="Account Type"
          value={account.accountType}
          placeholder="Select account type"
          options={ACCOUNT_TYPES.sort()}
          required
          onChange={(value) => onSelectionChange("accountType", value as any)}
          extractValue={(type) => type.toLowerCase()}
        />
      </div>
    </div>
  );
};

export default BasicInfoSection;
