
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { 
  mockPortfoliosByInstitution, 
  mockCashAccountsFlat,
  mockCreditFacilitiesFlat
} from "../../../../data";

interface SourceSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedSourceId: string | null;
  setSelectedSourceId: (id: string | null) => void;
  activeTab: "cash" | "credit";
  setActiveTab: (tab: "cash" | "credit") => void;
  allocations: Record<string, number>;
  currency: string;
}

export const SourceSelectionModal: React.FC<SourceSelectionModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  selectedSourceId,
  setSelectedSourceId,
  activeTab,
  setActiveTab,
  allocations,
  currency
}) => {
  const sourceList = activeTab === "cash" 
    ? mockCashAccountsFlat
    : mockCreditFacilitiesFlat;
  
  // Filter out already selected sources
  const availableSources = sourceList.filter(
    source => !Object.keys(allocations).includes(source.id) || allocations[source.id] === 0
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen => !setIsOpen && onClose()}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Select Funding Source</DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "cash" | "credit")}>
          <TabsList className="mb-4">
            <TabsTrigger value="cash">Cash Accounts</TabsTrigger>
            <TabsTrigger value="credit">Credit Facilities</TabsTrigger>
          </TabsList>
          
          <TabsContent value="cash" className="mt-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Select</TableHead>
                  <TableHead>Account Name</TableHead>
                  <TableHead>Institution</TableHead>
                  <TableHead>Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {availableSources.length > 0 ? (
                  availableSources.map(source => {
                    const institution = mockPortfoliosByInstitution.find(
                      inst => inst.id === source.institutionId
                    );
                    
                    return (
                      <TableRow 
                        key={source.id} 
                        className={selectedSourceId === source.id ? "bg-gray-100" : ""}
                        onClick={() => setSelectedSourceId(source.id)}
                      >
                        <TableCell>
                          <input 
                            type="radio" 
                            checked={selectedSourceId === source.id}
                            onChange={() => setSelectedSourceId(source.id)}
                          />
                        </TableCell>
                        <TableCell>{source.name}</TableCell>
                        <TableCell>{institution?.name || "Unknown"}</TableCell>
                        <TableCell>
                          {(source as any).balance.toLocaleString('en-US', {
                            style: 'currency',
                            currency: (source as any).currency || currency
                          })}
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      No available cash accounts
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="credit" className="mt-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Select</TableHead>
                  <TableHead>Facility Name</TableHead>
                  <TableHead>Institution</TableHead>
                  <TableHead>Available Credit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {availableSources.length > 0 ? (
                  availableSources.map(source => {
                    const institution = mockPortfoliosByInstitution.find(
                      inst => inst.id === source.institutionId
                    );
                    
                    return (
                      <TableRow 
                        key={source.id} 
                        className={selectedSourceId === source.id ? "bg-gray-100" : ""}
                        onClick={() => setSelectedSourceId(source.id)}
                      >
                        <TableCell>
                          <input 
                            type="radio" 
                            checked={selectedSourceId === source.id}
                            onChange={() => setSelectedSourceId(source.id)}
                          />
                        </TableCell>
                        <TableCell>{source.name}</TableCell>
                        <TableCell>{institution?.name || "Unknown"}</TableCell>
                        <TableCell>
                          {(source as any).available.toLocaleString('en-US', {
                            style: 'currency',
                            currency: (source as any).currency || currency
                          })}
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      No available credit facilities
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            className="bg-black text-white hover:bg-gray-800"
            onClick={onConfirm}
            disabled={!selectedSourceId}
          >
            Select
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
