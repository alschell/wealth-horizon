
import React from "react";
import { FamilyOfficeInfo } from "@/context/OnboardingContext";
import FormFieldItem from "../FormFieldItem";
import { LEGAL_ENTITY_TYPES, JURISDICTIONS } from "@/components/onboarding/constants/formOptions";

interface EntityDetailsSectionProps {
  formData: FamilyOfficeInfo;
  onChange: (name: string, value: string) => void;
  errors: Partial<Record<keyof FamilyOfficeInfo, string>>;
}

const EntityDetailsSection: React.FC<EntityDetailsSectionProps> = ({
  formData,
  onChange,
  errors
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-[#86CEFA]">Entity Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormFieldItem
          index={1}
          label="Legal Entity Type"
          name="legalEntityType"
          value={formData.legalEntityType}
          onChange={onChange}
          type="searchableSelect"
          options={LEGAL_ENTITY_TYPES}
          required={true}
          className={errors.legalEntityType ? 'error' : ''}
        />

        <FormFieldItem
          index={2}
          label="Jurisdiction"
          name="jurisdiction"
          value={formData.jurisdiction}
          onChange={onChange}
          type="searchableSelect"
          options={JURISDICTIONS}
          required={true}
          className={errors.jurisdiction ? 'error' : ''}
          allowCustomValue={true}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormFieldItem
          index={3}
          label="Registration Number"
          name="registrationNumber"
          value={formData.registrationNumber}
          onChange={onChange}
          placeholder="e.g., LLC-12345678"
        />
        
        <FormFieldItem
          index={4}
          label="Tax ID Number"
          name="taxId"
          value={formData.taxId}
          onChange={onChange}
          placeholder="e.g., 12-3456789"
          required={true}
          className={errors.taxId ? 'error' : ''}
        />
      </div>
      
      <FormFieldItem
        index={5}
        label="Year Established"
        name="yearEstablished"
        value={formData.yearEstablished}
        onChange={onChange}
        placeholder="e.g., 2015"
        type="number"
        minValue={1800}
        maxValue={new Date().getFullYear()}
      />
    </div>
  );
};

export default EntityDetailsSection;
