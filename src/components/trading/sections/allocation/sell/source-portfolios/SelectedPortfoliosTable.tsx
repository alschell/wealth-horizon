
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
import { mockPortfoliosFlat } from "../../../../data";

interface SelectedPortfoliosTableProps {
  allocations: Record<string, number>;
  availableHoldings: Record<string, number>;
  price: number;
  selectedInstrument: any;
  onAllocationChange: (portfolioId: string, quantity: number) => void;
  onOpenModal: () => void;
}

const SelectedPortfoliosTable: React.FC<SelectedPortfoliosTableProps> = ({
  allocations,
  availableHoldings,
  price,
  selectedInstrument,
  onAllocationChange,
  onOpenModal
}) => {
  const selectedPortfolioIds = Object.keys(allocations).filter(id => allocations[id] > 0);
  
  if (selectedPortfolioIds.length === 0) {
    return (
      <div className="text-center py-4 border rounded-md">
        <p className="text-gray-500">No source portfolios selected</p>
        <Button 
          onClick={onOpenModal}
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
                      onChange={(e) => onAllocationChange(portfolioId, Number(e.target.value))}
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
      
      <div className="flex justify-end">
        <Button 
          onClick={onOpenModal}
          className="bg-black text-white hover:bg-gray-800"
          disabled={!selectedInstrument}
        >
          Manage Source Portfolios
        </Button>
      </div>
    </div>
  );
};

export default SelectedPortfoliosTable;
