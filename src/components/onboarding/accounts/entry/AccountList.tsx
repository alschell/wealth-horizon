
import React from "react";
import { FinancialAccountInfo } from "@/types/onboarding";
import { Button } from "@/components/ui/button";
import { Wallet, Trash2, Edit } from "lucide-react";

interface AccountListProps {
  accounts: FinancialAccountInfo[];
  onRemoveAccount: (index: number) => void;
  onEditAccount: (index: number) => void;
}

const AccountList = ({ accounts, onRemoveAccount, onEditAccount }: AccountListProps) => {
  // Map account type to appropriate label for display
  const getAccountTypeLabel = (type: string) => {
    // Capitalize first letter
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  if (accounts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4 mb-8">
      <h3 className="font-medium text-gray-700">Your Financial Accounts</h3>
      
      {accounts.map((account, index) => (
        <div 
          key={index} 
          className="flex items-center justify-between p-4 border rounded-md bg-gray-50"
        >
          <div className="flex items-center gap-3">
            <Wallet className="h-5 w-5 text-gray-500" />
            <div>
              <p className="font-medium">{account.accountName}</p>
              <p className="text-sm text-gray-500">
                {account.institution} · {getAccountTypeLabel(account.accountType)}
                {account.currency && ` · ${account.currency}`}
              </p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEditAccount(index)}
              className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
              aria-label="Edit account"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemoveAccount(index)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccountList;
