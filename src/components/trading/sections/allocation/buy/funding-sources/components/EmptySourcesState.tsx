
import React from "react";
import { Button } from "@/components/ui/button";

interface EmptySourcesStateProps {
  onSelectSources: () => void;
}

export const EmptySourcesState: React.FC<EmptySourcesStateProps> = ({
  onSelectSources
}) => {
  return (
    <div className="border border-dashed rounded-md p-8 text-center text-gray-500">
      <p className="mb-4">No funding sources selected yet</p>
      <Button onClick={onSelectSources}>
        Select Funding Sources
      </Button>
    </div>
  );
};
