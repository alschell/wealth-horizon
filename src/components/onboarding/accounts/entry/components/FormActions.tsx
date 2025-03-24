
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Save } from "lucide-react";

interface FormActionsProps {
  onAddAccount: () => void;
  isEditing?: boolean;
  buttonText?: string;
}

const FormActions: React.FC<FormActionsProps> = ({ 
  onAddAccount, 
  isEditing = false,
  buttonText = "Add Account"
}) => {
  return (
    <div className="flex justify-end pt-4">
      <Button
        type="button"
        onClick={onAddAccount}
        className="bg-black hover:bg-gray-800 text-white"
      >
        {isEditing ? (
          <Save className="mr-2 h-4 w-4" />
        ) : (
          <Plus className="mr-2 h-4 w-4" />
        )}
        {buttonText}
      </Button>
    </div>
  );
};

export default FormActions;
