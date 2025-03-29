
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
import { mockPortfoliosFlat, mockPortfoliosByInstitution } from "../../../../data";

interface SelectedPortfoliosTableProps {
  selectedPortfolioIds: string[];
  allocations: Record<string, number>;
  remainingQuantity: number;
  handleAllocationChange: (portfolioId: string, quantity: number) => void;
  openPortfolioSelectionModal: () => void;
}

export const SelectedPortfoliosTable: React.FC<SelectedPortfoliosTableProps> = ({
  selectedPortfolioIds,
  allocations,
  remainingQuantity,
  handleAllocationChange,
  openPortfolioSelectionModal
}) => {
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
