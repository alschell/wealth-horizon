
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { InputField, SearchableSelectField, DateField, FileField } from "../common/fields";
import { OwnerFormValues, OwnerFormFieldsProps } from "./types";
import { COUNTRIES } from "@/components/onboarding/constants";

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
              error={errors.firstName?.message as string}
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
              error={errors.lastName?.message as string}
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
            error={errors.relationship?.message as string}
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
            error={errors.ownershipPercentage?.message as string}
            className="w-full"
          />
        )}
      />

      <Controller
        name="nationality"
        control={control}
        render={({ field }) => (
          <SearchableSelectField
            id="nationality"
            label="Nationality"
            value={field.value}
            onChange={field.onChange}
            options={COUNTRIES}
            required
            placeholder="Select nationality"
            error={errors.nationality?.message as string}
            allowCustomValue={false}
          />
        )}
      />

      <Controller
        name="dateOfBirth"
        control={control}
        render={({ field }) => (
          <DateField
            id="dateOfBirth"
            label="Date of Birth"
            required
            value={field.value}
            onChange={field.onChange}
            placeholder="Select date of birth"
            error={errors.dateOfBirth?.message as string}
            closeOnSelect={true}
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
          customDeleteButton={true}
        />
      </div>
    </div>
  );
};

export default OwnerFormFields;
