
import React, { useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockCashAccountsFlat, mockCreditFacilitiesFlat } from "../../../data";

interface FundingSourcesPanelProps {
  fundingAllocations: Record<string, number>;
  onAllocationChange: (sourceId: string, amount: number) => void;
  totalAmount: number;
  currency: string;
  price: number;
}

const FundingSourcesPanel: React.FC<FundingSourcesPanelProps> = ({
  fundingAllocations,
  onAllocationChange,
  totalAmount,
  currency,
  price
}) => {
  const [isSourcesSheetOpen, setSourcesSheetOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"cash" | "credit">("cash");
  const [tempAllocations, setTempAllocations] = useState<Record<string, number>>({});
  
  // Get selected source IDs
  const selectedSourceIds = Object.keys(fundingAllocations).filter(id => fundingAllocations[id] > 0);
  
  // Open sources selection sheet
  const openSourcesSheet = () => {
    setTempAllocations({ ...fundingAllocations });
    setSourcesSheetOpen(true);
  };
  
  // Apply temporary allocations to the actual allocations
  const applyAllocations = () => {
    Object.entries(tempAllocations).forEach(([sourceId, amount]) => {
      if (amount > 0) {
        onAllocationChange(sourceId, amount);
      }
    });
    setSourcesSheetOpen(false);
  };
  
  // Handle temporary allocation changes
  const handleTempAllocationChange = (sourceId: string, amount: number) => {
    setTempAllocations(prev => ({ ...prev, [sourceId]: amount }));
  };

  return (
    <div className="space-y-4">
      {selectedSourceIds.length > 0 ? (
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
                const source = isCash 
                  ? mockCashAccountsFlat.find(a => a.id === sourceId)
                  : mockCreditFacilitiesFlat.find(f => f.id === sourceId);
                
                if (!source) return null;
                
                const available = isCash 
                  ? (source as any).balance
                  : (source as any).available;
                
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
      ) : (
        <div className="flex flex-col items-center justify-center p-6 border border-dashed rounded-md border-gray-300">
          <p className="text-gray-500 mb-2">No funding sources selected</p>
          <Button 
            variant="outline"
            onClick={openSourcesSheet}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Funding Source
          </Button>
        </div>
      )}
      
      <div className="flex justify-end">
        <Button 
          onClick={openSourcesSheet}
          className="flex items-center gap-2 bg-black text-white hover:bg-gray-800"
        >
          <Plus className="h-4 w-4" />
          {selectedSourceIds.length > 0 ? "Manage Funding Sources" : "Add Funding Source"}
        </Button>
      </div>
      
      {/* Funding Sources Sheet */}
      <Sheet open={isSourcesSheetOpen} onOpenChange={setSourcesSheetOpen}>
        <SheetContent className="sm:max-w-md" side="right">
          <SheetHeader>
            <SheetTitle>Select Funding Sources</SheetTitle>
          </SheetHeader>
          
          <div className="mt-6 space-y-6">
            <Tabs defaultValue="cash" value={activeTab} onValueChange={(v) => setActiveTab(v as "cash" | "credit")}>
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="cash">Cash Accounts</TabsTrigger>
                <TabsTrigger value="credit">Credit Facilities</TabsTrigger>
              </TabsList>
              
              <TabsContent value="cash" className="mt-4 space-y-4">
                {mockCashAccountsFlat.map(account => {
                  const isSelected = Boolean(tempAllocations[account.id]);
                  
                  return (
                    <div key={account.id} className="p-4 border rounded-md">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{account.name}</h4>
                          <p className="text-xs text-gray-500">{account.currency} Account</p>
                        </div>
                        <div className="text-sm text-right">
                          <div>Available</div>
                          <div className="font-semibold">
                            {account.balance.toLocaleString('en-US', {
                              style: 'currency',
                              currency: account.currency
                            })}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-4">
                        <Input
                          type="number"
                          min="0"
                          max={account.balance}
                          value={tempAllocations[account.id] || 0}
                          onChange={(e) => handleTempAllocationChange(account.id, Number(e.target.value))}
                          className="w-full"
                          placeholder="0.00"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          className="whitespace-nowrap"
                          onClick={() => handleTempAllocationChange(
                            account.id,
                            Math.min(account.balance, totalAmount)
                          )}
                        >
                          Max
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </TabsContent>
              
              <TabsContent value="credit" className="mt-4 space-y-4">
                {mockCreditFacilitiesFlat.map(facility => {
                  const isSelected = Boolean(tempAllocations[facility.id]);
                  
                  return (
                    <div key={facility.id} className="p-4 border rounded-md">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{facility.name}</h4>
                          <p className="text-xs text-gray-500">{facility.currency} Credit Line</p>
                        </div>
                        <div className="text-sm text-right">
                          <div>Available</div>
                          <div className="font-semibold">
                            {facility.available.toLocaleString('en-US', {
                              style: 'currency',
                              currency: facility.currency
                            })}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-4">
                        <Input
                          type="number"
                          min="0"
                          max={facility.available}
                          value={tempAllocations[facility.id] || 0}
                          onChange={(e) => handleTempAllocationChange(facility.id, Number(e.target.value))}
                          className="w-full"
                          placeholder="0.00"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          className="whitespace-nowrap"
                          onClick={() => handleTempAllocationChange(
                            facility.id,
                            Math.min(facility.available, totalAmount)
                          )}
                        >
                          Max
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </TabsContent>
            </Tabs>
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

export default FundingSourcesPanel;
