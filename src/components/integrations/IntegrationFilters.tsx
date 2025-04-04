
import React from "react";
import { Button } from "@/components/ui/button";
import { CategoryType } from "./types";

interface IntegrationFiltersProps {
  categories: CategoryType[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const IntegrationFilters: React.FC<IntegrationFiltersProps> = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={selectedCategory === "all" ? "default" : "outline"}
        onClick={() => onSelectCategory("all")}
        size="sm"
      >
        All
      </Button>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "outline"}
          onClick={() => onSelectCategory(category.id)}
          size="sm"
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
};

export default IntegrationFilters;
