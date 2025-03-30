
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CashAccountsList } from "./components/CashAccountsList";
import { CreditFacilitiesList } from "./components/CreditFacilitiesList";
import { ModalFooter } from "./components/ModalFooter";

interface SourceSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selections: Record<string, number>) => void;
  currentAllocations: Record<string, number>;
  instrumentPrice: number;
  totalRequiredAmount: number;
  currency: string;
}

export const SourceSelectionModal: React.FC<SourceSelectionModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  currentAllocations,
  instrumentPrice,
  totalRequiredAmount,
  currency
}) => {
  const [activeTab, setActiveTab] = useState<"cash" | "credit">("cash");
  const [tempAllocations, setTempAllocations] = useState<Record<string, number>>({});
  
  // Initialize with current allocations when modal opens
  useEffect(() => {
    if (isOpen) {
      setTempAllocations({ ...currentAllocations });
    }
  }, [isOpen, currentAllocations]);
  
  const handleAllocationChange = (sourceId: string, amount: number) => {
    setTempAllocations(prev => ({
      ...prev,
      [sourceId]: amount
    }));
  };
  
  const handleApply = () => {
    onConfirm(tempAllocations);
    onClose();
  };
  
  // Calculate remaining shares needed
  const allocatedAmount = Object.values(tempAllocations).reduce((sum, amount) => sum + amount, 0);
  const requiredShares = totalRequiredAmount / instrumentPrice;
  const remainingShares = requiredShares - (allocatedAmount / instrumentPrice);
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Select Funding Sources</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <Tabs defaultValue="cash" value={activeTab} onValueChange={(v) => setActiveTab(v as "cash" | "credit")}>
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="cash">Cash Accounts</TabsTrigger>
              <TabsTrigger value="credit">Credit Facilities</TabsTrigger>
            </TabsList>
            
            <TabsContent value="cash" className="mt-4">
              <CashAccountsList 
                tempAllocations={tempAllocations}
                handleAllocationChange={handleAllocationChange}
                instrumentPrice={instrumentPrice}
                remainingShares={remainingShares}
              />
            </TabsContent>
            
            <TabsContent value="credit" className="mt-4">
              <CreditFacilitiesList
                tempAllocations={tempAllocations}
                handleAllocationChange={handleAllocationChange}
                instrumentPrice={instrumentPrice}
                remainingShares={remainingShares}
              />
            </TabsContent>
          </Tabs>
        </div>
        
        <ModalFooter 
          onApply={handleApply} 
          onClose={onClose} 
        />
      </DialogContent>
    </Dialog>
  );
};
