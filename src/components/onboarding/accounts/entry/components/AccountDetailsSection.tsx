
import React from "react";
import { FinancialAccountInfo } from "@/types/onboarding";
import { 
  InputField, 
  SearchableSelectField 
} from "@/components/onboarding/common/fields";
import { CURRENCIES } from "@/utils/constants";
import { INSTITUTIONS } from "@/components/onboarding/accounts/entry/constants";

interface AccountDetailsSectionProps {
  account: FinancialAccountInfo;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectionChange: (field: keyof FinancialAccountInfo, value: string) => void;
}

const AccountDetailsSection = ({
  account,
  onInputChange,
  onSelectionChange
}: AccountDetailsSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <InputField
          id="accountSubtype"
          label="Account Subtype"
          name="accountSubtype"
          value={account.accountSubtype || ""}
          onChange={onInputChange}
          placeholder="Enter account subtype (optional)"
          required={false}
        />
      </div>
      
      <div className="space-y-2">
        <SearchableSelectField
          id="institution"
          label="Institution"
          value={account.institution || ""}
          placeholder="Select institution"
          options={INSTITUTIONS}
          required={true}
          onChange={(value) => onSelectionChange("institution", value)}
          allowCustomValue={true}
        />
      </div>
      
      <div className="space-y-2">
        <SearchableSelectField
          id="currency"
          label="Primary Currency"
          value={account.currency || ""}
          placeholder="Select currency"
          options={CURRENCIES}
          required={false}
          onChange={(value) => onSelectionChange("currency", value)}
          allowCustomValue={false}
        />
      </div>
      
      <div className="space-y-2">
        <InputField
          id="approximateValue"
          label="Approximate Value"
          name="approximateValue"
          value={account.approximateValue || ""}
          onChange={onInputChange}
          placeholder="Enter approximate value"
          required={false}
        />
      </div>
    </div>
  );
};

export default AccountDetailsSection;
