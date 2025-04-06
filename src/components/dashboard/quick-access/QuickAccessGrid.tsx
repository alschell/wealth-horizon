
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
    handleCustomizeSave
  } = useQuickAccessStore();

  return (
    <Card>
      <CardHeader className="px-6 pt-6 pb-4 flex flex-row justify-between items-center">
        <div>
          <CardTitle className="text-xl">Quick Access</CardTitle>
        </div>
        <Button variant="outline" size="sm" onClick={handleCustomizeOpen} className="flex items-center gap-1">
          <Sliders className="h-4 w-4 mr-1" />
          Customize
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
        onItemToggle={toggleItem}
        onSave={handleCustomizeSave}
      />
    </Card>
  );
};

export default QuickAccessGrid;
