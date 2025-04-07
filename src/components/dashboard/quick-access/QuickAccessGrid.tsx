
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sliders } from "lucide-react";
import QuickAccessItems from "./QuickAccessItems";
import CustomizeQuickAccessDialog from "./CustomizeQuickAccessDialog";
import { allActionItems } from "./actionItemsData";
import { useQuickAccessStore } from "./useQuickAccessStore";

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
    <Card>
      <CardHeader className="px-6 pt-6 pb-4 flex flex-row justify-between items-center">
        <div>
          <CardTitle className="text-xl">Quick Access</CardTitle>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleCustomizeOpen} 
          className="h-8 w-8 p-0"
        >
          <Sliders className="h-4 w-4" />
          <span className="sr-only">Customize</span>
        </Button>
      </CardHeader>
      <CardContent>
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
