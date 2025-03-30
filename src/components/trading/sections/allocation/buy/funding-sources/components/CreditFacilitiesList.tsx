
import React from "react";
import { mockPortfoliosByInstitution } from "@/components/trading/data";
import { InstitutionSection } from "./InstitutionSection";

interface CreditFacilitiesListProps {
  tempAllocations: Record<string, number>;
  handleAllocationChange: (sourceId: string, quantity: number) => void;
  instrumentPrice: number;
  remainingShares: number;
}

export const CreditFacilitiesList: React.FC<CreditFacilitiesListProps> = ({
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
          activeTab="credit"
          tempAllocations={tempAllocations}
          handleAllocationChange={handleAllocationChange}
          instrumentPrice={instrumentPrice}
          remainingShares={remainingShares}
        />
      ))}
    </div>
  );
};
