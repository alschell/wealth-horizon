
import React from "react";
import { Institution } from "@/components/trading/types";
import { LegalEntitySection } from "./LegalEntitySection";

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
  const [isExpanded, setIsExpanded] = React.useState(true);

  // Check if this institution has any allocations
  const hasAllocations = institution.legalEntities.some(le => 
    le.portfolios.some(p => allocations[p.id] && allocations[p.id] > 0)
  );

  return (
    <div className={`border rounded-md overflow-hidden ${hasAllocations ? 'border-gray-400' : 'border-gray-200'}`}>
      <div 
        className={`p-3 flex justify-between items-center cursor-pointer ${hasAllocations ? 'bg-gray-100' : 'bg-white'}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          <h3 className="font-medium text-lg">{institution.name}</h3>
          <p className="text-xs text-gray-500">Institution</p>
        </div>
        <div className="text-sm">
          {isExpanded ? "▼" : "▶"}
        </div>
      </div>
      
      {isExpanded && (
        <div className="p-3 space-y-4">
          {institution.legalEntities.map(legalEntity => (
            <LegalEntitySection
              key={legalEntity.id}
              legalEntity={legalEntity}
              allocations={allocations}
              instrumentPrice={instrumentPrice}
              currency={currency}
              remainingQuantity={remainingQuantity}
              onAllocationChange={onAllocationChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default InstitutionSection;
