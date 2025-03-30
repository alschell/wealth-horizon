
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Search, Check, ChevronRight, Plus } from "lucide-react";
import { 
  mockPortfoliosByInstitution 
} from "../../../../data";

interface PortfolioSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPortfolios: string[];
  tempAllocations: Record<string, number>;
  availableHoldings: Record<string, number>;
  totalQuantity: number;
  tempTotalAllocation: number;
  isAllocationComplete: boolean;
  isAllocationExceeded: boolean;
  onSelectPortfolio: (portfolioId: string) => void;
  onAllocationChange: (portfolioId: string, quantity: number) => void;
  onConfirm: () => void;
}

const PortfolioSelectionModal: React.FC<PortfolioSelectionModalProps> = ({
  isOpen,
  onClose,
  selectedPortfolios,
  tempAllocations,
  availableHoldings,
  totalQuantity,
  tempTotalAllocation,
  isAllocationComplete,
  isAllocationExceeded,
  onSelectPortfolio,
  onAllocationChange,
  onConfirm
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [institutionsExpanded, setInstitutionsExpanded] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize all institutions as expanded when modal opens
  useEffect(() => {
    if (isOpen) {
      const expandedState: Record<string, boolean> = {};
      mockPortfoliosByInstitution.forEach(institution => {
        expandedState[institution.id] = true;
      });
      setInstitutionsExpanded(expandedState);
      setSearchQuery("");
    }
  }, [isOpen]);
  
  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onConfirm();
      setIsSubmitting(false);
    }, 300);
  };
  
  const toggleInstitution = (institutionId: string) => {
    setInstitutionsExpanded(prev => ({
      ...prev,
      [institutionId]: !prev[institutionId]
    }));
  };
  
  // Calculate allocation percentage
  const allocationPercentage = Math.min(100, (tempTotalAllocation / totalQuantity) * 100);
  
  // Helper to check if a portfolio is selected
  const isPortfolioSelected = (portfolioId: string) => {
    return selectedPortfolios.includes(portfolioId);
  };

  return (
    <Dialog open={isOpen} onOpenChange={isOpen => !isOpen && onClose()}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Select Source Portfolios</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <div className="mb-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span>Total shares to allocate: {totalQuantity}</span>
              <span>Shares allocated: {tempTotalAllocation}</span>
            </div>
            
            <Progress value={allocationPercentage} className="h-2" />
            
            {isAllocationComplete ? (
              <div className="text-xs text-green-600 flex items-center">
                <Check className="h-3 w-3 mr-1" />
                <span>Perfect allocation</span>
              </div>
            ) : isAllocationExceeded ? (
              <div className="text-xs text-red-600">
                Over-allocated by {tempTotalAllocation - totalQuantity} shares
              </div>
            ) : (
              <div className="text-xs text-amber-600">
                {totalQuantity - tempTotalAllocation} shares remaining to allocate
              </div>
            )}
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

          <div className="max-h-[40vh] overflow-y-auto pr-1">
            {mockPortfoliosByInstitution.map(institution => {
              // Filter based on search query if present
              const institutionMatches = institution.name.toLowerCase().includes(searchQuery.toLowerCase());
              const hasMatchingEntities = institution.legalEntities.some(entity => 
                entity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                entity.portfolios?.some(portfolio => 
                  portfolio.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
                  availableHoldings[portfolio.id] > 0
                )
              );
              
              if (searchQuery && !institutionMatches && !hasMatchingEntities) {
                return null;
              }
              
              // Check if institution has any portfolios with available holdings
              const hasPortfoliosWithHoldings = institution.legalEntities.some(entity =>
                entity.portfolios?.some(portfolio => availableHoldings[portfolio.id] > 0)
              );
              
              if (!hasPortfoliosWithHoldings) {
                return null;
              }
              
              return (
                <div key={institution.id} className="mb-4 border rounded-md overflow-hidden">
                  <div
                    className="flex justify-between items-center p-3 bg-gray-50 cursor-pointer hover:bg-gray-100"
                    onClick={() => toggleInstitution(institution.id)}
                  >
                    <h3 className="font-medium">{institution.name}</h3>
                    <ChevronRight 
                      className={`h-5 w-5 transition-transform ${institutionsExpanded[institution.id] ? 'rotate-90' : ''}`} 
                    />
                  </div>
                  
                  {institutionsExpanded[institution.id] && (
                    <div className="p-2">
                      {institution.legalEntities.map(entity => {
                        // Filter entity's portfolios based on search and available holdings
                        const entityPortfolios = entity.portfolios?.filter(portfolio => 
                          (!searchQuery || 
                           portfolio.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           entity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           institution.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
                          availableHoldings[portfolio.id] > 0
                        );
                        
                        if (entityPortfolios?.length === 0) {
                          return null;
                        }
                        
                        return (
                          <div key={entity.id} className="ml-4 mb-3">
                            <h4 className="text-sm font-medium mb-2">{entity.name}</h4>
                            <div className="space-y-2">
                              {entityPortfolios?.map(portfolio => {
                                const isSelected = isPortfolioSelected(portfolio.id);
                                const currentQuantity = tempAllocations[portfolio.id] || 0;
                                const availableQuantity = availableHoldings[portfolio.id] || 0;
                                
                                return (
                                  <div key={portfolio.id} 
                                       className={`pl-4 py-2 border-l-2 ${isSelected ? 'border-blue-400 bg-blue-50' : 'border-gray-200'}`}>
                                    <div className="flex justify-between items-center mb-1">
                                      <div className="flex items-center">
                                        <input
                                          type="checkbox"
                                          id={`portfolio-${portfolio.id}`}
                                          checked={isSelected}
                                          onChange={() => onSelectPortfolio(portfolio.id)}
                                          className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <label htmlFor={`portfolio-${portfolio.id}`} className="text-sm cursor-pointer">
                                          {portfolio.name} <span className="text-xs text-gray-500">({availableQuantity} shares available)</span>
                                        </label>
                                      </div>
                                    </div>
                                    
                                    {isSelected && (
                                      <div className="flex items-center gap-2 mt-2 pl-6">
                                        <Input
                                          type="number"
                                          min="0"
                                          max={availableQuantity}
                                          value={currentQuantity || ""}
                                          onChange={(e) => onAllocationChange(portfolio.id, Number(e.target.value))}
                                          className="w-24 h-8"
                                          placeholder="0"
                                        />
                                        
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          className="text-xs h-8"
                                          onClick={() => onAllocationChange(portfolio.id, availableQuantity)}
                                        >
                                          Max ({availableQuantity})
                                        </Button>
                                        
                                        {!isAllocationComplete && (
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-xs h-8"
                                            onClick={() => onAllocationChange(portfolio.id, Math.min(availableQuantity, totalQuantity - (tempTotalAllocation - currentQuantity)))}
                                          >
                                            <Plus className="h-3 w-3 mr-1" /> Add Remaining
                                          </Button>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            className="bg-black text-white hover:bg-gray-800"
            onClick={handleConfirm}
            disabled={isSubmitting || selectedPortfolios.length === 0}
          >
            {isSubmitting ? "Confirming..." : "Confirm"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PortfolioSelectionModal;
