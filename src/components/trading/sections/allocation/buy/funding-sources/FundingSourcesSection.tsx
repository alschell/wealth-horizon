
import React from "react";
import { TradeOrder } from "../../../../types";
import { AllocationSummary } from "../../AllocationSummary";
import { useFundingSources } from "./useFundingSources";
import { SelectedSourcesTable } from "./SelectedSourcesTable";
import { SourceSelectionModal } from "./SourceSelectionModal";

interface FundingSourcesSectionProps {
  totalAmount: number;
  currency: string;
  order: Partial<TradeOrder>;
  setOrder: (order: Partial<TradeOrder>) => void;
  viewMode: "portfolios" | "institutions";
  instrumentPrice: number;
}

const FundingSourcesSection: React.FC<FundingSourcesSectionProps> = ({ 
  totalAmount, 
  currency, 
  order, 
  setOrder, 
  viewMode, 
  instrumentPrice 
}) => {
  const {
    activeTab,
    setActiveTab,
    allocations,
    currentAllocation,
    remainingAmount,
    selectedSourceId,
    setSelectedSourceId,
    isModalOpen,
    selectedSourceIds,
    getSourceById,
    handleAllocationChange,
    openSourceSelectionModal,
    closeModal,
    confirmSourceSelection
  } = useFundingSources({
    totalAmount,
    instrumentPrice,
    currency,
    order,
    setOrder
  });
  
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-medium mb-1">Funding Sources</h3>
        <p className="text-sm text-gray-500 mb-3">
          Select which accounts to use for funding this purchase
        </p>
        
        <SelectedSourcesTable
          selectedSourceIds={selectedSourceIds}
          allocations={allocations}
          instrumentPrice={instrumentPrice}
          currency={currency}
          getSourceById={getSourceById}
          activeTab={activeTab}
          handleAllocationChange={handleAllocationChange}
          openSourceSelectionModal={openSourceSelectionModal}
        />
        
        <SourceSelectionModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={confirmSourceSelection}
          selectedSourceId={selectedSourceId}
          setSelectedSourceId={setSelectedSourceId}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          allocations={allocations}
          currency={currency}
        />
      </div>
      
      <AllocationSummary
        totalAmount={totalAmount}
        currency={currency}
        currentAllocation={currentAllocation}
        remainingAmount={remainingAmount}
      />
    </div>
  );
};

export default FundingSourcesSection;
