
import React, { createContext, useContext, useState } from 'react';

// Types for onboarding data
export interface FamilyOfficeInfo {
  name: string;
  type: string;
  registrationNumber: string;
  taxId: string;
  incorporationDate: string;
  website: string;
  email: string;
  phone: string;
  fax?: string;
}

export interface AddressInfo {
  streetAddress: string;
  streetAddress2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface PrimaryContactInfo {
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  phone: string;
}

export interface LegalDocument {
  type: string;
  fileId: string;
  fileName: string;
  dateUploaded: string;
}

export interface AggregatorInfo {
  provider: string;
  status: 'connected' | 'disconnected' | 'pending';
  lastSynced?: string;
}

export interface FinancialAccountInfo {
  id?: string;
  institution: string;
  legalEntity: string;
  legalEntityIdentifier?: string;
  accountNumber: string;
  swiftCode?: string;
  accountName?: string;
  accountType?: string;
  currency?: string;
  approximateValue?: string;
  accountSubtype?: string;
}

export interface BeneficialOwner {
  id: string;
  firstName: string;
  lastName: string;
  ownershipPercentage: number;
  dateOfBirth: string;
  nationality: string;
  residenceCountry: string;
  idType: string;
  idNumber: string;
  idExpiryDate: string;
}

export interface OnboardingData {
  familyOfficeInfo: FamilyOfficeInfo;
  addressInfo: AddressInfo;
  primaryContactInfo: PrimaryContactInfo;
  legalDocuments: LegalDocument[];
  aggregatorInfo: AggregatorInfo;
  financialAccounts: FinancialAccountInfo[];
  beneficialOwners: BeneficialOwner[];
  isComplete: boolean;
}

export interface OnboardingContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  onboardingData: OnboardingData;
  updateFamilyOfficeInfo: (data: FamilyOfficeInfo) => void;
  updateAddressInfo: (data: AddressInfo) => void;
  updatePrimaryContactInfo: (data: PrimaryContactInfo) => void;
  addLegalDocument: (document: LegalDocument) => void;
  removeLegalDocument: (documentId: string) => void;
  updateAggregatorInfo: (data: AggregatorInfo) => void;
  addFinancialAccount: (account: FinancialAccountInfo) => void;
  removeFinancialAccount: (accountId: string) => void;
  addBeneficialOwner: (owner: BeneficialOwner) => void;
  removeBeneficialOwner: (ownerId: string) => void;
  setOnboardingCompleted: () => void;
}

// Default onboarding data
const defaultOnboardingData: OnboardingData = {
  familyOfficeInfo: {
    name: '',
    type: '',
    registrationNumber: '',
    taxId: '',
    incorporationDate: '',
    website: '',
    email: '',
    phone: '',
    fax: '',
  },
  addressInfo: {
    streetAddress: '',
    streetAddress2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  },
  primaryContactInfo: {
    firstName: '',
    lastName: '',
    role: '',
    email: '',
    phone: '',
  },
  legalDocuments: [],
  aggregatorInfo: {
    provider: '',
    status: 'disconnected',
  },
  financialAccounts: [],
  beneficialOwners: [],
  isComplete: false,
};

// Create Context
const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

// Provider component
export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>(defaultOnboardingData);

  const updateFamilyOfficeInfo = (data: FamilyOfficeInfo) => {
    setOnboardingData(prev => ({ ...prev, familyOfficeInfo: data }));
  };

  const updateAddressInfo = (data: AddressInfo) => {
    setOnboardingData(prev => ({ ...prev, addressInfo: data }));
  };

  const updatePrimaryContactInfo = (data: PrimaryContactInfo) => {
    setOnboardingData(prev => ({ ...prev, primaryContactInfo: data }));
  };

  const addLegalDocument = (document: LegalDocument) => {
    setOnboardingData(prev => ({ 
      ...prev, 
      legalDocuments: [...prev.legalDocuments, document] 
    }));
  };

  const removeLegalDocument = (documentId: string) => {
    setOnboardingData(prev => ({ 
      ...prev, 
      legalDocuments: prev.legalDocuments.filter(doc => doc.fileId !== documentId) 
    }));
  };

  const updateAggregatorInfo = (data: AggregatorInfo) => {
    setOnboardingData(prev => ({ ...prev, aggregatorInfo: data }));
  };

  const addFinancialAccount = (account: FinancialAccountInfo) => {
    setOnboardingData(prev => ({ 
      ...prev, 
      financialAccounts: [...prev.financialAccounts, account] 
    }));
  };

  const removeFinancialAccount = (accountId: string) => {
    setOnboardingData(prev => ({ 
      ...prev, 
      financialAccounts: prev.financialAccounts.filter(acc => acc.id !== accountId) 
    }));
  };

  const addBeneficialOwner = (owner: BeneficialOwner) => {
    setOnboardingData(prev => ({ 
      ...prev, 
      beneficialOwners: [...prev.beneficialOwners, owner] 
    }));
  };

  const removeBeneficialOwner = (ownerId: string) => {
    setOnboardingData(prev => ({ 
      ...prev, 
      beneficialOwners: prev.beneficialOwners.filter(owner => owner.id !== ownerId) 
    }));
  };

  const setOnboardingCompleted = () => {
    setOnboardingData(prev => ({ ...prev, isComplete: true }));
  };

  return (
    <OnboardingContext.Provider value={{
      currentStep,
      setCurrentStep,
      onboardingData,
      updateFamilyOfficeInfo,
      updateAddressInfo,
      updatePrimaryContactInfo,
      addLegalDocument,
      removeLegalDocument,
      updateAggregatorInfo,
      addFinancialAccount,
      removeFinancialAccount,
      addBeneficialOwner,
      removeBeneficialOwner,
      setOnboardingCompleted,
    }}>
      {children}
    </OnboardingContext.Provider>
  );
};

// Hook to use the onboarding context
export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
