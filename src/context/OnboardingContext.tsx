
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define types for KYC data
export type PersonalInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  taxResidency: string;
  taxId: string;
};

export type AddressInfo = {
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export type IdentityVerification = {
  documentType: "passport" | "drivingLicense" | "nationalId";
  documentNumber: string;
  issueDate: string;
  expiryDate: string;
  documentFiles: File[];
};

export type AggregatorInfo = {
  usesAggregator: boolean;
  aggregatorName?: string;
  aggregatorCredentials?: {
    username: string;
    apiKey?: string;
  };
};

export type ManualAccountInfo = {
  accountName: string;
  institution: string;
  accountType: string;
  currency: string;
  balance: string;
  statements: File[];
};

export type EntityInfo = {
  entityName: string;
  entityType: string;
  jurisdiction: string;
  registrationNumber: string;
  documents: File[];
};

export type OnboardingData = {
  personalInfo: PersonalInfo;
  addressInfo: AddressInfo;
  identityVerification: IdentityVerification;
  aggregatorInfo: AggregatorInfo;
  manualAccounts: ManualAccountInfo[];
  entities: EntityInfo[];
  completed: boolean;
};

// Set default empty values
const defaultOnboardingData: OnboardingData = {
  personalInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    nationality: "",
    taxResidency: "",
    taxId: "",
  },
  addressInfo: {
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  },
  identityVerification: {
    documentType: "passport",
    documentNumber: "",
    issueDate: "",
    expiryDate: "",
    documentFiles: [],
  },
  aggregatorInfo: {
    usesAggregator: false,
  },
  manualAccounts: [],
  entities: [],
  completed: false,
};

type OnboardingContextType = {
  onboardingData: OnboardingData;
  updatePersonalInfo: (info: PersonalInfo) => void;
  updateAddressInfo: (info: AddressInfo) => void;
  updateIdentityVerification: (info: IdentityVerification) => void;
  updateAggregatorInfo: (info: AggregatorInfo) => void;
  addManualAccount: (account: ManualAccountInfo) => void;
  removeManualAccount: (index: number) => void;
  addEntity: (entity: EntityInfo) => void;
  removeEntity: (index: number) => void;
  setOnboardingCompleted: () => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  resetOnboarding: () => void;
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [onboardingData, setOnboardingData] = useState<OnboardingData>(defaultOnboardingData);
  const [currentStep, setCurrentStep] = useState(0);

  const updatePersonalInfo = (info: PersonalInfo) => {
    setOnboardingData((prev) => ({ ...prev, personalInfo: info }));
  };

  const updateAddressInfo = (info: AddressInfo) => {
    setOnboardingData((prev) => ({ ...prev, addressInfo: info }));
  };

  const updateIdentityVerification = (info: IdentityVerification) => {
    setOnboardingData((prev) => ({ ...prev, identityVerification: info }));
  };

  const updateAggregatorInfo = (info: AggregatorInfo) => {
    setOnboardingData((prev) => ({ ...prev, aggregatorInfo: info }));
  };

  const addManualAccount = (account: ManualAccountInfo) => {
    setOnboardingData((prev) => ({
      ...prev,
      manualAccounts: [...prev.manualAccounts, account],
    }));
  };

  const removeManualAccount = (index: number) => {
    setOnboardingData((prev) => ({
      ...prev,
      manualAccounts: prev.manualAccounts.filter((_, i) => i !== index),
    }));
  };

  const addEntity = (entity: EntityInfo) => {
    setOnboardingData((prev) => ({
      ...prev,
      entities: [...prev.entities, entity],
    }));
  };

  const removeEntity = (index: number) => {
    setOnboardingData((prev) => ({
      ...prev,
      entities: prev.entities.filter((_, i) => i !== index),
    }));
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
        updatePersonalInfo,
        updateAddressInfo,
        updateIdentityVerification,
        updateAggregatorInfo,
        addManualAccount,
        removeManualAccount,
        addEntity,
        removeEntity,
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
