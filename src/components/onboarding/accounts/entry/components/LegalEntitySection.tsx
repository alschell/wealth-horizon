
import React from "react";
import { FinancialAccountInfo } from "@/types/onboarding";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import CustomSearchableSelect from "@/components/ui/custom-searchable-select";
import { LEGAL_ENTITIES } from "../constants";

interface LegalEntitySectionProps {
  account: FinancialAccountInfo;
  legalEntities: string[];
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectionChange: (field: keyof FinancialAccountInfo, value: string) => void;
}

const LegalEntitySection = ({
  account,
  legalEntities = [],
  onInputChange,
  onSelectionChange
}: LegalEntitySectionProps) => {
  // Get all institutions from the mapping object
  const institutions = Object.keys(LEGAL_ENTITIES).sort();

  const handleInstitutionChange = (value: string) => {
    onSelectionChange('institution', value);
  };

  const handleLegalEntityChange = (value: string) => {
    onSelectionChange('legalEntity', value);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="legalEntityIdentifier">
          Legal Entity Identifier (LEI)<span className="text-red-500 ml-1">*</span>
        </Label>
        <Input
          id="legalEntityIdentifier"
          name="legalEntityIdentifier"
          value={account.legalEntityIdentifier || ""}
          onChange={onInputChange}
          placeholder="e.g., 7H6GLXDRUGQFU57RNE97"
          className="h-11"
        />
        <p className="text-xs text-gray-500">
          Enter an LEI to automatically select the institution and legal entity
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomSearchableSelect
          id="institution"
          label="Institution"
          value={account.institution || ""}
          onChange={handleInstitutionChange}
          placeholder="Select institution"
          options={institutions}
          allowCustomValue={true}
          required={true}
        />
        
        <CustomSearchableSelect
          id="legalEntity"
          label="Legal Entity"
          value={account.legalEntity || ""}
          onChange={handleLegalEntityChange}
          placeholder="Select legal entity"
          options={legalEntities}
          allowCustomValue={true}
          required={true}
        />
      </div>
    </div>
  );
};

export default LegalEntitySection;
