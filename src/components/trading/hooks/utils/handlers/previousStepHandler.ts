
interface PreviousStepHandlerProps {
  currentStep: number;
  setCurrentStep: (value: React.SetStateAction<number>) => void;
}

export const usePreviousStepHandler = ({
  currentStep,
  setCurrentStep
}: PreviousStepHandlerProps) => {
  const handlePreviousStep = () => {
    // Don't go below step 0
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return handlePreviousStep;
};
