
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface FormFooterProps {
  onSubmit: () => void;
  requiredFieldsNote?: boolean;
  isSubmitting?: boolean;
}

const FormFooter: React.FC<FormFooterProps> = ({ 
  onSubmit,
  requiredFieldsNote = true,
  isSubmitting = false
}) => {
  return (
    <div className="pt-4 border-t mt-6">
      {requiredFieldsNote && (
        <p className="text-sm text-gray-500 mb-6">
          Fields marked with * are required.
        </p>
      )}
      <div className="flex justify-end">
        <Button 
          onClick={onSubmit} 
          size="lg" 
          className="rounded-lg bg-[#86CEFA] text-white hover:bg-[#5ba8d6] hover:shadow-md transition-shadow"
          disabled={isSubmitting}
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default FormFooter;
