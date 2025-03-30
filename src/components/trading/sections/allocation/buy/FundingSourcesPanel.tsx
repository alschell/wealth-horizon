
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFundingSources } from "./funding-sources/hooks/useFundingSources";
import { SelectedSourcesTable } from "./funding-sources/components/SelectedSourcesTable";
import { CashAccountsPanel } from "./funding-sources/components/CashAccountsPanel";
import { CreditFacilitiesPanel } from "./funding-sources/components/CreditFacilitiesPanel";
import { ModalFooter } from "./funding-sources/components/ModalFooter";

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
  const {
    isSourcesSheetOpen,
    setSourcesSheetOpen,
    activeTab,
    setActiveTab,
    tempAllocations,
    selectedSourceIds,
    openSourcesSheet,
    applyAllocations,
    handleTempAllocationChange,
    getSources,
    allocations,
    handleAllocationChange
  } = useFundingSources({
    totalAmount,
    onAllocationChange,
    fundingAllocations
  });

  // Helper function to get source by ID
  const getSourceById = (sourceId: string) => {
    if (sourceId.startsWith('cash-')) {
      return getSources("cash").find((item: any) => item.id === sourceId);
    } else {
      return getSources("credit").find((item: any) => item.id === sourceId);
    }
  };

  return (
    <div className="space-y-4">
      <SelectedSourcesTable
        selectedSourceIds={selectedSourceIds}
        allocations={allocations}
        handleAllocationChange={handleAllocationChange}
        getSourceById={getSourceById}
        instrumentPrice={price}
        currency={currency}
      />
      
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
      <Sheet open={isSourcesSheetOpen} onOpenChange={setIsOpen => !setIsOpen && setSourcesSheetOpen(false)}>
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
              
              <TabsContent value="cash">
                <CashAccountsPanel
                  tempAllocations={tempAllocations}
                  handleTempAllocationChange={handleTempAllocationChange}
                  totalAmount={totalAmount}
                />
              </TabsContent>
              
              <TabsContent value="credit">
                <CreditFacilitiesPanel
                  tempAllocations={tempAllocations}
                  handleTempAllocationChange={handleTempAllocationChange}
                  totalAmount={totalAmount}
                />
              </TabsContent>
            </Tabs>
          </div>
          
          <ModalFooter onApply={applyAllocations} onClose={() => setSourcesSheetOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default FundingSourcesPanel;
