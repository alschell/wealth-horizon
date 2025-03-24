
import React from "react";
import { FamilyOfficeInfo } from "@/context/OnboardingContext";
import FormFieldItem from "../FormFieldItem";

interface BasicInfoSectionProps {
  formData: FamilyOfficeInfo;
  onChange: (name: string, value: string) => void;
  errors: Partial<Record<keyof FamilyOfficeInfo, string>>;
}

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
  formData,
  onChange,
  errors
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Entity Details</h3>
      
      <FormFieldItem
        index={0}
        label="Family Office Name"
        name="officeName"
        value={formData.officeName}
        onChange={onChange}
        placeholder="Smith Family Office LLC"
        required={true}
        className={errors.officeName ? 'error' : ''}
      />
    </div>
  );
};

export default BasicInfoSection;
