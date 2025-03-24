
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface FormActionsProps {
  onAddAccount: () => void;
}

const FormActions = ({ onAddAccount }: FormActionsProps) => {
  return (
    <Button
      type="button"
      onClick={onAddAccount}
      className="mt-2"
    >
      <Plus className="h-4 w-4 mr-2" />
      Add Account
    </Button>
  );
};

export default FormActions;
