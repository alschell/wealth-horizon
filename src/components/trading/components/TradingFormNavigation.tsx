
import React from "react";
import { Button } from "@/components/ui/button";

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
    <div className="flex justify-between">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentStep === 0}
      >
        Previous
      </Button>
      
      {currentStep < totalSteps - 1 ? (
        <Button onClick={onNext}>
          Next
        </Button>
      ) : (
        <Button onClick={onSubmit} className="bg-green-600 hover:bg-green-700">
          Submit Order
        </Button>
      )}
    </div>
  );
};

export default TradingFormNavigation;
