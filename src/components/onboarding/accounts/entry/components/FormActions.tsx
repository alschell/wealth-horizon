
import React from "react";
import { Button } from "@/components/ui/button";

interface FormActionsProps {
  onAddAccount: () => void;
  onCancel: () => void;
}

const FormActions = ({ onAddAccount, onCancel }: FormActionsProps) => {
  return (
    <div className="flex justify-end space-x-3 pt-2">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onCancel}
        className="px-4"
      >
        Cancel
      </Button>
      <Button 
        type="button" 
        onClick={onAddAccount}
        className="px-4 bg-black hover:bg-gray-800 text-white"
      >
        Add Account
      </Button>
    </div>
  );
};

export default FormActions;
