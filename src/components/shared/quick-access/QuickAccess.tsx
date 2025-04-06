
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sliders } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuickAccessGrid from "./QuickAccessGrid";
import CustomizeDialog from "./CustomizeDialog";
import { useQuickAccess } from "./useQuickAccess";
import { allQuickLinks } from "./quickLinksData";
import { QuickAccessItem, QuickLinkItem } from "./types";

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

  // Convert allQuickLinks to QuickAccessItem[] for the CustomizeDialog
  const quickAccessItems: QuickAccessItem[] = allQuickLinks.map(link => ({
    id: link.title, // Using title as id since it's unique
    title: link.title,
    description: link.description,
    icon: link.icon,
    link: link.link,
    color: link.color
  }));

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
        <QuickAccessGrid links={filteredItems} />
      </CardContent>

      <CustomizeDialog
        isOpen={isCustomizing}
        onOpenChange={setIsCustomizing}
        items={quickAccessItems}
        selectedItems={temporarySelection}
        onItemToggle={toggleItem}
        onSave={handleCustomizeSave}
      />
    </Card>
  );
};

export default QuickAccess;
