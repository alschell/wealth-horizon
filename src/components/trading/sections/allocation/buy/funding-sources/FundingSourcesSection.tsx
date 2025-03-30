
import React from "react";
import FundingSourceSelectionModal from "./FundingSourceSelectionModal";
import { useFundingSourcesSection } from "./hooks/useFundingSourcesSection";
import FundingSourcesPanel from "../FundingSourcesPanel";
import { TradeOrder } from "@/components/trading/types";

interface FundingSourcesSectionProps {
  totalAmount: number;
  currency: string;
  instrumentPrice: number;
  order: Partial<TradeOrder>;
  setOrder: (order: Partial<TradeOrder>) => void;
}

const FundingSourcesSection: React.FC<FundingSourcesSectionProps> = ({
  totalAmount,
  currency,
  instrumentPrice,
  order,
  setOrder
}) => {
  const {
    isModalOpen,
    setIsModalOpen,
    allocations,
    totalShares,
    requiredShares,
    remainingShares,
    allocationPercentage,
    handleConfirmSelection
  } = useFundingSourcesSection({
    totalAmount,
    currency,
    order,
    setOrder,
    instrumentPrice
  });

  return (
    <div className="space-y-4">
      <FundingSourcesPanel
        fundingAllocations={allocations}
        onAllocationChange={() => {}}
        totalAmount={totalAmount}
        currency={currency}
        price={instrumentPrice}
        order={order}
        setOrder={setOrder}
      />

      {/* Selection Modal */}
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
