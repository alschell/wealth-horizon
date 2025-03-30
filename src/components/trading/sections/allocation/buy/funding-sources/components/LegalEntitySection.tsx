
import React from "react";
import { LegalEntity } from "@/components/trading/types";
import { AccountItem } from "./AccountItem";
import { FacilityItem } from "./FacilityItem";
import { mockCashAccountsFlat, mockCreditFacilitiesFlat } from "@/components/trading/data";

interface LegalEntitySectionProps {
  legalEntity: LegalEntity;
  activeTab: "cash" | "credit";
  tempAllocations: Record<string, number>;
  handleAllocationChange: (sourceId: string, quantity: number) => void;
  instrumentPrice: number;
  remainingShares: number;
}

export const LegalEntitySection: React.FC<LegalEntitySectionProps> = ({
  legalEntity,
  activeTab,
  tempAllocations,
  handleAllocationChange,
  instrumentPrice,
  remainingShares
}) => {
  if (activeTab === "cash") {
    // Filter cash accounts for this legal entity
    const legalEntityCashAccounts = mockCashAccountsFlat.filter(
      account => account.legalEntityId === legalEntity.id
    );
    
    if (legalEntityCashAccounts.length === 0) return null;
    
    return (
      <div className="pl-4 border-l-2 border-gray-200 space-y-4">
        <h4 className="text-sm font-medium">{legalEntity.name}</h4>
        
        {legalEntityCashAccounts.map(account => (
          <AccountItem
            key={account.id}
            account={account}
            currentShares={tempAllocations[account.id] || 0}
            instrumentPrice={instrumentPrice}
            handleAllocationChange={handleAllocationChange}
            remainingShares={remainingShares}
          />
        ))}
      </div>
    );
  } else {
    // Filter credit facilities for this legal entity
    const legalEntityFacilities = mockCreditFacilitiesFlat.filter(
      facility => facility.legalEntityId === legalEntity.id
    );
    
    if (legalEntityFacilities.length === 0) return null;
    
    return (
      <div className="pl-4 border-l-2 border-gray-200 space-y-4">
        <h4 className="text-sm font-medium">{legalEntity.name}</h4>
        
        {legalEntityFacilities.map(facility => (
          <FacilityItem
            key={facility.id}
            facility={facility}
            currentShares={tempAllocations[facility.id] || 0}
            instrumentPrice={instrumentPrice}
            handleAllocationChange={handleAllocationChange}
            remainingShares={remainingShares}
          />
        ))}
      </div>
    );
  }
};
