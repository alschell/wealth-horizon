
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

interface FormActionsProps {
  onAddAccount: () => void;
  onCancel?: () => void;
}

const FormActions = ({ onAddAccount, onCancel }: FormActionsProps) => {
  return (
    <div className="flex justify-between items-center">
      {onCancel && (
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="text-gray-500"
        >
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
      )}
      <Button
        type="button"
        onClick={onAddAccount}
        className={onCancel ? "" : "ml-auto"}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Account
      </Button>
    </div>
  );
};

export default FormActions;
