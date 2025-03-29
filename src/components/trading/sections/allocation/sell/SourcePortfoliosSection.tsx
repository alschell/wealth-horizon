
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TradeOrder } from "../../../types";
import { QuantityAllocationSummary } from "../AllocationSummary";
import { mockPortfoliosFlat, mockPortfoliosByInstitution } from "../../../data";
import { Check, Info } from "lucide-react";
import { Tooltip } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface SourcePortfoliosSectionProps {
  totalQuantity: number;
  selectedInstrument: any;
  order: Partial<TradeOrder>;
  setOrder: (order: Partial<TradeOrder>) => void;
  viewMode: "portfolios" | "institutions";
  price: number;
}

const SourcePortfoliosSection: React.FC<SourcePortfoliosSectionProps> = ({ 
  totalQuantity, 
  selectedInstrument, 
  order, 
  setOrder, 
  viewMode, 
  price 
}) => {
  const [allocations, setAllocations] = useState<Record<string, number>>({});
  const [currentAllocation, setCurrentAllocation] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPortfolios, setSelectedPortfolios] = useState<string[]>([]);
  const [tempAllocations, setTempAllocations] = useState<Record<string, number>>({});

  // Initialize with existing allocations if any
  useEffect(() => {
    const initialAllocations: Record<string, number> = {};
    
    if (order.instrumentAllocations) {
      order.instrumentAllocations.forEach(allocation => {
        initialAllocations[allocation.portfolioId] = allocation.quantity;
      });
    }
    
    setAllocations(initialAllocations);
    updateCurrentAllocation(initialAllocations);
  }, [order.instrumentAllocations]);
  
  const updateCurrentAllocation = (allocs: Record<string, number>) => {
    const total = Object.values(allocs).reduce((sum, quantity) => sum + quantity, 0);
    setCurrentAllocation(total);
  };
  
  const handleAllocationChange = (portfolioId: string, quantity: number) => {
    const updatedAllocations = { ...allocations, [portfolioId]: quantity };
    setAllocations(updatedAllocations);
    updateCurrentAllocation(updatedAllocations);
    
    // Update order with new allocations
    const instrumentAllocations = Object.entries(updatedAllocations)
      .filter(([_, quantity]) => quantity > 0)
      .map(([portfolioId, quantity]) => ({
        portfolioId,
        quantity
      }));
    
    setOrder({ ...order, instrumentAllocations });
  };
  
  // Get available holdings for the selected instrument in each portfolio
  const getAvailableHoldings = () => {
    if (!selectedInstrument) return {};
    
    const holdings: Record<string, number> = {};
    
    // Simulate available holdings for demo purposes
    mockPortfoliosFlat.forEach(portfolio => {
      const holding = portfolio.holdings.find(h => h.instrumentId === selectedInstrument.id);
      if (holding) {
        holdings[portfolio.id] = holding.quantity;
      }
    });
    
    return holdings;
  };
  
  const availableHoldings = getAvailableHoldings();
  
  // Calculate the remaining quantity to allocate
  const remainingQuantity = totalQuantity - currentAllocation;

  // Open modal for selecting portfolios
  const openPortfolioSelectionModal = () => {
    // Initialize temporary allocations with existing ones
    setTempAllocations({ ...allocations });
    
    // Initialize selected portfolios from existing allocations
    setSelectedPortfolios(
      Object.keys(allocations).filter(id => allocations[id] > 0)
    );
    
    setIsModalOpen(true);
  };

  // Handle portfolio selection in modal
  const handlePortfolioSelect = (portfolioId: string) => {
    setSelectedPortfolios(prev => {
      if (prev.includes(portfolioId)) {
        return prev.filter(id => id !== portfolioId);
      } else {
        return [...prev, portfolioId];
      }
    });
    
    // Initialize quantity with a default value if not already set
    if (!tempAllocations[portfolioId]) {
      const availableQty = availableHoldings[portfolioId] || 0;
      const suggestedQty = Math.min(
        availableQty, 
        remainingQuantity > 0 ? remainingQuantity : 0
      );
      setTempAllocations(prev => ({ ...prev, [portfolioId]: suggestedQty }));
    }
  };
  
  // Handle temp allocation change in modal
  const handleTempAllocationChange = (portfolioId: string, quantity: number) => {
    setTempAllocations(prev => ({ ...prev, [portfolioId]: quantity }));
  };

  // Close modal and reset selection
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPortfolios([]);
    setTempAllocations({});
  };

  // Confirm selections and allocations from modal
  const confirmPortfolioSelections = () => {
    // Update allocations with temp allocations for selected portfolios
    const newAllocations = { ...allocations };
    
    // Clear allocations for portfolios that are no longer selected
    Object.keys(newAllocations).forEach(portfolioId => {
      if (!selectedPortfolios.includes(portfolioId)) {
        delete newAllocations[portfolioId];
      }
    });
    
    // Add or update allocations for selected portfolios
    selectedPortfolios.forEach(portfolioId => {
      newAllocations[portfolioId] = tempAllocations[portfolioId] || 0;
    });
    
    // Update state and order
    setAllocations(newAllocations);
    updateCurrentAllocation(newAllocations);
    
    const instrumentAllocations = Object.entries(newAllocations)
      .filter(([_, quantity]) => quantity > 0)
      .map(([portfolioId, quantity]) => ({
        portfolioId,
        quantity
      }));
    
    setOrder({ ...order, instrumentAllocations });
    
    // Close modal
    closeModal();
  };

  // Calculate total temporary allocation
  const tempTotalAllocation = selectedPortfolios.reduce(
    (sum, portfolioId) => sum + (tempAllocations[portfolioId] || 0), 
    0
  );
  
  // Check if the total matches the required quantity
  const isAllocationComplete = tempTotalAllocation === totalQuantity;
  const isAllocationExceeded = tempTotalAllocation > totalQuantity;

  // Render selected portfolios table
  const renderSelectedPortfolios = () => {
    const selectedPortfolioIds = Object.keys(allocations).filter(id => allocations[id] > 0);
    
    if (selectedPortfolioIds.length === 0) {
      return (
        <div className="text-center py-4 border rounded-md">
          <p className="text-gray-500">No source portfolios selected</p>
          <Button 
            onClick={openPortfolioSelectionModal}
            className="mt-2 bg-black text-white hover:bg-gray-800"
            disabled={!selectedInstrument}
          >
            Add Source Portfolio
          </Button>
        </div>
      );
    }
    
    return (
      <div className="space-y-4">
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Portfolio</TableHead>
                <TableHead>Available</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Est. Value</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedPortfolioIds.map(portfolioId => {
                const portfolio = mockPortfoliosFlat.find(p => p.id === portfolioId);
                if (!portfolio) return null;
                
                const availableQuantity = availableHoldings[portfolioId] || 0;
                const quantity = allocations[portfolioId];
                const estimatedValue = quantity * price;
                
                return (
                  <TableRow key={portfolioId}>
                    <TableCell>{portfolio.name}</TableCell>
                    <TableCell>{availableQuantity} shares</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="0"
                        max={availableQuantity}
                        value={quantity}
                        onChange={(e) => handleAllocationChange(portfolioId, Number(e.target.value))}
                        className="w-24"
                      />
                    </TableCell>
                    <TableCell>
                      {estimatedValue.toLocaleString('en-US', {
                        style: 'currency',
                        currency: selectedInstrument?.currency || "USD"
                      })}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAllocationChange(portfolioId, 0)}
                        className="text-xs"
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex justify-end">
          <Button 
            onClick={openPortfolioSelectionModal}
            className="bg-black text-white hover:bg-gray-800"
            disabled={!selectedInstrument}
          >
            Manage Source Portfolios
          </Button>
        </div>
      </div>
    );
  };

  // Portfolio selection modal
  const renderPortfolioSelectionModal = () => {
    // Get all portfolios with available holdings
    const portfoliosWithHoldings = mockPortfoliosFlat
      .filter(portfolio => {
        return availableHoldings[portfolio.id] && availableHoldings[portfolio.id] > 0;
      });
    
    return (
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Select Source Portfolios</DialogTitle>
          </DialogHeader>
          
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              Select which portfolios to sell shares from and specify the quantity from each. 
              The total must match the order quantity of {totalQuantity} shares.
            </p>
            
            <div className="mt-2 flex items-center justify-between">
              <div>
                <Badge variant={isAllocationComplete ? "success" : isAllocationExceeded ? "destructive" : "outline"}>
                  {tempTotalAllocation} / {totalQuantity} shares allocated
                </Badge>
              </div>
              <div className="text-sm text-gray-600">
                {isAllocationComplete ? (
                  <span className="text-green-600 flex items-center">
                    <Check className="h-4 w-4 mr-1" /> Perfect allocation
                  </span>
                ) : isAllocationExceeded ? (
                  <span className="text-red-600">
                    Over-allocated by {tempTotalAllocation - totalQuantity} shares
                  </span>
                ) : (
                  <span className="text-amber-600">
                    {totalQuantity - tempTotalAllocation} shares remaining to allocate
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Select</TableHead>
                <TableHead>Portfolio</TableHead>
                <TableHead>Institution</TableHead>
                <TableHead>Available Shares</TableHead>
                <TableHead>Quantity to Sell</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {portfoliosWithHoldings.length > 0 ? (
                portfoliosWithHoldings.map(portfolio => {
                  const institution = mockPortfoliosByInstitution.find(
                    inst => inst.id === portfolio.institutionId
                  );
                  
                  const availableQuantity = availableHoldings[portfolio.id] || 0;
                  const isSelected = selectedPortfolios.includes(portfolio.id);
                  
                  return (
                    <TableRow 
                      key={portfolio.id} 
                      className={isSelected ? "bg-gray-50" : ""}
                    >
                      <TableCell>
                        <input 
                          type="checkbox" 
                          checked={isSelected}
                          onChange={() => handlePortfolioSelect(portfolio.id)}
                          className="h-4 w-4"
                        />
                      </TableCell>
                      <TableCell>{portfolio.name}</TableCell>
                      <TableCell>{institution?.name || "Unknown"}</TableCell>
                      <TableCell>{availableQuantity} shares</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="0"
                          max={availableQuantity}
                          value={tempAllocations[portfolio.id] || 0}
                          onChange={(e) => handleTempAllocationChange(portfolio.id, Number(e.target.value))}
                          disabled={!isSelected}
                          className="w-24"
                        />
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No portfolios with holdings of this instrument
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button 
              className="bg-black text-white hover:bg-gray-800"
              onClick={confirmPortfolioSelections}
              disabled={portfoliosWithHoldings.length === 0 || selectedPortfolios.length === 0}
            >
              Confirm Selections
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-medium mb-1">Source Portfolios</h3>
        <p className="text-sm text-gray-500 mb-3">
          Select which portfolios to sell shares from
        </p>
        
        {selectedInstrument ? (
          <>
            {renderSelectedPortfolios()}
            {renderPortfolioSelectionModal()}
          </>
        ) : (
          <div className="text-center p-4 border rounded-md">
            Please select an instrument first
          </div>
        )}
      </div>
      
      <QuantityAllocationSummary
        totalQuantity={totalQuantity}
        currentAllocation={currentAllocation}
        remainingQuantity={remainingQuantity}
      />
    </div>
  );
};

export default SourcePortfoliosSection;
