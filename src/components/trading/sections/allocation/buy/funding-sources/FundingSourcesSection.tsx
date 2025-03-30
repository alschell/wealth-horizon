
import React from "react";
import { TradeOrder } from "../../../../types";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import FundingSourceSelectionModal from "./FundingSourceSelectionModal";
import { useFundingSourcesSection } from "./hooks/useFundingSourcesSection";
import { AllocationProgress } from "./components/AllocationProgress";
import { AllocationWarning } from "./components/AllocationWarning";
import { SelectedSources } from "./components/SelectedSources";
import { EmptySourcesState } from "./components/EmptySourcesState";

interface FundingSourcesSectionProps {
  totalAmount: number;
  currency: string;
  order: Partial<TradeOrder>;
  setOrder: (order: Partial<TradeOrder>) => void;
  viewMode: "portfolios" | "institutions";
  instrumentPrice: number;
}

export const FundingSourcesSection: React.FC<FundingSourcesSectionProps> = ({
  totalAmount,
  currency,
  order,
  setOrder,
  viewMode,
  instrumentPrice
}) => {
  const {
    isModalOpen,
    setIsModalOpen,
    allocations,
    totalShares,
    requiredShares,
    allocationPercentage,
    remainingShares,
    handleConfirmSelection
  } = useFundingSourcesSection({
    totalAmount,
    currency,
    order,
    setOrder,
    instrumentPrice
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Funding Sources</h3>
      </div>
      
      {/* Allocation Progress */}
      <AllocationProgress
        allocationPercentage={allocationPercentage}
        requiredShares={requiredShares}
        totalAmount={totalAmount}
        currency={currency}
      />

      {/* Selected funding sources */}
      {Object.keys(allocations).length > 0 ? (
        <div className="border rounded-md p-4 space-y-4">
          <div className="flex justify-end mb-2">
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Manage Funding Sources
            </Button>
          </div>
          
          <SelectedSources 
            allocations={allocations}
            instrumentPrice={instrumentPrice}
            requiredShares={requiredShares}
            currency={currency}
          />
            
          <AllocationWarning
            allocationPercentage={allocationPercentage}
            remainingShares={remainingShares}
          />
        </div>
      ) : (
        <EmptySourcesState onSelectSources={() => setIsModalOpen(true)} />
      )}

      {/* Modal for funding source selection */}
      <FundingSourceSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmSelection}
        totalAmount={totalAmount}
        currentAllocations={allocations}
        instrumentPrice={instrumentPrice}
        currency={currency}
      />
    </div>
  );
};

export default FundingSourcesSection;
