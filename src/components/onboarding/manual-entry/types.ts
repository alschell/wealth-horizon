
import { FinancialAccountInfo } from "@/context/OnboardingContext";

export interface ManualEntrySectionProps {
  accounts: FinancialAccountInfo[];
  onAddAccount: (account: FinancialAccountInfo) => void;
  onRemoveAccount: (index: number) => void;
}

export interface AccountCardProps {
  account: FinancialAccountInfo;
  index: number;
  onRemove: (index: number) => void;
}

export interface AccountFormProps {
  onAddAccount: (account: FinancialAccountInfo) => void;
}
