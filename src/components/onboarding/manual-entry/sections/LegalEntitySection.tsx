
import React from "react";
import { FinancialAccountInfo } from "@/context/OnboardingContext";
import { 
  InputField 
} from "@/components/onboarding/accounts/fields";
import { SearchableSelectField } from "@/components/onboarding/accounts/fields";
import { LEGAL_ENTITIES } from "@/components/onboarding/accounts/constants";

interface LegalEntitySectionProps {
  account: FinancialAccountInfo;
  legalEntities: string[];
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectionChange: (field: keyof FinancialAccountInfo, value: string) => void;
  handleLegalEntityChange: (value: string) => void;
  handleLeiChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LegalEntitySection: React.FC<LegalEntitySectionProps> = ({
  account,
  legalEntities,
  onInputChange,
  handleLegalEntityChange,
  handleLeiChange
}) => {
  // Get all institutions from the mapping object
  const institutions = Object.keys(LEGAL_ENTITIES).sort();
  
  // Adapter function to transform event handler to value handler
  const handleSearchableSelectChange = (field: string) => (value: string) => {
    onInputChange({
      target: { name: field, value }
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SearchableSelectField 
          id="institution" 
          label="Institution"
          value={account.institution}
          placeholder="Select institution"
          options={institutions}
          onChange={handleSearchableSelectChange('institution')}
          allowCustomValue={true}
          required={true}
        />
        
        <SearchableSelectField 
          id="legalEntity" 
          label="Legal Entity"
          value={account.legalEntity}
          placeholder="Select legal entity"
          options={legalEntities}
          onChange={handleLegalEntityChange}
          allowCustomValue={true}
          required={true}
        />
      </div>

      <InputField
        id="legalEntityIdentifier"
        label="Legal Entity Identifier (LEI)"
        name="legalEntityIdentifier"
        value={account.legalEntityIdentifier}
        onChange={handleLeiChange}
        placeholder="e.g., 7H6GLXDRUGQFU57RNE97"
        required={false}
      />
    </>
  );
};

export default LegalEntitySection;
