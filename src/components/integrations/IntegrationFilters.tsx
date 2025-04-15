
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
  // Log the categories being received by the component
  console.log('Categories in IntegrationFilters:', categories);
  
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={selectedCategory === "all" ? "default" : "outline"}
        onClick={() => onSelectCategory("all")}
        size="sm"
      >
        All
      </Button>
      {categories && categories.length > 0 ? (
        categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => onSelectCategory(category.id)}
            size="sm"
          >
            {category.name}
          </Button>
        ))
      ) : (
        <div className="text-sm text-gray-500">No categories available</div>
      )}
    </div>
  );
};

export default IntegrationFilters;
