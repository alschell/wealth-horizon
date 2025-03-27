
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
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<string | null>(null);

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

  // Open modal for selecting a portfolio
  const openPortfolioSelectionModal = () => {
    setIsModalOpen(true);
  };

  // Close modal and reset selection
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPortfolioId(null);
  };

  // Confirm selection and add allocation
  const confirmPortfolioSelection = () => {
    if (selectedPortfolioId) {
      const availableQuantity = availableHoldings[selectedPortfolioId] || 0;
      const suggestedAllocation = Math.min(
        availableQuantity,
        remainingQuantity > 0 ? remainingQuantity : 0
      );
      
      handleAllocationChange(selectedPortfolioId, suggestedAllocation);
    }
    closeModal();
  };

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
                        max={Math.min(availableQuantity, remainingQuantity + quantity)}
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
            Add Source Portfolio
          </Button>
        </div>
      </div>
    );
  };

  // Portfolio selection modal
  const renderPortfolioSelectionModal = () => {
    // Filter portfolios with available holdings
    const availablePortfolios = mockPortfoliosFlat
      .filter(portfolio => {
        const hasHoldings = availableHoldings[portfolio.id] && availableHoldings[portfolio.id] > 0;
        const notSelected = !Object.keys(allocations).includes(portfolio.id) || allocations[portfolio.id] === 0;
        return hasHoldings && notSelected;
      });
    
    return (
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Select Source Portfolio</DialogTitle>
          </DialogHeader>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Select</TableHead>
                <TableHead>Portfolio</TableHead>
                <TableHead>Institution</TableHead>
                <TableHead>Available Shares</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {availablePortfolios.length > 0 ? (
                availablePortfolios.map(portfolio => {
                  const institution = mockPortfoliosByInstitution.find(
                    inst => inst.id === portfolio.institutionId
                  );
                  
                  const availableQuantity = availableHoldings[portfolio.id] || 0;
                  
                  return (
                    <TableRow 
                      key={portfolio.id} 
                      className={selectedPortfolioId === portfolio.id ? "bg-gray-100" : ""}
                      onClick={() => setSelectedPortfolioId(portfolio.id)}
                    >
                      <TableCell>
                        <input 
                          type="radio" 
                          checked={selectedPortfolioId === portfolio.id}
                          onChange={() => setSelectedPortfolioId(portfolio.id)}
                        />
                      </TableCell>
                      <TableCell>{portfolio.name}</TableCell>
                      <TableCell>{institution?.name || "Unknown"}</TableCell>
                      <TableCell>{availableQuantity} shares</TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
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
              onClick={confirmPortfolioSelection}
              disabled={!selectedPortfolioId}
            >
              Select
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
