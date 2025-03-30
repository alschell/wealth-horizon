
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
  handleAllocationChange: (portfolioId: string, quantity: number) => void;
  instrumentPrice: number;
  currency: string;
}

export const SelectedPortfoliosTable: React.FC<SelectedPortfoliosTableProps> = ({
  selectedPortfolioIds,
  allocations,
  handleAllocationChange,
  instrumentPrice,
  currency
}) => {
  // Helper function to find legal entity name
  const findLegalEntityName = (legalEntityId: string): string => {
    for (const institution of mockPortfoliosByInstitution) {
      const entity = institution.legalEntities.find(e => e.id === legalEntityId);
      if (entity) return entity.name;
    }
    return "Unknown";
  };

  // Helper function to find institution name
  const findInstitutionName = (institutionId: string): string => {
    const institution = mockPortfoliosByInstitution.find(i => i.id === institutionId);
    return institution ? institution.name : "Unknown";
  };

  if (selectedPortfolioIds.length === 0) {
    return (
      <div className="text-center py-4 border rounded-md">
        <p className="text-gray-500">No destination portfolios selected</p>
        <Button 
          onClick={() => {}} // Will be handled by parent component
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
              <TableHead>Institution</TableHead>
              <TableHead>Legal Entity</TableHead>
              <TableHead>Portfolio</TableHead>
              <TableHead>Shares</TableHead>
              <TableHead>Est. Value</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {selectedPortfolioIds.map(portfolioId => {
              const portfolio = mockPortfoliosFlat.find(p => p.id === portfolioId);
              if (!portfolio) return null;
              
              const institutionName = findInstitutionName(portfolio.institutionId);
              const legalEntityName = findLegalEntityName(portfolio.legalEntityId);
              
              const shares = allocations[portfolioId] || 0;
              const estimatedValue = shares * instrumentPrice;
              
              return (
                <TableRow key={portfolioId}>
                  <TableCell>{institutionName}</TableCell>
                  <TableCell>{legalEntityName}</TableCell>
                  <TableCell className="font-medium">{portfolio.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min="0"
                        value={shares}
                        onChange={(e) => handleAllocationChange(portfolioId, Number(e.target.value))}
                        className="w-24"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    {estimatedValue.toLocaleString('en-US', {
                      style: 'currency', 
                      currency
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
          onClick={() => {}} // Will be handled by parent component through onOpenModal
          className="bg-black text-white hover:bg-gray-800"
        >
          Manage Destination Portfolios
        </Button>
      </div>
    </div>
  );
};

export default SelectedPortfoliosTable;
