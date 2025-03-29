
export const usePreviousStepHandler = (
  currentStep: number,
  setCurrentStep: (value: React.SetStateAction<number>) => void
) => {
  const handlePreviousStep = () => {
    console.log("Moving to previous step:", currentStep - 1);
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  return handlePreviousStep;
};
