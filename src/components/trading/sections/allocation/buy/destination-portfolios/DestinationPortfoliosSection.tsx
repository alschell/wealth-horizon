
import React from "react";
import { TradeOrder } from "../../../../types";
import { useDestinationPortfolios } from "./useDestinationPortfolios";
import { SelectedPortfoliosTable } from "./SelectedPortfoliosTable";
import PortfolioSelectionModal from "./PortfolioSelectionModal";

interface DestinationPortfoliosSectionProps {
  totalQuantity: number;
  selectedInstrument?: any;
  order: Partial<TradeOrder>;
  setOrder: (order: Partial<TradeOrder>) => void;
  instrumentPrice: number;
  currency: string;
}

const DestinationPortfoliosSection: React.FC<DestinationPortfoliosSectionProps> = ({
  totalQuantity,
  selectedInstrument,
  order,
  setOrder,
  instrumentPrice,
  currency
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
    setOrder,
    instrumentPrice,
    currency
  });

  // Get selected portfolio IDs
  const selectedPortfolioIds = Object.keys(allocations);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Destination Portfolios</h3>
        <p className="text-sm text-gray-600 mb-3">
          Select which portfolios to deposit the purchased shares into.
        </p>

        <SelectedPortfoliosTable 
          selectedPortfolioIds={selectedPortfolioIds}
          allocations={allocations}
          handleAllocationChange={handleAllocationChange}
          instrumentPrice={instrumentPrice}
          currency={currency}
        />

        {/* Portfolio selection modal */}
        <PortfolioSelectionModal 
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={confirmPortfolioSelections}
          currentAllocations={allocations}
          totalQuantity={totalQuantity}
          instrumentPrice={instrumentPrice}
          currency={currency}
        />
      </div>
    </div>
  );
};

export default DestinationPortfoliosSection;
