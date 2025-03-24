
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { InputField, SelectField, DateField, FileField } from "../common/fields";
import { OwnerFormValues } from "./types";
import { COUNTRIES } from "@/components/onboarding/constants";
import { Calendar } from "lucide-react";

interface OwnerFormFieldsProps {
  control: Control<OwnerFormValues>;
  errors: FieldErrors<OwnerFormValues>;
  onFilesSelected: (files: File[]) => void;
}

const OwnerFormFields: React.FC<OwnerFormFieldsProps> = ({ 
  control, 
  errors,
  onFilesSelected
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <InputField
              id="firstName"
              name="firstName"
              label="First Name"
              required
              value={field.value}
              onChange={field.onChange}
              error={errors.firstName?.message}
            />
          )}
        />
        
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <InputField
              id="lastName"
              name="lastName"
              label="Last Name"
              required
              value={field.value}
              onChange={field.onChange}
              error={errors.lastName?.message}
            />
          )}
        />
      </div>

      <Controller
        name="relationship"
        control={control}
        render={({ field }) => (
          <InputField
            id="relationship"
            name="relationship"
            label="Relationship to Family Office"
            required
            value={field.value}
            onChange={field.onChange}
            placeholder="e.g., Shareholder, Director, Trustee"
            error={errors.relationship?.message}
          />
        )}
      />

      <Controller
        name="ownershipPercentage"
        control={control}
        render={({ field }) => (
          <InputField
            id="ownershipPercentage"
            name="ownershipPercentage"
            label="Ownership Percentage"
            required
            value={field.value}
            onChange={field.onChange}
            placeholder="e.g., 25.5"
            type="number"
            error={errors.ownershipPercentage?.message}
            className="w-full"
          />
        )}
      />

      <Controller
        name="nationality"
        control={control}
        render={({ field }) => (
          <SelectField
            id="nationality"
            name="nationality"
            label="Nationality"
            value={field.value}
            onChange={field.onChange}
            options={COUNTRIES}
            required
            placeholder="Select nationality"
            error={errors.nationality?.message}
          />
        )}
      />

      <Controller
        name="dateOfBirth"
        control={control}
        render={({ field }) => (
          <DateField
            id="dateOfBirth"
            name="dateOfBirth"
            label="Date of Birth"
            required
            value={field.value}
            onChange={field.onChange}
            icon={<Calendar className="h-4 w-4 text-gray-500" />}
            error={errors.dateOfBirth?.message}
          />
        )}
      />

      <div className="mt-6">
        <FileField
          id="ownerDocuments"
          label="Identity Documents"
          accept="application/pdf,image/*"
          onFilesChange={onFilesSelected}
          multiple={true}
          hint="Upload passport, ID card, or other identity documents"
        />
      </div>
    </div>
  );
};

export default OwnerFormFields;
