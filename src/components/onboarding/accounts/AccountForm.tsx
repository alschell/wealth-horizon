
import React from "react";
import { FinancialAccountInfo } from "@/context/OnboardingContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import AccountFormFields from "./AccountFormFields";
import { AccountFormHeader } from "./form";

interface AccountFormProps {
  onAddAccount: (account: FinancialAccountInfo) => void;
}

const AccountForm = ({ onAddAccount }: AccountFormProps) => {
  const { useAccountForm } = require('./hooks/useAccountForm');
  
  const {
    newAccount,
    errors,
    handleNewAccountChange,
    handleAccountSelectionChange,
    handleLegalEntityChange,
    handleLeiChange,
    handleStatementsSelected,
    handleAddAccount,
    isFormValid
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
        errors={errors}
        onInputChange={handleNewAccountChange}
        onSelectionChange={handleAccountSelectionChange}
        onLegalEntityChange={handleLegalEntityChange}
        onLeiChange={handleLeiChange}
        onStatementsSelected={handleStatementsSelected}
      />
      
      <div className="flex justify-end">
        <Button
          type="button"
          variant="default"
          onClick={handleAddAccount}
          disabled={!isFormValid}
          className={`mt-2 ${!isFormValid ? 'bg-gray-300 text-gray-500' : 'bg-black hover:bg-gray-800 text-white'}`}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Account
        </Button>
      </div>
    </motion.div>
  );
};

export default AccountForm;
