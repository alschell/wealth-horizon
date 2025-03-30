
import { useState, useEffect } from "react";
import { TradeOrder, FundingAllocation } from "@/components/trading/types";
import { 
  mockPortfoliosByInstitution, 
  mockCashAccountsFlat,
  mockCreditFacilitiesFlat
} from "@/components/trading/data";

export interface UseFundingSourcesProps {
  totalAmount: number;
  onAllocationChange?: (sourceId: string, amount: number) => void;
  fundingAllocations?: Record<string, number>;
  instrumentPrice?: number;
  currency?: string;
  order?: Partial<TradeOrder>;
  setOrder?: (order: Partial<TradeOrder>) => void;
}

export const useFundingSources = ({
  totalAmount,
  onAllocationChange,
  fundingAllocations = {},
  instrumentPrice = 0,
  currency = "USD",
  order,
  setOrder
}: UseFundingSourcesProps) => {
  const [activeTab, setActiveTab] = useState<"cash" | "credit">("cash");
  const [allocations, setAllocations] = useState<Record<string, number>>({});
  const [currentAllocation, setCurrentAllocation] = useState(0);
  const [selectedSourceId, setSelectedSourceId] = useState<string | null>(null);
  const [isSourcesSheetOpen, setSourcesSheetOpen] = useState(false);
  const [tempAllocations, setTempAllocations] = useState<Record<string, number>>({});
  
  // Initialize with existing allocations if any
  useEffect(() => {
    setAllocations(fundingAllocations || {});
    updateCurrentAllocation(fundingAllocations || {});
    setTempAllocations(fundingAllocations || {});
  }, [fundingAllocations]);
  
  const updateCurrentAllocation = (allocs: Record<string, number>) => {
    const totalAmount = Object.values(allocs).reduce((sum, amount) => sum + amount, 0);
    setCurrentAllocation(totalAmount);
  };
  
  const handleAllocationChange = (sourceId: string, amount: number) => {
    const updatedAllocations = { ...allocations, [sourceId]: amount };
    setAllocations(updatedAllocations);
    updateCurrentAllocation(updatedAllocations);
    if (onAllocationChange) {
      onAllocationChange(sourceId, amount);
    }
    
    // Update the order if setOrder is provided
    if (order && setOrder) {
      const fundingAllocations = Object.entries(updatedAllocations)
        .filter(([_, amount]) => amount > 0)
        .map(([sourceId, amount]): FundingAllocation => {
          // Explicitly cast sourceType as "cash" | "credit" to ensure type safety
          const sourceType = sourceId.startsWith('cash-') ? 'cash' : 'credit' as "cash" | "credit";
          const source = getSourceById(sourceId);
          return {
            sourceId,
            sourceType,
            amount,
            currency: source?.currency || currency
          };
        });
      setOrder({ ...order, fundingAllocations });
    }
  };

  const handleTempAllocationChange = (sourceId: string, amount: number) => {
    setTempAllocations({
      ...tempAllocations,
      [sourceId]: amount
    });
  };
  
  // Calculate the remaining amount to allocate
  const remainingAmount = totalAmount - currentAllocation;
  
  // Get sources based on type
  const getSources = (type: "cash" | "credit") => {
    return type === "cash" ? mockCashAccountsFlat : mockCreditFacilitiesFlat;
  };

  // Get a single source by ID
  const getSourceById = (sourceId: string) => {
    if (sourceId.startsWith("cash-")) {
      return mockCashAccountsFlat.find(item => item.id === sourceId);
    } else {
      return mockCreditFacilitiesFlat.find(item => item.id === sourceId);
    }
  };

  // Open sheet for selecting a funding source
  const openSourcesSheet = () => {
    setSourcesSheetOpen(true);
    setTempAllocations({...allocations});
  };

  // Apply temporary allocations
  const applyAllocations = () => {
    // Apply the temporary allocations to the real allocations
    Object.entries(tempAllocations).forEach(([sourceId, amount]) => {
      handleAllocationChange(sourceId, amount);
    });
    setSourcesSheetOpen(false);
  };

  // Get list of source IDs with allocations > 0
  const selectedSourceIds = Object.keys(allocations).filter(id => allocations[id] > 0);

  return {
    activeTab,
    setActiveTab,
    allocations,
    currentAllocation,
    remainingAmount,
    selectedSourceId,
    setSelectedSourceId,
    selectedSourceIds,
    getSourceById,
    handleAllocationChange,
    isSourcesSheetOpen,
    setSourcesSheetOpen,
    tempAllocations,
    handleTempAllocationChange,
    openSourcesSheet,
    applyAllocations,
    getSources
  };
};
