
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
  const maxSharesFromAccount = Math.floor(account.balance / instrumentPrice);
  const estimatedAmount = currentShares * instrumentPrice;
  
  return (
    <div className="p-4 border rounded-md ml-2">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-medium">{account.name}</h4>
          <p className="text-xs text-gray-500">{account.currency} Account</p>
        </div>
        <div className="text-sm text-right">
          <div>Available</div>
          <div className="font-semibold">
            {account.balance.toLocaleString('en-US', {
              style: 'currency',
              currency: account.currency
            })}
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Input
            type="number"
            min="0"
            max={maxSharesFromAccount}
            value={currentShares || ""}
            onChange={(e) => handleAllocationChange(account.id, Number(e.target.value))}
            className="w-full"
            placeholder="Number of funded shares"
          />
          <Button
            variant="outline"
            size="sm"
            className="whitespace-nowrap"
            onClick={() => handleAllocationChange(
              account.id,
              Math.min(maxSharesFromAccount, Math.ceil(remainingShares > 0 ? remainingShares : 0))
            )}
          >
            Max
          </Button>
        </div>
        
        {currentShares > 0 && (
          <p className="text-sm text-gray-600">
            Est. debit amount: {estimatedAmount.toLocaleString('en-US', {
              style: 'currency', 
              currency: account.currency
            })}
          </p>
        )}
      </div>
    </div>
  );
};
