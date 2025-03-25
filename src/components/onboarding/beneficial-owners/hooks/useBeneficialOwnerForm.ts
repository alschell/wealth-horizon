
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { BeneficialOwnerInfo } from "@/types/onboarding";

interface UseBeneficialOwnerFormProps {
  owners: BeneficialOwnerInfo[];
  onAddOwner: (owner: BeneficialOwnerInfo) => void;
  onRemoveOwner: (index: number) => void;
}

export const useBeneficialOwnerForm = ({
  owners,
  onAddOwner,
  onRemoveOwner,
}: UseBeneficialOwnerFormProps) => {
  const { toast } = useToast();
  
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
  
  // Handle form input/selection changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSelectionChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  
  const handleDateChange = (date?: Date) => {
    if (date) {
      setFormData((prev) => ({ ...prev, dateOfBirth: date.toISOString() }));
    }
  };
  
  const handleFilesSelected = (files: File[]) => {
    setFormData((prev) => ({ ...prev, documents: files }));
  };
  
  // Check if form is valid (all required fields filled and at least one document)
  const isFormValid = Boolean(
    formData.firstName &&
    formData.lastName &&
    formData.relationship &&
    formData.ownershipPercentage &&
    formData.nationality &&
    formData.dateOfBirth &&
    formData.documents.length > 0
  );
  
  // Function to add a new beneficial owner
  const handleAddOwner = () => {
    // Validate form data
    if (!isFormValid) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and upload at least one document.",
        variant: "destructive"
      });
      return;
    }
    
    // Add or update owner
    if (editIndex !== null) {
      // Update existing owner
      const updatedOwnersList = [...owners];
      updatedOwnersList[editIndex] = formData;
      
      // Use the onAddOwner callback to update the owner in the context
      onAddOwner(formData);
      
      toast({
        title: "Owner Updated",
        description: `${formData.firstName} ${formData.lastName} has been updated.`,
      });
      
      // Reset edit index
      setEditIndex(null);
    } else {
      // Add new owner
      onAddOwner(formData);
      
      toast({
        title: "Owner Added",
        description: `${formData.firstName} ${formData.lastName} has been added as a beneficial owner.`,
      });
    }
    
    // Reset form
    resetForm();
  };
  
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
  
  // Function to edit an existing owner
  const handleEditOwner = (index: number) => {
    setEditIndex(index);
    setFormData(owners[index]);
  };
  
  // Function to cancel editing
  const handleCancelEdit = () => {
    setEditIndex(null);
    resetForm();
  };
  
  // Function to confirm deletion of an owner
  const handleConfirmDelete = () => {
    if (ownerToDelete !== null) {
      const deletedOwner = owners[ownerToDelete];
      onRemoveOwner(ownerToDelete);
      
      toast({
        title: "Owner Removed",
        description: `${deletedOwner.firstName} ${deletedOwner.lastName} has been removed from beneficial owners.`,
      });
      
      setOwnerToDelete(null);
    }
  };

  return {
    formData,
    editIndex,
    ownerToDelete,
    isFormValid,
    handleInputChange,
    handleSelectionChange,
    handleDateChange,
    handleFilesSelected,
    handleAddOwner,
    handleEditOwner,
    handleCancelEdit,
    setOwnerToDelete,
    handleConfirmDelete
  };
};
