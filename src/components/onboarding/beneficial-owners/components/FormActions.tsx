
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface FormActionsProps {
  isEditing: boolean;
  isFormValid: boolean;
  onAddOwner: () => void;
  onCancelEdit: () => void;
}

const FormActions: React.FC<FormActionsProps> = ({
  isEditing,
  isFormValid,
  onAddOwner,
  onCancelEdit
}) => {
  return (
    <div className="mt-4 flex justify-end">
      {isEditing && (
        <Button 
          type="button" 
          variant="outline" 
          className="mr-2"
          onClick={onCancelEdit}
        >
          Cancel
        </Button>
      )}
      <Button 
        type="button" 
        className={`${!isFormValid ? 'bg-gray-300 text-gray-500' : 'bg-black text-white hover:bg-gray-800'}`}
        onClick={onAddOwner}
        disabled={!isFormValid}
      >
        <PlusCircle className="h-4 w-4 mr-2" />
        {isEditing ? "Update" : "Add"} Beneficial Owner
      </Button>
    </div>
  );
};

export default FormActions;
