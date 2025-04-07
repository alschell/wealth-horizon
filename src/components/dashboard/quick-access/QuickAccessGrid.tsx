
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sliders } from "lucide-react";
import QuickAccessItems from "./QuickAccessItems";
import CustomizeQuickAccessDialog from "./CustomizeQuickAccessDialog";
import { allActionItems } from "./actionItemsData";
import { useQuickAccessStore } from "./useQuickAccessStore";
import SectionHeader from "../SectionHeader";

const QuickAccessGrid = () => {
  const { 
    filteredItems,
    isCustomizing, 
    setIsCustomizing,
    temporarySelection, 
    toggleItem,
    handleCustomizeOpen,
    handleCustomizeSave,
    orderedItems,
    updateItemOrder
  } = useQuickAccessStore();

  return (
    <Card className="shadow-sm h-[700px] flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <SectionHeader title="Quick Access" />
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleCustomizeOpen} 
            className="h-8 w-8 p-0"
          >
            <Sliders className="h-4 w-4" />
            <span className="sr-only">Customize</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto pb-4">
        <QuickAccessItems items={filteredItems} />
      </CardContent>

      <CustomizeQuickAccessDialog
        isOpen={isCustomizing}
        onOpenChange={setIsCustomizing}
        items={allActionItems}
        selectedItems={temporarySelection}
        orderedItems={orderedItems}
        onItemToggle={toggleItem}
        onOrderChange={updateItemOrder}
        onSave={handleCustomizeSave}
      />
    </Card>
  );
};

export default QuickAccessGrid;
