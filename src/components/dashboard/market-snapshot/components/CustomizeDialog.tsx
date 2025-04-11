
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import DialogContentComponent from "./dialog/DialogContent";

interface CustomizeDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  temporarySelection: string[];
  temporaryOrder: string[];
  onToggle: (id: string) => void;
  onDragEnd: (result: any) => void;
  onSave: () => void;
}

const CustomizeDialog: React.FC<CustomizeDialogProps> = ({
  isOpen,
  onOpenChange,
  temporarySelection,
  temporaryOrder,
  onToggle,
  onDragEnd,
  onSave
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Customize Market Snapshot</DialogTitle>
          <DialogDescription>
            Select which market data to display and drag to reorder.
          </DialogDescription>
        </DialogHeader>
        
        <DialogContentComponent
          temporarySelection={temporarySelection}
          temporaryOrder={temporaryOrder}
          onToggle={onToggle}
          onDragEnd={onDragEnd}
          onSave={onSave}
          onOpenChange={onOpenChange}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CustomizeDialog;
