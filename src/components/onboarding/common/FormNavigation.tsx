
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormNavigationProps {
  onBack: () => void;
  onNext?: () => void;
  isLastStep?: boolean;
  showRequiredFieldsNote?: boolean;
  isSubmitting?: boolean;
  submitText?: string;
  className?: string;
  disableBack?: boolean;
}

const FormNavigation: React.FC<FormNavigationProps> = ({ 
  onBack, 
  onNext,
  isLastStep = false,
  showRequiredFieldsNote = true,
  isSubmitting = false,
  submitText = "Continue",
  className,
  disableBack = false
}) => {
  const handleBack = () => {
    // Scroll to top before navigating back
    window.scrollTo(0, 0);
    onBack();
  };

  const handleNext = () => {
    if (onNext) {
      onNext();
    }
  };

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
          onClick={handleBack}
          disabled={isSubmitting || disableBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button 
          type="button" 
          size="lg" 
          className="rounded-lg transition-shadow bg-black hover:bg-gray-800 text-white"
          disabled={isSubmitting}
          onClick={handleNext}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              {submitText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default FormNavigation;
