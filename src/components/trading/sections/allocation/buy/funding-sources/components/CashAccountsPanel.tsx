
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockCashAccountsFlat } from "@/components/trading/data";

interface CashAccountsPanelProps {
  tempAllocations: Record<string, number>;
  handleTempAllocationChange: (sourceId: string, amount: number) => void;
  totalAmount: number;
  instrumentPrice: number;
}

export const CashAccountsPanel: React.FC<CashAccountsPanelProps> = ({
  tempAllocations,
  handleTempAllocationChange,
  totalAmount,
  instrumentPrice
}) => {
  return (
    <div className="mt-4 space-y-4">
      {mockCashAccountsFlat.map(account => {
        const isSelected = Boolean(tempAllocations[account.id]);
        const maxSharesAllowed = Math.floor(account.balance / instrumentPrice);
        
        return (
          <div key={account.id} className="p-4 border rounded-md">
            <div className="flex justify-between items-start mb-2">
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
            
            <div className="flex items-center gap-2 mt-4">
              <Input
                type="number"
                min="0"
                max={maxSharesAllowed}
                value={tempAllocations[account.id] || ""}
                onChange={(e) => handleTempAllocationChange(account.id, Number(e.target.value))}
                className="w-full"
                placeholder="0.00"
              />
              <Button
                variant="outline"
                size="sm"
                className="whitespace-nowrap"
                onClick={() => handleTempAllocationChange(
                  account.id,
                  Math.min(maxSharesAllowed, totalAmount / instrumentPrice)
                )}
              >
                Max
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
