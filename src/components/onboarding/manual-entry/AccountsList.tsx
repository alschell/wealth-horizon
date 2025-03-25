
import React from "react";
import { ManualEntrySectionProps } from "./types";
import AccountCard from "./AccountCard";

const AccountsList: React.FC<Pick<ManualEntrySectionProps, 'accounts' | 'onRemoveAccount'>> = ({ 
  accounts, 
  onRemoveAccount 
}) => {
  if (accounts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3 mt-6">
      <h3 className="text-lg font-medium">Added Accounts</h3>
      
      <div className="grid grid-cols-1 gap-3">
        {accounts.map((account, index) => (
          <AccountCard 
            key={index} 
            account={account} 
            index={index} 
            onRemove={onRemoveAccount} 
          />
        ))}
      </div>
    </div>
  );
};

export default AccountsList;
