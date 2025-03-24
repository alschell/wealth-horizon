
import React, { useEffect, useState } from "react";
import { FinancialAccountInfo } from "@/types/onboarding";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import CustomSearchableSelect from "@/components/ui/custom-searchable-select";
import { LEI_MAPPING } from "../../constants/leiMappings";

interface LegalEntitySectionProps {
  account: FinancialAccountInfo;
  legalEntities: Record<string, string[]>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectionChange: (field: keyof FinancialAccountInfo, value: string) => void;
}

const LegalEntitySection = ({
  account,
  legalEntities,
  onInputChange,
  onSelectionChange
}: LegalEntitySectionProps) => {
  const [filteredLegalEntities, setFilteredLegalEntities] = useState<string[]>([]);

  useEffect(() => {
    // Get the legal entities for the selected institution
    if (account.institution && legalEntities && legalEntities[account.institution]) {
      setFilteredLegalEntities(legalEntities[account.institution]);
    } else {
      setFilteredLegalEntities([]);
    }
  }, [account.institution, legalEntities]);

  // Function to handle legal entity selection
  const handleLegalEntityChange = (value: string) => {
    onSelectionChange('legalEntity', value);
    
    // If we have an LEI mapping for this entity, auto-fill it
    if (value && LEI_MAPPING[value]) {
      onSelectionChange('legalEntityIdentifier', LEI_MAPPING[value]);
    } else {
      onSelectionChange('legalEntityIdentifier', '');
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="legalEntityIdentifier" className="flex items-center">
          Legal Entity Identifier (LEI)
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <Input
          id="legalEntityIdentifier"
          name="legalEntityIdentifier"
          value={account.legalEntityIdentifier || ""}
          onChange={onInputChange}
          placeholder="Auto-filled if available, or enter manually"
          className="h-11"
          readOnly={!!LEI_MAPPING[account.legalEntity || '']}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="institution" className="flex items-center">
            Institution
            <span className="text-red-500 ml-1">*</span>
          </Label>
          <CustomSearchableSelect
            id="institution"
            label=""
            value={account.institution || ""}
            onChange={(value) => onSelectionChange('institution', value)}
            placeholder="Select or enter institution"
            options={Object.keys(legalEntities)}
            className="h-11"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="legalEntity" className="flex items-center">
            Legal Entity
            <span className="text-red-500 ml-1">*</span>
          </Label>
          <CustomSearchableSelect
            id="legalEntity"
            label=""
            value={account.legalEntity || ""}
            onChange={handleLegalEntityChange}
            placeholder="Select legal entity"
            options={filteredLegalEntities}
            className="h-11"
          />
        </div>
      </div>
    </div>
  );
};

export default LegalEntitySection;
