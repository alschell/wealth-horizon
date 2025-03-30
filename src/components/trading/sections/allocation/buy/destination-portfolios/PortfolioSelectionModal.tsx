
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { mockPortfoliosByInstitution } from "../../../../data";
import PortfoliosList from "./components/PortfoliosList";

interface PortfolioSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (portfolios: Record<string, number>) => void;
  currentAllocations: Record<string, number>;
  totalQuantity: number;
  instrumentPrice: number;
  currency: string;
}

const PortfolioSelectionModal: React.FC<PortfolioSelectionModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  currentAllocations,
  totalQuantity,
  instrumentPrice,
  currency
}) => {
  const [tempAllocations, setTempAllocations] = useState<Record<string, number>>({});
  const [searchQuery, setSearchQuery] = useState("");
  
  // Initialize with current allocations when modal opens
  useEffect(() => {
    if (isOpen) {
      setTempAllocations({ ...currentAllocations });
      setSearchQuery("");
    }
  }, [isOpen, currentAllocations]);
  
  const handleAllocationChange = (portfolioId: string, quantity: number) => {
    setTempAllocations(prev => ({
      ...prev,
      [portfolioId]: quantity
    }));
  };
  
  // Apply portfolio selections
  const handleConfirm = () => {
    onConfirm(tempAllocations);
    onClose();
  };
  
  // Calculate current total allocation
  const totalAllocated = Object.values(tempAllocations).reduce((sum, qty) => sum + qty, 0);
  const allocationPercentage = Math.min(100, (totalAllocated / totalQuantity) * 100);
  const remainingQuantity = totalQuantity - totalAllocated;
  
  // Filter institutions based on search query
  const filteredInstitutions = searchQuery.length > 0 ? 
    mockPortfoliosByInstitution.map(institution => ({
      ...institution,
      legalEntities: institution.legalEntities.map(entity => ({
        ...entity,
        portfolios: entity.portfolios.filter(portfolio => 
          portfolio.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          institution.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          entity.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(entity => entity.portfolios.length > 0)
    })).filter(inst => inst.legalEntities.length > 0)
    : mockPortfoliosByInstitution;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Select Destination Portfolios</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="mb-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span>Total number of shares to be allocated: {totalQuantity}</span>
              <span>Shares allocated: {totalAllocated}</span>
            </div>
            
            <Progress value={allocationPercentage} className="h-2" />
          </div>
          
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              className="pl-9 h-10"
              placeholder="Search portfolios..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <PortfoliosList
            institutions={filteredInstitutions}
            allocations={tempAllocations}
            instrumentPrice={instrumentPrice}
            currency={currency}
            remainingQuantity={remainingQuantity}
            onAllocationChange={handleAllocationChange}
          />
          
          {filteredInstitutions.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No portfolios match your search
            </div>
          )}
        </div>
        
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} className="bg-black text-white hover:bg-gray-800">
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PortfolioSelectionModal;
