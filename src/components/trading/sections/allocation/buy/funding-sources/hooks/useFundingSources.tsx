
import { useState, useEffect } from "react";
import { mockCashAccountsFlat, mockCreditFacilitiesFlat } from "@/components/trading/data";

interface UseFundingSourcesPanelProps {
  fundingAllocations: Record<string, number>;
  onAllocationChange: (sourceId: string, amount: number) => void;
  totalAmount: number;
}

export const useFundingSources = ({
  fundingAllocations,
  onAllocationChange,
  totalAmount
}: UseFundingSourcesPanelProps) => {
  const [activeTab, setActiveTab] = useState<"cash" | "credit">("cash");
  const [tempAllocations, setTempAllocations] = useState<Record<string, number>>({});
  const [isSourcesSheetOpen, setSourcesSheetOpen] = useState(false);

  // Initialize temp allocations with current allocations when sheet opens
  useEffect(() => {
    if (isSourcesSheetOpen) {
      setTempAllocations({...fundingAllocations});
    }
  }, [isSourcesSheetOpen, fundingAllocations]);

  // Open sheet for source selection
  const openSourcesSheet = () => {
    setSourcesSheetOpen(true);
  };

  // Apply temporary allocations to actual allocations
  const applyAllocations = () => {
    // Update each allocation
    Object.entries(tempAllocations).forEach(([sourceId, amount]) => {
      onAllocationChange(sourceId, amount);
    });
    
    setSourcesSheetOpen(false);
  };

  // Handle allocation changes in temp state
  const handleTempAllocationChange = (sourceId: string, amount: number) => {
    setTempAllocations(prev => ({
      ...prev,
      [sourceId]: amount
    }));
  };

  // Get sources by type
  const getSources = (type: "cash" | "credit") => {
    return type === "cash" ? mockCashAccountsFlat : mockCreditFacilitiesFlat;
  };

  // Get selected source IDs (sources with allocations > 0)
  const selectedSourceIds = Object.entries(fundingAllocations)
    .filter(([_, amount]) => amount > 0)
    .map(([id]) => id);

  return {
    activeTab,
    setActiveTab,
    tempAllocations,
    selectedSourceIds,
    isSourcesSheetOpen,
    setSourcesSheetOpen,
    openSourcesSheet,
    applyAllocations,
    handleTempAllocationChange,
    getSources
  };
};
