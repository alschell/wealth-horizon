
import React from "react";
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
import { Check } from "lucide-react";
import { CustomBadge } from "@/components/ui/custom-badge";
import { mockPortfoliosFlat, mockPortfoliosByInstitution } from "../../../../data";

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
  // Get all portfolios with available holdings
  const portfoliosWithHoldings = mockPortfoliosFlat
    .filter(portfolio => {
      return availableHoldings[portfolio.id] && availableHoldings[portfolio.id] > 0;
    });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
              <CustomBadge 
                variant={isAllocationComplete ? "success" : isAllocationExceeded ? "destructive" : "outline"}
              >
                {tempTotalAllocation} / {totalQuantity} shares allocated
              </CustomBadge>
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
                        onChange={() => onSelectPortfolio(portfolio.id)}
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
                        onChange={(e) => onAllocationChange(portfolio.id, Number(e.target.value))}
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
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            className="bg-black text-white hover:bg-gray-800"
            onClick={onConfirm}
            disabled={portfoliosWithHoldings.length === 0 || selectedPortfolios.length === 0}
          >
            Confirm Selections
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PortfolioSelectionModal;
