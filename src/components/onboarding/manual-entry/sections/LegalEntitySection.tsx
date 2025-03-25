
import React from "react";
import { FinancialAccountInfo } from "@/context/OnboardingContext";
import { 
  InputField, 
  SelectField 
} from "@/components/onboarding/accounts/fields";

interface LegalEntitySectionProps {
  account: FinancialAccountInfo;
  legalEntities: string[];
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectionChange: (field: keyof FinancialAccountInfo, value: string) => void;
  handleLegalEntityChange: (value: string) => void;
  handleLeiChange: (value: string) => void;
}

const LegalEntitySection: React.FC<LegalEntitySectionProps> = ({
  account,
  legalEntities,
  onInputChange,
  onSelectionChange,
  handleLegalEntityChange,
  handleLeiChange
}) => {
  // Create handler for LEI input change that adapts from event to string
  const handleLeiInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleLeiChange(e.target.value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <SelectField
        id="legalEntity"
        label="Legal Entity"
        name="legalEntity"
        value={account.legalEntity}
        onChange={handleLegalEntityChange}
        options={legalEntities.length > 0 ? legalEntities : ["Default Entity"]}
        placeholder="Select legal entity"
        required={false}
      />
      
      <InputField
        id="legalEntityIdentifier"
        label="Legal Entity Identifier (LEI)"
        name="legalEntityIdentifier"
        value={account.legalEntityIdentifier || ""}
        onChange={handleLeiInputChange}
        placeholder="Enter LEI code"
        required={false}
      />
    </div>
  );
};

export default LegalEntitySection;
