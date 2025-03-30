
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CashAccountsList } from "./components/CashAccountsList";
import { CreditFacilitiesList } from "./components/CreditFacilitiesList";
import { ModalFooter } from "./components/ModalFooter";
import { Progress } from "@/components/ui/progress";
import { AlertCircle } from "lucide-react";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize with current allocations when modal opens
  useEffect(() => {
    if (isOpen) {
      setTempAllocations({ ...currentAllocations });
      setIsSubmitting(false);
    }
  }, [isOpen, currentAllocations]);
  
  const handleAllocationChange = (sourceId: string, amount: number) => {
    setTempAllocations(prev => ({
      ...prev,
      [sourceId]: amount
    }));
  };
  
  const handleApply = () => {
    setIsSubmitting(true);
    
    // Add a small delay to show loading state
    setTimeout(() => {
      onConfirm(tempAllocations);
      onClose();
      setIsSubmitting(false);
    }, 300);
  };
  
  // Calculate remaining shares needed
  const allocatedAmount = Object.values(tempAllocations).reduce((sum, shares) => sum + (shares * instrumentPrice), 0);
  const requiredShares = totalRequiredAmount / instrumentPrice;
  const remainingShares = requiredShares - (allocatedAmount / instrumentPrice);
  const allocationPercentage = Math.min(100, (allocatedAmount / totalRequiredAmount) * 100);
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Select Funding Sources</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          {/* Allocation Summary */}
          <div className="mb-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span>Total funds: {totalRequiredAmount.toLocaleString('en-US', {
                style: 'currency',
                currency
              })}</span>
              <span>Allocated: {allocatedAmount.toLocaleString('en-US', {
                style: 'currency',
                currency
              })}</span>
            </div>
            
            <Progress value={allocationPercentage} className="h-2" />
            
            {remainingShares > 0 ? (
              <div className="flex items-center text-xs text-amber-600">
                <AlertCircle className="h-3 w-3 mr-1" />
                <span>
                  {remainingShares.toFixed(2)} shares still need funding 
                  ({(remainingShares * instrumentPrice).toLocaleString('en-US', {
                    style: 'currency',
                    currency
                  })})
                </span>
              </div>
            ) : (
              <div className="text-xs text-green-600">
                All shares are funded!
              </div>
            )}
          </div>

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
          isLoading={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
};
