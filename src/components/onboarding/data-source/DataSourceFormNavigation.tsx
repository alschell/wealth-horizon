
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface DataSourceFormNavigationProps {
  onBack: () => void;
  isSubmitting?: boolean;
}

const DataSourceFormNavigation = ({
  onBack,
  isSubmitting = false
}: DataSourceFormNavigationProps) => {
  return (
    <div className="pt-4 border-t">
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
          className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
          disabled={isSubmitting}
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default DataSourceFormNavigation;
