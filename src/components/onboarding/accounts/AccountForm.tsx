
import React from "react";
import { FinancialAccountInfo } from "@/context/OnboardingContext";
import { motion } from "framer-motion";
import { useAccountForm } from "./hooks/useAccountForm";
import AccountFormFields from "./AccountFormFields";
import { AccountFormHeader, AccountFormButton } from "./form";

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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <AccountFormHeader />
      
      <AccountFormFields
        account={newAccount}
        onInputChange={handleNewAccountChange}
        onSelectionChange={handleAccountSelectionChange}
        onStatementsSelected={handleStatementsSelected}
      />
      
      <AccountFormButton onClick={handleAddAccount} />
    </motion.div>
  );
};

export default AccountForm;
