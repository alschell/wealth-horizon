
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BeneficialOwnerInfo } from "@/context/OnboardingContext";
import { FormHeader, FormSection, isValidPercentage } from "@/components/onboarding/common";
import { UserPlus, Edit } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import BeneficialOwnerFormFields from "./OwnerFormFields";
import { Form } from "@/components/ui/form";

interface AddOwnerFormProps {
  onAddOwner: (owner: BeneficialOwnerInfo) => void;
  onCancel: () => void;
  existingOwner?: BeneficialOwnerInfo;
  isEdit?: boolean;
}

// Define the validation schema using zod
const ownerSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  relationship: z.string().min(1, { message: "Relationship is required" }),
  ownershipPercentage: z.string()
    .min(1, { message: "Ownership percentage is required" })
    .refine((val) => isValidPercentage(val), {
      message: "Please enter a valid percentage (0-100)"
    }),
  nationality: z.string().min(1, { message: "Nationality is required" }),
  dateOfBirth: z.string().optional(),
  documents: z.any().optional()
});

// Make TypeScript happy by properly typing the schema output
type OwnerFormValues = z.infer<typeof ownerSchema>;

const AddOwnerForm: React.FC<AddOwnerFormProps> = ({
  onAddOwner,
  onCancel,
  existingOwner,
  isEdit = false
}) => {
  const defaultValues: Partial<OwnerFormValues> = existingOwner || {
    firstName: "",
    lastName: "",
    relationship: "",
    ownershipPercentage: "",
    nationality: "",
    dateOfBirth: "",
    documents: []
  };

  const form = useForm<OwnerFormValues>({
    resolver: zodResolver(ownerSchema),
    defaultValues,
    mode: "onChange"
  });

  const { handleSubmit, formState: { isSubmitting, isDirty } } = form;

  const onSubmit = handleSubmit((data) => {
    // Simulate async operation
    setTimeout(() => {
      onAddOwner(data as BeneficialOwnerInfo);
      toast({
        title: isEdit ? "Owner updated" : "Owner added",
        description: isEdit 
          ? `${data.firstName} ${data.lastName} has been updated.` 
          : `${data.firstName} ${data.lastName} has been added.`,
      });
    }, 500);
  });

  return (
    <div className="bg-white rounded-md p-6 shadow-sm">
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-6">
          <FormHeader
            icon={isEdit ? <Edit className="h-7 w-7" /> : <UserPlus className="h-7 w-7" />}
            title={isEdit ? "Edit Beneficial Owner" : "Add Beneficial Owner"}
            description="Provide details about individuals who own or control your entity."
          />

          <FormSection>
            <BeneficialOwnerFormFields form={form} />
          </FormSection>

          <div className="pt-4 border-t">
            <p className="text-sm text-gray-500 mb-6">
              Fields marked with <span className="text-red-500">*</span> are required.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                disabled={isSubmitting || !isDirty}
              >
                {isSubmitting ? "Saving..." : isEdit ? "Update Owner" : "Add Owner"}
              </button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddOwnerForm;
