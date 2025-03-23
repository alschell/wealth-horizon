
import React from "react";
import { FinancialAccountInfo } from "@/context/OnboardingContext";
import AccountCard from "./AccountCard";

interface AccountListProps {
  accounts: FinancialAccountInfo[];
  onRemoveAccount: (index: number) => void;
}

const AccountList = ({ accounts, onRemoveAccount }: AccountListProps) => {
  if (accounts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <h3 className="font-medium">Added Financial Accounts</h3>
      <div className="space-y-2">
        {accounts.map((account, index) => (
          <AccountCard 
            key={index}
            account={account}
            index={index}
            onRemove={() => onRemoveAccount(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default AccountList;
