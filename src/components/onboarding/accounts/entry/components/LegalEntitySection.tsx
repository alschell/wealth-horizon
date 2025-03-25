
import React from "react";
import { FinancialAccountInfo } from "@/types/onboarding";
import { InputField, SearchableSelectField } from "@/components/onboarding/accounts/fields";

interface LegalEntitySectionProps {
  account: FinancialAccountInfo;
  legalEntities: Record<string, string[]>;
  onLegalEntityChange: (value: string) => void;
  onLeiChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors?: Record<string, string>;
}

const LegalEntitySection: React.FC<LegalEntitySectionProps> = ({
  account,
  legalEntities,
  onLegalEntityChange,
  onLeiChange,
  errors = {}
}) => {
  // Get all institutions from the mapping object
  const institutions = Object.keys(legalEntities).sort();
  
  // Get legal entities for the selected institution
  const legalEntitiesList = account.institution && legalEntities[account.institution] 
    ? legalEntities[account.institution] 
    : [];

  const handleLegalEntitySelection = (value: string) => {
    onLegalEntityChange(value);
  };

  return (
    <div className="space-y-4">
      <InputField
        id="legalEntityIdentifier"
        label="Legal Entity Identifier (LEI)"
        name="legalEntityIdentifier"
        value={account.legalEntityIdentifier || ""}
        onChange={onLeiChange}
        placeholder="e.g., 7H6GLXDRUGQFU57RNE97"
        required={false}
        maxLength={20}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SearchableSelectField
          id="institution"
          label="Institution"
          value={account.institution || ""}
          placeholder="Select institution"
          options={institutions}
          onChange={(value) => onLegalEntityChange(value)}
          allowCustomValue={true}
          required={true}
          disabled={false}
          error={errors?.institution}
        />
        
        <SearchableSelectField
          id="legalEntity"
          label="Legal Entity"
          value={account.legalEntity || ""}
          placeholder="Select legal entity"
          options={legalEntitiesList}
          onChange={handleLegalEntitySelection}
          allowCustomValue={true}
          required={true}
          disabled={false}
          error={errors?.legalEntity}
        />
      </div>
    </div>
  );
};

export default LegalEntitySection;
