
import React from "react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import OwnerFormFields from "./OwnerFormFields";
import { BeneficialOwnerInfo } from "@/types/onboarding";

interface AddOwnerFormProps {
  formData: BeneficialOwnerInfo;
  isEditing: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectionChange: (field: string, value: string) => void;
  onDateChange: (date?: Date) => void;
  onFilesSelected: (files: File[]) => void;
  onCancelEdit: () => void;
}

const AddOwnerForm: React.FC<AddOwnerFormProps> = ({
  formData,
  isEditing,
  onInputChange,
  onSelectionChange,
  onDateChange,
  onFilesSelected
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6 md:p-8 shadow-sm">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-2">
              {isEditing ? "Edit Beneficial Owner" : "Add Beneficial Owner"}
            </h2>
            <p className="text-gray-500">
              {isEditing
                ? "Update the information for this beneficial owner."
                : "Add details for each beneficial owner with 25% or more ownership."}
            </p>
          </div>

          <OwnerFormFields
            firstName={formData.firstName}
            lastName={formData.lastName}
            relationship={formData.relationship}
            ownershipPercentage={formData.ownershipPercentage}
            nationality={formData.nationality}
            dateOfBirth={formData.dateOfBirth}
            documentFiles={formData.documents}
            errors={{}} // We'll handle errors directly in the main form now
            onInputChange={onInputChange}
            onSelectionChange={onSelectionChange}
            onDateChange={onDateChange}
            onFilesSelected={onFilesSelected}
          />
        </div>
      </Card>
    </motion.div>
  );
};

export default AddOwnerForm;
