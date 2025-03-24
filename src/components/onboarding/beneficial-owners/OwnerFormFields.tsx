
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { BeneficialOwnerInfo } from "@/context/OnboardingContext";
import { 
  InputField, 
  SearchableSelectField,
  DateField,
  FileField 
} from "@/components/onboarding/common";
import { COUNTRIES } from "@/components/onboarding/constants";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";

interface OwnerFormFieldsProps {
  form: UseFormReturn<BeneficialOwnerInfo>;
}

const OwnerFormFields: React.FC<OwnerFormFieldsProps> = ({ form }) => {
  const { control, formState } = form;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name<span className="text-red-500 ml-1">*</span></FormLabel>
              <FormControl>
                <input
                  className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  placeholder="John"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name<span className="text-red-500 ml-1">*</span></FormLabel>
              <FormControl>
                <input
                  className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  placeholder="Smith"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="relationship"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Relationship<span className="text-red-500 ml-1">*</span></FormLabel>
              <FormControl>
                <input
                  className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  placeholder="e.g., Director, Shareholder"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="ownershipPercentage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ownership Percentage<span className="text-red-500 ml-1">*</span></FormLabel>
              <FormControl>
                <input
                  className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  placeholder="e.g., 51"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="nationality"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nationality<span className="text-red-500 ml-1">*</span></FormLabel>
              <FormControl>
                <SearchableSelectField
                  id="nationality"
                  label=""
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select nationality"
                  options={COUNTRIES}
                  required={false}
                  className="mt-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <DateField
                  value={field.value ? new Date(field.value) : undefined}
                  onChange={(date) => field.onChange(date ? date.toISOString() : "")}
                  label=""
                  placeholder="Select date of birth"
                  className="mt-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <FormField
        control={control}
        name="documents"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Identification Documents</FormLabel>
            <FormControl>
              <FileField
                id="ownerDocuments"
                label=""
                files={field.value || []}
                onFilesSelected={(files) => field.onChange(files)}
                accept="application/pdf,image/*"
                multiple={true}
                maxSize={5}
                className="mt-0"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default OwnerFormFields;
