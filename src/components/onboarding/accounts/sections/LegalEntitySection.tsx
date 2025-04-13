
import React from "react";
import { FinancialAccountInfo } from "@/types/onboarding";
import { InputField, SearchableSelectField } from "@/components/onboarding/common/fields";

interface LegalEntitySectionProps {
  account: FinancialAccountInfo;
  legalEntities: Record<string, string[]> | string[];
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectionChange?: (field: keyof FinancialAccountInfo, value: string) => void;
  handleLegalEntityChange: (value: string) => void;
  handleLeiChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors?: Record<string, string>;
}

export const LegalEntitySection: React.FC<LegalEntitySectionProps> = ({
  account,
  legalEntities,
  onInputChange,
  onSelectionChange,
  handleLegalEntityChange,
  handleLeiChange,
  errors = {}
}) => {
  // Get all institutions or legal entities
  let institutionOptions: string[] = [];
  let legalEntityOptions: string[] = [];
  
  if (Array.isArray(legalEntities)) {
    // If it's an array, use as legal entities directly
    legalEntityOptions = legalEntities;
  } else {
    // If it's a record, get institutions and legal entities
    institutionOptions = Object.keys(legalEntities).sort();
    legalEntityOptions = account.institution && legalEntities[account.institution] 
      ? legalEntities[account.institution] 
      : [];
  }
  
  // Handle institution selection if onSelectionChange is provided
  const handleInstitutionChange = (value: string) => {
    if (onSelectionChange) {
      onSelectionChange("institution", value);
    }
  };

  return (
    <div className="space-y-4">
      <InputField
        id="legalEntityIdentifier"
        label="Legal Entity Identifier (LEI)"
        name="legalEntityIdentifier"
        value={account.legalEntityIdentifier || ""}
        onChange={handleLeiChange}
        placeholder="e.g., 7H6GLXDRUGQFU57RNE97"
        required={false}
        maxLength={20}
        error={errors?.legalEntityIdentifier}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {onSelectionChange && (
          <SearchableSelectField
            id="institution"
            label="Institution"
            value={account.institution || ""}
            placeholder="Select institution"
            options={institutionOptions}
            onChange={handleInstitutionChange}
            allowCustomValue={true}
            required={true}
            disabled={false}
            error={errors?.institution}
          />
        )}
        
        <SearchableSelectField
          id="legalEntity"
          label="Legal Entity"
          value={account.legalEntity || ""}
          placeholder="Select legal entity"
          options={legalEntityOptions}
          onChange={handleLegalEntityChange}
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
