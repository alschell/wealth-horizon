
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FundingSourceModalHeader, 
  AllocationSummary, 
  CashAccountsList, 
  CreditFacilitiesList, 
  ModalFooter 
} from "./components";

interface FundingSourceSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selections: Record<string, number>) => void;
  totalAmount: number;
  currentAllocations: Record<string, number>;
  instrumentPrice: number;
  currency: string;
}

const FundingSourceSelectionModal: React.FC<FundingSourceSelectionModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  totalAmount,
  currentAllocations,
  instrumentPrice,
  currency
}) => {
  const [activeTab, setActiveTab] = useState<"cash" | "credit">("cash");
  const [tempAllocations, setTempAllocations] = useState<Record<string, number>>({});
  const [totalShares, setTotalShares] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize temporary allocations when modal opens
  useEffect(() => {
    if (isOpen) {
      setTempAllocations(currentAllocations);
      
      // Calculate total shares from current allocations
      const total = Object.values(currentAllocations).reduce((sum, qty) => sum + qty, 0);
      setTotalShares(total);
      setIsSubmitting(false);
    }
  }, [isOpen, currentAllocations]);

  const handleAllocationChange = (sourceId: string, quantity: number) => {
    const newAllocations = { ...tempAllocations, [sourceId]: quantity };
    setTempAllocations(newAllocations);
    
    // Update total shares
    const newTotal = Object.values(newAllocations).reduce((sum, qty) => sum + qty, 0);
    setTotalShares(newTotal);
  };

  const handleConfirm = () => {
    setIsSubmitting(true);
    
    // Add a small delay to show loading state
    setTimeout(() => {
      onConfirm(tempAllocations);
      onClose();
      setIsSubmitting(false);
    }, 300);
  };

  // Get required shares needed to fully fund the order
  const requiredShares = totalAmount / instrumentPrice;
  const remainingShares = requiredShares - totalShares;
  
  // Check if allocations exactly equal required shares
  const isAllocationComplete = Math.abs(totalShares - requiredShares) < 0.001;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen => !setIsOpen && onClose()}>
      <DialogContent className="sm:max-w-xl max-h-[80vh] overflow-auto">
        <FundingSourceModalHeader />

        <div className="py-4">
          <AllocationSummary 
            totalAmount={totalAmount}
            requiredShares={requiredShares}
            remainingShares={remainingShares}
            currency={currency}
            isAllocationComplete={isAllocationComplete}
          />

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
          onApply={handleConfirm}
          onClose={onClose}
          isLoading={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
};

export default FundingSourceSelectionModal;
