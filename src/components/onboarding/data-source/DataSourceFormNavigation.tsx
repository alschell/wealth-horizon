
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface DataSourceFormNavigationProps {
  onBack: () => void;
  isSubmitting: boolean;
  onSubmit?: () => void;
  disableContinue?: boolean;
}

const DataSourceFormNavigation: React.FC<DataSourceFormNavigationProps> = ({
  onBack,
  isSubmitting,
  onSubmit,
  disableContinue = false
}) => {
  const isDisabled = isSubmitting || disableContinue;
  
  return (
    <div className="flex justify-between pt-4">
      <Button
        type="button"
        variant="outline"
        onClick={onBack}
        disabled={isSubmitting}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      
      <Button 
        type={onSubmit ? "button" : "submit"}
        disabled={isDisabled}
        className={`rounded-lg transition-shadow ${isDisabled ? 'bg-gray-300 text-gray-500' : 'bg-black hover:bg-gray-800 text-white hover:shadow-md'}`}
        onClick={onSubmit}
      >
        {isSubmitting ? "Saving..." : "Continue"}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default DataSourceFormNavigation;
