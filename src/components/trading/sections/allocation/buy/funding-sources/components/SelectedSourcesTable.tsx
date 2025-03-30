
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

interface SelectedSourcesTableProps {
  selectedSourceIds: string[];
  allocations: Record<string, number>;
  handleAllocationChange: (sourceId: string, shares: number) => void;
  getSourceById: (sourceId: string) => any;
  instrumentPrice: number;
  currency: string;
}

export const SelectedSourcesTable: React.FC<SelectedSourcesTableProps> = ({
  selectedSourceIds,
  allocations,
  handleAllocationChange,
  getSourceById,
  instrumentPrice,
  currency
}) => {
  if (selectedSourceIds.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 border border-dashed rounded-md border-gray-300">
        <p className="text-gray-500 mb-2">No funding sources selected</p>
      </div>
    );
  }

  return (
    <div className="border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Source</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Available</TableHead>
            <TableHead>Shares</TableHead>
            <TableHead>Est. Amount</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedSourceIds.map(sourceId => {
            const source = getSourceById(sourceId);
            if (!source) return null;
            
            const sourceType = sourceId.startsWith("cash-") ? "Cash" : "Credit";
            const available = sourceId.startsWith("cash-") 
              ? (source as any).balance 
              : (source as any).available;
            
            const maxShares = Math.floor(available / instrumentPrice);
            const shares = allocations[sourceId] || 0;
            const estimatedAmount = shares * instrumentPrice;
            
            return (
              <TableRow key={sourceId}>
                <TableCell className="font-medium">{source.name}</TableCell>
                <TableCell>{sourceType}</TableCell>
                <TableCell>
                  {available.toLocaleString('en-US', {
                    style: 'currency',
                    currency: source.currency || currency
                  })}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min="0"
                      max={maxShares}
                      value={shares}
                      onChange={(e) => handleAllocationChange(sourceId, Number(e.target.value))}
                      className="w-24"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs whitespace-nowrap"
                      onClick={() => handleAllocationChange(sourceId, maxShares)}
                    >
                      Max
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  {estimatedAmount.toLocaleString('en-US', {
                    style: 'currency',
                    currency: source.currency || currency
                  })}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAllocationChange(sourceId, 0)}
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
  );
};
