
import React, { useState } from "react";
import { motion } from "framer-motion";
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
import { Button } from "@/components/ui/button";
import { Plus, PlusCircle } from "lucide-react";

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

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Beneficial Owners</h2>
        <p className="text-gray-600">
          Add all individuals who own or control 25% or more of the family office.
        </p>
      </div>
      
      {/* Form for adding/editing owners */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <AddOwnerForm
          formData={formData}
          isEditing={editIndex !== null}
          onInputChange={handleInputChange}
          onSelectionChange={handleSelectionChange}
          onDateChange={handleDateChange}
          onFilesSelected={handleFilesSelected}
          onCancelEdit={handleCancelEdit}
        />
        
        <div className="mt-4 flex justify-end">
          {editIndex !== null && (
            <Button 
              type="button" 
              variant="outline" 
              className="mr-2"
              onClick={handleCancelEdit}
            >
              Cancel
            </Button>
          )}
          <Button 
            type="button" 
            className={`${!isFormValid ? 'bg-gray-300 text-gray-500' : 'bg-black text-white hover:bg-gray-800'}`}
            onClick={handleAddOwner}
            disabled={!isFormValid}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            {editIndex !== null ? "Update" : "Add"} Beneficial Owner
          </Button>
        </div>
      </motion.div>
      
      {/* Display existing owners */}
      {owners.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <OwnersList
            owners={owners}
            onEditOwner={handleEditOwner}
            onRemoveOwner={(index) => setOwnerToDelete(index)}
          />
        </motion.div>
      )}
      
      {/* Form navigation */}
      <motion.div className="mt-8 flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
        >
          Back
        </Button>
        <Button
          type="button"
          onClick={onSubmit}
          disabled={owners.length === 0}
        >
          Continue
        </Button>
      </motion.div>
      
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
