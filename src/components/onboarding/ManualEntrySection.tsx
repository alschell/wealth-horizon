
import React, { useState } from "react";
import { FinancialAccountInfo } from "@/types/onboarding";
import { AccountForm, AccountList } from "./accounts/entry";

interface ManualEntrySectionProps {
  financialAccounts: FinancialAccountInfo[];
  addFinancialAccount: (account: FinancialAccountInfo) => void;
  removeFinancialAccount: (index: number) => void;
  updateFinancialAccount?: (index: number, account: FinancialAccountInfo) => void;
}

const ManualEntrySection = ({
  financialAccounts,
  addFinancialAccount,
  removeFinancialAccount,
  updateFinancialAccount
}: ManualEntrySectionProps) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  
  // Function to handle editing an account
  const handleEditAccount = (index: number) => {
    setEditingIndex(index);
  };
  
  // Function to handle saving an edited account
  const handleSaveAccount = (account: FinancialAccountInfo) => {
    if (editingIndex !== null && updateFinancialAccount) {
      updateFinancialAccount(editingIndex, account);
      setEditingIndex(null);
    } else {
      addFinancialAccount(account);
    }
  };

  return (
    <div className="space-y-6">
      {/* List of existing accounts */}
      <AccountList 
        accounts={financialAccounts} 
        onRemoveAccount={removeFinancialAccount}
        onEditAccount={handleEditAccount}
      />
      
      {/* Form to add or edit an account */}
      <AccountForm 
        onAddAccount={handleSaveAccount}
        accountToEdit={editingIndex !== null ? financialAccounts[editingIndex] : undefined}
        isEditing={editingIndex !== null}
      />
    </div>
  );
};

export default ManualEntrySection;
