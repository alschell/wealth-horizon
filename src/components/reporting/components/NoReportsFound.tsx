
import React from "react";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NoReportsFoundProps {
  resetFilters: () => void;
}

const NoReportsFound: React.FC<NoReportsFoundProps> = ({ resetFilters }) => {
  return (
    <div className="bg-muted/50 rounded-lg p-8 text-center">
      <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium mb-2">No reports found</h3>
      <p className="text-muted-foreground mb-4">
        No reports match your current filters. Try adjusting your search criteria.
      </p>
      <Button 
        variant="outline" 
        onClick={resetFilters}
      >
        Reset filters
      </Button>
    </div>
  );
};

export default NoReportsFound;
