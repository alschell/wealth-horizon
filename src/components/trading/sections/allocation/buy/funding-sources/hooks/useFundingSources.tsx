
import { useState } from "react";
import { mockCashAccountsFlat, mockCreditFacilitiesFlat } from "@/components/trading/data";

interface UseFundingSourcesProps {
  fundingAllocations: Record<string, number>;
  onAllocationChange: (sourceId: string, amount: number) => void;
  totalAmount: number;
}

export const useFundingSources = ({
  fundingAllocations,
  onAllocationChange,
  totalAmount
}: UseFundingSourcesProps) => {
  const [isSourcesSheetOpen, setSourcesSheetOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"cash" | "credit">("cash");
  const [tempAllocations, setTempAllocations] = useState<Record<string, number>>({});
  
  // Get selected source IDs
  const selectedSourceIds = Object.keys(fundingAllocations).filter(id => fundingAllocations[id] > 0);
  
  // Open sources selection sheet
  const openSourcesSheet = () => {
    setTempAllocations({ ...fundingAllocations });
    setSourcesSheetOpen(true);
  };
  
  // Apply temporary allocations to the actual allocations
  const applyAllocations = () => {
    Object.entries(tempAllocations).forEach(([sourceId, amount]) => {
      if (amount > 0) {
        onAllocationChange(sourceId, amount);
      }
    });
    setSourcesSheetOpen(false);
  };
  
  // Handle temporary allocation changes
  const handleTempAllocationChange = (sourceId: string, amount: number) => {
    setTempAllocations(prev => ({ ...prev, [sourceId]: amount }));
  };

  // Helper function to get sources by type
  const getSources = (type: "cash" | "credit") => {
    return type === "cash" ? mockCashAccountsFlat : mockCreditFacilitiesFlat;
  };

  return {
    isSourcesSheetOpen,
    setSourcesSheetOpen,
    activeTab,
    setActiveTab,
    tempAllocations,
    selectedSourceIds,
    openSourcesSheet,
    applyAllocations,
    handleTempAllocationChange,
    getSources
  };
};
