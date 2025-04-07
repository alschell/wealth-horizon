
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sliders } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuickAccessGrid from "./QuickAccessGrid";
import CustomizeDialog from "./CustomizeDialog";
import { useQuickAccess } from "./useQuickAccess";
import { allQuickLinks } from "./quickLinksData";

interface QuickAccessProps {
  pathname?: string;
}

const QuickAccess = ({ pathname }: QuickAccessProps) => {
  const {
    isCustomizing,
    setIsCustomizing,
    filteredItems,
    temporarySelection,
    handleCustomizeOpen,
    handleCustomizeSave,
    toggleItem
  } = useQuickAccess(pathname);

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Quick Access</CardTitle>
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
      <CardContent>
        <QuickAccessGrid items={filteredItems} />
      </CardContent>

      <CustomizeDialog
        isOpen={isCustomizing}
        onOpenChange={setIsCustomizing}
        items={allQuickLinks}
        selectedItems={temporarySelection}
        onItemToggle={toggleItem}
        onSave={handleCustomizeSave}
      />
    </Card>
  );
};

export default QuickAccess;
