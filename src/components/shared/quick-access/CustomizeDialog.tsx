
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QuickLinkItem } from "./types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, X } from "lucide-react";

interface CustomizeDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  items: QuickLinkItem[];
  selectedItems: string[];
  onItemToggle: (id: string) => void;
  onSave: () => void;
}

/**
 * Dialog for customizing quick access items
 * Allows users to select which items they want to show in the quick access panel
 */
const CustomizeDialog: React.FC<CustomizeDialogProps> = ({
  isOpen,
  onOpenChange,
  items,
  selectedItems,
  onItemToggle,
  onSave
}) => {
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
            <div className="space-y-2">
              {items.map((item) => (
                <div 
                  key={item.id}
                  className={`
                    flex items-center justify-between p-2 rounded-md cursor-pointer 
                    ${selectedItems.includes(item.id) 
                      ? 'bg-primary/10 border border-primary/30' 
                      : 'hover:bg-muted'}
                  `}
                  onClick={() => onItemToggle(item.id)}
                >
                  <div className="flex items-center">
                    <div className="mr-3 text-primary">
                      {item.icon}
                    </div>
                    <span>{item.title}</span>
                  </div>
                  <div>
                    {selectedItems.includes(item.id) ? (
                      <Check className="h-5 w-5 text-primary" />
                    ) : (
                      <X className="h-5 w-5 text-muted-foreground/50" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomizeDialog;
