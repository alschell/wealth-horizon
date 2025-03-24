
import React from "react";
import { FinancialAccountInfo } from "@/types/onboarding";
import { 
  InputField, 
  SearchableSelectField 
} from "../fields";
import { LEGAL_ENTITIES } from "../constants";

interface LegalEntitySectionProps {
  account: FinancialAccountInfo;
  legalEntities: string[];
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectionChange: (field: keyof FinancialAccountInfo, value: string) => void;
  handleLegalEntityChange: (value: string) => void;
  handleLeiChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LegalEntitySection = ({
  account,
  legalEntities,
  onInputChange,
  handleLegalEntityChange,
  handleLeiChange
}: LegalEntitySectionProps) => {
  // Get all institutions from the mapping object
  const institutions = Object.keys(LEGAL_ENTITIES).sort();

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
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SearchableSelectField
          id="institution"
          label="Institution"
          value={account.institution || ""}
          placeholder="Select institution"
          options={institutions}
          onChange={value => onInputChange({
            target: { name: 'institution', value }
          } as React.ChangeEvent<HTMLInputElement>)}
          allowCustomValue={true}
          required
        />
        
        <SearchableSelectField
          id="legalEntity"
          label="Legal Entity"
          value={account.legalEntity || ""}
          placeholder="Select legal entity"
          options={legalEntities}
          onChange={handleLegalEntityChange}
          allowCustomValue={true}
          required
        />
      </div>
    </div>
  );
};

export default LegalEntitySection;
