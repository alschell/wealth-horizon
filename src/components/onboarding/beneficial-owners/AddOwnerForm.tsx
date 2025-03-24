
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { BeneficialOwnerInfo } from "@/types/onboarding";
import OwnerFormFields from "./OwnerFormFields";
import { OwnerFormValues } from "./types";

// Define the validation schema with Zod
const ownerFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  relationship: z.string().min(1, "Relationship is required"),
  ownershipPercentage: z.string().min(1, "Ownership percentage is required"),
  nationality: z.string().min(1, "Nationality is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  documents: z.array(z.instanceof(File)).default([]),
});

interface AddOwnerFormProps {
  onAddOwner: (owner: BeneficialOwnerInfo) => void;
  onCancel: () => void;
  isEdit?: boolean;
  existingOwner?: BeneficialOwnerInfo;
}

const AddOwnerForm: React.FC<AddOwnerFormProps> = ({
  onAddOwner,
  onCancel,
  isEdit = false,
  existingOwner
}) => {
  // Initialize form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
    watch
  } = useForm<OwnerFormValues>({
    resolver: zodResolver(ownerFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      relationship: "",
      ownershipPercentage: "",
      nationality: "",
      dateOfBirth: "",
      documents: [],
    },
  });

  // Populate form with existing owner data if in edit mode
  useEffect(() => {
    if (isEdit && existingOwner) {
      reset({
        firstName: existingOwner.firstName || "",
        lastName: existingOwner.lastName || "",
        relationship: existingOwner.relationship || "",
        ownershipPercentage: existingOwner.ownershipPercentage || "",
        nationality: existingOwner.nationality || "",
        dateOfBirth: existingOwner.dateOfBirth || "",
        documents: existingOwner.documents || [],
      });
    }
  }, [isEdit, existingOwner, reset]);

  // Handle form submission
  const onSubmit = (data: OwnerFormValues) => {
    const newOwner: BeneficialOwnerInfo = {
      id: existingOwner?.id || Date.now().toString(),
      firstName: data.firstName,
      lastName: data.lastName,
      relationship: data.relationship,
      ownershipPercentage: data.ownershipPercentage,
      nationality: data.nationality,
      dateOfBirth: data.dateOfBirth,
      documents: data.documents,
    };
    
    onAddOwner(newOwner);
    reset();
  };

  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm">
      <h3 className="text-lg font-semibold mb-4">
        {isEdit ? "Edit Beneficial Owner" : "Add Beneficial Owner"}
      </h3>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <OwnerFormFields
          register={register}
          errors={errors}
          setValue={setValue}
          watch={watch}
        />
        
        <div className="flex justify-end space-x-4 pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting}
          >
            {isEdit ? "Update Owner" : "Add Owner"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddOwnerForm;
