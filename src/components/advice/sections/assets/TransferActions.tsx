
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
    <div className="flex flex-col items-center justify-center h-full space-y-8">
      <div className="flex flex-col gap-4">
        <Button 
          onClick={moveAssetsToScope}
          disabled={selectedAssetsCount === 0}
          variant="outline"
          className="flex items-center justify-center w-12 h-12 rounded-full shadow-sm hover:shadow-md transition-all"
          title="Add to scope"
        >
          <ArrowRight className="h-5 w-5" />
        </Button>
        <Button 
          onClick={removeAssetsFromScope}
          disabled={selectedAssetsForRemovalCount === 0}
          variant="outline"
          className="flex items-center justify-center w-12 h-12 rounded-full shadow-sm hover:shadow-md transition-all"
          title="Remove from scope"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default TransferActions;
