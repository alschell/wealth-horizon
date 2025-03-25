
import React from "react";
import { Button } from "@/components/ui/button";

interface FormNavigationProps {
  onBack: () => void;
  disableContinue?: boolean;
}

const FormNavigation: React.FC<FormNavigationProps> = ({ 
  onBack,
  disableContinue = false 
}) => {
  return (
    <div className="flex justify-between items-center pt-4">
      <Button
        type="button"
        variant="outline"
        onClick={onBack}
        className="px-6"
      >
        Back
      </Button>

      <Button 
        type="submit" 
        className="px-6"
        disabled={disableContinue}
      >
        Continue
      </Button>
    </div>
  );
};

export default FormNavigation;
