import React, { useState } from "react";
import { FinancialAccountInfo } from "@/types/onboarding";
import { useAccountFormState } from "./accounts/entry/hooks/useAccountFormState";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, AlertCircle } from "lucide-react";
import AccountCard from "./accounts/AccountCard";
import AccountEntryForm from "./accounts/entry/AccountEntryForm";

interface ManualEntrySectionProps {
  financialAccounts: FinancialAccountInfo[];
  addFinancialAccount: (account: FinancialAccountInfo) => void;
  removeFinancialAccount: (index: number) => void;
  updateFinancialAccount: (index: number, account: FinancialAccountInfo) => void;
}

const ManualEntrySection: React.FC<ManualEntrySectionProps> = ({
  financialAccounts,
  addFinancialAccount,
  removeFinancialAccount,
  updateFinancialAccount
}) => {
  const [showAddForm, setShowAddForm] = useState(true);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  
  const accountFormState = useAccountFormState({
    onAddAccount: (account) => {
      if (editingIndex !== null) {
        updateFinancialAccount(editingIndex, account);
        setEditingIndex(null);
      } else {
        addFinancialAccount(account);
      }
      setShowAddForm(false);
    },
    initialAccount: editingIndex !== null ? financialAccounts[editingIndex] : undefined
  });
  
  const handleEditAccount = (index: number) => {
    setEditingIndex(index);
    setShowAddForm(true);
  };

  const handleCancelForm = () => {
    if (financialAccounts.length === 0) {
      // Keep form visible if no accounts added yet
      return;
    }
    setShowAddForm(false);
    setEditingIndex(null);
  };

  return (
    <div className="space-y-6">
      {/* Display existing accounts */}
      {financialAccounts.length > 0 ? (
        <div className="space-y-4">
          {financialAccounts.map((account, index) => (
            <AccountCard
              key={index}
              account={account}
              index={index}
              onEdit={() => handleEditAccount(index)}
              onRemove={() => removeFinancialAccount(index)}
            />
          ))}
        </div>
      ) : !showAddForm ? (
        <div className="text-center py-8 border rounded-lg bg-gray-50">
          <AlertCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500">No financial accounts added yet.</p>
          <p className="text-sm text-gray-400 mt-1">Please add at least one account.</p>
        </div>
      ) : null}
      
      {/* Button to show add form */}
      {!showAddForm && (
        <Button 
          onClick={() => {
            setShowAddForm(true);
            setEditingIndex(null);
          }}
          className="w-full py-6 flex items-center justify-center gap-2"
          variant="outline"
        >
          <PlusCircle className="h-5 w-5" />
          Add Financial Account
        </Button>
      )}
      
      {/* Account entry form */}
      {showAddForm && (
        <Card className="border border-gray-200">
          <CardContent className="p-5">
            <AccountEntryForm
              formState={accountFormState}
              isEditing={editingIndex !== null}
              onCancel={handleCancelForm}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ManualEntrySection;
