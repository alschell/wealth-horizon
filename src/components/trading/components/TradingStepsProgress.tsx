
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
    <div className="mb-8">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <React.Fragment key={index}>
              {/* Step circle */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex items-center justify-center rounded-full w-10 h-10 text-sm font-medium mb-2",
                    isActive
                      ? "bg-black text-white"
                      : isCompleted
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  )}
                >
                  {isCompleted ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <span 
                  className={cn(
                    "hidden sm:block text-xs text-center",
                    isActive ? "text-black font-medium" : "text-gray-600"
                  )}
                >
                  {step.title}
                </span>
              </div>

              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div 
                  className={cn(
                    "flex-1 h-0.5 mx-2",
                    isCompleted ? "bg-green-600" : "bg-gray-200"
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default TradingStepsProgress;
