import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import OwnerFormFields from "./OwnerFormFields";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { motion } from "framer-motion";

// Define the OwnerFormValues type explicitly
export interface OwnerFormValues {
  firstName: string;
  lastName: string;
  relationship: string;
  ownershipPercentage: string;
  nationality: string;
  dateOfBirth?: string;
  documents?: File[];
}

// Create a schema that matches OwnerFormValues
const ownerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  relationship: z.string().min(1, "Relationship is required"),
  ownershipPercentage: z.string().min(1, "Ownership percentage is required"),
  nationality: z.string().min(1, "Nationality is required"),
  dateOfBirth: z.string().optional(),
  documents: z.array(z.any()).optional()
});

interface AddOwnerFormProps {
  onAddOwner: (owner: OwnerFormValues) => void;
  onCancel?: () => void;
  isVisible?: boolean;
}

const AddOwnerForm = ({ onAddOwner, onCancel, isVisible = true }: AddOwnerFormProps) => {
  // Initialize form with explicit OwnerFormValues type
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch
  } = useForm<OwnerFormValues>({
    resolver: zodResolver(ownerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      relationship: "",
      ownershipPercentage: "",
      nationality: "",
      dateOfBirth: "",
      documents: []
    }
  });

  const onSubmit = (data: OwnerFormValues) => {
    onAddOwner(data);
    reset(); // Reset the form after submission
    onCancel?.();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-75 z-50"
    >
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Add Beneficial Owner</h2>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <OwnerFormFields
            formState={watch()}
            errors={errors}
            register={register}
            setValue={setValue}
          />
          <div className="flex justify-end space-x-2">
            <Button variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Add Owner</Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default AddOwnerForm;
