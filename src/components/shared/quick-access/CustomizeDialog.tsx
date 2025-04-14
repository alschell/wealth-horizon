
import React from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, X, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { QuickLinkItem } from "./types";
import { cn } from "@/lib/utils";

/**
 * CustomizeDialog Component
 * 
 * Allows users to select which quick access items they want to display
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the dialog is open
 * @param {Function} props.onOpenChange - Callback when dialog open state changes
 * @param {QuickLinkItem[]} props.items - All available quick access items
 * @param {string[]} props.selectedItems - Currently selected item IDs
 * @param {Function} props.onItemToggle - Callback when an item is toggled
 * @param {Function} props.onSave - Callback when customization is saved
 * @param {Function} [props.onReset] - Callback to reset to defaults
 * @param {string} [props.error] - Error message to display
 */
interface CustomizeDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  items: QuickLinkItem[];
  selectedItems: string[];
  onItemToggle: (id: string) => void;
  onSave: () => void;
  onReset?: () => void;
  error?: string | null;
}

const CustomizeDialog: React.FC<CustomizeDialogProps> = ({
  isOpen,
  onOpenChange,
  items,
  selectedItems,
  onItemToggle,
  onSave,
  onReset,
  error
}) => {
  // Group items by categories for better organization
  const itemsByCategory: Record<string, QuickLinkItem[]> = items.reduce((acc, item) => {
    const category = item.category || 'General';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, QuickLinkItem[]>);

  // Sort categories alphabetically
  const sortedCategories = Object.keys(itemsByCategory).sort();

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Customize Quick Access</DialogTitle>
        </DialogHeader>
        
        {error && (
          <Alert variant="destructive" className="mt-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="py-4">
          <p className="text-sm text-muted-foreground mb-4">
            Select the items you want to display in your Quick Access panel.
          </p>
          
          <div className="space-y-6">
            {sortedCategories.map(category => (
              <div key={category} className="space-y-2">
                {sortedCategories.length > 1 && (
                  <h3 className="text-sm font-medium text-muted-foreground">{category}</h3>
                )}
                <div className="space-y-1">
                  {itemsByCategory[category].map((item) => (
                    <div
                      key={item.id}
                      onClick={() => onItemToggle(item.id)}
                      className={cn(
                        "flex items-center p-2 rounded-md cursor-pointer transition-colors",
                        selectedItems.includes(item.id) 
                          ? "bg-primary/10 hover:bg-primary/20" 
                          : "hover:bg-accent"
                      )}
                      role="checkbox"
                      aria-checked={selectedItems.includes(item.id)}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onItemToggle(item.id);
                        }
                      }}
                    >
                      <div className="mr-3 text-sm">
                        {selectedItems.includes(item.id) ? (
                          <Check className="h-5 w-5 text-primary" />
                        ) : (
                          <X className="h-5 w-5 text-muted-foreground/50" />
                        )}
                      </div>
                      <div className="flex items-center gap-3 flex-1">
                        <div className="rounded-full p-1 bg-primary/10 text-primary">
                          {item.icon}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{item.title}</p>
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between">
          <div className="flex gap-2 order-2 sm:order-1">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="flex-1 sm:flex-none"
            >
              Cancel
            </Button>
            {onReset && (
              <Button 
                variant="secondary" 
                onClick={onReset}
                className="flex-1 sm:flex-none"
              >
                Reset to Default
              </Button>
            )}
          </div>
          <Button 
            onClick={onSave} 
            className="order-1 sm:order-2"
            disabled={selectedItems.length === 0}
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomizeDialog;
