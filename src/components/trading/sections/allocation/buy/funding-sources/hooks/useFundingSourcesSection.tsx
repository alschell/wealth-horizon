
import { useState, useEffect } from "react";
import { TradeOrder, FundingAllocation } from "@/components/trading/types";

interface UseFundingSourcesSectionProps {
  totalAmount: number;
  currency: string;
  order: Partial<TradeOrder>;
  setOrder: (order: Partial<TradeOrder>) => void;
  instrumentPrice: number;
}

export const useFundingSourcesSection = ({
  totalAmount,
  currency,
  order,
  setOrder,
  instrumentPrice
}: UseFundingSourcesSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allocations, setAllocations] = useState<Record<string, number>>({});
  
  // Initialize allocations from order when component mounts or order changes
  useEffect(() => {
    const initialAllocations: Record<string, number> = {};
    
    // Extract funding source allocations from order
    if (order.fundingAllocations) {
      order.fundingAllocations.forEach(allocation => {
        // Convert amount to shares based on instrumentPrice
        initialAllocations[allocation.sourceId] = allocation.amount / instrumentPrice;
      });
    }
    
    setAllocations(initialAllocations);
  }, [order.fundingAllocations, instrumentPrice]);

  const handleConfirmSelection = (selections: Record<string, number>) => {
    // Update local state
    setAllocations(selections);
    
    // Convert to the format expected by the order
    const fundingAllocations = Object.entries(selections)
      .filter(([_, shares]) => shares > 0)
      .map(([sourceId, shares]): FundingAllocation => {
        // Explicitly type the sourceType as the union type expected by FundingAllocation
        const sourceType: "cash" | "credit" = sourceId.startsWith("cash-") ? "cash" : "credit";
        
        return {
          sourceId,
          sourceType,
          amount: shares * instrumentPrice,
          currency: currency
        };
      });
    
    // Update the order
    setOrder({
      ...order,
      fundingAllocations
    });
    
    setIsModalOpen(false);
  };
  
  // Calculate allocation statistics
  const totalShares = Object.values(allocations).reduce((sum, shares) => sum + shares, 0);
  const requiredShares = totalAmount / instrumentPrice;
  const allocationPercentage = (totalShares / requiredShares) * 100;
  const remainingShares = requiredShares - totalShares;
  
  return {
    isModalOpen,
    setIsModalOpen,
    allocations,
    totalShares,
    requiredShares,
    allocationPercentage,
    remainingShares,
    handleConfirmSelection
  };
};
