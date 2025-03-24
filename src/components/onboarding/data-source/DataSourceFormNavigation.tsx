
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface DataSourceFormNavigationProps {
  onBack: () => void;
  isSubmitting?: boolean;
  submitText?: string;
}

const DataSourceFormNavigation = ({
  onBack,
  isSubmitting = false,
  submitText = "Continue"
}: DataSourceFormNavigationProps) => {
  return (
    <div className="pt-4 border-t mt-6">
      <div className="flex justify-between">
        <Button 
          type="button" 
          variant="outline"
          size="lg" 
          className="rounded-lg text-gray-700"
          onClick={onBack}
          disabled={isSubmitting}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button 
          type="submit" 
          size="lg" 
          className="rounded-lg bg-[#86CEFA] hover:bg-[#5ba8d6] text-white"
          disabled={isSubmitting}
        >
          {submitText}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default DataSourceFormNavigation;
