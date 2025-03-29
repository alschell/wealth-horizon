
import React from "react";
import { QuantityAllocationSummary } from "../AllocationSummary";
import { TradeOrder } from "../../../types";
import SelectedPortfoliosTable from "./source-portfolios/SelectedPortfoliosTable";
import PortfolioSelectionModal from "./source-portfolios/PortfolioSelectionModal";
import { useSourcePortfolios } from "./source-portfolios/useSourcePortfolios";

interface SourcePortfoliosSectionProps {
  totalQuantity: number;
  selectedInstrument: any;
  order: Partial<TradeOrder>;
  setOrder: (order: Partial<TradeOrder>) => void;
  viewMode: "portfolios" | "institutions";
  price: number;
}

const SourcePortfoliosSection: React.FC<SourcePortfoliosSectionProps> = ({ 
  totalQuantity, 
  selectedInstrument, 
  order, 
  setOrder, 
  viewMode, 
  price 
}) => {
  const {
    allocations,
    currentAllocation,
    remainingQuantity,
    isModalOpen,
    selectedPortfolios,
    tempAllocations,
    availableHoldings,
    tempTotalAllocation,
    isAllocationComplete,
    isAllocationExceeded,
    handleAllocationChange,
    openPortfolioSelectionModal,
    handlePortfolioSelect,
    handleTempAllocationChange,
    closeModal,
    confirmPortfolioSelections
  } = useSourcePortfolios({
    totalQuantity,
    selectedInstrument,
    order,
    setOrder
  });

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-medium mb-1">Source Portfolios</h3>
        <p className="text-sm text-gray-500 mb-3">
          Select which portfolios to sell shares from
        </p>
        
        {selectedInstrument ? (
          <>
            <SelectedPortfoliosTable
              allocations={allocations}
              availableHoldings={availableHoldings}
              price={price}
              selectedInstrument={selectedInstrument}
              onAllocationChange={handleAllocationChange}
              onOpenModal={openPortfolioSelectionModal}
            />
            <PortfolioSelectionModal
              isOpen={isModalOpen}
              onClose={closeModal}
              selectedPortfolios={selectedPortfolios}
              tempAllocations={tempAllocations}
              availableHoldings={availableHoldings}
              totalQuantity={totalQuantity}
              tempTotalAllocation={tempTotalAllocation}
              isAllocationComplete={isAllocationComplete}
              isAllocationExceeded={isAllocationExceeded}
              onSelectPortfolio={handlePortfolioSelect}
              onAllocationChange={handleTempAllocationChange}
              onConfirm={confirmPortfolioSelections}
            />
          </>
        ) : (
          <div className="text-center p-4 border rounded-md">
            Please select an instrument first
          </div>
        )}
      </div>
      
      <QuantityAllocationSummary
        totalQuantity={totalQuantity}
        currentAllocation={currentAllocation}
        remainingQuantity={remainingQuantity}
      />
    </div>
  );
};

export default SourcePortfoliosSection;
