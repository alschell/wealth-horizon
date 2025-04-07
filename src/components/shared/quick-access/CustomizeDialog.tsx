
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CustomizeDialogProps } from "./types";

const CustomizeDialog = ({
  isOpen,
  onOpenChange,
  items,
  selectedItems,
  onItemToggle,
  onSave
}: CustomizeDialogProps) => {
  // Sort items alphabetically by title
  const sortedItems = [...items].sort((a, b) => a.title.localeCompare(b.title));
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Customize Quick Access</DialogTitle>
          <DialogDescription>
            Select the items you want to show in your Quick Access grid.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto py-4">
          <div className="space-y-4">
            {sortedItems.map((item) => (
              <div key={item.id} className="flex items-start space-x-3">
                <Checkbox 
                  id={`item-${item.id}`}
                  checked={selectedItems.includes(item.id)}
                  onCheckedChange={() => onItemToggle(item.id)}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor={`item-${item.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {item.title}
                  </label>
                  <p className="text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={() => onSave()}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomizeDialog;
