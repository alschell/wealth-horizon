
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { mockPortfoliosFlat } from "../../../data";

interface SourcePortfoliosPanelProps {
  portfolioAllocations: Record<string, number>;
  onAllocationChange: (portfolioId: string, quantity: number) => void;
  totalQuantity: number;
  selectedInstrument: any;
  price: number;
}

const SourcePortfoliosPanel: React.FC<SourcePortfoliosPanelProps> = ({
  portfolioAllocations,
  onAllocationChange,
  totalQuantity,
  selectedInstrument,
  price
}) => {
  const [isPortfoliosSheetOpen, setPortfoliosSheetOpen] = useState(false);
  const [tempAllocations, setTempAllocations] = useState<Record<string, number>>({});
  const [availableHoldings, setAvailableHoldings] = useState<Record<string, number>>({});
  
  // Get selected portfolio IDs
  const selectedPortfolioIds = Object.keys(portfolioAllocations).filter(id => portfolioAllocations[id] > 0);
  
  // Initialize available holdings (mock data)
  useEffect(() => {
    if (selectedInstrument) {
      const mockAvailable: Record<string, number> = {};
      
      mockPortfoliosFlat.forEach(portfolio => {
        // Simulate random holdings between 10 and 1000 shares
        mockAvailable[portfolio.id] = Math.floor(Math.random() * 990) + 10;
      });
      
      setAvailableHoldings(mockAvailable);
    }
  }, [selectedInstrument]);
  
  // Open portfolios selection sheet
  const openPortfoliosSheet = () => {
    setTempAllocations({ ...portfolioAllocations });
    setPortfoliosSheetOpen(true);
  };
  
  // Apply temporary allocations to the actual allocations
  const applyAllocations = () => {
    Object.entries(tempAllocations).forEach(([portfolioId, quantity]) => {
      if (quantity > 0) {
        onAllocationChange(portfolioId, quantity);
      }
    });
    setPortfoliosSheetOpen(false);
  };
  
  // Handle temporary allocation changes
  const handleTempAllocationChange = (portfolioId: string, quantity: number) => {
    setTempAllocations(prev => ({ ...prev, [portfolioId]: quantity }));
  };

  return (
    <div className="space-y-4">
      {selectedPortfolioIds.length > 0 ? (
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
                const quantity = portfolioAllocations[portfolioId];
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
                        onChange={(e) => onAllocationChange(portfolioId, Number(e.target.value))}
                        className="w-28"
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
                        onClick={() => onAllocationChange(portfolioId, 0)}
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
      ) : (
        <div className="flex flex-col items-center justify-center p-6 border border-dashed rounded-md border-gray-300">
          <p className="text-gray-500 mb-2">No source portfolios selected</p>
          <Button 
            variant="outline"
            onClick={openPortfoliosSheet}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Source Portfolio
          </Button>
        </div>
      )}
      
      <div className="flex justify-end">
        <Button 
          onClick={openPortfoliosSheet}
          className="flex items-center gap-2 bg-black text-white hover:bg-gray-800"
        >
          <Plus className="h-4 w-4" />
          {selectedPortfolioIds.length > 0 ? "Manage Source Portfolios" : "Add Source Portfolio"}
        </Button>
      </div>
      
      {/* Portfolios Sheet */}
      <Sheet open={isPortfoliosSheetOpen} onOpenChange={setPortfoliosSheetOpen}>
        <SheetContent className="sm:max-w-md" side="right">
          <SheetHeader>
            <SheetTitle>Select Source Portfolios</SheetTitle>
          </SheetHeader>
          
          <div className="mt-6 space-y-4">
            {mockPortfoliosFlat.map(portfolio => {
              const availableQuantity = availableHoldings[portfolio.id] || 0;
              
              return (
                <div key={portfolio.id} className="p-4 border rounded-md">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{portfolio.name}</h4>
                      <p className="text-xs text-gray-500">{portfolio.type} Portfolio</p>
                    </div>
                    <div className="text-sm text-right">
                      <div>Available</div>
                      <div className="font-semibold">{availableQuantity} shares</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-4">
                    <Input
                      type="number"
                      min="0"
                      max={availableQuantity}
                      value={tempAllocations[portfolio.id] || 0}
                      onChange={(e) => handleTempAllocationChange(portfolio.id, Number(e.target.value))}
                      className="w-full"
                      placeholder="0"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="whitespace-nowrap"
                      onClick={() => handleTempAllocationChange(
                        portfolio.id,
                        Math.min(availableQuantity, totalQuantity)
                      )}
                    >
                      Max
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button onClick={applyAllocations} className="bg-black text-white hover:bg-gray-800">
              Apply
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SourcePortfoliosPanel;
