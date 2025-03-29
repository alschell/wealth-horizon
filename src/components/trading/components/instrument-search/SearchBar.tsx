
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSearch: () => void;
  isSearching: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  onSearch,
  isSearching
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <Input
          placeholder="Search by symbol, company name, or ISIN (e.g., AAPL, Apple, US0378331005)"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            // Auto-search when typing
            if (e.target.value.trim().length > 0) {
              onSearch();
            }
          }}
          onKeyDown={handleKeyDown}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      </div>
      {/* Search button removed */}
    </div>
  );
};

export default SearchBar;
