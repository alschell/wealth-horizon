
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { mockPortfoliosFlat, mockPortfoliosByInstitution } from "../../../../data";

interface PortfolioSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedPortfolioId: string | null;
  setSelectedPortfolioId: (id: string | null) => void;
  allocations: Record<string, number>;
}

export const PortfolioSelectionModal: React.FC<PortfolioSelectionModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  selectedPortfolioId,
  setSelectedPortfolioId,
  allocations
}) => {
  // Filter out already selected portfolios
  const availablePortfolios = mockPortfoliosFlat.filter(
    portfolio => !Object.keys(allocations).includes(portfolio.id) || allocations[portfolio.id] === 0
  );
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Select Destination Portfolio</DialogTitle>
        </DialogHeader>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Select</TableHead>
              <TableHead>Portfolio</TableHead>
              <TableHead>Institution</TableHead>
              <TableHead>Legal Entity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {availablePortfolios.length > 0 ? (
              availablePortfolios.map(portfolio => {
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
                  <TableRow 
                    key={portfolio.id} 
                    className={selectedPortfolioId === portfolio.id ? "bg-gray-100" : ""}
                    onClick={() => setSelectedPortfolioId(portfolio.id)}
                  >
                    <TableCell>
                      <input 
                        type="radio" 
                        checked={selectedPortfolioId === portfolio.id}
                        onChange={() => setSelectedPortfolioId(portfolio.id)}
                      />
                    </TableCell>
                    <TableCell>{portfolio.name}</TableCell>
                    <TableCell>{institution?.name || "Unknown"}</TableCell>
                    <TableCell>{legalEntity?.name || "Unknown"}</TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No available portfolios
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
            disabled={!selectedPortfolioId}
          >
            Select
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
