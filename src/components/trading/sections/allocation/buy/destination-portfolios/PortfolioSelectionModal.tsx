
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { mockPortfoliosByInstitution } from "../../../../data";
import {
  AllocationSummary,
  PortfoliosList,
  ModalFooter
} from "./components";

interface PortfolioSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selections: Record<string, number>) => void;
  totalQuantity: number;
  currentAllocations: Record<string, number>;
  instrumentPrice: number;
  currency: string;
}

const PortfolioSelectionModal: React.FC<PortfolioSelectionModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  totalQuantity,
  currentAllocations,
  instrumentPrice,
  currency
}) => {
  const [tempAllocations, setTempAllocations] = useState<Record<string, number>>({});
  const [totalAllocated, setTotalAllocated] = useState(0);
  
  // Initialize temp allocations when modal opens
  useEffect(() => {
    if (isOpen) {
      setTempAllocations(currentAllocations);
      
      // Calculate total allocated quantity
      const total = Object.values(currentAllocations).reduce((sum, qty) => sum + qty, 0);
      setTotalAllocated(total);
    }
  }, [isOpen, currentAllocations]);
  
  const handleAllocationChange = (portfolioId: string, quantity: number) => {
    const newAllocations = { ...tempAllocations, [portfolioId]: quantity };
    setTempAllocations(newAllocations);
    
    // Update total allocated
    const newTotal = Object.values(newAllocations).reduce((sum, qty) => sum + qty, 0);
    setTotalAllocated(newTotal);
  };

  const handleConfirm = () => {
    onConfirm(tempAllocations);
    onClose();
  };
  
  // Calculate remaining quantity to allocate
  const remainingQuantity = totalQuantity - totalAllocated;
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen => !setIsOpen && onClose()}>
      <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Select Destination Portfolios</DialogTitle>
        </DialogHeader>
        
        <AllocationSummary 
          totalQuantity={totalQuantity}
          totalAllocated={totalAllocated}
          remainingQuantity={remainingQuantity}
        />

        <PortfoliosList 
          institutions={mockPortfoliosByInstitution}
          allocations={tempAllocations}
          instrumentPrice={instrumentPrice}
          currency={currency}
          remainingQuantity={remainingQuantity}
          onAllocationChange={handleAllocationChange}
        />
        
        <ModalFooter 
          onClose={onClose} 
          onConfirm={handleConfirm} 
        />
      </DialogContent>
    </Dialog>
  );
};

export default PortfolioSelectionModal;
