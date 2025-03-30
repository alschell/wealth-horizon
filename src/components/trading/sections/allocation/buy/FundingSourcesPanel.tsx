
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  SelectedSourcesTable,
  CashAccountsPanel, 
  CreditFacilitiesPanel, 
  ModalFooter,
  useFundingSources
} from "./funding-sources";

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
    getSources
  } = useFundingSources({
    fundingAllocations,
    onAllocationChange,
    totalAmount
  });

  return (
    <div className="space-y-4">
      <SelectedSourcesTable
        selectedSourceIds={selectedSourceIds}
        fundingAllocations={fundingAllocations}
        onAllocationChange={onAllocationChange}
        getSources={getSources}
        totalAmount={totalAmount}
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
          
          <ModalFooter onApply={applyAllocations} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default FundingSourcesPanel;
