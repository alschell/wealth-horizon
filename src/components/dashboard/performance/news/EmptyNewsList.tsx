
import React from "react";
import { Button } from "@/components/ui/button";

type EmptyNewsListProps = {
  onCustomize: () => void;
};

const EmptyNewsList = ({ onCustomize }: EmptyNewsListProps) => {
  return (
    <div className="text-center py-6">
      <p className="text-sm text-gray-500">No news matching your filters</p>
      <Button 
        variant="link" 
        size="sm" 
        onClick={onCustomize}
      >
        Customize filters
      </Button>
    </div>
  );
};

export default EmptyNewsList;
