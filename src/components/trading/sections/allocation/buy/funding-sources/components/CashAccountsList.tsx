
import React from "react";
import { mockPortfoliosByInstitution } from "@/components/trading/data";
import { InstitutionSection } from "./InstitutionSection";

interface CashAccountsListProps {
  tempAllocations: Record<string, number>;
  handleAllocationChange: (sourceId: string, quantity: number) => void;
  instrumentPrice: number;
  remainingShares: number;
}

export const CashAccountsList: React.FC<CashAccountsListProps> = ({
  tempAllocations,
  handleAllocationChange,
  instrumentPrice,
  remainingShares
}) => {
  return (
    <div className="space-y-6 max-h-[50vh] overflow-y-auto">
      {mockPortfoliosByInstitution.map(institution => (
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
    </div>
  );
};
