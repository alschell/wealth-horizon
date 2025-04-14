
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QuickLinkItem } from "./types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, X } from "lucide-react";

/**
 * CustomizeDialog Component
 * 
 * Allows users to customize which quick access items they want to display
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the dialog is open
 * @param {Function} props.onOpenChange - Callback for when the dialog open state changes
 * @param {QuickLinkItem[]} props.items - All available quick access items
 * @param {string[]} props.selectedItems - IDs of the currently selected items
 * @param {Function} props.onItemToggle - Callback for when an item is toggled
 * @param {Function} props.onSave - Callback for when changes are saved
 */
interface CustomizeDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  items: QuickLinkItem[];
  selectedItems: string[];
  onItemToggle: (id: string) => void;
  onSave: () => void;
}

const CustomizeDialog: React.FC<CustomizeDialogProps> = ({
  isOpen,
  onOpenChange,
  items,
  selectedItems,
  onItemToggle,
  onSave
}) => {
  // Handle keyboard navigation for better accessibility
  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onItemToggle(id);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Customize Quick Access</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-sm text-muted-foreground mb-4">
            Select the items you would like to see in your Quick Access panel.
          </p>
          
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-2" role="listbox" aria-label="Quick access options">
              {items.map((item) => {
                const isSelected = selectedItems.includes(item.id);
                return (
                  <div 
                    key={item.id}
                    className={`
                      flex items-center justify-between p-2 rounded-md cursor-pointer 
                      ${isSelected 
                        ? 'bg-primary/10 border border-primary/30' 
                        : 'hover:bg-muted'}
                    `}
                    onClick={() => onItemToggle(item.id)}
                    onKeyDown={(e) => handleKeyDown(e, item.id)}
                    role="option"
                    aria-selected={isSelected}
                    tabIndex={0}
                  >
                    <div className="flex items-center">
                      <div className="mr-3 text-primary">
                        {item.icon}
                      </div>
                      <span>{item.title}</span>
                    </div>
                    <div>
                      {isSelected ? (
                        <Check className="h-5 w-5 text-primary" aria-hidden="true" />
                      ) : (
                        <X className="h-5 w-5 text-muted-foreground/50" aria-hidden="true" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSave} data-testid="save-changes-button">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(CustomizeDialog);
