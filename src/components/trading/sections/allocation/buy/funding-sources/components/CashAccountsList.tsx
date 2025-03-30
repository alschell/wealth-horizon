
import React from "react";
import { mockCashAccountsFlat } from "@/components/trading/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

interface CashAccountsListProps {
  tempAllocations: Record<string, number>;
  handleTempAllocationChange: (sourceId: string, quantity: number) => void;
  instrumentPrice: number;
  remainingShares: number;
  searchQuery: string;
}

export const CashAccountsList: React.FC<CashAccountsListProps> = ({
  tempAllocations,
  handleTempAllocationChange,
  instrumentPrice,
  remainingShares,
  searchQuery
}) => {
  // Filter cash accounts by search query
  const filteredAccounts = searchQuery
    ? mockCashAccountsFlat.filter(
        account =>
          account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          account.accountNumber.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockCashAccountsFlat;
    
  // Handle setting allocation to maximum available for an account
  const handleSetMax = (accountId: string, maxShares: number) => {
    handleTempAllocationChange(accountId, maxShares);
  };
  
  // Handle adding the remaining shares needed to an account
  const handleAddRemaining = (accountId: string, maxAvailableShares: number) => {
    const sharesToAdd = Math.min(remainingShares, maxAvailableShares);
    if (sharesToAdd > 0) {
      const currentAllocation = tempAllocations[accountId] || 0;
      handleTempAllocationChange(accountId, currentAllocation + sharesToAdd);
    }
  };
  
  return (
    <div className="space-y-4">
      {filteredAccounts.length === 0 ? (
        <div className="text-center py-4 text-gray-500">No cash accounts found matching your search</div>
      ) : (
        filteredAccounts.map(account => {
          const maxAvailableShares = Math.floor(account.balance / instrumentPrice);
          const currentAllocation = tempAllocations[accountId] || 0;
          
          return (
            <div key={account.id} className="border rounded-md p-3">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium text-sm">{account.name}</h4>
                  <p className="text-xs text-gray-500">{account.accountNumber}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {formatCurrency(account.balance, account.currency)}
                  </p>
                  <p className="text-xs text-gray-500">
                    Max: {maxAvailableShares.toFixed(2)} shares
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-24">
                  <Input
                    type="number"
                    min="0"
                    max={maxAvailableShares}
                    value={tempAllocations[account.id] || 0}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      const validValue = isNaN(value) ? 0 : Math.min(value, maxAvailableShares);
                      handleTempAllocationChange(account.id, validValue);
                    }}
                    className="text-right h-8"
                  />
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => handleSetMax(account.id, maxAvailableShares)}
                >
                  Max
                </Button>
                {remainingShares > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => handleAddRemaining(account.id, maxAvailableShares)}
                  >
                    Add Remaining
                  </Button>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default CashAccountsList;
