
import { useOnboarding } from "@/context/OnboardingContext";
import { CheckIcon } from "lucide-react";

const OnboardingHeader = () => {
  const { currentStep } = useOnboarding();

  const steps = [
    { name: "Family Office", number: 1 },
    { name: "Primary Contact", number: 2 },
    { name: "Address", number: 3 },
    { name: "Legal Documents", number: 4 },
    { name: "Financial Data", number: 5 },
    { name: "Beneficial Owners", number: 6 },
    { name: "Review", number: 7 },
  ];

  return (
    <header className="w-full mb-12">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-8">Wealth Horizon</h1>
        
        <div className="hidden md:flex w-full max-w-5xl justify-between relative mb-2">
          {steps.map((step, i) => (
            <div 
              key={step.number} 
              className="flex flex-col items-center relative z-10"
            >
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center font-medium 
                  ${i < currentStep 
                    ? 'bg-blue-600 text-white' 
                    : i === currentStep 
                      ? 'bg-blue-100 text-blue-800 border-2 border-blue-600' 
                      : 'bg-gray-100 text-gray-500'
                  } transition-all duration-300`}
              >
                {i < currentStep ? (
                  <CheckIcon className="h-5 w-5" />
                ) : (
                  step.number
                )}
              </div>
              <span 
                className={`mt-2 text-sm font-medium
                  ${i <= currentStep ? 'text-blue-800' : 'text-gray-500'}`}
              >
                {step.name}
              </span>
            </div>
          ))}
          
          {/* Progress line */}
          <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-100 -z-0">
            <div 
              className="h-full bg-blue-600 transition-all duration-700 ease-in-out"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {/* Mobile version - Just show current step */}
        <div className="md:hidden w-full">
          <div className="flex items-center justify-center">
            <span className="text-sm text-gray-500">
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full mt-2">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-700 ease-in-out"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
          <div className="mt-4 text-center">
            <span className="font-medium">{steps[currentStep]?.name}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default OnboardingHeader;
