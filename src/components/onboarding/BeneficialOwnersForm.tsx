
import React from "react";
import { useOnboarding } from "@/context/OnboardingContext";
import BeneficialOwnersFormComponent from "./beneficial-owners/BeneficialOwnersForm";

const BeneficialOwnersForm = () => {
  const { onboardingData, addBeneficialOwner, removeBeneficialOwner, setCurrentStep } = useOnboarding();

  return (
    <BeneficialOwnersFormComponent
      owners={onboardingData.beneficialOwners}
      onAddOwner={addBeneficialOwner}
      onRemoveOwner={removeBeneficialOwner}
      onSubmit={() => setCurrentStep(6)}
      onBack={() => setCurrentStep(4)}
    />
  );
};

export default BeneficialOwnersForm;
