
import React from "react";
import { BeneficialOwnerInfo } from "@/context/OnboardingContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CustomSearchableSelect from "@/components/ui/custom-searchable-select";
import { COUNTRIES } from "@/components/onboarding/constants";
import FileUploader from "@/components/FileUploader";
import { DatePicker } from "@/components/ui/date-picker";

interface OwnerFormFieldsProps {
  owner: BeneficialOwnerInfo;
  onChange: (field: keyof BeneficialOwnerInfo, value: any) => void;
  onFilesSelected: (files: File[]) => void;
  errors: Partial<Record<keyof BeneficialOwnerInfo, string>>;
}

const OwnerFormFields: React.FC<OwnerFormFieldsProps> = ({
  owner,
  onChange,
  onFilesSelected,
  errors
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange(name as keyof BeneficialOwnerInfo, value);
  };

  const handleDateChange = (date?: Date) => {
    if (date) {
      onChange('dateOfBirth', date.toISOString());
    }
  };

  const dateOfBirthValue = owner.dateOfBirth ? new Date(owner.dateOfBirth) : undefined;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">
            First Name<span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="firstName"
            name="firstName"
            value={owner.firstName}
            onChange={handleInputChange}
            placeholder="John"
            className={`h-11 ${errors.firstName ? 'border-red-500' : ''}`}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">
            Last Name<span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="lastName"
            name="lastName"
            value={owner.lastName}
            onChange={handleInputChange}
            placeholder="Smith"
            className={`h-11 ${errors.lastName ? 'border-red-500' : ''}`}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="relationship">
            Relationship<span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="relationship"
            name="relationship"
            value={owner.relationship}
            onChange={handleInputChange}
            placeholder="e.g., Director, Shareholder"
            className={`h-11 ${errors.relationship ? 'border-red-500' : ''}`}
          />
          {errors.relationship && (
            <p className="text-red-500 text-sm mt-1">{errors.relationship}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="ownershipPercentage">
            Ownership Percentage<span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="ownershipPercentage"
            name="ownershipPercentage"
            value={owner.ownershipPercentage}
            onChange={handleInputChange}
            placeholder="e.g., 51"
            className={`h-11 ${errors.ownershipPercentage ? 'border-red-500' : ''}`}
          />
          {errors.ownershipPercentage && (
            <p className="text-red-500 text-sm mt-1">{errors.ownershipPercentage}</p>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomSearchableSelect
          id="nationality"
          label="Nationality"
          value={owner.nationality}
          onChange={(value) => onChange('nationality', value)}
          placeholder="Select nationality"
          options={COUNTRIES}
          required
          className={errors.nationality ? 'error' : ''}
        />

        <DatePicker
          label="Date of Birth"
          placeholder="Select date of birth"
          value={dateOfBirthValue}
          onChange={handleDateChange}
          className="w-full"
        />
      </div>
      
      <div className="space-y-3">
        <Label>Identification Documents</Label>
        <FileUploader
          accept="application/pdf,image/*"
          multiple={true}
          maxSize={5}
          onFilesSelected={onFilesSelected}
          existingFiles={owner.documents}
          label="Upload ID Documents"
        />
      </div>
    </div>
  );
};

export default OwnerFormFields;
