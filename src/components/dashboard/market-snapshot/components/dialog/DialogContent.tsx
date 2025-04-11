
import React from "react";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CategorySelection from "./CategorySelection";
import ItemsReorderList from "./ItemsReorderList";

interface DialogContentProps {
  temporarySelection: string[];
  temporaryOrder: string[];
  onToggle: (id: string) => void;
  onDragEnd: (result: any) => void;
  onSave: () => void;
  onOpenChange: (open: boolean) => void;
}

const DialogContent: React.FC<DialogContentProps> = ({
  temporarySelection,
  temporaryOrder,
  onToggle,
  onDragEnd,
  onSave,
  onOpenChange
}) => {
  return (
    <>
      <div className="max-h-[60vh] overflow-y-auto py-4">
        <div className="space-y-6">
          <CategorySelection 
            temporarySelection={temporarySelection} 
            onToggle={onToggle} 
          />
          
          {temporarySelection.length > 0 && (
            <ItemsReorderList
              temporarySelection={temporarySelection}
              temporaryOrder={temporaryOrder}
              onDragEnd={onDragEnd}
            />
          )}
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
        <Button onClick={onSave}>Save Changes</Button>
      </DialogFooter>
    </>
  );
};

export default DialogContent;
