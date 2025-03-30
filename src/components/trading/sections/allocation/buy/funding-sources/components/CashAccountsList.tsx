
import React from "react";
import { mockPortfoliosByInstitution } from "@/components/trading/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AccountItemProps {
  account: any;
  currentShares: number;
  onAllocationChange: (accountId: string, quantity: number) => void;
  instrumentPrice: number;
  remainingShares: number;
}

const AccountItem: React.FC<AccountItemProps> = ({
  account,
  currentShares,
  onAllocationChange,
  instrumentPrice,
  remainingShares
}) => {
  // Calculate max number of shares that can be allocated
  const handleMaxClick = () => {
    const maxShares = Math.min(
      account.balance / instrumentPrice,
      remainingShares + (currentShares || 0)
    );
    onAllocationChange(account.id, maxShares);
  };

  return (
    <div className="p-4 border rounded-md mb-3 last:mb-0">
      <div className="flex justify-between items-start space-x-4">
        <div className="flex-1">
          <div className="font-medium text-md truncate w-full">{account.name}</div>
          <div className="text-sm text-gray-500">
            Balance: {account.balance.toLocaleString('en-US', {
              style: 'currency',
              currency: account.currency
            })}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-32 sm:w-44">
            <Input 
              type="number" 
              min="0"
              placeholder="Number of funded shares"
              value={currentShares || ''}
              onChange={(e) => onAllocationChange(account.id, Number(e.target.value))}
              className="w-full"
            />
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleMaxClick}
            className="whitespace-nowrap"
          >
            Max
          </Button>
        </div>
      </div>
    </div>
  );
};

interface CashAccountsListProps {
  tempAllocations: Record<string, number>;
  handleTempAllocationChange: (sourceId: string, quantity: number) => void;
  instrumentPrice: number;
  remainingShares: number;
  searchQuery?: string;
}

export const CashAccountsList: React.FC<CashAccountsListProps> = ({
  tempAllocations,
  handleTempAllocationChange,
  instrumentPrice,
  remainingShares,
  searchQuery = ""
}) => {
  // Filter institutions based on search query
  const filteredInstitutions = mockPortfoliosByInstitution.filter(institution => {
    if (!searchQuery) return true;
    
    // Check if institution name matches
    if (institution.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return true;
    }
    
    // Check if any legal entity or account matches
    for (const entity of institution.legalEntities || []) {
      if (entity.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return true;
      }
      
      // Check accounts
      for (const account of entity.cashAccounts || []) {
        if (account.name.toLowerCase().includes(searchQuery.toLowerCase())) {
          return true;
        }
      }
    }
    
    return false;
  });

  if (filteredInstitutions.length === 0) {
    return <div className="text-center py-8 text-gray-500">No cash accounts found</div>;
  }

  return (
    <div className="space-y-6">
      {filteredInstitutions.map(institution => (
        <div key={institution.id} className="mb-6">
          <h3 className="text-md font-medium mb-3">{institution.name}</h3>
          
          <div className="space-y-6">
            {institution.legalEntities?.map(entity => (
              <div key={entity.id} className="pl-4 border-l-2 border-gray-200 mb-4">
                <h4 className="text-sm font-medium mb-3">{entity.name}</h4>
                
                <div className="space-y-2">
                  {entity.cashAccounts?.map(account => (
                    <AccountItem
                      key={account.id}
                      account={account}
                      currentShares={tempAllocations[account.id] || 0}
                      onAllocationChange={handleTempAllocationChange}
                      instrumentPrice={instrumentPrice}
                      remainingShares={remainingShares}
                    />
                  ))}
                  
                  {(!entity.cashAccounts || entity.cashAccounts.length === 0) && (
                    <div className="text-sm text-gray-500 pl-4">No cash accounts available</div>
                  )}
                </div>
              </div>
            ))}
            
            {(!institution.legalEntities || institution.legalEntities.length === 0) && (
              <div className="text-sm text-gray-500 pl-4">No legal entities available</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
