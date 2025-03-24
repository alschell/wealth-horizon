
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { BeneficialOwnerInfo } from "@/context/OnboardingContext";
import { SelectField, InputField, DateField, FileField } from "@/components/onboarding/common/fields";
import { Grid } from "@/components/onboarding/common/layouts";

// Define the schema type for Zod validation
type OwnerFormValues = {
  firstName: string;
  lastName: string;
  relationship: string;
  ownershipPercentage: string;
  nationality: string;
  dateOfBirth?: string;
  documents?: any;
};

interface BeneficialOwnerFormFieldsProps {
  form: UseFormReturn<OwnerFormValues>;
}

const BeneficialOwnerFormFields = ({ form }: BeneficialOwnerFormFieldsProps) => {
  const { register, formState: { errors }, setValue, watch } = form;

  // Relationship options
  const relationshipOptions = [
    "Director",
    "Officer",
    "Shareholder",
    "Member",
    "Partner",
    "Trustee",
    "Beneficiary",
    "Manager",
    "Authorized Signatory",
    "Other"
  ];

  // Handle date change
  const handleDateChange = (date?: Date) => {
    setValue("dateOfBirth", date ? date.toISOString().split('T')[0] : "", { shouldValidate: true, shouldDirty: true });
  };

  // Handle file selection
  const handleFilesSelected = (files: File[]) => {
    setValue("documents", files, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <div className="space-y-6">
      <Grid columns={2} gap={4}>
        <InputField
          id="firstName"
          label="First Name"
          required
          error={errors.firstName?.message}
          {...register("firstName")}
        />
        <InputField
          id="lastName"
          label="Last Name"
          required
          error={errors.lastName?.message}
          {...register("lastName")}
        />
      </Grid>

      <Grid columns={2} gap={4}>
        <SelectField
          id="relationship"
          label="Relationship to Entity"
          value={watch("relationship") || ""}
          placeholder="Select relationship"
          options={relationshipOptions}
          required
          error={errors.relationship?.message}
          onChange={(value) => setValue("relationship", value, { shouldValidate: true })}
        />
        <InputField
          id="ownershipPercentage"
          label="Ownership Percentage"
          required
          error={errors.ownershipPercentage?.message}
          {...register("ownershipPercentage")}
        />
      </Grid>

      <Grid columns={2} gap={4}>
        <InputField
          id="nationality"
          label="Nationality"
          required
          error={errors.nationality?.message}
          {...register("nationality")}
        />
        <DateField
          label="Date of Birth"
          value={watch("dateOfBirth") ? new Date(watch("dateOfBirth")) : undefined}
          onChange={handleDateChange}
          placeholder="Select date of birth"
        />
      </Grid>

      <FileField
        id="documents"
        label="Identity Documents"
        accept=".pdf,.jpg,.jpeg,.png"
        multiple={true}
        maxSize={5}
        existingFiles={watch("documents") || []}
        onFilesSelected={handleFilesSelected}
      />
    </div>
  );
};

export default BeneficialOwnerFormFields;
