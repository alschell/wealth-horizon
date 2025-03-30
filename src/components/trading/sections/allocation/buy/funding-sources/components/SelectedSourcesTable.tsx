
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
  fundingAllocations: Record<string, number>;
  onAllocationChange: (sourceId: string, amount: number) => void;
  getSources: (type: "cash" | "credit") => any[];
  totalAmount: number;
  currency: string;
}

export const SelectedSourcesTable: React.FC<SelectedSourcesTableProps> = ({
  selectedSourceIds,
  fundingAllocations,
  onAllocationChange,
  getSources,
  totalAmount,
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
            <TableHead>Allocation</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedSourceIds.map(sourceId => {
            const isCash = sourceId.startsWith("cash-");
            const sources = getSources(isCash ? "cash" : "credit");
            const source = sources.find(s => s.id === sourceId);
            
            if (!source) return null;
            
            const available = isCash 
              ? source.balance
              : source.available;
            
            const amount = fundingAllocations[sourceId];
            
            return (
              <TableRow key={sourceId}>
                <TableCell>{source.name}</TableCell>
                <TableCell>{isCash ? "Cash Account" : "Credit Facility"}</TableCell>
                <TableCell>
                  {available.toLocaleString('en-US', {
                    style: 'currency',
                    currency: source.currency
                  })}
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    min="0"
                    max={available}
                    value={amount}
                    onChange={(e) => onAllocationChange(sourceId, Number(e.target.value))}
                    className="w-28"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onAllocationChange(sourceId, 0)}
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
