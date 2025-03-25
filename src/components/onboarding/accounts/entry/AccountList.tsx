
import React from "react";
import { FinancialAccountInfo } from "@/types/onboarding";
import { Button } from "@/components/ui/button";
import { Trash2, Edit } from "lucide-react";

interface AccountListProps {
  accounts: FinancialAccountInfo[];
  onDeleteAccount: (index: number) => void;
  onEditAccount: (index: number) => void;
}

const AccountList: React.FC<AccountListProps> = ({ 
  accounts, 
  onDeleteAccount,
  onEditAccount 
}) => {
  if (!accounts.length) return null;

  return (
    <div className="space-y-3 mt-6">
      <h3 className="font-medium">Added Accounts</h3>
      <div className="space-y-2">
        {accounts.map((account, index) => (
          <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
            <div>
              <p className="text-sm font-medium">{account.accountName || "Unnamed Account"}</p>
              <p className="text-xs text-gray-500">
                {account.institution} • {account.accountType}
                {account.currency && ` • ${account.currency}`}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-blue-500"
                onClick={() => onEditAccount(index)}
              >
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit account</span>
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-red-500"
                onClick={() => onDeleteAccount(index)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete account</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountList;
