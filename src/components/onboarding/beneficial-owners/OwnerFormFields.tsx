
import React from "react";
import { BeneficialOwnerInfo } from "@/context/OnboardingContext";
import { 
  InputField, 
  DateField, 
  FileField,
  SearchableSelectField 
} from "@/components/onboarding/common/fields";
import { COUNTRIES } from "@/components/onboarding/constants/countries";

interface OwnerFormFieldsProps {
  owner: BeneficialOwnerInfo;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDateChange: (field: string, date?: Date) => void;
  onFilesChange: (files: File[]) => void;
  onNationalityChange: (value: string) => void;
  errors: Record<string, string>;
}

const OwnerFormFields: React.FC<OwnerFormFieldsProps> = ({
  owner,
  onInputChange,
  onDateChange,
  onFilesChange,
  onNationalityChange,
  errors
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          id="firstName"
          label="First Name"
          name="firstName"
          value={owner.firstName}
          onChange={onInputChange}
          required={true}
          error={errors.firstName}
        />
        
        <InputField
          id="lastName"
          label="Last Name"
          name="lastName"
          value={owner.lastName}
          onChange={onInputChange}
          required={true}
          error={errors.lastName}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          id="relationship"
          label="Relationship to Family Office"
          name="relationship"
          value={owner.relationship}
          onChange={onInputChange}
          required={true}
          error={errors.relationship}
        />
        
        <InputField
          id="ownershipPercentage"
          label="Ownership Percentage"
          name="ownershipPercentage"
          value={owner.ownershipPercentage}
          onChange={onInputChange}
          required={true}
          error={errors.ownershipPercentage}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SearchableSelectField
          id="nationality"
          label="Nationality"
          value={owner.nationality}
          onChange={onNationalityChange}
          options={COUNTRIES.map(country => ({ label: country, value: country }))}
          required={true}
          error={errors.nationality}
          placeholder="Select nationality"
          allowCustomValue={false}
        />
        
        <DateField
          id="dateOfBirth"
          label="Date of Birth"
          value={owner.dateOfBirth ? new Date(owner.dateOfBirth) : undefined}
          onChange={(date) => onDateChange("dateOfBirth", date)}
          required={true}
          error={errors.dateOfBirth}
        />
      </div>
      
      <div className="mt-6">
        <FileField
          id="ownerDocuments"
          label="Identity Documents"
          accept="application/pdf,image/*"
          multiple={true}
          hint="Upload proof of identity (passport, national ID, etc.)"
          files={owner.documents}
          onFilesChange={onFilesChange}
          required={true}
          error={errors.documents}
        />
      </div>
    </div>
  );
};

export default OwnerFormFields;
