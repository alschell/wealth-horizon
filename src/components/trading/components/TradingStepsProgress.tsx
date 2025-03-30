
import React from "react";
import { cn } from "@/lib/utils";

interface Step {
  title: string;
  component: React.ComponentType<any>;
}

interface TradingStepsProgressProps {
  steps: Step[];
  currentStep: number;
}

const TradingStepsProgress: React.FC<TradingStepsProgressProps> = ({
  steps,
  currentStep,
}) => {
  return (
    <div className="w-full">
      {/* Step indicators - distributed equally */}
      <div className="flex justify-between relative mb-2">
        {/* Progress line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2" />
        
        {/* Colored progress line (only up to current step) */}
        <div 
          className="absolute top-1/2 left-0 h-1 bg-black -translate-y-1/2 transition-all duration-300" 
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        />
        
        {/* Step circles - distributed with equal width */}
        <div className="flex justify-between w-full relative z-10">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center"
              style={{ width: `${100 / steps.length}%` }}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2",
                  index === currentStep
                    ? "border-black bg-black text-white"
                    : index < currentStep
                    ? "border-black bg-white text-black"
                    : "border-gray-300 bg-white text-gray-400"
                )}
              >
                {index + 1}
              </div>
              <span 
                className={cn(
                  "text-xs mt-2 text-center whitespace-nowrap",
                  index === currentStep
                    ? "text-black font-medium"
                    : "text-gray-500"
                )}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TradingStepsProgress;
