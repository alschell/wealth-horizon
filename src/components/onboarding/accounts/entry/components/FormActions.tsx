
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Save } from "lucide-react";

interface FormActionsProps {
  onAddAccount: () => void;
  isEditing?: boolean;
  buttonText: string;
  onCancelEdit?: () => void;
  disabled?: boolean;
}

const FormActions: React.FC<FormActionsProps> = ({ 
  onAddAccount, 
  isEditing = false,
  buttonText,
  onCancelEdit,
  disabled = false
}) => {
  return (
    <div className="flex justify-end space-x-4 pt-4">
      {isEditing && onCancelEdit && (
        <Button
          type="button"
          variant="outline"
          onClick={onCancelEdit}
          className="bg-white"
        >
          Cancel
        </Button>
      )}
      <Button
        type="button"
        onClick={onAddAccount}
        disabled={disabled}
        className={`${disabled ? 'bg-gray-300 text-gray-500' : 'bg-black hover:bg-gray-800 text-white'}`}
      >
        {isEditing ? (
          <Save className="mr-2 h-4 w-4" />
        ) : (
          <PlusCircle className="mr-2 h-4 w-4" />
        )}
        {buttonText}
      </Button>
    </div>
  );
};

export default FormActions;
