
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface FormNavigationProps {
  onBack: () => void;
  showRequiredFieldsNote?: boolean;
}

const FormNavigation: React.FC<FormNavigationProps> = ({ 
  onBack, 
  showRequiredFieldsNote = true 
}) => {
  return (
    <div className="pt-4 border-t">
      {showRequiredFieldsNote && (
        <p className="text-sm text-gray-500 mb-6">
          Fields marked with * are required.
        </p>
      )}
      <div className="flex justify-between">
        <Button 
          type="button" 
          variant="outline"
          size="lg" 
          className="rounded-lg"
          onClick={onBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button 
          type="submit" 
          size="lg" 
          className="rounded-lg hover:shadow-md transition-shadow"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default FormNavigation;
