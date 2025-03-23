
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define types for Family Office KYC data
export type FamilyOfficeInfo = {
  officeName: string;
  legalEntityType: string;
  registrationNumber: string;
  taxId: string;
  yearEstablished: string;
  jurisdiction: string;
  email: string;
  phone: string;
  website: string;
};

export type PrimaryContactInfo = {
  firstName: string;
  lastName: string;
  position: string;
  email: string;
  phone: string;
};

export type AddressInfo = {
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export type LegalDocuments = {
  documentType: "incorporation" | "registration" | "taxCertificate" | "ownership" | "other";
  documentNumber: string;
  issueDate: string;
  expiryDate?: string;
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

export type FinancialAccountInfo = {
  accountName: string;
  institution: string;
  accountType: "cash" | "portfolio" | "investment" | "custody" | "broker" | "other";
  accountSubtype?: string;
  currency: string;
  approximateValue?: string;
  statements: File[];
};

export type BeneficialOwnerInfo = {
  firstName: string;
  lastName: string;
  relationship: string;
  ownershipPercentage: string;
  nationality: string;
  dateOfBirth: string;
  documents: File[];
};

export type OnboardingData = {
  familyOfficeInfo: FamilyOfficeInfo;
  primaryContactInfo: PrimaryContactInfo;
  addressInfo: AddressInfo;
  legalDocuments: LegalDocuments;
  aggregatorInfo: AggregatorInfo;
  financialAccounts: FinancialAccountInfo[];
  beneficialOwners: BeneficialOwnerInfo[];
  completed: boolean;
};

// Set default empty values
const defaultOnboardingData: OnboardingData = {
  familyOfficeInfo: {
    officeName: "",
    legalEntityType: "",
    registrationNumber: "",
    taxId: "",
    yearEstablished: "",
    jurisdiction: "",
    email: "",
    phone: "",
    website: "",
  },
  primaryContactInfo: {
    firstName: "",
    lastName: "",
    position: "",
    email: "",
    phone: "",
  },
  addressInfo: {
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  },
  legalDocuments: {
    documentType: "incorporation",
    documentNumber: "",
    issueDate: "",
    documentFiles: [],
  },
  aggregatorInfo: {
    usesAggregator: false,
  },
  financialAccounts: [],
  beneficialOwners: [],
  completed: false,
};

type OnboardingContextType = {
  onboardingData: OnboardingData;
  updateFamilyOfficeInfo: (info: FamilyOfficeInfo) => void;
  updatePrimaryContactInfo: (info: PrimaryContactInfo) => void;
  updateAddressInfo: (info: AddressInfo) => void;
  updateLegalDocuments: (info: LegalDocuments) => void;
  updateAggregatorInfo: (info: AggregatorInfo) => void;
  addFinancialAccount: (account: FinancialAccountInfo) => void;
  removeFinancialAccount: (index: number) => void;
  addBeneficialOwner: (owner: BeneficialOwnerInfo) => void;
  removeBeneficialOwner: (index: number) => void;
  setOnboardingCompleted: () => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  resetOnboarding: () => void;
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
