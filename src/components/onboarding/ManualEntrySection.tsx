
import React from "react";
import { FinancialAccountInfo } from "@/types/onboarding";
import { AccountForm, AccountList } from "./accounts/entry";

interface ManualEntrySectionProps {
  financialAccounts: FinancialAccountInfo[];
  addFinancialAccount: (account: FinancialAccountInfo) => void;
  removeFinancialAccount: (index: number) => void;
}

const ManualEntrySection = ({
  financialAccounts,
  addFinancialAccount,
  removeFinancialAccount
}: ManualEntrySectionProps) => {
  return (
    <div className="space-y-6">
      {/* List of existing accounts */}
      <AccountList 
        accounts={financialAccounts} 
        onRemoveAccount={removeFinancialAccount} 
      />
      
      {/* Form to add a new account */}
      <AccountForm 
        onAddAccount={addFinancialAccount}
        enableLegalEntityFields={true}
      />
    </div>
  );
};

export default ManualEntrySection;
