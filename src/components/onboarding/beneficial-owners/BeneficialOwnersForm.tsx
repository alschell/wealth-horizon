
import React from "react";
import { BeneficialOwnerInfo } from "@/types/onboarding";
import { useBeneficialOwnerForm } from "./hooks/useBeneficialOwnerForm";
import {
  BeneficialOwnerFormSection,
  DeleteOwnerDialog,
  FormIntro,
  FormNavigation,
  OwnersListSection
} from "./components";

interface BeneficialOwnersFormProps {
  owners: BeneficialOwnerInfo[];
  onAddOwner: (owner: BeneficialOwnerInfo) => void;
  onRemoveOwner: (index: number) => void;
  onSubmit: () => void;
  onBack: () => void;
}

const BeneficialOwnersForm: React.FC<BeneficialOwnersFormProps> = ({
  owners,
  onAddOwner,
  onRemoveOwner,
  onSubmit,
  onBack
}) => {
  const {
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
  } = useBeneficialOwnerForm({
    owners,
    onAddOwner,
    onRemoveOwner
  });

  return (
    <div className="max-w-3xl mx-auto">
      {/* Form intro section */}
      <FormIntro />
      
      {/* Form for adding/editing owners */}
      <BeneficialOwnerFormSection
        formData={formData}
        isEditing={editIndex !== null}
        isFormValid={isFormValid}
        onInputChange={handleInputChange}
        onSelectionChange={handleSelectionChange}
        onDateChange={handleDateChange}
        onFilesSelected={handleFilesSelected}
        onCancelEdit={handleCancelEdit}
        onAddOwner={handleAddOwner}
      />
      
      {/* Display existing owners */}
      <OwnersListSection
        owners={owners}
        onEditOwner={handleEditOwner}
        onRemoveOwner={(index) => setOwnerToDelete(index)}
      />
      
      {/* Form navigation */}
      <FormNavigation
        hasOwners={owners.length > 0}
        onBack={onBack}
        onSubmit={onSubmit}
      />
      
      {/* Delete confirmation dialog */}
      <DeleteOwnerDialog
        isOpen={ownerToDelete !== null}
        onClose={() => setOwnerToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default BeneficialOwnersForm;
