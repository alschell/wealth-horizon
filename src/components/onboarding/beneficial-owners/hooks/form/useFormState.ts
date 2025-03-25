
import { useState } from "react";
import { BeneficialOwnerInfo } from "@/types/onboarding";

export const useFormState = () => {
  const [ownerToDelete, setOwnerToDelete] = useState<number | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<BeneficialOwnerInfo>({
    id: crypto.randomUUID(),
    firstName: "",
    lastName: "",
    relationship: "",
    ownershipPercentage: "",
    nationality: "",
    dateOfBirth: "",
    documents: [],
  });
  
  // Function to reset the form
  const resetForm = () => {
    setFormData({
      id: crypto.randomUUID(),
      firstName: "",
      lastName: "",
      relationship: "",
      ownershipPercentage: "",
      nationality: "",
      dateOfBirth: "",
      documents: [],
    });
  };

  return {
    formData,
    setFormData,
    ownerToDelete,
    setOwnerToDelete,
    editIndex,
    setEditIndex,
    resetForm
  };
};
