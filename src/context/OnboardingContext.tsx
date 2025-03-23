
import React, { createContext, useContext, useState, ReactNode } from "react";
import { 
  OnboardingData, 
  OnboardingContextType,
  FamilyOfficeInfo,
  PrimaryContactInfo,
  AddressInfo,
  LegalDocuments,
  AggregatorInfo,
  FinancialAccountInfo,
  BeneficialOwnerInfo,
  PersonalInfo,
  IdentityVerification
} from "@/types/onboarding";
import { defaultOnboardingData } from "./onboardingDefaults";

// Re-export types for convenience
export type {
  FamilyOfficeInfo,
  PrimaryContactInfo,
  AddressInfo,
  LegalDocuments,
  AggregatorInfo,
  FinancialAccountInfo,
  BeneficialOwnerInfo,
  PersonalInfo,
  IdentityVerification,
  OnboardingData
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [onboardingData, setOnboardingData] = useState<OnboardingData>(defaultOnboardingData);
  const [currentStep, setCurrentStep] = useState(0);

  const updateFamilyOfficeInfo = (info: FamilyOfficeInfo) => {
    setOnboardingData((prev) => ({ ...prev, familyOfficeInfo: info }));
  };

  const updatePrimaryContactInfo = (info: PrimaryContactInfo) => {
    setOnboardingData((prev) => ({ ...prev, primaryContactInfo: info }));
  };

  const updateAddressInfo = (info: AddressInfo) => {
    setOnboardingData((prev) => ({ ...prev, addressInfo: info }));
  };

  const updateLegalDocuments = (info: LegalDocuments) => {
    setOnboardingData((prev) => ({ ...prev, legalDocuments: info }));
  };

  const updateAggregatorInfo = (info: AggregatorInfo) => {
    setOnboardingData((prev) => ({ ...prev, aggregatorInfo: info }));
  };

  const addFinancialAccount = (account: FinancialAccountInfo) => {
    setOnboardingData((prev) => ({
      ...prev,
      financialAccounts: [...prev.financialAccounts, account],
    }));
  };

  const removeFinancialAccount = (index: number) => {
    setOnboardingData((prev) => ({
      ...prev,
      financialAccounts: prev.financialAccounts.filter((_, i) => i !== index),
    }));
  };

  const addBeneficialOwner = (owner: BeneficialOwnerInfo) => {
    setOnboardingData((prev) => ({
      ...prev,
      beneficialOwners: [...prev.beneficialOwners, owner],
    }));
  };

  const removeBeneficialOwner = (index: number) => {
    setOnboardingData((prev) => ({
      ...prev,
      beneficialOwners: prev.beneficialOwners.filter((_, i) => i !== index),
    }));
  };

  const updatePersonalInfo = (info: PersonalInfo) => {
    setOnboardingData((prev) => ({ ...prev, personalInfo: info }));
  };

  const updateIdentityVerification = (info: IdentityVerification) => {
    setOnboardingData((prev) => ({ ...prev, identityVerification: info }));
  };

  const setOnboardingCompleted = () => {
    setOnboardingData((prev) => ({ ...prev, completed: true }));
  };

  const resetOnboarding = () => {
    setOnboardingData(defaultOnboardingData);
    setCurrentStep(0);
  };

  return (
    <OnboardingContext.Provider
      value={{
        onboardingData,
        updateFamilyOfficeInfo,
        updatePrimaryContactInfo,
        updateAddressInfo,
        updateLegalDocuments,
        updateAggregatorInfo,
        addFinancialAccount,
        removeFinancialAccount,
        addBeneficialOwner,
        removeBeneficialOwner,
        updatePersonalInfo,
        updateIdentityVerification,
        setOnboardingCompleted,
        currentStep,
        setCurrentStep,
        resetOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
}
