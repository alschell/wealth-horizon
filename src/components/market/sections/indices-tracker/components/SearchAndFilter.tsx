
import React from "react";
import { Input } from "@/components/ui/input";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface SearchAndFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex items-center gap-2 w-full md:w-auto">
      <div className="relative w-full md:w-64">
        <Input 
          placeholder="Search indices..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-3 bg-white w-full" 
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Highest Value</DropdownMenuItem>
          <DropdownMenuItem>Biggest Gainers</DropdownMenuItem>
          <DropdownMenuItem>Biggest Losers</DropdownMenuItem>
          <DropdownMenuItem>Highest Volume</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SearchAndFilter;
