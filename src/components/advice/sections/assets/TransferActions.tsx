
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
    <div className="flex flex-col items-center justify-center h-full">
      <div className="space-y-4">
        <Button 
          onClick={moveAssetsToScope}
          disabled={selectedAssetsCount === 0}
          variant="outline"
          className="w-10 h-10 p-0 rounded-full"
          title="Add to scope"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button 
          onClick={removeAssetsFromScope}
          disabled={selectedAssetsForRemovalCount === 0}
          variant="outline"
          className="w-10 h-10 p-0 rounded-full"
          title="Remove from scope"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TransferActions;
