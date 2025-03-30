
import React from "react";
import { Institution } from "@/components/trading/types";
import LegalEntitySection from "./LegalEntitySection";

interface InstitutionSectionProps {
  institution: Institution;
  allocations: Record<string, number>;
  instrumentPrice: number;
  currency: string;
  remainingQuantity: number;
  onAllocationChange: (portfolioId: string, quantity: number) => void;
}

const InstitutionSection: React.FC<InstitutionSectionProps> = ({
  institution,
  allocations,
  instrumentPrice,
  currency,
  remainingQuantity,
  onAllocationChange
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">{institution.name}</h3>
      
      {institution.legalEntities.map(entity => (
        <LegalEntitySection
          key={entity.id}
          entity={entity}
          allocations={allocations}
          instrumentPrice={instrumentPrice}
          currency={currency}
          remainingQuantity={remainingQuantity}
          onAllocationChange={onAllocationChange}
        />
      ))}
    </div>
  );
};

export default InstitutionSection;
