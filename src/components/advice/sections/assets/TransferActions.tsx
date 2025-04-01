
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
    <>
      {/* Desktop view */}
      <div className="hidden md:flex flex-col items-center justify-center">
        <div className="space-y-4">
          <Button 
            onClick={moveAssetsToScope}
            disabled={selectedAssetsCount === 0}
            variant="outline"
            className="w-12 h-12 p-0 rounded-full"
          >
            <ArrowRight className="h-5 w-5" />
          </Button>
          <Button 
            onClick={removeAssetsFromScope}
            disabled={selectedAssetsForRemovalCount === 0}
            variant="outline"
            className="w-12 h-12 p-0 rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Mobile view */}
      <div className="flex md:hidden justify-center space-x-4 my-4">
        <Button 
          onClick={moveAssetsToScope}
          disabled={selectedAssetsCount === 0}
          variant="outline"
          className="w-12 h-12 p-0 rounded-full"
        >
          <ArrowRight className="h-5 w-5" />
        </Button>
        <Button 
          onClick={removeAssetsFromScope}
          disabled={selectedAssetsForRemovalCount === 0}
          variant="outline"
          className="w-12 h-12 p-0 rounded-full"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>
    </>
  );
};

export default TransferActions;
