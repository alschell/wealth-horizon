
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
    filteredLinks,
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
            variant="outline" 
            size="sm" 
            onClick={handleCustomizeOpen}
            className="flex items-center gap-1"
          >
            <Sliders className="h-4 w-4 mr-1" />
            Customize
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <QuickAccessGrid links={filteredLinks} />
      </CardContent>

      <CustomizeDialog
        isOpen={isCustomizing}
        onOpenChange={setIsCustomizing}
        links={allQuickLinks}
        selectedItems={temporarySelection}
        onItemToggle={toggleItem}
        onSave={handleCustomizeSave}
      />
    </Card>
  );
};

export default QuickAccess;
