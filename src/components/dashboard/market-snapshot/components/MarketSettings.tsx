
import React from "react";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogContent as CustomDialogContent } from "./dialog";

interface MarketSettingsProps {
  onCustomizeOpen: () => void;
  isCustomizing: boolean;
  onCustomizeSave: () => void;
  temporarySelection: string[];
  temporaryOrder: string[];
  onToggle: (id: string) => void;
  onDragEnd: (result: any) => void;
  setIsCustomizing: (value: boolean) => void;
}

const MarketSettings: React.FC<MarketSettingsProps> = ({
  onCustomizeOpen,
  isCustomizing,
  onCustomizeSave,
  temporarySelection,
  temporaryOrder,
  onToggle,
  onDragEnd,
  setIsCustomizing
}) => {
  return (
    <Dialog open={isCustomizing} onOpenChange={setIsCustomizing}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          onClick={onCustomizeOpen}
        >
          <Settings className="h-4 w-4" />
          Customize
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Customize Market View</DialogTitle>
          <DialogDescription>
            Select which market items to display and arrange their order.
          </DialogDescription>
        </DialogHeader>
        
        <CustomDialogContent
          temporarySelection={temporarySelection}
          temporaryOrder={temporaryOrder}
          onToggle={onToggle}
          onDragEnd={onDragEnd}
          onSave={onCustomizeSave}
          onOpenChange={setIsCustomizing}
        />
      </DialogContent>
    </Dialog>
  );
};

export default MarketSettings;
