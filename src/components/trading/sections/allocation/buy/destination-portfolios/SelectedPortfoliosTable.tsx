
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
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Portfolio</TableHead>
          <TableHead>Institution</TableHead>
          <TableHead>Legal Entity</TableHead>
          <TableHead>Shares</TableHead>
          <TableHead>Est. Value</TableHead>
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
          
          const shares = allocations[portfolioId] || 0;
          const estimatedValue = shares * instrumentPrice;
          
          return (
            <TableRow key={portfolioId}>
              <TableCell className="font-medium">{portfolio.name}</TableCell>
              <TableCell>{institution?.name || "Unknown"}</TableCell>
              <TableCell>{legalEntity?.name || "Unknown"}</TableCell>
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
  );
};
