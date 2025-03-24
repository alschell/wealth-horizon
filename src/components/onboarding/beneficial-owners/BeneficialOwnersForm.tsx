
import React, { useState } from "react";
import { BeneficialOwnerInfo } from "@/context/OnboardingContext";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { UserCircle, Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import FormHeader from "./FormHeader";
import OwnersList from "./OwnersList";
import AddOwnerForm from "./AddOwnerForm";
import FormFooter from "./FormFooter";

interface BeneficialOwnersFormProps {
  owners: BeneficialOwnerInfo[];
  onAddOwner: (owner: BeneficialOwnerInfo) => void;
  onRemoveOwner: (index: number) => void;
  onSubmit: () => void;
  onBack: () => void;
}

const BeneficialOwnersForm = ({
  owners,
  onAddOwner,
  onRemoveOwner,
  onSubmit,
  onBack,
}: BeneficialOwnersFormProps) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [removeIndex, setRemoveIndex] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const isEditing = editingIndex !== null;

  const handleAddOwner = (newOwner: BeneficialOwnerInfo) => {
    if (isEditing && editingIndex !== null) {
      // Replace the existing owner
      const updatedOwners = [...owners];
      updatedOwners[editingIndex] = newOwner;
      
      // Call the onRemoveOwner to remove the old one
      onRemoveOwner(editingIndex);
      
      // Add the updated owner
      onAddOwner(newOwner);
    } else {
      // Add a new owner
      onAddOwner(newOwner);
    }
    
    // Reset state
    setShowAddForm(false);
    setEditingIndex(null);
  };

  const handleEditClick = (index: number) => {
    setEditingIndex(index);
    setShowAddForm(true);
  };

  const handleRemoveClick = (index: number) => {
    setRemoveIndex(index);
    setIsDeleteDialogOpen(true);
  };

  const confirmRemove = () => {
    if (removeIndex !== null) {
      onRemoveOwner(removeIndex);
      setRemoveIndex(null);
    }
    setIsDeleteDialogOpen(false);
  };

  const cancelAddOrEdit = () => {
    setShowAddForm(false);
    setEditingIndex(null);
  };

  return (
    <div className="space-y-8">
      <FormHeader
        title="Beneficial Owners"
        description="Identify individuals who own or control a significant portion of your organization."
        icon={<UserCircle className="h-10 w-10" />}
      />

      {!showAddForm ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {owners.length > 0 && (
            <OwnersList
              owners={owners}
              onEditOwner={handleEditClick}
              onRemoveOwner={handleRemoveClick}
            />
          )}

          <div className="mt-8">
            <Button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Beneficial Owner
            </Button>
          </div>

          <FormFooter
            onBack={onBack}
            onSubmit={onSubmit}
            submitDisabled={owners.length === 0}
            submitText="Continue to Review"
          />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <AddOwnerForm
            onAddOwner={handleAddOwner}
            onCancel={cancelAddOrEdit}
            existingOwner={editingIndex !== null ? owners[editingIndex] : undefined}
            isEdit={isEditing}
          />
        </motion.div>
      )}

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Removal</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this beneficial owner? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmRemove} className="bg-red-500 hover:bg-red-600">
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BeneficialOwnersForm;
