
import React from "react";
import { BeneficialOwnerInfo } from "@/context/OnboardingContext";
import { 
  InputField, 
  SearchableSelectField,
  DateField,
  FileField 
} from "@/components/onboarding/common";
import { COUNTRIES } from "@/components/onboarding/constants";

interface OwnerFormFieldsProps {
  owner: BeneficialOwnerInfo;
  errors: Partial<Record<keyof BeneficialOwnerInfo, string>>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (field: keyof BeneficialOwnerInfo, value: string) => void;
  onDateChange: (date?: Date) => void;
  onFilesSelected: (files: File[]) => void;
}

const OwnerFormFields: React.FC<OwnerFormFieldsProps> = ({
  owner,
  errors,
  onInputChange,
  onSelectChange,
  onDateChange,
  onFilesSelected
}) => {
  const dateOfBirthValue = owner.dateOfBirth ? new Date(owner.dateOfBirth) : undefined;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          id="firstName"
          label="First Name"
          name="firstName"
          value={owner.firstName}
          onChange={onInputChange}
          placeholder="John"
          required
          error={errors.firstName}
        />

        <InputField
          id="lastName"
          label="Last Name"
          name="lastName"
          value={owner.lastName}
          onChange={onInputChange}
          placeholder="Smith"
          required
          error={errors.lastName}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          id="relationship"
          label="Relationship"
          name="relationship"
          value={owner.relationship}
          onChange={onInputChange}
          placeholder="e.g., Director, Shareholder"
          required
          error={errors.relationship}
        />

        <InputField
          id="ownershipPercentage"
          label="Ownership Percentage"
          name="ownershipPercentage"
          value={owner.ownershipPercentage}
          onChange={onInputChange}
          placeholder="e.g., 51"
          required
          error={errors.ownershipPercentage}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SearchableSelectField
          id="nationality"
          label="Nationality"
          value={owner.nationality}
          onChange={(value) => onSelectChange('nationality', value)}
          placeholder="Select nationality"
          options={COUNTRIES}
          required
          error={errors.nationality}
        />

        <DateField
          id="dateOfBirth"
          label="Date of Birth"
          value={dateOfBirthValue}
          onChange={onDateChange}
          placeholder="Select date of birth"
        />
      </div>
      
      <FileField
        id="ownerDocuments"
        label="Identification Documents"
        files={owner.documents}
        onFilesSelected={onFilesSelected}
        accept="application/pdf,image/*"
        multiple={true}
        maxSize={5}
      />
    </div>
  );
};

export default OwnerFormFields;
