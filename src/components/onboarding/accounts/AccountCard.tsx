
import React from "react";
import { FinancialAccountInfo } from "@/context/OnboardingContext";
import { Card } from "@/components/ui/card";
import { CreditCard, Wallet, PiggyBank, Coins, Banknote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { EditButton, DeleteButton } from "@/components/ui/action-buttons";

interface AccountCardProps {
  account: FinancialAccountInfo;
  onRemove: () => void;
  onEdit: () => void;
  index: number;
}

const AccountCard = ({ account, onRemove, onEdit, index }: AccountCardProps) => {
  // Function to get the appropriate icon based on account type
  const getAccountIcon = () => {
    switch (account.accountType) {
      case "cash":
        return <Banknote className="h-5 w-5 text-blue-500" />;
      case "portfolio":
        return <PiggyBank className="h-5 w-5 text-blue-500" />;
      case "custody":
        return <Wallet className="h-5 w-5 text-blue-500" />;
      case "broker":
        return <CreditCard className="h-5 w-5 text-blue-500" />;
      case "investment":
        return <Coins className="h-5 w-5 text-blue-500" />;
      default:
        return <Wallet className="h-5 w-5 text-gray-500" />;
    }
  };

  // Function to format the account type display
  const formatAccountType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <Card className="p-3 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center">
        <div className="flex items-start gap-3">
          <div className="mt-1">
            {getAccountIcon()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{account.accountName}</h3>
              <Badge variant="outline" className="text-xs bg-gray-100">
                {formatAccountType(account.accountType)}
              </Badge>
            </div>
            <p className="text-sm text-gray-500">
              {account.institution}
              {account.approximateValue && account.currency && 
                ` • ~${account.approximateValue} ${account.currency}`}
            </p>
            {account.accountSubtype && (
              <p className="text-xs text-gray-400 mt-1">
                Subtype: {account.accountSubtype}
              </p>
            )}
            {account.statements && account.statements.length > 0 && (
              <p className="text-xs text-gray-400 mt-1">
                {account.statements.length} statement{account.statements.length !== 1 ? 's' : ''} attached
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <EditButton 
            onClick={onEdit} 
            size="icon"
          />
          <DeleteButton 
            onClick={onRemove} 
            size="icon"
          />
        </div>
      </div>
    </Card>
  );
};

export default AccountCard;
