
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
  // Helper function to get the ID and name from a CategoryType
  const getCategoryInfo = (category: CategoryType) => {
    if (typeof category === 'string') {
      return { id: category, name: category.charAt(0).toUpperCase() + category.slice(1) };
    }
    return category;
  };
  
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
        categories.map((category) => {
          const { id, name } = getCategoryInfo(category);
          return (
            <Button
              key={id}
              variant={selectedCategory === id ? "default" : "outline"}
              onClick={() => onSelectCategory(id)}
              size="sm"
            >
              {name}
            </Button>
          );
        })
      ) : (
        <div className="text-sm text-gray-500">No categories available</div>
      )}
    </div>
  );
};

export default IntegrationFilters;
