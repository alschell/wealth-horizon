
import React from "react";
import { mockPortfoliosByInstitution } from "@/components/trading/data";
import { InstitutionSection } from "./InstitutionSection";

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
          institution={institution}
          activeTab="cash"
          tempAllocations={tempAllocations}
          handleAllocationChange={handleAllocationChange}
          instrumentPrice={instrumentPrice}
          remainingShares={remainingShares}
        />
      ))}
      
      {filteredInstitutions.length === 0 && (
        <div className="text-center p-4">
          <p className="text-gray-500">No cash accounts found matching your search.</p>
        </div>
      )}
    </div>
  );
};
