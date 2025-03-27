
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface TradingFormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

const TradingFormNavigation: React.FC<TradingFormNavigationProps> = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSubmit
}) => {
  return (
    <div className="pt-4 border-t mt-6">
      <div className="flex justify-between">
        <Button
          type="button" 
          variant="outline"
          size="lg" 
          className="rounded-lg"
          onClick={onPrevious}
          disabled={currentStep === 0}
        >
          <ArrowLeft className="mr-2 h-4 w-4 text-black" />
          Previous
        </Button>
        
        {currentStep < totalSteps - 1 ? (
          <Button 
            type="button"
            size="lg" 
            className="rounded-lg bg-black hover:bg-gray-800 text-white hover:shadow-md"
            onClick={onNext}
          >
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button 
            type="button"
            size="lg" 
            className="rounded-lg bg-green-600 hover:bg-green-700 text-white hover:shadow-md"
            onClick={onSubmit}
          >
            Submit Order
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default TradingFormNavigation;
