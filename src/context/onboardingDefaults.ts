
import { OnboardingData } from "@/types/onboarding";

// Set default empty values
export const defaultOnboardingData: OnboardingData = {
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
    documentType: "",
    documentNumber: "",
    issueDate: "",
    documentFiles: [],
  },
  aggregatorInfo: {
    usesAggregator: false,
  },
  financialAccounts: [],
  beneficialOwners: [],
  personalInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    nationality: "",
  },
  identityVerification: {
    documentType: "passport",
    documentNumber: "",
    issueDate: "",
    expiryDate: "",
    documentFiles: [],
  },
  completed: false,
};
