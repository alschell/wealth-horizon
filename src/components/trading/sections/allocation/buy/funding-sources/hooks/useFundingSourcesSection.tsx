
import { useState, useEffect } from "react";
import { TradeOrder } from "../../../../../types";

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
  const [totalShares, setTotalShares] = useState(0);

  // Initialize with existing allocations when component mounts
  useEffect(() => {
    if (order.fundingAllocations) {
      const initialAllocations = order.fundingAllocations.reduce((acc, allocation) => {
        // Convert amount to shares based on instrument price
        const shares = allocation.amount / instrumentPrice;
        acc[allocation.sourceId] = shares;
        return acc;
      }, {} as Record<string, number>);
      
      setAllocations(initialAllocations);
      
      // Calculate total shares
      const totalAllocatedShares = Object.values(initialAllocations)
        .reduce((sum, shares) => sum + shares, 0);
      
      setTotalShares(totalAllocatedShares);
    }
  }, [order.fundingAllocations, instrumentPrice]);

  // Calculate required shares needed to fully fund the order
  const requiredShares = totalAmount / instrumentPrice;
  
  // Calculate remaining shares needed
  const remainingShares = requiredShares - totalShares;
  
  // Calculate allocation percentage
  const allocationPercentage = Math.min(100, (totalShares / requiredShares) * 100);
  
  // Handle confirmation of source selection
  const handleConfirmSelection = (newAllocations: Record<string, number>) => {
    setAllocations(newAllocations);
    
    // Calculate total shares in new allocations
    const newTotalShares = Object.values(newAllocations)
      .reduce((sum, shares) => sum + shares, 0);
    
    setTotalShares(newTotalShares);
    
    // Convert shares to amounts based on instrument price
    const fundingAllocations = Object.entries(newAllocations)
      .filter(([_, shares]) => shares > 0)
      .map(([sourceId, shares]) => {
        // Determine source type based on sourceId prefix if available
        const sourceType = sourceId.startsWith('cash_') ? 'cash' : 'credit';
        
        return {
          sourceId,
          sourceType: sourceType as 'cash' | 'credit',
          amount: shares * instrumentPrice,
          currency
        };
      });
    
    // Update order state
    setOrder({
      ...order,
      fundingAllocations
    });
  };

  return {
    isModalOpen,
    setIsModalOpen,
    allocations,
    totalShares,
    requiredShares,
    remainingShares,
    allocationPercentage,
    handleConfirmSelection
  };
};
