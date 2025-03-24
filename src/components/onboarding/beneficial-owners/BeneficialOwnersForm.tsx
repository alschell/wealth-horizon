
import React, { useState } from "react";
import { BeneficialOwnerInfo } from "@/context/OnboardingContext";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import OwnersList from "./OwnersList";
import AddOwnerForm from "./AddOwnerForm";
import FormHeader from "./FormHeader";
import FormFooter from "./FormFooter";

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
  const [localOwners, setLocalOwners] = useState<BeneficialOwnerInfo[]>(owners);
  const [currentEditIndex, setCurrentEditIndex] = useState<number | null>(null);
  const [editingOwner, setEditingOwner] = useState<BeneficialOwnerInfo | null>(null);
  
  const handleAddOwner = (newOwner: BeneficialOwnerInfo) => {
    if (currentEditIndex !== null) {
      // Update existing owner
      const updatedOwners = [...localOwners];
      updatedOwners[currentEditIndex] = newOwner;
      setLocalOwners(updatedOwners);
      
      // Remove the old owner and add the updated one
      onRemoveOwner(currentEditIndex);
      onAddOwner(newOwner);
      
      toast({
        title: "Owner updated",
        description: `${newOwner.firstName} ${newOwner.lastName}'s information has been updated.`,
      });
      
      // Reset editing state
      setCurrentEditIndex(null);
      setEditingOwner(null);
    } else {
      // Add new owner
      const updatedOwners = [...localOwners, newOwner];
      setLocalOwners(updatedOwners);
      onAddOwner(newOwner);
      
      toast({
        title: "Owner added",
        description: `${newOwner.firstName} ${newOwner.lastName} has been added as a beneficial owner.`,
      });
    }
  };

  const handleRemoveOwner = (index: number) => {
    const updatedOwners = localOwners.filter((_, i) => i !== index);
    setLocalOwners(updatedOwners);
    onRemoveOwner(index);
    
    if (currentEditIndex === index) {
      setCurrentEditIndex(null);
      setEditingOwner(null);
    }
  };
  
  const handleEditOwner = (index: number) => {
    setCurrentEditIndex(index);
    setEditingOwner(localOwners[index]);
  };
  
  const handleCancelEdit = () => {
    setCurrentEditIndex(null);
    setEditingOwner(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSubmit();
    
    toast({
      title: "Information saved",
      description: "Beneficial owner information has been saved successfully.",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto"
    >
      <Card className="p-6 md:p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormHeader />

          {/* List of current beneficial owners */}
          <OwnersList 
            owners={localOwners}
            onRemoveOwner={handleRemoveOwner}
            onEditOwner={handleEditOwner}
          />

          {/* Form to add a new beneficial owner */}
          <AddOwnerForm 
            onAddOwner={handleAddOwner}
            ownerToEdit={editingOwner}
            isEditing={currentEditIndex !== null}
            onCancelEdit={handleCancelEdit}
          />

          <FormFooter onBack={onBack} />
        </form>
      </Card>
    </motion.div>
  );
};

export default BeneficialOwnersForm;
