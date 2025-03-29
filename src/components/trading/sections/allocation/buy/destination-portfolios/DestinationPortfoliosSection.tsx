
import React from "react";
import { TradeOrder } from "../../../../types";
import { QuantityAllocationSummary } from "../../AllocationSummary";
import { useDestinationPortfolios } from "./useDestinationPortfolios";
import { SelectedPortfoliosTable } from "./SelectedPortfoliosTable";
import { PortfolioSelectionModal } from "./PortfolioSelectionModal";

interface DestinationPortfoliosSectionProps {
  totalQuantity: number;
  order: Partial<TradeOrder>;
  setOrder: (order: Partial<TradeOrder>) => void;
}

const DestinationPortfoliosSection: React.FC<DestinationPortfoliosSectionProps> = ({ 
  totalQuantity, 
  order, 
  setOrder
}) => {
  const {
    allocations,
    currentAllocation,
    remainingQuantity,
    selectedPortfolioId,
    isModalOpen,
    setSelectedPortfolioId,
    handleAllocationChange,
    openPortfolioSelectionModal,
    closeModal,
    confirmPortfolioSelection
  } = useDestinationPortfolios(totalQuantity, order, setOrder);

  // Get list of portfolio IDs with allocations > 0
  const selectedPortfolioIds = Object.keys(allocations).filter(id => allocations[id] > 0);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-medium mb-1">Destination Portfolios</h3>
        <p className="text-sm text-gray-500 mb-3">
          Select which portfolios to deposit the purchased shares into
        </p>
        
        <SelectedPortfoliosTable
          selectedPortfolioIds={selectedPortfolioIds}
          allocations={allocations}
          remainingQuantity={remainingQuantity}
          handleAllocationChange={handleAllocationChange}
          openPortfolioSelectionModal={openPortfolioSelectionModal}
        />
        
        <PortfolioSelectionModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={confirmPortfolioSelection}
          selectedPortfolioId={selectedPortfolioId}
          setSelectedPortfolioId={setSelectedPortfolioId}
          allocations={allocations}
        />
      </div>
      
      <QuantityAllocationSummary
        totalQuantity={totalQuantity}
        currentAllocation={currentAllocation}
        remainingQuantity={remainingQuantity}
      />
    </div>
  );
};

export default DestinationPortfoliosSection;
