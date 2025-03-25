
import React from "react";
import { motion } from "framer-motion";
import { BeneficialOwnerInfo } from "@/types/onboarding";
import AddOwnerForm from "../AddOwnerForm";
import FormActions from "./FormActions";

interface BeneficialOwnerFormSectionProps {
  formData: BeneficialOwnerInfo;
  isEditing: boolean;
  isFormValid: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectionChange: (field: string, value: string) => void;
  onDateChange: (date?: Date) => void;
  onFilesSelected: (files: File[]) => void;
  onCancelEdit: () => void;
  onAddOwner: () => void;
}

const BeneficialOwnerFormSection: React.FC<BeneficialOwnerFormSectionProps> = ({
  formData,
  isEditing,
  isFormValid,
  onInputChange,
  onSelectionChange,
  onDateChange,
  onFilesSelected,
  onCancelEdit,
  onAddOwner
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <AddOwnerForm
        formData={formData}
        isEditing={isEditing}
        onInputChange={onInputChange}
        onSelectionChange={onSelectionChange}
        onDateChange={onDateChange}
        onFilesSelected={onFilesSelected}
        onCancelEdit={onCancelEdit}
      />
      
      <FormActions
        isEditing={isEditing}
        isFormValid={isFormValid}
        onAddOwner={onAddOwner}
        onCancelEdit={onCancelEdit}
      />
    </motion.div>
  );
};

export default BeneficialOwnerFormSection;
