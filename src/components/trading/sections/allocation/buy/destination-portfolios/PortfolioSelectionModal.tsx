
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { mockPortfoliosByInstitution } from "../../../../data";

interface PortfolioSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selections: Record<string, number>) => void;
  totalQuantity: number;
  currentAllocations: Record<string, number>;
  instrumentPrice: number;
  currency: string;
}

export const PortfolioSelectionModal: React.FC<PortfolioSelectionModalProps> = ({
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
  React.useEffect(() => {
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
        
        <div className="py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium">Total shares</p>
              <p className="text-lg font-bold">{totalQuantity}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Allocated</p>
              <p className="text-lg font-bold">
                {totalAllocated} <span className="text-sm font-normal text-gray-500">of {totalQuantity}</span>
              </p>
            </div>
          </div>

          <div className={`p-2 mb-4 text-sm rounded-md ${
            remainingQuantity > 0 
              ? "bg-yellow-50 text-yellow-800" 
              : "bg-green-50 text-green-800"
          }`}>
            {remainingQuantity > 0 
              ? `Still need to allocate ${remainingQuantity} more shares`
              : "All shares have been allocated"}
          </div>

          <div className="max-h-[50vh] overflow-y-auto">
            <div className="space-y-8">
              {mockPortfoliosByInstitution.map(institution => (
                <div key={institution.id} className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">{institution.name}</h3>
                  
                  {institution.legalEntities.map(entity => (
                    <div key={entity.id} className="ml-4 space-y-3">
                      <h4 className="font-medium text-base text-gray-700">{entity.name}</h4>
                      
                      <div className="space-y-2 ml-4">
                        {entity.portfolios.map(portfolio => {
                          const currentAllocation = tempAllocations[portfolio.id] || 0;
                          const estimatedValue = currentAllocation * instrumentPrice;
                          
                          return (
                            <div key={portfolio.id} className="p-3 border rounded-md">
                              <div className="flex flex-col mb-2">
                                <h5 className="text-sm font-medium">{portfolio.name}</h5>
                              </div>
                              
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <Input
                                    type="number"
                                    min="0"
                                    max={totalQuantity}
                                    value={currentAllocation}
                                    onChange={(e) => handleAllocationChange(portfolio.id, Number(e.target.value))}
                                    className="w-full"
                                    placeholder="Number of shares"
                                  />
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="whitespace-nowrap"
                                    onClick={() => handleAllocationChange(portfolio.id, remainingQuantity > 0 ? remainingQuantity : 0)}
                                  >
                                    Max
                                  </Button>
                                </div>
                                
                                {currentAllocation > 0 && (
                                  <p className="text-sm text-gray-600">
                                    Est. value: {estimatedValue.toLocaleString('en-US', {
                                      style: 'currency', 
                                      currency
                                    })}
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            className="bg-black text-white hover:bg-gray-800"
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PortfolioSelectionModal;
