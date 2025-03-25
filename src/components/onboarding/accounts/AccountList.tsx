
import React from "react";
import { FinancialAccountInfo } from "@/context/OnboardingContext";
import { Card } from "@/components/ui/card";
import { EditButton, DeleteButton } from "@/components/ui/action-buttons";
import { Building, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

interface AccountListProps {
  accounts: FinancialAccountInfo[];
  onEditAccount: (index: number) => void;
  onDeleteAccount: (index: number) => void;
}

const AccountList: React.FC<AccountListProps> = ({
  accounts,
  onEditAccount,
  onDeleteAccount
}) => {
  if (accounts.length === 0) {
    return (
      <div className="text-center p-6 border border-dashed rounded-lg bg-gray-50">
        <p className="text-gray-500">No financial accounts added yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {accounts.map((account, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-4 flex justify-between items-start hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-50 rounded-md flex-shrink-0 mt-1">
                {account.accountType === "investment" ? (
                  <CreditCard className="h-4 w-4 text-blue-600" />
                ) : (
                  <Building className="h-4 w-4 text-blue-600" />
                )}
              </div>
              <div>
                <h3 className="font-medium text-black">{account.accountName}</h3>
                <p className="text-sm text-gray-600">{account.institution}</p>
                <div className="text-xs text-gray-500 mt-1">
                  {account.accountType} {account.currency && `• ${account.currency}`}
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <EditButton onClick={() => onEditAccount(index)} />
              <DeleteButton onClick={() => onDeleteAccount(index)} />
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default AccountList;
