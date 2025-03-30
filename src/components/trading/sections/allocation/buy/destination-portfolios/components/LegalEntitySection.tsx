
import React from "react";
import { LegalEntity } from "@/components/trading/types";
import PortfolioItem from "./PortfolioItem";

interface LegalEntitySectionProps {
  entity: LegalEntity;
  allocations: Record<string, number>;
  instrumentPrice: number;
  currency: string;
  remainingQuantity: number;
  onAllocationChange: (portfolioId: string, quantity: number) => void;
}

const LegalEntitySection: React.FC<LegalEntitySectionProps> = ({
  entity,
  allocations,
  instrumentPrice,
  currency,
  remainingQuantity,
  onAllocationChange
}) => {
  return (
    <div className="ml-4 space-y-3">
      <h4 className="font-medium text-base text-gray-700">{entity.name}</h4>
      
      <div className="space-y-2 ml-4">
        {entity.portfolios.map(portfolio => {
          const currentQuantity = allocations[portfolio.id] || 0;
          
          return (
            <PortfolioItem
              key={portfolio.id}
              portfolio={portfolio}
              currentQuantity={currentQuantity}
              instrumentPrice={instrumentPrice}
              currency={currency}
              remainingQuantity={remainingQuantity}
              onAllocationChange={onAllocationChange}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LegalEntitySection;
