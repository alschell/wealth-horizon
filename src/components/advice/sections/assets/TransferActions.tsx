
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "@/utils/icons";

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
    <div className="flex flex-col items-center justify-center h-full space-y-10">
      <div className="flex flex-col gap-8">
        <Button 
          onClick={moveAssetsToScope}
          disabled={selectedAssetsCount === 0}
          variant="outline"
          className="flex items-center justify-center w-14 h-14 rounded-full shadow-md hover:shadow-lg transition-all bg-gray-50 hover:bg-gray-100 disabled:opacity-40"
          title="Add to scope"
          aria-label="Add selected assets to scope"
        >
          <ArrowRight className="h-6 w-6 text-gray-600" />
        </Button>
        <Button 
          onClick={removeAssetsFromScope}
          disabled={selectedAssetsForRemovalCount === 0}
          variant="outline"
          className="flex items-center justify-center w-14 h-14 rounded-full shadow-md hover:shadow-lg transition-all bg-gray-50 hover:bg-gray-100 disabled:opacity-40"
          title="Remove from scope"
          aria-label="Remove selected assets from scope"
        >
          <ArrowLeft className="h-6 w-6 text-gray-600" />
        </Button>
      </div>
    </div>
  );
};

export default TransferActions;
