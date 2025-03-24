
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { BeneficialOwnerInfo } from "@/context/OnboardingContext";
import { 
  SelectField, 
  InputField, 
  DateField, 
  FileField 
} from "@/components/onboarding/common/fields";
import { FormItem } from "@/components/ui/form";

// Define the schema type for Zod validation
export type OwnerFormValues = {
  firstName: string;
  lastName: string;
  relationship: string;
  ownershipPercentage: string;
  nationality: string;
  dateOfBirth?: string;
  documents?: File[];
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormItem>
          <InputField
            id="firstName"
            label="First Name"
            name="firstName"
            value={watch("firstName") || ""}
            required
            error={errors.firstName?.message}
            onChange={(e) => setValue("firstName", e.target.value, { shouldValidate: true })}
          />
        </FormItem>

        <FormItem>
          <InputField
            id="lastName"
            label="Last Name"
            name="lastName"
            value={watch("lastName") || ""}
            required
            error={errors.lastName?.message}
            onChange={(e) => setValue("lastName", e.target.value, { shouldValidate: true })}
          />
        </FormItem>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormItem>
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
        </FormItem>

        <FormItem>
          <InputField
            id="ownershipPercentage"
            label="Ownership Percentage"
            name="ownershipPercentage"
            value={watch("ownershipPercentage") || ""}
            required
            error={errors.ownershipPercentage?.message}
            onChange={(e) => setValue("ownershipPercentage", e.target.value, { shouldValidate: true })}
          />
        </FormItem>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormItem>
          <InputField
            id="nationality"
            label="Nationality"
            name="nationality"
            value={watch("nationality") || ""}
            required
            error={errors.nationality?.message}
            onChange={(e) => setValue("nationality", e.target.value, { shouldValidate: true })}
          />
        </FormItem>

        <FormItem>
          <DateField
            label="Date of Birth"
            value={watch("dateOfBirth") ? new Date(watch("dateOfBirth")) : undefined}
            onChange={handleDateChange}
            placeholder="Select date of birth"
          />
        </FormItem>
      </div>

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
