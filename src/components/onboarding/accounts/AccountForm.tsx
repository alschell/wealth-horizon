
import React from "react";
import { FinancialAccountInfo } from "@/context/OnboardingContext";
import AccountFormFields from "./AccountFormFields";
import { AccountFormHeader, AccountFormButton } from "./form";
import { useAccountForm } from "./hooks/useAccountForm";

interface AccountFormProps {
  onAddAccount: (account: FinancialAccountInfo) => void;
}

const AccountForm = ({ onAddAccount }: AccountFormProps) => {
  const {
    newAccount,
    handleNewAccountChange,
    handleAccountSelectionChange,
    handleStatementsSelected,
    handleAddAccount
  } = useAccountForm(onAddAccount);

  return (
    <div className="space-y-4">
      <AccountFormHeader />
      
      <AccountFormFields
        account={newAccount}
        onInputChange={handleNewAccountChange}
        onSelectionChange={handleAccountSelectionChange}
        onStatementsSelected={handleStatementsSelected}
      />
      
      <AccountFormButton onClick={handleAddAccount} />
    </div>
  );
};

export default AccountForm;
