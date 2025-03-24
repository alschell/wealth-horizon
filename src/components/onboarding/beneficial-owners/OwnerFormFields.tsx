
import React from "react";
import { BeneficialOwnerInfo } from "@/context/OnboardingContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import FileUploader from "@/components/FileUploader";
import CustomSearchableSelect from "@/components/ui/custom-searchable-select";
import { COUNTRIES } from "../constants";

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
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">
            First Name<span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="firstName"
            name="firstName"
            value={owner.firstName}
            onChange={onInputChange}
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
            onChange={onInputChange}
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
            onChange={onInputChange}
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
            onChange={onInputChange}
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
          onChange={(value) => onSelectChange('nationality', value)}
          placeholder="Select nationality"
          options={COUNTRIES}
          required
          className={errors.nationality ? 'error' : ''}
        />

        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <DatePicker
            placeholder="Select date of birth"
            value={dateOfBirthValue}
            onChange={onDateChange}
            className="w-full"
          />
        </div>
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
    </>
  );
};

export default OwnerFormFields;
