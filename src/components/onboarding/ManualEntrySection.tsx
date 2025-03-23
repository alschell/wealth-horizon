
import { useState } from "react";
import { FinancialAccountInfo } from "@/context/OnboardingContext";
import { AccountForm, AccountList } from "./accounts";

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
    <div className="space-y-4 mt-4">
      {/* List of added accounts */}
      <AccountList 
        accounts={financialAccounts} 
        onRemoveAccount={removeFinancialAccount} 
      />
      
      {/* Add new account form */}
      <AccountForm onAddAccount={addFinancialAccount} />
    </div>
  );
};

export default ManualEntrySection;
