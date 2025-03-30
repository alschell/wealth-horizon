
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface EmptySourcesStateProps {
  onSelectSources: () => void;
}

export const EmptySourcesState: React.FC<EmptySourcesStateProps> = ({
  onSelectSources
}) => {
  return (
    <div className="border border-dashed rounded-md p-8 text-center text-gray-500">
      <p className="mb-4">No funding sources selected yet</p>
      <Button 
        onClick={onSelectSources}
        className="bg-black text-white hover:bg-gray-800 flex items-center gap-2"
      >
        <Plus className="h-4 w-4" />
        Add Funding Source
      </Button>
    </div>
  );
};
