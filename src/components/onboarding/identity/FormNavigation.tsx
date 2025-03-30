
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface FormNavigationProps {
  onBack: () => void;
  disableContinue?: boolean;
  isSubmitting?: boolean;
}

const FormNavigation: React.FC<FormNavigationProps> = ({ 
  onBack,
  disableContinue = false,
  isSubmitting = false
}) => {
  return (
    <div className="flex justify-between items-center pt-4">
      <Button
        type="button"
        variant="outline"
        onClick={onBack}
        className="px-6"
        disabled={isSubmitting}
      >
        Back
      </Button>

      <Button 
        type="submit" 
        className="px-6 bg-black hover:bg-gray-800 text-white"
        disabled={disableContinue || isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          'Continue'
        )}
      </Button>
    </div>
  );
};

export default FormNavigation;
