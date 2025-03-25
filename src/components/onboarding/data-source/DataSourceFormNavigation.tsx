
import React from "react";
import { Button } from "@/components/ui/button";

interface DataSourceFormNavigationProps {
  onBack: () => void;
  isSubmitting: boolean;
  onSubmit?: () => void;
}

const DataSourceFormNavigation: React.FC<DataSourceFormNavigationProps> = ({
  onBack,
  isSubmitting,
  onSubmit
}) => {
  return (
    <div className="flex justify-between pt-4">
      <Button
        type="button"
        variant="outline"
        onClick={onBack}
        disabled={isSubmitting}
      >
        Back
      </Button>
      
      <Button 
        type={onSubmit ? "button" : "submit"}
        disabled={isSubmitting}
        onClick={onSubmit}
      >
        {isSubmitting ? "Saving..." : "Continue"}
      </Button>
    </div>
  );
};

export default DataSourceFormNavigation;
