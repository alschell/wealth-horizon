
import React from "react";
import { Button } from "@/components/ui/button";

interface FilterButtonsProps {
  filter: string;
  setFilter: (filter: string) => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ filter, setFilter }) => {
  return (
    <div className="flex gap-2 flex-wrap">
      <Button 
        variant={filter === "ALL" ? "default" : "outline"} 
        size="sm"
        onClick={() => setFilter("ALL")}
      >
        ALL
      </Button>
      <Button 
        variant={filter === "AMER" ? "default" : "outline"} 
        size="sm"
        onClick={() => setFilter("AMER")}
      >
        AMER
      </Button>
      <Button 
        variant={filter === "APAC" ? "default" : "outline"} 
        size="sm"
        onClick={() => setFilter("APAC")}
      >
        APAC
      </Button>
      <Button 
        variant={filter === "EMEA" ? "default" : "outline"} 
        size="sm"
        onClick={() => setFilter("EMEA")}
      >
        EMEA
      </Button>
    </div>
  );
};

export default FilterButtons;
