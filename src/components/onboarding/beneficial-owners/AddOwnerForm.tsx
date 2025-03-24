
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BeneficialOwnerInfo } from "@/context/OnboardingContext";
import { UserPlus, Edit } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import OwnerFormFields, { OwnerFormValues } from "./OwnerFormFields";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

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
    .refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0 && num <= 100;
    }, {
      message: "Please enter a valid percentage (0-100)"
    }),
  nationality: z.string().min(1, { message: "Nationality is required" }),
  dateOfBirth: z.string().optional(),
  documents: z.array(z.instanceof(File)).optional()
});

const AddOwnerForm: React.FC<AddOwnerFormProps> = ({
  onAddOwner,
  onCancel,
  existingOwner,
  isEdit = false
}) => {
  // Define strongly typed defaultValues
  const defaultValues: OwnerFormValues = existingOwner 
    ? {
        firstName: existingOwner.firstName || "",
        lastName: existingOwner.lastName || "",
        relationship: existingOwner.relationship || "",
        ownershipPercentage: existingOwner.ownershipPercentage?.toString() || "",
        nationality: existingOwner.nationality || "",
        dateOfBirth: existingOwner.dateOfBirth || "",
        documents: existingOwner.documents || []
      }
    : {
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
          <div className="flex items-center gap-3 mb-4">
            {isEdit ? <Edit className="h-7 w-7" /> : <UserPlus className="h-7 w-7" />}
            <div>
              <h2 className="text-xl font-semibold">{isEdit ? "Edit Beneficial Owner" : "Add Beneficial Owner"}</h2>
              <p className="text-gray-500">Provide details about individuals who own or control your entity.</p>
            </div>
          </div>

          <OwnerFormFields form={form} />

          <div className="pt-4 border-t">
            <p className="text-sm text-gray-500 mb-6">
              Fields marked with <span className="text-red-500">*</span> are required.
            </p>
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !isDirty}
              >
                {isSubmitting ? "Saving..." : isEdit ? "Update Owner" : "Add Owner"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddOwnerForm;
