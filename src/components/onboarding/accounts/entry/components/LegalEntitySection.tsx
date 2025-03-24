
import React from "react";
import { FinancialAccountInfo } from "@/types/onboarding";
import { InputField } from "@/components/onboarding/common/fields";
import { SearchableSelectField } from "@/components/onboarding/common/fields";

interface LegalEntitySectionProps {
  account: FinancialAccountInfo;
  legalEntities: string[];
  onLegalEntityChange: (value: string) => void;
  onLeiChange: (value: string) => void;
  disabled?: boolean;
}

const LegalEntitySection: React.FC<LegalEntitySectionProps> = ({
  account,
  legalEntities,
  onLegalEntityChange,
  onLeiChange,
  disabled = false
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Legal Entity Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SearchableSelectField
          id="legalEntity"
          label="Legal Entity"
          value={account.legalEntity || ""}
          placeholder="Select legal entity"
          options={legalEntities}
          required={false}
          onChange={onLegalEntityChange}
          allowCustomValue={true}
          disabled={disabled}
        />
        
        <InputField
          id="lei"
          label="LEI (Legal Entity Identifier)"
          name="lei"
          value={account.lei || ""}
          onChange={(e) => onLeiChange(e.target.value)}
          placeholder="Enter LEI number"
          required={false}
          maxLength={20}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default LegalEntitySection;
