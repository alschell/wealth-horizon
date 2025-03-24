
import React from "react";
import { FinancialAccountInfo } from "@/types/onboarding";
import { 
  InputField, 
  SearchableSelectField 
} from "../fields";

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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <SearchableSelectField
        id="legalEntity"
        label="Legal Entity"
        value={account.legalEntity || ""}
        placeholder="Select legal entity"
        options={legalEntities}
        onChange={handleLegalEntityChange}
        allowCustomValue={true}
      />
      
      <InputField
        id="legalEntityIdentifier"
        label="Legal Entity Identifier"
        name="legalEntityIdentifier"
        value={account.legalEntityIdentifier || ""}
        onChange={handleLeiChange}
        placeholder="e.g., 7H6GLXDRUGQFU57RNE97"
      />
    </div>
  );
};

export default LegalEntitySection;
