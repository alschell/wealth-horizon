
import React, { useState } from "react";
import { FinancialAccountInfo } from "@/context/OnboardingContext";
import AccountCard from "./AccountCard";
import DeleteConfirmationDialog from "@/components/file-uploader/DeleteConfirmationDialog";
import { EditButton, DeleteButton } from "@/components/ui/action-buttons";

interface AccountListProps {
  accounts: FinancialAccountInfo[];
  onRemoveAccount: (index: number) => void;
  onEditAccount?: (index: number) => void;
}

const AccountList = ({ accounts, onRemoveAccount, onEditAccount }: AccountListProps) => {
  const [accountToDeleteIndex, setAccountToDeleteIndex] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteClick = (index: number) => {
    setAccountToDeleteIndex(index);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (accountToDeleteIndex !== null) {
      onRemoveAccount(accountToDeleteIndex);
    }
    setIsDeleteDialogOpen(false);
    setAccountToDeleteIndex(null);
  };

  if (accounts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <h3 className="font-medium">Added Financial Accounts</h3>
      <div className="space-y-2">
        {accounts.map((account, index) => (
          <div key={index} className="p-3 bg-gray-50 rounded-md">
            <div className="flex justify-between">
              <div>
                <div className="font-medium">{account.accountName}</div>
                <div className="text-sm text-gray-600">
                  {account.institution} • {account.accountType}
                  {account.currency && ` • ${account.currency}`}
                </div>
              </div>
              <div className="flex space-x-2">
                {onEditAccount && (
                  <EditButton onClick={() => onEditAccount(index)} />
                )}
                <DeleteButton onClick={() => handleDeleteClick(index)} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={confirmDelete}
        title="Confirm Account Deletion"
        description="Are you sure you want to delete this financial account? This action cannot be undone."
      />
    </div>
  );
};

export default AccountList;
