
import React from "react";
import { FinancialAccountInfo } from "@/types/onboarding";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import CustomSearchableSelect from "@/components/ui/custom-searchable-select";
import { LEGAL_ENTITIES } from "../constants/legalEntityData";

interface LegalEntitySectionProps {
  account: FinancialAccountInfo;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectionChange: (field: keyof FinancialAccountInfo, value: string) => void;
}

const LegalEntitySection = ({
  account,
  onInputChange,
  onSelectionChange
}: LegalEntitySectionProps) => {
  // Get legal entities for the selected institution
  const getLegalEntities = () => {
    if (account.institution && LEGAL_ENTITIES[account.institution]) {
      return LEGAL_ENTITIES[account.institution];
    }
    return [];
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
          onChange={(value) => onSelectionChange('institution', value)}
          placeholder="Select institution"
          options={Object.keys(LEGAL_ENTITIES)}
          allowCustomValue={true}
          required={true}
        />
        
        <CustomSearchableSelect
          id="legalEntity"
          label="Legal Entity"
          value={account.legalEntity || ""}
          onChange={(value) => onSelectionChange('legalEntity', value)}
          placeholder="Select legal entity"
          options={getLegalEntities()}
          allowCustomValue={true}
          required={true}
        />
      </div>
    </div>
  );
};

export default LegalEntitySection;
