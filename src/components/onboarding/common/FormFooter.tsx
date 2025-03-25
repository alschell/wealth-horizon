
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormFooterProps {
  onBack?: () => void;
  onSubmit: () => void;
  backLabel?: string;
  submitLabel?: string;
  isSubmitting?: boolean;
  className?: string;
  showRequired?: boolean;
  disableContinue?: boolean;
}

const FormFooter: React.FC<FormFooterProps> = ({
  onBack,
  onSubmit,
  backLabel = "Back",
  submitLabel = "Continue",
  isSubmitting = false,
  className,
  showRequired = true,
  disableContinue = false,
}) => {
  return (
    <div className={cn("pt-4 border-t", className)}>
      {showRequired && (
        <p className="text-sm text-gray-500 mb-6">
          Fields marked with <span className="text-red-500">*</span> are required.
        </p>
      )}
      <div className="flex justify-between">
        {onBack && (
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="rounded-lg"
            onClick={onBack}
            disabled={isSubmitting}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {backLabel}
          </Button>
        )}
        <Button
          type="button"
          size="lg"
          className={cn(
            "rounded-lg hover:shadow-md transition-shadow bg-black hover:bg-gray-800 text-white", 
            !onBack && "ml-auto"
          )}
          onClick={onSubmit}
          disabled={isSubmitting || disableContinue}
        >
          {isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          {submitLabel}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default FormFooter;
