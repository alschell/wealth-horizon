
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, X, Filter } from "lucide-react";

interface BlogSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  handleCategorySelect: (category: string) => void;
  allCategories: string[];
}

export const BlogSearch: React.FC<BlogSearchProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  handleCategorySelect,
  allCategories,
}) => {
  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="relative w-full sm:max-w-md">
        <Input
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-10"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        {searchQuery && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-2 top-2 h-5 w-5 text-gray-400 hover:text-gray-600" 
            onClick={clearSearch}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
        {allCategories.slice(0, 5).map((category) => (
          <Badge 
            key={category} 
            variant={selectedCategory === category ? "default" : "outline"}
            className="cursor-pointer whitespace-nowrap"
            onClick={() => handleCategorySelect(category)}
          >
            {category}
          </Badge>
        ))}
        <div className="relative group">
          <Badge 
            variant="outline" 
            className="cursor-pointer whitespace-nowrap"
          >
            <Filter className="h-3 w-3 mr-1" /> More
          </Badge>
          <div className="absolute z-10 hidden group-hover:block mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
            {allCategories.slice(5).map((category) => (
              <div 
                key={category} 
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
