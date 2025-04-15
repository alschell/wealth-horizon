
import { ReactNode } from 'react';

export interface OnboardingContextProps {
  onboardingData: OnboardingData;
  updateOnboardingData: (data: Partial<OnboardingData>) => void;
  goToNextStep: () => void;
  goToPrevStep: () => void;
  currentStep: number;
  isLastStep: boolean;
  isFirstStep: boolean;
  setCurrentStep: (step: number) => void;
  resetOnboarding: () => void;
  isComplete: (step: number) => boolean;
}

export interface PrimaryContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position?: string;
}

export interface AddressInfo {
  streetAddress: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface FamilyOfficeInfo {
  officeName: string;
  legalEntityType: string;
  jurisdiction: string;
  taxId: string;
}

export interface DocumentFile extends File {
  documentType?: string;
  issueDate?: string;
  expiryDate?: string;
}

export interface LegalDocuments {
  documentType: string;
  issueDate: string;
  expiryDate?: string;
  documentFiles: DocumentFile[];
}

export interface BeneficialOwnerInfo {
  id: string;
  firstName: string;
  lastName: string;
  nationality: string;
  relationship: string;
  ownershipPercentage: number;
  documents?: DocumentFile[];
  email?: string;
  phone?: string;
  address?: Partial<AddressInfo>;
  isPEP?: boolean;
  taxResidency?: string[];
  dateOfBirth?: string;
}

export interface FinancialAccountInfo {
  accountName: string;
  institution: string;
  accountType: string;
  legalEntity: string;
  legalEntityIdentifier: string;
  accountSubtype: string;
  currency: string;
  approximateValue: string;
  statements: File[];
  accountNumber: string;
  swiftCode: string;
  name?: string; // For backward compatibility
}

export interface AggregatorCredentials {
  username: string;
  password?: string;
  email?: string;
  apiKey?: string;
}

export interface AggregatorInfo {
  usesAggregator: boolean;
  aggregatorName: string;
  aggregatorCredentials: AggregatorCredentials;
}

export interface OnboardingData {
  primaryContactInfo: PrimaryContactInfo;
  addressInfo: AddressInfo;
  familyOfficeInfo: FamilyOfficeInfo;
  legalDocuments: LegalDocuments;
  beneficialOwners: BeneficialOwnerInfo[];
  financialAccounts: FinancialAccountInfo[];
  aggregatorInfo: AggregatorInfo;
  uploadedFiles?: File[];
  dataSourceMethod?: 'manual' | 'upload';
  status?: 'incomplete' | 'processing' | 'complete';
}

export const initialOnboardingData: OnboardingData = {
  primaryContactInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: ''
  },
  addressInfo: {
    streetAddress: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  },
  familyOfficeInfo: {
    officeName: '',
    legalEntityType: '',
    jurisdiction: '',
    taxId: ''
  },
  legalDocuments: {
    documentType: '',
    issueDate: '',
    expiryDate: '',
    documentFiles: []
  },
  beneficialOwners: [],
  financialAccounts: [],
  aggregatorInfo: {
    usesAggregator: false,
    aggregatorName: '',
    aggregatorCredentials: {
      username: '',
      email: '',
      apiKey: ''
    }
  },
  uploadedFiles: [],
  dataSourceMethod: 'manual',
  status: 'incomplete'
};
