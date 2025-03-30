
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { CashAccount } from "@/components/trading/types";

interface AccountItemProps {
  account: CashAccount;
  currentShares: number;
  instrumentPrice: number;
  handleAllocationChange: (sourceId: string, quantity: number) => void;
  remainingShares: number;
}

export const AccountItem: React.FC<AccountItemProps> = ({
  account,
  currentShares,
  instrumentPrice,
  handleAllocationChange,
  remainingShares
}) => {
  const [shares, setShares] = useState(currentShares.toString());
  
  // Calculate maximum amount of shares that can be allocated from this account
  const maxShares = account.balance / instrumentPrice;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setShares(newValue);
    
    const numericValue = parseFloat(newValue) || 0;
    handleAllocationChange(account.id, numericValue);
  };
  
  const handleMax = () => {
    // Calculate the maximum shares to allocate, considering the remaining shares needed
    const sharesNeeded = Math.min(maxShares, remainingShares + currentShares);
    setShares(sharesNeeded.toString());
    handleAllocationChange(account.id, sharesNeeded);
  };
  
  // Format the estimated amount
  const estimatedAmount = (parseFloat(shares) || 0) * instrumentPrice;
  
  return (
    <div className="border rounded-md p-3 hover:bg-gray-50 transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-gray-900">{account.name}</h3>
          <p className="text-sm text-gray-500">{account.currency}</p>
          <p className="text-sm mt-1">
            Balance: {account.balance.toLocaleString('en-US', { 
              style: 'currency', 
              currency: account.currency 
            })}
          </p>
        </div>
        <div className="text-right min-w-[150px]">
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={shares}
              onChange={handleChange}
              className="w-28 text-right"
              min="0"
              max={maxShares.toString()}
            />
            <button 
              onClick={handleMax}
              className="text-xs text-blue-600 border border-blue-600 rounded px-2 py-1 hover:bg-blue-50"
              type="button"
            >
              Max
            </button>
          </div>
          <p className="text-xs mt-1 text-gray-500">Number of funded shares</p>
          <p className="text-xs mt-1 text-gray-600">
            Est. debit amount: {estimatedAmount.toLocaleString('en-US', { 
              style: 'currency', 
              currency: account.currency 
            })}
          </p>
        </div>
      </div>
    </div>
  );
};
