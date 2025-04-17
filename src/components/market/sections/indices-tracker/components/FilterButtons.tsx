
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
        variant={filter === "all" ? "default" : "outline"} 
        size="sm"
        onClick={() => setFilter("all")}
      >
        All
      </Button>
      <Button 
        variant={filter === "North America" ? "default" : "outline"} 
        size="sm"
        onClick={() => setFilter("North America")}
      >
        North America
      </Button>
      <Button 
        variant={filter === "Europe" ? "default" : "outline"} 
        size="sm"
        onClick={() => setFilter("Europe")}
      >
        Europe
      </Button>
      <Button 
        variant={filter === "Asia-Pacific" ? "default" : "outline"} 
        size="sm"
        onClick={() => setFilter("Asia-Pacific")}
      >
        Asia-Pacific
      </Button>
      <Button 
        variant={filter === "Other" ? "default" : "outline"} 
        size="sm"
        onClick={() => setFilter("Other")}
      >
        Other
      </Button>
    </div>
  );
};

export default FilterButtons;
