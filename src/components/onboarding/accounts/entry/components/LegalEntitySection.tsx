
import React from "react";
import { FinancialAccountInfo } from "@/types/onboarding";
import { 
  InputField, 
  SearchableSelectField 
} from "@/components/onboarding/common/fields";

interface LegalEntitySectionProps {
  account: FinancialAccountInfo;
  legalEntities: Record<string, string[]>;
  onLegalEntityChange: (value: string) => void;
  onLeiChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LegalEntitySection: React.FC<LegalEntitySectionProps> = ({
  account,
  legalEntities,
  onLegalEntityChange,
  onLeiChange
}) => {
  // Get legal entity options based on the selected institution
  const getLegalEntityOptions = () => {
    if (account.institution && legalEntities[account.institution]) {
      return legalEntities[account.institution];
    }
    return [];
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Legal Entity Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SearchableSelectField
          id="legalEntity"
          label="Legal Entity"
          value={account.legalEntity || ""}
          placeholder="Select legal entity"
          options={getLegalEntityOptions()}
          required={false}
          onChange={onLegalEntityChange}
          allowCustomValue={true}
          disabled={!account.institution}
        />
        
        <InputField
          id="legalEntityIdentifier"
          label="Legal Entity Identifier (LEI)"
          name="legalEntityIdentifier"
          value={account.legalEntityIdentifier || ""}
          onChange={onLeiChange}
          placeholder="Enter 20-character LEI code"
          required={false}
          maxLength={20}
        />
      </div>
    </div>
  );
};

export default LegalEntitySection;
