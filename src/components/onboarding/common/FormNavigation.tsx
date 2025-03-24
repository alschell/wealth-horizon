
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormNavigationProps {
  onBack: () => void;
  showRequiredFieldsNote?: boolean;
  isSubmitting?: boolean;
  submitText?: string;
  className?: string;
}

const FormNavigation: React.FC<FormNavigationProps> = ({ 
  onBack, 
  showRequiredFieldsNote = true,
  isSubmitting = false,
  submitText = "Continue",
  className
}) => {
  return (
    <div className={cn("pt-4 border-t mt-6", className)}>
      {showRequiredFieldsNote && (
        <p className="text-sm text-gray-500 mb-6">
          Fields marked with <span className="text-red-500">*</span> are required.
        </p>
      )}
      <div className="flex justify-between">
        <Button 
          type="button" 
          variant="outline"
          size="lg" 
          className="rounded-lg"
          onClick={onBack}
          disabled={isSubmitting}
        >
          <ArrowLeft className="mr-2 h-4 w-4 text-black" />
          Back
        </Button>
        <Button 
          type="submit" 
          size="lg" 
          className="rounded-lg bg-black hover:bg-gray-800 text-white hover:shadow-md transition-shadow"
          disabled={isSubmitting}
        >
          {submitText}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default FormNavigation;
