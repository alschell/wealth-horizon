
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useOnboarding } from "@/context/OnboardingContext";
import { BeneficialOwnerInfo } from "@/types/onboarding";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import AddOwnerForm from "./AddOwnerForm";
import OwnersList from "./OwnersList";

const BeneficialOwnersForm = () => {
  const { toast } = useToast();
  const { 
    beneficialOwners, 
    setBeneficialOwners, 
    goToNextStep, 
    goToPreviousStep 
  } = useOnboarding();
  
  const [showForm, setShowForm] = useState(true);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [ownerToDelete, setOwnerToDelete] = useState<number | null>(null);
  
  // Function to add a new beneficial owner
  const handleAddOwner = (newOwner: BeneficialOwnerInfo) => {
    if (editIndex !== null) {
      // Update existing owner
      const updatedOwners = [...beneficialOwners];
      updatedOwners[editIndex] = newOwner;
      setBeneficialOwners(updatedOwners);
      
      toast({
        title: "Owner Updated",
        description: `${newOwner.firstName} ${newOwner.lastName} has been updated.`,
      });
    } else {
      // Add new owner
      setBeneficialOwners([...beneficialOwners, newOwner]);
      
      toast({
        title: "Owner Added",
        description: `${newOwner.firstName} ${newOwner.lastName} has been added as a beneficial owner.`,
      });
    }
    
    // Reset form state
    setShowForm(false);
    setEditIndex(null);
  };
  
  // Function to edit an existing owner
  const handleEditOwner = (index: number) => {
    setEditIndex(index);
    setShowForm(true);
  };
  
  // Function to confirm deletion of an owner
  const handleConfirmDelete = () => {
    if (ownerToDelete !== null) {
      const updatedOwners = beneficialOwners.filter((_, index) => index !== ownerToDelete);
      setBeneficialOwners(updatedOwners);
      
      const deletedOwner = beneficialOwners[ownerToDelete];
      toast({
        title: "Owner Removed",
        description: `${deletedOwner.firstName} ${deletedOwner.lastName} has been removed from beneficial owners.`,
      });
      
      setOwnerToDelete(null);
    }
  };
  
  // Function to cancel form
  const handleCancelForm = () => {
    setShowForm(false);
    setEditIndex(null);
  };
  
  // Function to show the form for adding a new owner
  const handleShowAddForm = () => {
    setEditIndex(null);
    setShowForm(true);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Beneficial Owners</h2>
        <p className="text-gray-600">
          Add all individuals who own or control 25% or more of the family office.
        </p>
      </div>
      
      {/* Display existing owners */}
      {beneficialOwners.length > 0 && (
        <OwnersList
          owners={beneficialOwners}
          onEdit={handleEditOwner}
          onDelete={(index) => setOwnerToDelete(index)}
        />
      )}
      
      {/* Button to show add form if not already visible */}
      {!showForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6"
        >
          <button
            onClick={handleShowAddForm}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Add Beneficial Owner
          </button>
        </motion.div>
      )}
      
      {/* Add/Edit owner form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          <AddOwnerForm
            onAddOwner={handleAddOwner}
            onCancel={handleCancelForm}
            isEdit={editIndex !== null}
            existingOwner={editIndex !== null ? beneficialOwners[editIndex] : undefined}
          />
        </motion.div>
      )}
      
      {/* Navigation buttons */}
      <div className="flex justify-between mt-8 pt-6 border-t">
        <button
          onClick={goToPreviousStep}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
        >
          Previous
        </button>
        
        <button
          onClick={goToNextStep}
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
        >
          Next
        </button>
      </div>
      
      {/* Delete confirmation dialog */}
      <AlertDialog open={ownerToDelete !== null} onOpenChange={() => setOwnerToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove this beneficial owner from your onboarding application.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BeneficialOwnersForm;
