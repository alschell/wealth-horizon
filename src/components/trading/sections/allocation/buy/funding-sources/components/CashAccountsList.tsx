
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockCashAccountsFlat } from "@/components/trading/data";

interface CashAccountsListProps {
  tempAllocations: Record<string, number>;
  handleTempAllocationChange: (sourceId: string, amount: number) => void;
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
  const filteredAccounts = mockCashAccountsFlat.filter(account => {
    if (!searchQuery) return true;
    
    // Map ID to names for filtering
    const institutionName = account.institutionId?.toLowerCase();
    const legalEntityName = account.legalEntityId?.toLowerCase();
    const searchLower = searchQuery.toLowerCase();
    
    return (
      account.name.toLowerCase().includes(searchLower) ||
      (institutionName && institutionName.includes(searchLower)) ||
      (legalEntityName && legalEntityName.includes(searchLower))
    );
  });
  
  const handleInputChange = (sourceId: string, value: string) => {
    // Allow empty value to clear the input
    if (value === '') {
      handleTempAllocationChange(sourceId, 0);
      return;
    }
    
    // Convert to number and update
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      handleTempAllocationChange(sourceId, numValue);
    }
  };
  
  const handleMaxClick = (sourceId: string, maxShares: number) => {
    handleTempAllocationChange(sourceId, maxShares);
  };
  
  return (
    <div className="space-y-4">
      {filteredAccounts.length === 0 ? (
        <p className="text-center py-4 text-gray-500">No cash accounts found matching your search.</p>
      ) : (
        filteredAccounts.map(account => {
          const maxShares = Math.floor(account.balance / instrumentPrice);
          const currentShares = tempAllocations[account.id] || 0;
          
          return (
            <div key={account.id} className="p-3 border rounded-md">
              <div className="flex justify-between mb-2">
                <div>
                  <h4 className="font-medium">{account.name}</h4>
                  <p className="text-xs text-gray-500">{account.legalEntityId} • {account.institutionId}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {account.balance.toLocaleString('en-US', {
                      style: 'currency',
                      currency: account.currency
                    })}
                  </p>
                  <p className="text-xs text-gray-500">
                    Available: {maxShares.toLocaleString()} shares
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 items-center mt-3">
                <Input
                  type="text"
                  min="0"
                  max={maxShares}
                  value={currentShares || ''}
                  onChange={(e) => handleInputChange(account.id, e.target.value)}
                  className="w-24 h-9"
                  placeholder="0"
                />
                
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 text-xs"
                  onClick={() => handleMaxClick(account.id, maxShares)}
                >
                  Max ({maxShares})
                </Button>
                
                {remainingShares > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 text-xs"
                    onClick={() => handleTempAllocationChange(account.id, Math.min(maxShares, currentShares + Math.ceil(remainingShares)))}
                  >
                    Add Remaining ({Math.ceil(remainingShares)})
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
