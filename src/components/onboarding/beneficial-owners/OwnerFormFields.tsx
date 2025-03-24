
import React from "react";
import { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { InputField, SelectField, FileField } from "@/components/onboarding/common/fields";
import { COUNTRIES } from "@/utils/constants/countries";
import { OwnerFormValues } from "./types";

interface OwnerFormFieldsProps {
  register: UseFormRegister<OwnerFormValues>;
  errors: FieldErrors<OwnerFormValues>;
  setValue: UseFormSetValue<OwnerFormValues>;
  watch: UseFormWatch<OwnerFormValues>;
}

const OwnerFormFields = ({
  register,
  errors,
  setValue,
  watch
}: OwnerFormFieldsProps) => {
  const formValues = watch();
  
  // Convert country objects to string array for the select field
  const countryOptions = COUNTRIES.map(country => country.name);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          id="firstName"
          label="First Name"
          name="firstName"
          value={formValues.firstName || ""}
          onChange={(e) => setValue("firstName", e.target.value)}
          error={errors.firstName?.message}
          required
        />
        
        <InputField
          id="lastName"
          label="Last Name"
          name="lastName"
          value={formValues.lastName || ""}
          onChange={(e) => setValue("lastName", e.target.value)}
          error={errors.lastName?.message}
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
          value={formValues.relationship || ""}
          onChange={(value) => setValue("relationship", value)}
          error={errors.relationship?.message}
          required
        />
        
        <InputField
          id="ownershipPercentage"
          label="Ownership Percentage"
          type="number"
          name="ownershipPercentage"
          value={formValues.ownershipPercentage || ""}
          onChange={(e) => setValue("ownershipPercentage", e.target.value)}
          error={errors.ownershipPercentage?.message}
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField
          id="nationality"
          label="Nationality"
          placeholder="Select nationality"
          options={countryOptions}
          value={formValues.nationality || ""}
          onChange={(value) => setValue("nationality", value)}
          error={errors.nationality?.message}
          required
        />
        
        <InputField
          id="dateOfBirth"
          label="Date of Birth"
          type="date"
          name="dateOfBirth"
          value={formValues.dateOfBirth || ""}
          onChange={(e) => setValue("dateOfBirth", e.target.value)}
          error={errors.dateOfBirth?.message}
          required
        />
      </div>
      
      <FileField
        id="documents"
        label="Identity Documents"
        accept=".pdf,.jpg,.jpeg,.png"
        onFilesSelected={(files) => {
          setValue("documents", files);
        }}
        multiple
        hint="Upload identification documents (passport, ID card, etc.)"
      />
    </div>
  );
};

export default OwnerFormFields;
