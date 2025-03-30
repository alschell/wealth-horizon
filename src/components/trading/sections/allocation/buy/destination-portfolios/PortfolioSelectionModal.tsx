
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { mockPortfoliosFlat } from "../../../../data";

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
  
  // Filter portfolios based on search query
  const filteredPortfolios = mockPortfoliosFlat.filter(portfolio => {
    if (!searchQuery) return true;
    return portfolio.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           portfolio.institutionId.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Select Destination Portfolios</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="mb-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span>Total shares to allocate: {totalQuantity}</span>
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
          
          <div className="space-y-4 mt-4">
            {filteredPortfolios.map(portfolio => (
              <div key={portfolio.id} className="border rounded-md p-4">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-medium text-base truncate w-48 sm:w-auto">{portfolio.name}</h4>
                    <p className="text-xs text-gray-500">{portfolio.institutionId}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min="0"
                      max={totalQuantity}
                      value={tempAllocations[portfolio.id] || 0}
                      onChange={(e) => handleAllocationChange(portfolio.id, Number(e.target.value))}
                      placeholder="Number of funded shares"
                      className="w-44 sm:w-56"
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAllocationChange(portfolio.id, totalQuantity)}
                      className="whitespace-nowrap"
                    >
                      Max
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredPortfolios.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No portfolios match your search
              </div>
            )}
          </div>
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
