
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import OwnerFormFields from "./OwnerFormFields";
import FormFooter from "./FormFooter";
import { BeneficialOwnerInfo } from "@/types/onboarding";
import { toast } from "@/components/ui/use-toast";

interface AddOwnerFormProps {
  onAddOwner: (owner: BeneficialOwnerInfo) => void;
  onBack: () => void;
  initialData?: BeneficialOwnerInfo;
  isEditing?: boolean;
}

const AddOwnerForm: React.FC<AddOwnerFormProps> = ({
  onAddOwner,
  onBack,
  initialData,
  isEditing = false,
}) => {
  const [ownerData, setOwnerData] = useState<BeneficialOwnerInfo>(
    initialData || {
      id: crypto.randomUUID(),
      firstName: "",
      lastName: "",
      relationship: "",
      ownershipPercentage: "",
      nationality: "",
      dateOfBirth: "",
      documents: [],
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const requiredFields = [
      "firstName",
      "lastName",
      "relationship",
      "ownershipPercentage",
      "nationality",
      "dateOfBirth",
    ];

    requiredFields.forEach((field) => {
      if (!ownerData[field as keyof BeneficialOwnerInfo]) {
        newErrors[field] = "This field is required";
      }
    });

    // Validate ownership percentage is a number between 0 and 100
    if (ownerData.ownershipPercentage) {
      const percentage = parseFloat(ownerData.ownershipPercentage);
      if (isNaN(percentage) || percentage < 0 || percentage > 100) {
        newErrors.ownershipPercentage = "Must be a number between 0 and 100";
      }
    }

    // Validate documents
    if (!ownerData.documents || ownerData.documents.length === 0) {
      newErrors.documents = "Please upload at least one document";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onAddOwner(ownerData);
      toast({
        title: isEditing ? "Owner Updated" : "Owner Added",
        description: `${ownerData.firstName} ${ownerData.lastName} has been ${
          isEditing ? "updated" : "added"
        } successfully.`,
      });
    } else {
      toast({
        title: "Form validation failed",
        description: "Please check the highlighted fields.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOwnerData({ ...ownerData, [name]: value });
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSelectionChange = (field: string, value: string) => {
    setOwnerData({ ...ownerData, [field]: value });
    // Clear error when field is edited
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const handleDateChange = (date?: Date) => {
    if (date) {
      setOwnerData({ ...ownerData, dateOfBirth: date.toISOString() });
      // Clear error when field is edited
      if (errors.dateOfBirth) {
        setErrors({ ...errors, dateOfBirth: "" });
      }
    }
  };

  const handleFilesSelected = (files: File[]) => {
    setOwnerData({ ...ownerData, documents: files });
    // Clear error when field is edited
    if (errors.documents) {
      setErrors({ ...errors, documents: "" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6 md:p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
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
            firstName={ownerData.firstName}
            lastName={ownerData.lastName}
            relationship={ownerData.relationship}
            ownershipPercentage={ownerData.ownershipPercentage}
            nationality={ownerData.nationality}
            dateOfBirth={ownerData.dateOfBirth}
            documentFiles={ownerData.documents}
            errors={errors}
            onInputChange={handleInputChange}
            onSelectionChange={handleSelectionChange}
            onDateChange={handleDateChange}
            onFilesSelected={handleFilesSelected}
          />

          <FormFooter onBack={onBack} />
        </form>
      </Card>
    </motion.div>
  );
};

export default AddOwnerForm;
