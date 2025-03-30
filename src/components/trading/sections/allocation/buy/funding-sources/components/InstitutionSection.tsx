
import React from "react";
import { Institution } from "@/components/trading/types";
import { LegalEntitySection } from "./LegalEntitySection";

interface InstitutionSectionProps {
  institution: Institution;
  activeTab: "cash" | "credit";
  tempAllocations: Record<string, number>;
  handleAllocationChange: (sourceId: string, quantity: number) => void;
  instrumentPrice: number;
  remainingShares: number;
}

export const InstitutionSection: React.FC<InstitutionSectionProps> = ({
  institution,
  activeTab,
  tempAllocations,
  handleAllocationChange,
  instrumentPrice,
  remainingShares
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-md font-medium">{institution.name}</h3>
      
      {institution.legalEntities.map(legalEntity => (
        <LegalEntitySection
          key={legalEntity.id}
          legalEntity={legalEntity}
          activeTab={activeTab}
          tempAllocations={tempAllocations}
          handleAllocationChange={handleAllocationChange}
          instrumentPrice={instrumentPrice}
          remainingShares={remainingShares}
        />
      ))}
    </div>
  );
};
