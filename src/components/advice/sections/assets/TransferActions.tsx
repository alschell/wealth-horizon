
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface TransferActionsProps {
  moveAssetsToScope: () => void;
  removeAssetsFromScope: () => void;
  selectedAssetsCount: number;
  selectedAssetsForRemovalCount: number;
}

const TransferActions: React.FC<TransferActionsProps> = ({
  moveAssetsToScope,
  removeAssetsFromScope,
  selectedAssetsCount,
  selectedAssetsForRemovalCount
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-6">
      <div className="flex flex-col gap-3">
        <Button 
          onClick={moveAssetsToScope}
          disabled={selectedAssetsCount === 0}
          variant="outline"
          className="flex items-center gap-2 px-4 py-2"
          title="Add to scope"
        >
          <span>Add</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button 
          onClick={removeAssetsFromScope}
          disabled={selectedAssetsForRemovalCount === 0}
          variant="outline"
          className="flex items-center gap-2 px-4 py-2"
          title="Remove from scope"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Remove</span>
        </Button>
      </div>
    </div>
  );
};

export default TransferActions;
