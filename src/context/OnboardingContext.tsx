
import React, { createContext, useContext, useState } from 'react';

// Types for various forms of data in the onboarding process
export interface FamilyOfficeInfo {
  name: string;
  type: string;
  registrationNumber: string;
  registrationDate: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface AddressInfo {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface BeneficialOwner {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  percentageOwnership: number;
  isPEP: boolean;
  idType: string;
  idNumber: string;
  idExpiryDate: string;
}

export interface FinancialAccountInfo {
  id: string;
  name: string;
  institution: string;
  accountType: string;
  balance: number;
  currency: string;
  isActive: boolean;
  openingDate: string;
  statements: string[];
}

export interface AggregatorInfo {
  id: string;
  name: string;
  description: string;
  isConnected: boolean;
}

// Structure of our onboarding data
interface OnboardingData {
  familyOfficeInfo: FamilyOfficeInfo;
  addressInfo: AddressInfo;
  beneficialOwners: BeneficialOwner[];
  documents: string[];
  financialAccounts: FinancialAccountInfo[];
  aggregatorInfo: AggregatorInfo | null;
  isOnboardingCompleted: boolean;
}

// Type for our context
export interface OnboardingContextType {
  currentStep: number;
  onboardingData: OnboardingData;
  setCurrentStep: (step: number) => void;
  updateFamilyOfficeInfo: (info: Partial<FamilyOfficeInfo>) => void;
  updateAddressInfo: (info: Partial<AddressInfo>) => void;
  addBeneficialOwner: (owner: BeneficialOwner) => void;
  removeBeneficialOwner: (id: string) => void;
  addDocument: (document: string) => void;
  removeDocument: (document: string) => void;
  addFinancialAccount: (account: FinancialAccountInfo) => void;
  removeFinancialAccount: (id: string) => void;
  updateAggregatorInfo: (info: AggregatorInfo | null) => void;
  setOnboardingCompleted: () => void;
}

// Default values for the context
const defaultFamilyOfficeInfo: FamilyOfficeInfo = {
  name: '',
  type: '',
  registrationNumber: '',
  registrationDate: '',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  addressLine1: '',
  city: '',
  state: '',
  zipCode: '',
  country: '',
};

const defaultAddressInfo: AddressInfo = {
  line1: '',
  city: '',
  state: '',
  zipCode: '',
  country: '',
};

const defaultOnboardingData: OnboardingData = {
  familyOfficeInfo: defaultFamilyOfficeInfo,
  addressInfo: defaultAddressInfo,
  beneficialOwners: [],
  documents: [],
  financialAccounts: [],
  aggregatorInfo: null,
  isOnboardingCompleted: false,
};

// Create the context
const OnboardingContext = createContext<OnboardingContextType>({
  currentStep: 0,
  onboardingData: defaultOnboardingData,
  setCurrentStep: () => {},
  updateFamilyOfficeInfo: () => {},
  updateAddressInfo: () => {},
  addBeneficialOwner: () => {},
  removeBeneficialOwner: () => {},
  addDocument: () => {},
  removeDocument: () => {},
  addFinancialAccount: () => {},
  removeFinancialAccount: () => {},
  updateAggregatorInfo: () => {},
  setOnboardingCompleted: () => {},
});

// Provider component
export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>(defaultOnboardingData);

  const updateFamilyOfficeInfo = (info: Partial<FamilyOfficeInfo>) => {
    setOnboardingData(prev => ({
      ...prev,
      familyOfficeInfo: {
        ...prev.familyOfficeInfo,
        ...info,
      },
    }));
  };

  const updateAddressInfo = (info: Partial<AddressInfo>) => {
    setOnboardingData(prev => ({
      ...prev,
      addressInfo: {
        ...prev.addressInfo,
        ...info,
      },
    }));
  };

  const addBeneficialOwner = (owner: BeneficialOwner) => {
    setOnboardingData(prev => ({
      ...prev,
      beneficialOwners: [...prev.beneficialOwners, owner],
    }));
  };

  const removeBeneficialOwner = (id: string) => {
    setOnboardingData(prev => ({
      ...prev,
      beneficialOwners: prev.beneficialOwners.filter(owner => owner.id !== id),
    }));
  };

  const addDocument = (document: string) => {
    setOnboardingData(prev => ({
      ...prev,
      documents: [...prev.documents, document],
    }));
  };

  const removeDocument = (document: string) => {
    setOnboardingData(prev => ({
      ...prev,
      documents: prev.documents.filter(doc => doc !== document),
    }));
  };

  const addFinancialAccount = (account: FinancialAccountInfo) => {
    setOnboardingData(prev => ({
      ...prev,
      financialAccounts: [...prev.financialAccounts, account],
    }));
  };

  const removeFinancialAccount = (id: string) => {
    setOnboardingData(prev => ({
      ...prev,
      financialAccounts: prev.financialAccounts.filter(account => account.id !== id),
    }));
  };

  const updateAggregatorInfo = (info: AggregatorInfo | null) => {
    setOnboardingData(prev => ({
      ...prev,
      aggregatorInfo: info,
    }));
  };

  const setOnboardingCompleted = () => {
    setOnboardingData(prev => ({
      ...prev,
      isOnboardingCompleted: true,
    }));
  };

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        onboardingData,
        setCurrentStep,
        updateFamilyOfficeInfo,
        updateAddressInfo,
        addBeneficialOwner,
        removeBeneficialOwner,
        addDocument,
        removeDocument,
        addFinancialAccount,
        removeFinancialAccount,
        updateAggregatorInfo,
        setOnboardingCompleted,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

// Custom hook to use the onboarding context
export const useOnboarding = () => useContext(OnboardingContext);
