
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { nanoid } from "nanoid";
import OwnerFormFields from "./OwnerFormFields";
import { BeneficialOwnerInfo, OwnerFormValues, ownerSchema, AddOwnerFormProps } from "./types";

const AddOwnerForm: React.FC<AddOwnerFormProps> = ({
  onAddOwner,
  onCancel,
  existingOwner,
  isEditing = false
}) => {
  const [files, setFiles] = useState<File[]>(existingOwner?.documents || []);
  
  const defaultValues: OwnerFormValues = {
    firstName: existingOwner?.firstName || "",
    lastName: existingOwner?.lastName || "",
    relationship: existingOwner?.relationship || "",
    ownershipPercentage: existingOwner?.ownershipPercentage || "",
    nationality: existingOwner?.nationality || "",
    dateOfBirth: existingOwner?.dateOfBirth || "",
    documents: existingOwner?.documents || []
  };
  
  const { 
    control, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<OwnerFormValues>({
    resolver: zodResolver(ownerSchema),
    defaultValues
  });

  const onFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
  };

  const onSubmit = (data: OwnerFormValues) => {
    const owner: BeneficialOwnerInfo = {
      id: existingOwner?.id || nanoid(),
      ...data,
      documents: files
    };
    
    onAddOwner(owner);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-black">
          {isEditing ? "Edit Beneficial Owner" : "Add Beneficial Owner"}
        </h3>
        
        <Button
          variant="ghost"
          onClick={onCancel}
          className="text-gray-600 hover:text-black"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to List
        </Button>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <OwnerFormFields 
          control={control} 
          errors={errors} 
          onFilesSelected={onFilesSelected}
        />
        
        <div className="mt-8 flex justify-end space-x-4">
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
            {isEditing ? "Update Owner" : "Add Owner"}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddOwnerForm;
