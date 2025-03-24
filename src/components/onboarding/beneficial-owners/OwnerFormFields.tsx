
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { InputField, SelectField } from "@/components/onboarding/common/fields";
import { FileField } from "@/components/onboarding/accounts/fields";
import { FormField, FormItem, FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { FormSection } from "@/components/onboarding/common/layouts";
import { Input } from "@/components/ui/input";
import { COUNTRIES } from "@/components/onboarding/constants";

export interface OwnerFormValues {
  firstName: string;
  lastName: string;
  relationship: string;
  ownershipPercentage: string;
  nationality: string;
  dateOfBirth?: string;
  documents?: File[];
}

interface OwnerFormFieldsProps {
  form: UseFormReturn<OwnerFormValues>;
}

const relationshipOptions = [
  { value: "shareholder", label: "Shareholder" },
  { value: "director", label: "Director" },
  { value: "officer", label: "Officer" },
  { value: "trustee", label: "Trustee" },
  { value: "beneficiary", label: "Beneficiary" },
  { value: "other", label: "Other" }
];

const OwnerFormFields: React.FC<OwnerFormFieldsProps> = ({ form }) => {
  const { control, setValue, watch } = form;
  const documents = watch("documents") || [];

  // Function to handle file selection
  const handleFilesSelected = (files: File[]) => {
    setValue("documents", files, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <FormSection>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="firstName"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>First Name*</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter first name" 
                  {...field} 
                  className={fieldState.error ? "border-red-500" : ""}
                />
              </FormControl>
              {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="lastName"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Last Name*</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter last name" 
                  {...field} 
                  className={fieldState.error ? "border-red-500" : ""}
                />
              </FormControl>
              {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="relationship"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Relationship*</FormLabel>
              <FormControl>
                <SelectField
                  id="relationship"
                  options={relationshipOptions.map(opt => opt.value)}
                  optionLabels={relationshipOptions.map(opt => opt.label)}
                  onChange={(value) => field.onChange(value)}
                  value={field.value}
                  placeholder="Select relationship"
                  error={fieldState.error?.message}
                />
              </FormControl>
              {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="ownershipPercentage"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Ownership Percentage*</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min="0" 
                  max="100"
                  placeholder="Enter percentage" 
                  {...field} 
                  className={fieldState.error ? "border-red-500" : ""}
                />
              </FormControl>
              {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="nationality"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Nationality*</FormLabel>
              <FormControl>
                <SelectField
                  id="nationality"
                  options={COUNTRIES}
                  optionLabels={COUNTRIES}
                  onChange={(value) => field.onChange(value)}
                  value={field.value}
                  placeholder="Select nationality"
                  error={fieldState.error?.message}
                />
              </FormControl>
              {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
            </FormItem>
          )}
        />

        <div>
          <FileField
            label="Supporting Documents"
            files={documents}
            onFilesSelected={handleFilesSelected}
            optional={true}
          />
        </div>
      </div>
    </FormSection>
  );
};

export default OwnerFormFields;
