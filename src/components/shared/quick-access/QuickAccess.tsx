
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sliders } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuickAccessGrid from "./QuickAccessGrid";
import CustomizeDialog from "./CustomizeDialog";
import { useQuickAccess } from "./useQuickAccess";
import { allQuickLinks } from "./quickLinksData";

/**
 * QuickAccess Component
 * 
 * Displays a customizable grid of quick access links
 * 
 * @param {Object} props - Component props
 * @param {string} [props.pathname] - Current path from router
 */
interface QuickAccessProps {
  pathname?: string;
}

const QuickAccess: React.FC<QuickAccessProps> = ({ pathname }) => {
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
            aria-label="Customize quick access"
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
