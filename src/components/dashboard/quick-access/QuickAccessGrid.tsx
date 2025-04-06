
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sliders } from "lucide-react";
import QuickAccessItems from "./QuickAccessItems";
import CustomizeQuickAccessDialog from "./CustomizeQuickAccessDialog";
import { allActionItems } from "./actionItemsData";
import { useQuickAccessStore } from "./useQuickAccessStore";

const QuickAccessGrid = () => {
  const { 
    visibleItems, 
    setVisibleItems, 
    isCustomizing, 
    setIsCustomizing,
    temporarySelection, 
    setTemporarySelection 
  } = useQuickAccessStore();

  useEffect(() => {
    const savedItems = localStorage.getItem("quickAccessVisibleItems");
    if (savedItems) {
      setVisibleItems(JSON.parse(savedItems));
    } else {
      setVisibleItems(allActionItems.slice(0, 9).map(item => item.id));
    }
  }, [setVisibleItems]);

  const handleCustomizeOpen = () => {
    setTemporarySelection([...visibleItems]);
    setIsCustomizing(true);
  };

  const handleCustomizeSave = () => {
    setVisibleItems(temporarySelection);
    localStorage.setItem("quickAccessVisibleItems", JSON.stringify(temporarySelection));
    setIsCustomizing(false);
  };

  const toggleItem = (id: string) => {
    if (temporarySelection.includes(id)) {
      setTemporarySelection(temporarySelection.filter(item => item !== id));
    } else {
      setTemporarySelection([...temporarySelection, id]);
    }
  };

  const filteredItems = allActionItems.filter(item => 
    visibleItems.includes(item.id)
  );

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
