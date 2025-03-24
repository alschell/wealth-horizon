
import React from "react";
import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import { SearchableSelectField, InputField, SelectField, FileField } from "@/components/onboarding/common/fields";
import { COUNTRIES } from "@/utils/constants/countries";
import { OwnerFormValues } from "./types";

interface OwnerFormFieldsProps {
  register: UseFormRegister<OwnerFormValues>;
  errors: FieldErrors<OwnerFormValues>;
  setValue: UseFormSetValue<OwnerFormValues>;
  formState: OwnerFormValues;
}

const OwnerFormFields = ({
  register,
  errors,
  setValue,
  formState
}: OwnerFormFieldsProps) => {
  // Convert country objects to string array for the SearchableSelectField
  const countryOptions = COUNTRIES.map(country => country.name);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          id="firstName"
          label="First Name"
          error={errors.firstName?.message}
          {...register("firstName")}
          required
        />
        
        <InputField
          id="lastName"
          label="Last Name"
          error={errors.lastName?.message}
          {...register("lastName")}
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField
          id="relationship"
          label="Relationship"
          placeholder="Select relationship"
          options={[
            "Director",
            "Shareholder",
            "Officer",
            "Trustee", 
            "Founder",
            "Beneficiary",
            "Other"
          ]}
          value={formState.relationship || ""}
          onChange={(value) => setValue("relationship", value)}
          error={errors.relationship?.message}
          required
        />
        
        <InputField
          id="ownershipPercentage"
          label="Ownership Percentage"
          type="number"
          error={errors.ownershipPercentage?.message}
          {...register("ownershipPercentage")}
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SearchableSelectField
          id="nationality"
          label="Nationality"
          placeholder="Select nationality"
          options={countryOptions}
          value={formState.nationality || ""}
          onChange={(value) => setValue("nationality", value)}
          error={errors.nationality?.message}
          required
        />
        
        <InputField
          id="dateOfBirth"
          label="Date of Birth"
          type="date"
          error={errors.dateOfBirth?.message}
          {...register("dateOfBirth")}
          required
        />
      </div>
      
      <FileField
        id="documents"
        label="Identity Documents"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={(files) => {
          setValue("documents", files);
        }}
        multiple
        hint="Upload identification documents (passport, ID card, etc.)"
      />
    </div>
  );
};

export default OwnerFormFields;
