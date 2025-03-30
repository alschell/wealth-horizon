
import React from "react";
import { AllocationSummary } from "../../AllocationSummary";
import { TradeOrder } from "../../../../types";
import SelectedPortfoliosTable from "./SelectedPortfoliosTable";
import PortfolioSelectionModal from "./PortfolioSelectionModal";
import { useDestinationPortfolios } from "./useDestinationPortfolios";

interface DestinationPortfoliosSectionProps {
  totalQuantity: number;
  selectedInstrument: any;
  order: Partial<TradeOrder>;
  setOrder: (order: Partial<TradeOrder>) => void;
}

const DestinationPortfoliosSection: React.FC<DestinationPortfoliosSectionProps> = ({
  totalQuantity,
  selectedInstrument,
  order,
  setOrder
}) => {
  const {
    allocations,
    currentAllocation,
    remainingQuantity,
    isModalOpen,
    setIsModalOpen,
    selectedPortfolios,
    tempAllocations,
    tempTotalAllocation,
    isAllocationComplete,
    isAllocationExceeded,
    handleAllocationChange,
    openPortfolioSelectionModal,
    handlePortfolioSelect,
    handleTempAllocationChange,
    closeModal,
    confirmPortfolioSelections
  } = useDestinationPortfolios({
    totalQuantity,
    selectedInstrument,
    order,
    setOrder
  });

  // Get selected portfolio IDs
  const selectedPortfolioIds = Object.keys(allocations);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-medium mb-1">Destination Portfolios</h3>
        <p className="text-sm text-gray-500 mb-3">
          Select which portfolios to deposit the purchased shares into.
        </p>

        <SelectedPortfoliosTable 
          selectedPortfolioIds={selectedPortfolioIds}
          allocations={allocations}
          handleAllocationChange={handleAllocationChange}
          openPortfolioSelectionModal={openPortfolioSelectionModal}
        />

        {/* Portfolio selection modal */}
        <PortfolioSelectionModal 
          isOpen={isModalOpen}
          onClose={closeModal}
          selectedPortfolios={selectedPortfolios}
          tempAllocations={tempAllocations}
          totalQuantity={totalQuantity}
          tempTotalAllocation={tempTotalAllocation}
          isAllocationComplete={isAllocationComplete}
          isAllocationExceeded={isAllocationExceeded}
          onSelectPortfolio={handlePortfolioSelect}
          onAllocationChange={handleTempAllocationChange}
          onConfirm={confirmPortfolioSelections}
        />
      </div>
    </div>
  );
};

export default DestinationPortfoliosSection;
