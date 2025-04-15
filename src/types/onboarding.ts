
// Types for Family Office KYC data
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
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  streetAddress: string;
  postalCode: string;
  addressLine2?: string;
};

export type LegalDocuments = {
  documentType: string;
  documentNumber: string;
  issueDate: string;
  expiryDate?: string;
  documentFiles: File[];
};

export type AggregatorInfo = {
  id: string;
  name: string;
  description: string;
  isConnected: boolean;
  usesAggregator: boolean;
  aggregatorName?: string;
  aggregatorCredentials?: {
    username: string;
    email?: string;
    apiKey?: string;
  };
};

export type FinancialAccountInfo = {
  id?: string;
  name: string;
  institution: string;
  accountType: "cash" | "portfolio" | "investment" | "custody" | "broker" | "checking" | "savings" | "brokerage" | "trust" | "retirement" | "private equity" | "hedge fund" | "venture capital" | "real estate" | "fixed income" | "credit" | "other";
  accountSubtype: string;
  currency: string;
  balance?: number;
  approximateValue: string;
  statements: File[];
  legalEntity: string;
  legalEntityIdentifier: string;
  accountNumber: string;
  swiftCode: string;
  accountName: string;
  isActive?: boolean;
  openingDate?: string;
};

export type BeneficialOwnerInfo = {
  id: string;
  firstName: string;
  lastName: string;
  relationship: string;
  ownershipPercentage: string;
  nationality: string;
  dateOfBirth: string;
  documents: File[];
  email?: string;
  phone?: string;
  percentageOwnership?: number;
  isPEP?: boolean;
  idType?: string;
  idNumber?: string;
  idExpiryDate?: string;
};

export type PersonalInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  taxResidency?: string;
  taxId?: string;
};

export type IdentityVerification = {
  documentType: "passport" | "drivingLicense" | "nationalId";
  documentNumber: string;
  issueDate: string;
  expiryDate?: string;
  documentFiles: File[];
};

export type OnboardingData = {
  familyOfficeInfo: FamilyOfficeInfo;
  primaryContactInfo: PrimaryContactInfo;
  addressInfo: AddressInfo;
  legalDocuments: LegalDocuments;
  aggregatorInfo: AggregatorInfo;
  financialAccounts: FinancialAccountInfo[];
  beneficialOwners: BeneficialOwnerInfo[];
  personalInfo: PersonalInfo;
  identityVerification: IdentityVerification;
  completed: boolean;
  documents?: string[];
  isOnboardingCompleted?: boolean;
};

export type OnboardingContextType = {
  onboardingData: OnboardingData;
  updateFamilyOfficeInfo: (info: FamilyOfficeInfo) => void;
  updatePrimaryContactInfo: (info: PrimaryContactInfo) => void;
  updateAddressInfo: (info: AddressInfo) => void;
  updateLegalDocuments: (info: LegalDocuments) => void;
  updateAggregatorInfo: (info: AggregatorInfo) => void;
  addFinancialAccount: (account: FinancialAccountInfo) => void;
  removeFinancialAccount: (index: number) => void;
  updateFinancialAccount: (index: number, account: FinancialAccountInfo) => void;
  addBeneficialOwner: (owner: BeneficialOwnerInfo) => void;
  removeBeneficialOwner: (index: number) => void;
  updatePersonalInfo: (info: PersonalInfo) => void;
  updateIdentityVerification: (info: IdentityVerification) => void;
  setOnboardingCompleted: () => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  resetOnboarding: () => void;
};
