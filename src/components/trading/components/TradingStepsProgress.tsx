
import React from "react";

interface Step {
  title: string;
}

interface TradingStepsProgressProps {
  steps: Step[];
  currentStep: number;
}

const TradingStepsProgress: React.FC<TradingStepsProgressProps> = ({
  steps,
  currentStep
}) => {
  return (
    <div className="flex justify-between mb-6">
      {steps.map((step, index) => (
        <div 
          key={step.title} 
          className={`flex flex-col items-center ${index <= currentStep ? 'text-black' : 'text-gray-400'}`}
        >
          <div 
            className={`w-8 h-8 rounded-full flex items-center justify-center mb-1
              ${index < currentStep ? 'bg-black text-white' : 
                index === currentStep ? 'border-2 border-black' : 'border-2 border-gray-300'}`}
          >
            {index < currentStep ? '✓' : index + 1}
          </div>
          <span className="text-xs hidden md:block">{step.title}</span>
        </div>
      ))}
    </div>
  );
};

export default TradingStepsProgress;
