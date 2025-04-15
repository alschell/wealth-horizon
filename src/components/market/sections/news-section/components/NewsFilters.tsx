
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface NewsFiltersProps {
  categories: { id: string; name: string }[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const NewsFilters = ({ categories, selectedCategory, onSelectCategory }: NewsFiltersProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Market News</h2>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input placeholder="Search news..." className="pl-10" />
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => onSelectCategory(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default NewsFilters;
