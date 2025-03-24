import React from "react";
import { useFormContext } from "react-hook-form";
import { InputField, SelectField, FileUploadField } from "../fields";
import { COUNTRIES } from "@/utils/constants";
import { OwnerFormValues } from "./AddOwnerForm";

interface OwnerFormFieldsProps {
  formState: OwnerFormValues;
  setValue: any;
}

const OwnerFormFields = ({ formState, setValue }: OwnerFormFieldsProps) => {
  const {
    formState: { errors }
  } = useFormContext();

  const relationships = [
    "Director",
    "Shareholder",
    "Trustee",
    "Beneficiary",
    "Partner",
    "Ultimate Beneficial Owner",
    "Other"
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <InputField
          id="firstName"
          label="First Name"
          placeholder="Enter first name"
          onChange={(e) => setValue("firstName", e.target.value)}
          value={formState.firstName || ""}
          error={errors.firstName?.message || ""}
          required
        />
      </div>

      <div className="space-y-2">
        <InputField
          id="lastName"
          label="Last Name"
          placeholder="Enter last name"
          onChange={(e) => setValue("lastName", e.target.value)}
          value={formState.lastName || ""}
          error={errors.lastName?.message || ""}
          required
        />
      </div>

      <div className="space-y-2">
        <SelectField
          id="relationship"
          label="Relationship"
          options={relationships}
          onChange={(value) => setValue("relationship", value)}
          value={formState.relationship || ""}
          placeholder="Select relationship"
          error={errors.relationship?.message || ""}
          required
        />
      </div>

      <div className="space-y-2">
        <InputField
          id="ownershipPercentage"
          label="Ownership Percentage"
          placeholder="Enter ownership percentage"
          onChange={(e) => setValue("ownershipPercentage", e.target.value)}
          value={formState.ownershipPercentage || ""}
          error={errors.ownershipPercentage?.message || ""}
          required
        />
      </div>

      <div className="space-y-2">
        <SelectField
          id="nationality"
          label="Nationality"
          options={COUNTRIES}
          onChange={(value) => setValue("nationality", value)}
          value={formState.nationality || ""}
          placeholder="Select nationality"
          error={errors.nationality?.message || ""}
          required
        />
      </div>

      <div className="space-y-2">
        <InputField
          id="dateOfBirth"
          label="Date of Birth"
          placeholder="Enter date of birth"
          onChange={(e) => setValue("dateOfBirth", e.target.value)}
          value={formState.dateOfBirth || ""}
          error={errors.dateOfBirth?.message || ""}
        />
      </div>

      <div className="space-y-2">
        <FileUploadField
          id="documents"
          label="Documents"
          onChange={(files) => setValue("documents", files)}
          files={formState.documents}
          error={errors.documents?.message || ""}
        />
      </div>
    </div>
  );
};

export default OwnerFormFields;
