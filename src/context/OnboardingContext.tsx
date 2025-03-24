
import React, { createContext, useState, useContext, ReactNode } from "react";

import { 
  OnboardingData, 
  OnboardingContextType,
  FamilyOfficeInfo,
  PrimaryContactInfo,
  AddressInfo,
  LegalDocuments,
  AggregatorInfo,
  BeneficialOwnerInfo,
  PersonalInfo,
  IdentityVerification
} from "@/types/onboarding";
import { defaultOnboardingData } from "./onboardingDefaults";

// Define the extended FinancialAccountInfo type in the context
export interface FinancialAccountInfo {
  accountName: string;
  institution: string;
  accountType: "cash" | "portfolio" | "investment" | "custody" | "broker" | "checking" | "savings" | "brokerage" | "trust" | "retirement" | "private equity" | "hedge fund" | "venture capital" | "real estate" | "fixed income" | "credit" | "other";
  accountSubtype?: string;
  currency: string;
  approximateValue: string;
  statements: File[];
  legalEntity?: string;
  legalEntityIdentifier?: string;
}

// Re-export types for convenience
export type {
  FamilyOfficeInfo,
  PrimaryContactInfo,
  AddressInfo,
  LegalDocuments,
  AggregatorInfo,
  BeneficialOwnerInfo,
  PersonalInfo,
  IdentityVerification
};

// Define the extended OnboardingData interface that uses our custom FinancialAccountInfo
export interface ExtendedOnboardingData extends Omit<OnboardingData, 'financialAccounts'> {
  financialAccounts: FinancialAccountInfo[];
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [onboardingData, setOnboardingData] = useState<ExtendedOnboardingData>(defaultOnboardingData as ExtendedOnboardingData);
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
    setOnboardingData(defaultOnboardingData as ExtendedOnboardingData);
    setCurrentStep(0);
  };

  return (
    <OnboardingContext.Provider
      value={{
        onboardingData: onboardingData as unknown as OnboardingData,
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
