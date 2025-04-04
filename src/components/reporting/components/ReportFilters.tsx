
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, ChevronDown, ArrowUpDown } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface ReportFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  sortDirection: string;
  toggleSortDirection: () => void;
}

const ReportFilters: React.FC<ReportFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  date,
  setDate,
  sortBy,
  setSortBy,
  sortDirection,
  toggleSortDirection,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between">
      <div className="flex gap-2 flex-1 flex-wrap">
        <div className="w-full md:w-auto flex-grow md:flex-grow-0">
          <Input
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="portfolio">Portfolio</SelectItem>
            <SelectItem value="transaction">Transactions</SelectItem>
            <SelectItem value="risk">Risk Analysis</SelectItem>
            <SelectItem value="tax">Tax</SelectItem>
            <SelectItem value="esg">ESG</SelectItem>
            <SelectItem value="custom">Custom</SelectItem>
          </SelectContent>
        </Select>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full md:w-[240px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : "Filter by date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
            {date && (
              <div className="p-3 border-t border-border">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setDate(undefined)}
                  className="w-full"
                >
                  Clear date
                </Button>
              </div>
            )}
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="whitespace-nowrap">
              <ArrowUpDown className="mr-2 h-4 w-4" />
              Sort by: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Sort options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setSortBy("date")}>
              Date {sortBy === "date" && (sortDirection === "desc" ? "↓" : "↑")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("title")}>
              Name {sortBy === "title" && (sortDirection === "desc" ? "↓" : "↑")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("type")}>
              Type {sortBy === "type" && (sortDirection === "desc" ? "↓" : "↑")}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={toggleSortDirection}>
              {sortDirection === "desc" ? "Ascending order" : "Descending order"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ReportFilters;
