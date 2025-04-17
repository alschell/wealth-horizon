
import React from "react";
import { Button } from "@/components/ui/button";

interface FilterButtonsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { id: "ALL", label: "ALL" },
    { id: "AMER", label: "AMER" },
    { id: "APAC", label: "APAC" },
    { id: "EMEA", label: "EMEA" }
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <Button
          key={filter.id}
          variant={activeFilter === filter.id ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange(filter.id)}
          className="min-w-24"
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
};

export default FilterButtons;
