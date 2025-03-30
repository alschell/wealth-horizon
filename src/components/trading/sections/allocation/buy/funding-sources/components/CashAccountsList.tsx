
import React from "react";
import { mockPortfoliosByInstitution } from "@/components/trading/data";
import { InstitutionSection } from "./InstitutionSection";
import { LegalEntitySection } from "./LegalEntitySection";

interface CashAccountsListProps {
  tempAllocations: Record<string, number>;
  handleAllocationChange: (sourceId: string, quantity: number) => void;
  instrumentPrice: number;
  remainingShares: number;
  searchQuery?: string;
}

export const CashAccountsList: React.FC<CashAccountsListProps> = ({
  tempAllocations,
  handleAllocationChange,
  instrumentPrice,
  remainingShares,
  searchQuery = ""
}) => {
  // Filter institutions based on search query
  const filteredInstitutions = React.useMemo(() => {
    if (!searchQuery.trim()) return mockPortfoliosByInstitution;

    const query = searchQuery.toLowerCase();
    return mockPortfoliosByInstitution.map(institution => {
      // Filter legal entities
      const filteredLegalEntities = institution.legalEntities.map(le => {
        // Filter cash accounts within legal entities
        const filteredAccounts = le.cashAccounts.filter(account => 
          account.name.toLowerCase().includes(query) || 
          institution.name.toLowerCase().includes(query) ||
          le.name.toLowerCase().includes(query)
        );

        return filteredAccounts.length > 0 ? { ...le, cashAccounts: filteredAccounts } : null;
      }).filter(Boolean);

      return filteredLegalEntities.length > 0 
        ? { ...institution, legalEntities: filteredLegalEntities as any[] } 
        : null;
    }).filter(Boolean) as typeof mockPortfoliosByInstitution;
  }, [searchQuery]);

  return (
    <div className="space-y-6 max-h-[50vh] overflow-y-auto">
      {filteredInstitutions.map(institution => (
        <InstitutionSection
          key={institution.id}
          name={institution.name}
        >
          {institution.legalEntities.map(legalEntity => (
            <LegalEntitySection
              key={legalEntity.id}
              name={legalEntity.name}
            >
              <div className="space-y-3">
                {legalEntity.cashAccounts.map(account => (
                  <div 
                    key={account.id}
                    className={`p-4 border rounded-md ${tempAllocations[account.id] > 0 ? 'bg-gray-50 border-gray-400' : 'border-gray-200'}`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium">{account.name}</h4>
                        <p className="text-xs text-gray-500">Cash Account</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mt-2">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Available Balance</div>
                        <div className="text-sm font-medium">
                          {account.balance.toLocaleString('en-US', {
                            style: 'currency',
                            currency: account.currency
                          })}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Shares to fund</div>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="0"
                            max={Math.floor(account.balance / instrumentPrice)}
                            value={tempAllocations[account.id] || ""}
                            onChange={(e) => handleAllocationChange(account.id, Number(e.target.value) || 0)}
                            className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="0"
                            // Remove spinner arrows
                            style={{ appearance: "textfield" }}
                          />
                          {remainingShares > 0 && (
                            <button
                              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2 h-9"
                              onClick={() => {
                                const maxShares = Math.min(
                                  Math.floor(account.balance / instrumentPrice),
                                  remainingShares + (tempAllocations[account.id] || 0)
                                );
                                handleAllocationChange(account.id, maxShares);
                              }}
                            >
                              Max
                            </button>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Estimated Amount</div>
                        <div className="text-sm font-medium">
                          {((tempAllocations[account.id] || 0) * instrumentPrice).toLocaleString('en-US', {
                            style: 'currency',
                            currency: account.currency
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </LegalEntitySection>
          ))}
        </InstitutionSection>
      ))}
      
      {filteredInstitutions.length === 0 && (
        <div className="text-center p-4">
          <p className="text-gray-500">No cash accounts found matching your search.</p>
        </div>
      )}
    </div>
  );
};
