
import React, { useEffect, useState } from "react";
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
  
  const [containerHeight, setContainerHeight] = useState("350px");
  
  // Calculate height based on the number of items
  useEffect(() => {
    // Calculate rows needed (assuming 5 items per row based on grid-cols-5)
    const itemsCount = filteredItems.length;
    const itemsPerRow = 5;
    const rows = Math.ceil(itemsCount / itemsPerRow);
    
    // Each row is roughly 120px tall plus some padding
    const calculatedHeight = Math.max(rows * 120 + 80, 350);
    setContainerHeight(`${calculatedHeight}px`);
  }, [filteredItems]);

  return (
    <Card className={`shadow-sm flex flex-col`} style={{ height: containerHeight }}>
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
      <CardContent className="flex-grow pb-2">
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
