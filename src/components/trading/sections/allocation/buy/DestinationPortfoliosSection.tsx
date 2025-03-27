
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

interface DestinationPortfoliosSectionProps {
  totalQuantity: number;
  order: Partial<TradeOrder>;
  setOrder: (order: Partial<TradeOrder>) => void;
  viewMode: "portfolios" | "institutions";
}

const DestinationPortfoliosSection: React.FC<DestinationPortfoliosSectionProps> = ({ 
  totalQuantity, 
  order, 
  setOrder, 
  viewMode 
}) => {
  const [allocations, setAllocations] = useState<Record<string, number>>({});
  const [currentAllocation, setCurrentAllocation] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<string | null>(null);

  // Initialize with existing allocations if any
  useEffect(() => {
    const initialAllocations: Record<string, number> = {};
    
    if (order.depositAllocations) {
      order.depositAllocations
        .filter(allocation => allocation.destinationType === "portfolio")
        .forEach(allocation => {
          initialAllocations[allocation.destinationId] = allocation.quantity || 0;
        });
    }
    
    setAllocations(initialAllocations);
    updateCurrentAllocation(initialAllocations);
  }, [order.depositAllocations]);
  
  const updateCurrentAllocation = (allocs: Record<string, number>) => {
    const total = Object.values(allocs).reduce((sum, quantity) => sum + quantity, 0);
    setCurrentAllocation(total);
  };
  
  const handleAllocationChange = (portfolioId: string, quantity: number) => {
    const updatedAllocations = { ...allocations, [portfolioId]: quantity };
    setAllocations(updatedAllocations);
    updateCurrentAllocation(updatedAllocations);
    
    // Filter out other destination types (if any) and add updated portfolio allocations
    const otherAllocations = order.depositAllocations
      ? order.depositAllocations.filter(a => a.destinationType !== "portfolio")
      : [];
    
    const portfolioAllocations = Object.entries(updatedAllocations)
      .filter(([_, quantity]) => quantity > 0)
      .map(([destinationId, quantity]) => ({
        destinationId,
        destinationType: "portfolio" as const,
        quantity
      }));
    
    setOrder({
      ...order,
      depositAllocations: [...otherAllocations, ...portfolioAllocations]
    });
  };
  
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
      const suggestedAllocation = Math.min(
        totalQuantity,
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
          <p className="text-gray-500">No destination portfolios selected</p>
          <Button 
            onClick={openPortfolioSelectionModal}
            className="mt-2 bg-black text-white hover:bg-gray-800"
          >
            Add Destination Portfolio
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
                <TableHead>Institution</TableHead>
                <TableHead>Legal Entity</TableHead>
                <TableHead>Allocation</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedPortfolioIds.map(portfolioId => {
                const portfolio = mockPortfoliosFlat.find(p => p.id === portfolioId);
                if (!portfolio) return null;
                
                const institution = mockPortfoliosByInstitution.find(
                  inst => inst.id === portfolio.institutionId
                );
                
                let legalEntity;
                for (const inst of mockPortfoliosByInstitution) {
                  legalEntity = inst.legalEntities.find(
                    entity => entity.id === portfolio.legalEntityId
                  );
                  if (legalEntity) break;
                }
                
                return (
                  <TableRow key={portfolioId}>
                    <TableCell>{portfolio.name}</TableCell>
                    <TableCell>{institution?.name || "Unknown"}</TableCell>
                    <TableCell>{legalEntity?.name || "Unknown"}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="0"
                        max={remainingQuantity + allocations[portfolioId]}
                        value={allocations[portfolioId]}
                        onChange={(e) => handleAllocationChange(portfolioId, Number(e.target.value))}
                        className="w-24"
                      />
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
          >
            Add Destination Portfolio
          </Button>
        </div>
      </div>
    );
  };

  // Portfolio selection modal
  const renderPortfolioSelectionModal = () => {
    // Filter out already selected portfolios
    const availablePortfolios = mockPortfoliosFlat.filter(
      portfolio => !Object.keys(allocations).includes(portfolio.id) || allocations[portfolio.id] === 0
    );
    
    return (
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Select Destination Portfolio</DialogTitle>
          </DialogHeader>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Select</TableHead>
                <TableHead>Portfolio</TableHead>
                <TableHead>Institution</TableHead>
                <TableHead>Legal Entity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {availablePortfolios.length > 0 ? (
                availablePortfolios.map(portfolio => {
                  const institution = mockPortfoliosByInstitution.find(
                    inst => inst.id === portfolio.institutionId
                  );
                  
                  let legalEntity;
                  for (const inst of mockPortfoliosByInstitution) {
                    legalEntity = inst.legalEntities.find(
                      entity => entity.id === portfolio.legalEntityId
                    );
                    if (legalEntity) break;
                  }
                  
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
                      <TableCell>{legalEntity?.name || "Unknown"}</TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No available portfolios
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
        <h3 className="text-base font-medium mb-1">Destination Portfolios</h3>
        <p className="text-sm text-gray-500 mb-3">
          Select which portfolios to deposit the purchased shares into
        </p>
        
        {renderSelectedPortfolios()}
        {renderPortfolioSelectionModal()}
      </div>
      
      <QuantityAllocationSummary
        totalQuantity={totalQuantity}
        currentAllocation={currentAllocation}
        remainingQuantity={remainingQuantity}
      />
    </div>
  );
};

export default DestinationPortfoliosSection;
