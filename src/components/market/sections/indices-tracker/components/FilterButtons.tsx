
import React from "react";
import { Button } from "@/components/ui/button";

interface FilterButtonsProps {
  filter: string;
  setFilter: (filter: string) => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ filter, setFilter }) => {
  return (
    <div className="flex gap-2">
      <Button 
        variant={filter === "all" ? "default" : "outline"} 
        size="sm"
        onClick={() => setFilter("all")}
      >
        All
      </Button>
      <Button 
        variant={filter === "United States" ? "default" : "outline"} 
        size="sm"
        onClick={() => setFilter("United States")}
      >
        US
      </Button>
      <Button 
        variant={filter === "Europe" ? "default" : "outline"} 
        size="sm"
        onClick={() => setFilter("Europe")}
      >
        Europe
      </Button>
      <Button 
        variant={filter === "Asia" ? "default" : "outline"} 
        size="sm"
        onClick={() => setFilter("Asia")}
      >
        Asia
      </Button>
    </div>
  );
};

export default FilterButtons;
