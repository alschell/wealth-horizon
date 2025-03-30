
import React from "react";
import { Institution } from "@/components/trading/types";
import InstitutionSection from "./InstitutionSection";

interface PortfoliosListProps {
  institutions: Institution[];
  allocations: Record<string, number>;
  instrumentPrice: number;
  currency: string;
  remainingQuantity: number;
  onAllocationChange: (portfolioId: string, quantity: number) => void;
}

const PortfoliosList: React.FC<PortfoliosListProps> = ({
  institutions,
  allocations,
  instrumentPrice,
  currency,
  remainingQuantity,
  onAllocationChange
}) => {
  return (
    <div className="max-h-[50vh] overflow-y-auto">
      <div className="space-y-8">
        {institutions.map(institution => (
          <InstitutionSection
            key={institution.id}
            institution={institution}
            allocations={allocations}
            instrumentPrice={instrumentPrice}
            currency={currency}
            remainingQuantity={remainingQuantity}
            onAllocationChange={onAllocationChange}
          />
        ))}
      </div>
    </div>
  );
};

export default PortfoliosList;
