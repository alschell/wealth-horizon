
import { useToast } from "@/components/ui/use-toast";
import { BeneficialOwnerInfo } from "@/types/onboarding";
import { useFormState } from "./form/useFormState";
import { useFormValidation } from "./form/useFormValidation";
import { useFormHandlers } from "./form/useFormHandlers";

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
  
  // Use the form state hook
  const {
    formData,
    setFormData,
    ownerToDelete,
    setOwnerToDelete,
    editIndex,
    setEditIndex,
    resetForm
  } = useFormState();
  
  // Use the form validation hook
  const { isFormValid } = useFormValidation(formData);
  
  // Use the form handlers hook
  const {
    handleInputChange,
    handleSelectionChange,
    handleDateChange,
    handleFilesSelected,
    handleAddOwner,
    handleEditOwner,
    handleCancelEdit
  } = useFormHandlers({
    formData,
    setFormData,
    owners,
    onAddOwner,
    editIndex,
    setEditIndex,
    resetForm,
    isFormValid
  });
  
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
