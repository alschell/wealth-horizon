
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, X, Save } from "lucide-react";

interface FormActionsProps {
  onAddAccount: () => void;
  onCancel: () => void;
  isEditing?: boolean;
  buttonText?: string;
}

const FormActions: React.FC<FormActionsProps> = ({ 
  onAddAccount, 
  onCancel,
  isEditing = false,
  buttonText = "Add Account"
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 pt-4">
      <Button
        type="button"
        onClick={onAddAccount}
        className="flex-1 bg-black hover:bg-gray-800 text-white"
      >
        {isEditing ? (
          <Save className="mr-2 h-4 w-4" />
        ) : (
          <Plus className="mr-2 h-4 w-4" />
        )}
        {buttonText}
      </Button>
      
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        className="flex-1"
      >
        <X className="mr-2 h-4 w-4" />
        Cancel
      </Button>
    </div>
  );
};

export default FormActions;
