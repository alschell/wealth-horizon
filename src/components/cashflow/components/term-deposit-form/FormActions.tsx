
import React from "react";
import { Button } from "@/components/ui/button";

interface FormActionsProps {
  isSubmitting?: boolean;
}

const FormActions: React.FC<FormActionsProps> = ({ isSubmitting = false }) => {
  return (
    <div className="flex justify-end pt-4">
      <Button variant="outline" className="mr-2" type="button">Cancel</Button>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create Deposit"}
      </Button>
    </div>
  );
};

export default FormActions;
