
import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sliders } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
 * @param {string} [props.className] - Optional additional CSS classes
 */
interface QuickAccessProps {
  pathname?: string;
  className?: string;
}

const QuickAccess: React.FC<QuickAccessProps> = ({ 
  pathname,
  className
}) => {
  const {
    isCustomizing,
    setIsCustomizing,
    filteredItems,
    temporarySelection,
    handleCustomizeOpen,
    handleCustomizeSave,
    toggleItem,
    resetToDefaults,
    error,
    clearError
  } = useQuickAccess(pathname);

  // Clear error on unmount or when dialog closes
  useEffect(() => {
    if (!isCustomizing && error) {
      clearError();
    }
    
    // Clean up on unmount
    return () => {
      if (error) clearError();
    };
  }, [isCustomizing, error, clearError]);

  return (
    <Card className={className}>
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
        {error && !isCustomizing && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <QuickAccessGrid items={filteredItems} />
      </CardContent>

      <CustomizeDialog
        isOpen={isCustomizing}
        onOpenChange={setIsCustomizing}
        items={allQuickLinks}
        selectedItems={temporarySelection}
        onItemToggle={toggleItem}
        onSave={handleCustomizeSave}
        onReset={resetToDefaults}
        error={error}
      />
    </Card>
  );
};

export default QuickAccess;
