
import { useState, useEffect } from "react";
import { TradeOrder } from "@/components/trading/types";
import { 
  mockPortfoliosByInstitution, 
  mockCashAccountsFlat,
  mockCreditFacilitiesFlat
} from "@/components/trading/data";

export interface UseFundingSourcesProps {
  totalAmount: number;
  instrumentPrice: number;
  currency: string;
  order?: Partial<TradeOrder>;
  setOrder?: (order: Partial<TradeOrder>) => void;
  onAllocationChange?: (sourceId: string, amount: number) => void;
  fundingAllocations?: Record<string, number>;
}

export const useFundingSources = ({
  totalAmount,
  instrumentPrice, 
  currency,
  order,
  setOrder,
  onAllocationChange,
  fundingAllocations = {}
}: UseFundingSourcesProps) => {
  const [activeTab, setActiveTab] = useState<"cash" | "credit">("cash");
  const [allocations, setAllocations] = useState<Record<string, number>>(fundingAllocations);
  const [tempAllocations, setTempAllocations] = useState<Record<string, number>>({});
  const [isSourcesSheetOpen, setSourcesSheetOpen] = useState(false);
  const [currentAllocation, setCurrentAllocation] = useState(0);

  // Initialize with existing allocations if any
  useEffect(() => {
    const initialAllocations: Record<string, number> = { ...fundingAllocations };
    
    if (order?.fundingAllocations) {
      order.fundingAllocations.forEach(allocation => {
        initialAllocations[allocation.sourceId] = allocation.amount / instrumentPrice;
      });
    }
    
    setAllocations(initialAllocations);
    updateCurrentAllocation(initialAllocations);
  }, [order?.fundingAllocations, instrumentPrice, fundingAllocations]);
  
  // Initialize temp allocations with current allocations when sheet opens
  useEffect(() => {
    if (isSourcesSheetOpen) {
      setTempAllocations({...allocations});
    }
  }, [isSourcesSheetOpen, allocations]);

  const updateCurrentAllocation = (allocs: Record<string, number>) => {
    const totalQuantity = Object.values(allocs).reduce((sum, quantity) => sum + quantity, 0);
    const totalAmount = totalQuantity * instrumentPrice;
    setCurrentAllocation(totalAmount);
  };
  
  // Open sheet for source selection
  const openSourcesSheet = () => {
    setSourcesSheetOpen(true);
  };

  // Apply temporary allocations to actual allocations
  const applyAllocations = () => {
    setAllocations({...tempAllocations});
    updateCurrentAllocation(tempAllocations);
    
    // Update order with new allocations if order and setOrder are provided
    if (order && setOrder) {
      const fundingAllocations = Object.entries(tempAllocations)
        .filter(([_, quantity]) => quantity > 0)
        .map(([sourceId, quantity]) => {
          const source = getSourceById(sourceId);
          
          return {
            sourceId,
            sourceType: sourceId.startsWith('cash-') ? 'cash' : 'credit',
            amount: quantity * instrumentPrice,
            currency: source?.currency || currency
          };
        });
      
      setOrder({ ...order, fundingAllocations });
    }
    
    // Also call onAllocationChange if provided
    if (onAllocationChange) {
      Object.entries(tempAllocations).forEach(([sourceId, amount]) => {
        onAllocationChange(sourceId, amount);
      });
    }
    
    setSourcesSheetOpen(false);
  };

  // Handle allocation changes in actual state
  const handleAllocationChange = (sourceId: string, quantity: number) => {
    const updatedAllocations = { ...allocations, [sourceId]: quantity };
    setAllocations(updatedAllocations);
    updateCurrentAllocation(updatedAllocations);
    
    // Update order with new allocations if order and setOrder are provided
    if (order && setOrder) {
      const fundingAllocations = Object.entries(updatedAllocations)
        .filter(([_, quantity]) => quantity > 0)
        .map(([sourceId, quantity]) => {
          const source = getSourceById(sourceId);
          
          return {
            sourceId,
            sourceType: sourceId.startsWith('cash-') ? 'cash' : 'credit',
            amount: quantity * instrumentPrice,
            currency: source?.currency || currency
          };
        });
      
      setOrder({ ...order, fundingAllocations });
    }
    
    // Also call onAllocationChange if provided
    if (onAllocationChange) {
      onAllocationChange(sourceId, quantity);
    }
  };

  // Handle allocation changes in temp state
  const handleTempAllocationChange = (sourceId: string, quantity: number) => {
    console.log("Updating temp allocation for", sourceId, "to", quantity);
    setTempAllocations(prev => ({
      ...prev,
      [sourceId]: quantity
    }));
  };

  // Get sources by type
  const getSources = (type: "cash" | "credit") => {
    return type === "cash" ? mockCashAccountsFlat : mockCreditFacilitiesFlat;
  };
  
  // Get a single source by ID
  const getSourceById = (sourceId: string) => {
    if (sourceId.startsWith('cash-')) {
      return mockCashAccountsFlat.find(item => item.id === sourceId);
    } else {
      return mockCreditFacilitiesFlat.find(item => item.id === sourceId);
    }
  };

  // Get selected source IDs (sources with allocations > 0)
  const selectedSourceIds = Object.entries(allocations)
    .filter(([_, amount]) => amount > 0)
    .map(([id]) => id);
    
  // Calculate the remaining amount to allocate
  const currentQuantityAllocation = Object.values(allocations).reduce((sum, qty) => sum + qty, 0);
  const remainingQuantity = (totalAmount / instrumentPrice) - currentQuantityAllocation;
  const remainingAmount = remainingQuantity * instrumentPrice;

  return {
    activeTab,
    setActiveTab,
    allocations,
    tempAllocations,
    currentAllocation,
    remainingAmount,
    remainingQuantity,
    selectedSourceIds,
    isSourcesSheetOpen,
    setSourcesSheetOpen,
    openSourcesSheet,
    applyAllocations,
    handleAllocationChange,
    handleTempAllocationChange,
    getSources,
    getSourceById
  };
};
