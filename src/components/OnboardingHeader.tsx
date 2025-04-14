
import React from "react";
import { useOnboarding } from "@/context/OnboardingContext";
import { CheckIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const OnboardingHeader = () => {
  const { currentStep } = useOnboarding();

  const steps = [
    { name: "Family Office", number: 1 },
    { name: "Primary Contact", number: 2 },
    { name: "Address", number: 3 },
    { name: "Legal Documents", number: 4 },
    { name: "Beneficial Owners", number: 5 },
    { name: "Financial Data", number: 6 },
    { name: "Review", number: 7 },
  ];

  return (
    <header className="max-w-4xl mx-auto py-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <h1 className="text-3xl font-bold mb-8">
          <span className="text-indigo-600">Wealth</span>
          <span className="text-gray-900">Horizon</span>
        </h1>
      </motion.div>

      <div className="mb-8">
        {/* Desktop view */}
        <div className="hidden md:flex w-full justify-between relative mb-2">
          {/* Progress line - positioned to connect circles */}
          <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-100 -z-0">
            <div 
              className="h-full bg-black transition-all duration-700 ease-in-out"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>
          
          {/* Step circles with equal spacing */}
          <div className="flex w-full absolute">
            {steps.map((step, index) => {
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;

              return (
                <div 
                  key={index}
                  className="flex flex-col items-center relative z-10"
                  style={{ 
                    position: 'absolute', 
                    left: `${(index / (steps.length - 1)) * 100}%`,
                    transform: 'translateX(-50%)',
                    width: '40px' 
                  }}
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all duration-300",
                      isActive
                        ? "bg-gray-100 text-black border-2 border-gray-400"
                        : isCompleted
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-500"
                    )}
                  >
                    {isCompleted ? (
                      <CheckIcon className="h-5 w-5" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <span 
                    className={cn(
                      "mt-2 text-sm font-medium text-center",
                      isActive || isCompleted ? "text-black" : "text-gray-500"
                    )}
                  >
                    {step.name}
                  </span>
                </div>
              );
            })}
          </div>
          
          {/* Empty space to maintain layout height */}
          <div className="w-full h-24"></div>
        </div>

        {/* Mobile version */}
        <div className="md:hidden w-full">
          <div className="flex items-center justify-center">
            <span className="text-sm text-gray-500">
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full mt-2">
            <div 
              className="h-full bg-black rounded-full transition-all duration-700 ease-in-out"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
          <div className="mt-4 text-center">
            <span className="font-medium text-black">{steps[currentStep]?.name}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default OnboardingHeader;
