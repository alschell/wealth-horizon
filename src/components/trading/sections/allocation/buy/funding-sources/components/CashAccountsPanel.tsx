
import React from "react";
import { AccountItem } from "./AccountItem";
import { mockCashAccountsFlat } from "@/components/trading/data";

interface CashAccountsPanelProps {
  tempAllocations: Record<string, number>;
  handleTempAllocationChange: (sourceId: string, quantity: number) => void;
  totalAmount: number;
  instrumentPrice: number;
}

export const CashAccountsPanel: React.FC<CashAccountsPanelProps> = ({
  tempAllocations,
  handleTempAllocationChange,
  totalAmount,
  instrumentPrice
}) => {
  // Calculate remaining shares
  const requiredShares = totalAmount / instrumentPrice;
  const allocatedShares = Object.values(tempAllocations).reduce((sum, qty) => sum + qty, 0);
  const remainingShares = requiredShares - allocatedShares;
  
  return (
    <div className="space-y-4 mt-4 max-h-96 overflow-y-auto pr-1">
      {mockCashAccountsFlat.map((account) => (
        <AccountItem
          key={account.id}
          account={account}
          currentShares={tempAllocations[account.id] || 0}
          instrumentPrice={instrumentPrice}
          handleAllocationChange={handleTempAllocationChange}
          remainingShares={remainingShares}
        />
      ))}
    </div>
  );
};
