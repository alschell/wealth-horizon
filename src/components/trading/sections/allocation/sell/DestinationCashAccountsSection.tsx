
import React from "react";
import { AllocationSummary } from "../AllocationSummary";
import { TradeOrder } from "../../../types";
import SelectedCashAccountsTable from "./destination-cash-accounts/SelectedCashAccountsTable";
import CashAccountSelectionModal from "./destination-cash-accounts/CashAccountSelectionModal";
import { useDestinationCashAccounts } from "./destination-cash-accounts/useDestinationCashAccounts";

interface DestinationCashAccountsSectionProps {
  totalAmount: number;
  currency: string;
  order: Partial<TradeOrder>;
  setOrder: (order: Partial<TradeOrder>) => void;
  viewMode: "portfolios" | "institutions";
}

const DestinationCashAccountsSection: React.FC<DestinationCashAccountsSectionProps> = ({ 
  totalAmount, 
  currency, 
  order, 
  setOrder, 
  viewMode 
}) => {
  const {
    allocations,
    currentAllocation,
    remainingAmount,
    isModalOpen,
    setIsModalOpen,
    selectedAccounts,
    tempAllocations,
    tempTotalAllocation,
    isAllocationComplete,
    isAllocationExceeded,
    handleAllocationChange,
    openAccountSelectionModal,
    handleAccountSelect,
    handleTempAllocationChange,
    closeModal,
    confirmAccountSelections
  } = useDestinationCashAccounts({
    totalAmount,
    currency,
    order,
    setOrder
  });

  // Get selected account IDs
  const selectedAccountIds = Object.keys(allocations).filter(id => allocations[id] > 0);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-medium mb-1">Destination Cash Accounts</h3>
        <p className="text-sm text-gray-500 mb-3">
          Select which cash accounts to deposit the proceeds into
        </p>
        
        <SelectedCashAccountsTable 
          selectedAccountIds={selectedAccountIds}
          allocations={allocations}
          handleAllocationChange={handleAllocationChange}
          openAccountSelectionModal={openAccountSelectionModal}
          currency={currency}
          remainingAmount={remainingAmount}
        />
        
        <CashAccountSelectionModal 
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          selectedAccounts={selectedAccounts}
          tempAllocations={tempAllocations}
          totalAmount={totalAmount}
          currency={currency}
          tempTotalAllocation={tempTotalAllocation}
          isAllocationComplete={isAllocationComplete}
          isAllocationExceeded={isAllocationExceeded}
          onSelectAccount={handleAccountSelect}
          onAllocationChange={handleTempAllocationChange}
          onConfirm={confirmAccountSelections}
          onClose={closeModal}
        />
      </div>
      
      <AllocationSummary
        totalAmount={totalAmount}
        allocated={currentAllocation}
        remaining={remainingAmount}
        isComplete={currentAllocation === totalAmount}
        currency={currency}
      />
    </div>
  );
};

export default DestinationCashAccountsSection;
