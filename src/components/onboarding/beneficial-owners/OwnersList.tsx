
import React, { useState } from "react";
import { BeneficialOwnerInfo } from "@/context/OnboardingContext";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, User } from "lucide-react";

interface OwnersListProps {
  owners: BeneficialOwnerInfo[];
  onEditOwner: (index: number) => void;
  onRemoveOwner: (index: number) => void;
}

const OwnersList: React.FC<OwnersListProps> = ({ 
  owners, 
  onEditOwner, 
  onRemoveOwner 
}) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [ownerToDelete, setOwnerToDelete] = useState<number | null>(null);

  const handleDeleteClick = (index: number) => {
    setOwnerToDelete(index);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (ownerToDelete !== null) {
      onRemoveOwner(ownerToDelete);
      setOwnerToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  if (owners.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No beneficial owners added yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {owners.map((owner, index) => (
        <div 
          key={index} 
          className="flex items-center justify-between p-4 border rounded-md bg-gray-50"
        >
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-gray-500" />
            <div>
              <p className="font-medium">{owner.firstName} {owner.lastName}</p>
              <p className="text-sm text-gray-500">
                {owner.relationship} · {owner.ownershipPercentage}% ownership
              </p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEditOwner(index)}
              className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDeleteClick(index)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this beneficial owner? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default OwnersList;
