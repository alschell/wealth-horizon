
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
}

export const DEFAULT_ACCOUNT: FinancialAccountInfo = {
  accountName: "",
  institution: "",
  accountType: "other",
  legalEntity: "",
  legalEntityIdentifier: "",
  accountSubtype: "",
  currency: "",
  approximateValue: "",
  statements: []
};
