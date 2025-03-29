
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
  instrumentPrice: number;
  currency: string;
  getSourceById: (sourceId: string) => any;
  activeTab: "cash" | "credit";
  handleAllocationChange: (sourceId: string, quantity: number) => void;
  openSourceSelectionModal: () => void;
}

export const SelectedSourcesTable: React.FC<SelectedSourcesTableProps> = ({
  selectedSourceIds,
  allocations,
  instrumentPrice,
  currency,
  getSourceById,
  activeTab,
  handleAllocationChange,
  openSourceSelectionModal
}) => {
  if (selectedSourceIds.length === 0) {
    return (
      <div className="text-center py-4 border rounded-md">
        <p className="text-gray-500">No funding sources selected</p>
        <Button 
          onClick={openSourceSelectionModal}
          className="mt-2 bg-black text-white hover:bg-gray-800"
        >
          Add Funding Source
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
              <TableHead>Account</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Available</TableHead>
              <TableHead>Funded Quantity</TableHead>
              <TableHead>Est. Amount</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {selectedSourceIds.map(sourceId => {
              const source = getSourceById(sourceId);
              if (!source) return null;
              
              const sourceType = activeTab === "cash" ? "Cash" : "Credit";
              const available = activeTab === "cash" 
                ? (source as any).balance 
                : (source as any).available;
              
              const quantity = allocations[sourceId];
              const estAmount = quantity * instrumentPrice;
              
              return (
                <TableRow key={sourceId}>
                  <TableCell>{source.name}</TableCell>
                  <TableCell>{sourceType}</TableCell>
                  <TableCell>
                    {available.toLocaleString('en-US', {
                      style: 'currency',
                      currency: (source as any).currency || currency
                    })}
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min="0"
                      max={available / instrumentPrice}
                      value={quantity}
                      onChange={(e) => handleAllocationChange(sourceId, Number(e.target.value))}
                      className="w-24"
                    />
                  </TableCell>
                  <TableCell>
                    {estAmount.toLocaleString('en-US', {
                      style: 'currency',
                      currency: (source as any).currency || currency
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
      
      <div className="flex justify-end">
        <Button 
          onClick={openSourceSelectionModal}
          className="bg-black text-white hover:bg-gray-800"
        >
          Add Funding Source
        </Button>
      </div>
    </div>
  );
};
