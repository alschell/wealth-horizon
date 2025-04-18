
import { FinancialAccountInfo } from "@/types/onboarding";

export interface AccountFormErrors {
  [key: string]: string;
}

export interface UseAccountFormStateProps {
  onAddAccount: (account: FinancialAccountInfo) => void;
  initialAccount?: FinancialAccountInfo;
}

export interface UseAccountFormStateReturn {
  newAccount: FinancialAccountInfo;
  errors: AccountFormErrors;
  legalEntities: Record<string, string[]>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectionChange: (field: keyof FinancialAccountInfo, value: string) => void;
  handleLegalEntityChange: (value: string) => void;
  handleLeiChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFilesSelected: (files: File[]) => void;
  handleAddAccount: () => void;
  isFormValid: boolean;
}

// Ensure accountType has an empty string as a valid option for the select placeholder
type AccountTypeWithPlaceholder = FinancialAccountInfo['accountType'] | '';

export interface AccountTypeOptions {
  value: FinancialAccountInfo['accountType'];
  label: string;
}

export const DEFAULT_ACCOUNT: FinancialAccountInfo = {
  accountName: "",
  institution: "",
  accountType: "other", // Default fallback for type safety
  legalEntity: "",
  legalEntityIdentifier: "",
  accountSubtype: "",
  currency: "",
  approximateValue: "",
  statements: [],
  accountNumber: "", // Add accountNumber field
  swiftCode: "" // Add swiftCode field
};

// Utility function to create a placeholder version of the account for new entries
export const createPlaceholderAccount = (): FinancialAccountInfo => ({
  ...DEFAULT_ACCOUNT
});
