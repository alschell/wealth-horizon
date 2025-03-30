
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, Check, Search } from "lucide-react";
import { mockPortfoliosByInstitution } from "../../../../data";
import { PortfoliosList } from "./components";
import ModalFooter from "./components/ModalFooter";
import { Input } from "@/components/ui/input";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Initialize temp allocations when modal opens
  useEffect(() => {
    if (isOpen) {
      setTempAllocations(currentAllocations);
      setIsSubmitting(false);
      setSearchQuery("");
    }
  }, [isOpen, currentAllocations]);
  
  const handleAllocationChange = (portfolioId: string, quantity: number) => {
    const newAllocations = { ...tempAllocations, [portfolioId]: quantity };
    setTempAllocations(newAllocations);
  };

  const handleConfirm = () => {
    setIsSubmitting(true);
    
    // Add a small delay to show loading state
    setTimeout(() => {
      onConfirm(tempAllocations);
      setIsSubmitting(false);
    }, 300);
  };
  
  // Calculate allocation metrics
  const totalAllocated = Object.values(tempAllocations).reduce((sum, qty) => sum + qty, 0);
  const remainingQuantity = totalQuantity - totalAllocated;
  const allocationPercentage = Math.min(100, (totalAllocated / totalQuantity) * 100);
  const totalValue = totalAllocated * instrumentPrice;
  
  // Check if allocations exactly equal required shares
  const isAllocationComplete = Math.abs(totalAllocated - totalQuantity) < 0.001;
  const isAllocationExceeded = totalAllocated > totalQuantity;
  
  // Filter institutions based on search query
  const filteredInstitutions = React.useMemo(() => {
    if (!searchQuery.trim()) return mockPortfoliosByInstitution;

    const query = searchQuery.toLowerCase();
    return mockPortfoliosByInstitution.map(institution => {
      // Filter legal entities
      const filteredLegalEntities = institution.legalEntities.map(le => {
        // Filter portfolios within legal entities
        const filteredPortfolios = le.portfolios.filter(portfolio => 
          portfolio.name.toLowerCase().includes(query) || 
          institution.name.toLowerCase().includes(query) ||
          le.name.toLowerCase().includes(query)
        );

        return filteredPortfolios.length > 0 ? { ...le, portfolios: filteredPortfolios } : null;
      }).filter(Boolean);

      return filteredLegalEntities.length > 0 
        ? { ...institution, legalEntities: filteredLegalEntities as any[] } 
        : null;
    }).filter(Boolean) as typeof mockPortfoliosByInstitution;
  }, [searchQuery, mockPortfoliosByInstitution]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen => !setIsOpen && onClose()}>
      <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Select Destination Portfolios</DialogTitle>
        </DialogHeader>
        
        {/* Allocation Summary */}
        <div className="mb-6 space-y-3">
          <div className="flex justify-between text-sm">
            <span>Total shares: {totalQuantity.toLocaleString()}</span>
            <span>Allocated: {totalAllocated.toLocaleString()} shares</span>
          </div>
          
          <Progress value={allocationPercentage} className="h-2" />
          
          <div className="flex justify-between text-sm">
            <span>Total value: {(totalQuantity * instrumentPrice).toLocaleString('en-US', {
              style: 'currency',
              currency
            })}</span>
            <span>Allocated value: {totalValue.toLocaleString('en-US', {
              style: 'currency',
              currency
            })}</span>
          </div>
          
          {remainingQuantity > 0 ? (
            <div className="flex items-center text-xs text-amber-600">
              <AlertCircle className="h-3 w-3 mr-1" />
              <span>
                {remainingQuantity.toFixed(2)} shares still need allocation
                ({(remainingQuantity * instrumentPrice).toLocaleString('en-US', {
                  style: 'currency',
                  currency
                })})
              </span>
            </div>
          ) : isAllocationExceeded ? (
            <div className="flex items-center text-xs text-red-600">
              <AlertCircle className="h-3 w-3 mr-1" />
              <span>
                Over-allocated by {(totalAllocated - totalQuantity).toFixed(2)} shares
              </span>
            </div>
          ) : (
            <div className="flex items-center text-xs text-green-600">
              <Check className="h-3 w-3 mr-1" />
              <span>All shares are allocated!</span>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            className="pl-9 h-10"
            placeholder="Search portfolios, legal entities, or institutions..."
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
        
        <ModalFooter 
          onClose={onClose} 
          onConfirm={handleConfirm}
          isLoading={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
};

export default PortfolioSelectionModal;
