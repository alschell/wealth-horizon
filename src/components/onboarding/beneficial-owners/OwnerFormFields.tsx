
import React from "react";
import InputField from "@/components/onboarding/common/fields/InputField";
import SelectField from "@/components/onboarding/common/fields/SelectField";
import SearchableSelectField from "@/components/onboarding/common/fields/SearchableSelectField";
import FileField from "@/components/onboarding/common/fields/FileField";
import DateField from "@/components/onboarding/common/fields/DateField";
import { NATIONALITIES } from "@/utils/constants/countries";
import { Label } from "@/components/ui/label";

interface OwnerFormFieldsProps {
  firstName: string;
  lastName: string;
  relationship: string;
  ownershipPercentage: string;
  nationality: string;
  dateOfBirth: string;
  documentFiles: File[];
  errors: Record<string, string>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectionChange: (field: string, value: string) => void;
  onDateChange: (date?: Date) => void;
  onFilesSelected: (files: File[]) => void;
}

const OwnerFormFields: React.FC<OwnerFormFieldsProps> = ({
  firstName,
  lastName,
  relationship,
  ownershipPercentage,
  nationality,
  dateOfBirth,
  documentFiles,
  errors,
  onInputChange,
  onSelectionChange,
  onDateChange,
  onFilesSelected
}) => {
  // Parse date string to Date object for DatePicker
  const dateValue = dateOfBirth ? new Date(dateOfBirth) : undefined;

  // Owner relationship options
  const relationshipOptions = [
    "Shareholder",
    "Partner",
    "Trustee",
    "Beneficiary",
    "Director",
    "Officer",
    "Member",
    "Other"
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
        {/* Personal Information */}
        <InputField
          id="firstName"
          label="First Name"
          name="firstName"
          value={firstName}
          placeholder="John"
          required={true}
          error={errors.firstName}
          onChange={onInputChange}
        />

        <InputField
          id="lastName"
          label="Last Name"
          name="lastName"
          value={lastName}
          placeholder="Doe"
          required={true}
          error={errors.lastName}
          onChange={onInputChange}
        />

        <SelectField
          id="relationship"
          label="Relationship to Entity"
          value={relationship}
          placeholder="Select relationship"
          options={relationshipOptions}
          required={true}
          error={errors.relationship}
          onChange={(value) => onSelectionChange("relationship", value)}
        />

        <InputField
          id="ownershipPercentage"
          label="Ownership Percentage"
          name="ownershipPercentage"
          value={ownershipPercentage}
          placeholder="25"
          required={true}
          error={errors.ownershipPercentage}
          onChange={onInputChange}
          type="number"
        />

        <SearchableSelectField
          id="nationality"
          label="Nationality"
          value={nationality}
          placeholder="Select nationality"
          options={NATIONALITIES}
          required={true}
          error={errors.nationality}
          onChange={(value) => onSelectionChange("nationality", value)}
          allowCustomValue={false}
        />

        <DateField
          id="dateOfBirth"
          label="Date of Birth"
          value={dateOfBirth}
          onChange={(date) => {
            if (date) {
              onDateChange(new Date(date));
            }
          }}
          required={true}
          error={errors.dateOfBirth}
        />
      </div>

      {/* Document Upload */}
      <div className="mt-6">
        <FileField
          id="documents"
          label="Identification Documents"
          files={documentFiles}
          onFilesChange={onFilesSelected}
          required={true}
          error={errors.documents}
          multiple={true}
          accept="application/pdf,image/*"
          hint="Upload passport, ID card, or driver's license"
        />
        {documentFiles.length === 0 && !errors.documents && (
          <p className="text-sm text-gray-500 mt-1">
            Please upload government-issued identification documents.
          </p>
        )}
      </div>
    </div>
  );
};

export default OwnerFormFields;
