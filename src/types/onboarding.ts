
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
  streetAddress: string;
  addressLine2?: string;
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
  accountType: "cash" | "portfolio" | "investment" | "custody" | "broker" | "checking" | "savings" | "brokerage" | "trust" | "retirement" | "private equity" | "hedge fund" | "venture capital" | "real estate" | "fixed income" | "credit" | "other";
  accountSubtype?: string;
  currency: string;
  approximateValue: string;
  statements: File[];
  legalEntity?: string;
  legalEntityIdentifier?: string;
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
  expiryDate: string;
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
  addBeneficialOwner: (owner: BeneficialOwnerInfo) => void;
  removeBeneficialOwner: (index: number) => void;
  updatePersonalInfo: (info: PersonalInfo) => void;
  updateIdentityVerification: (info: IdentityVerification) => void;
  setOnboardingCompleted: () => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  resetOnboarding: () => void;
};
