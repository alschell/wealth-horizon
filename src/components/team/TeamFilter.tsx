
import React, { memo, useId } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

/**
 * Sort options for team member listings
 */
export type TeamSortOption = 'name' | 'title' | 'department';

interface TeamFilterProps {
  /** Current search query string */
  searchQuery: string;
  /** Handler function for search query changes */
  onSearchChange: (value: string) => void;
  /** Current sort criteria */
  sortBy: TeamSortOption;
  /** Handler function for sort criteria changes */
  onSortChange: (value: TeamSortOption) => void;
  /** Optional placeholder text for search input */
  placeholder?: string;
  /** Whether to show the department sort option */
  showDepartmentSort?: boolean;
  /** Optional CSS class name for additional styling */
  className?: string;
  /** Total count of items */
  totalCount?: number;
  /** Filtered count of items */
  filteredCount?: number;
  /** Clear filters callback */
  onClearFilters?: () => void;
}

/**
 * Reusable component for filtering and sorting team members
 * Provides search functionality and sorting options with accessibility improvements
 */
const TeamFilter: React.FC<TeamFilterProps> = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  placeholder = "Search...",
  showDepartmentSort = true,
  className = "",
  totalCount,
  filteredCount,
  onClearFilters
}) => {
  // Generate unique IDs for accessibility
  const uniqueId = useId();
  const searchId = `team-search-${uniqueId}`;
  const sortId = `team-sort-${uniqueId}`;
  
  // Handler for sort selection changes
  const handleSortChange = (value: string) => {
    onSortChange(value as TeamSortOption);
  };
  
  // Determine if filters are active
  const hasActiveFilters = searchQuery.trim().length > 0;
  const showFilterCount = typeof totalCount === 'number' && typeof filteredCount === 'number';
  const showingAllItems = !hasActiveFilters || (filteredCount === totalCount);
  
  return (
    <div className="space-y-3">
      <div className={`flex flex-col md:flex-row gap-4 ${className}`}>
        <div className="relative flex-1">
          <label htmlFor={searchId} className="sr-only">Search</label>
          <Search 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" 
            aria-hidden="true"
          />
          <Input
            id={searchId}
            className="pl-9 pr-10"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search"
          />
          {searchQuery.trim() && (
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-500"
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <div className="w-full md:w-48">
          <label htmlFor={sortId} className="sr-only">Sort by</label>
          <Select 
            value={sortBy} 
            onValueChange={handleSortChange}
          >
            <SelectTrigger 
              id={sortId}
              aria-label="Sort by"
              className="w-full"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Sort by Name</SelectItem>
              <SelectItem value="title">Sort by Title</SelectItem>
              {showDepartmentSort && (
                <SelectItem value="department">
                  Sort by {showDepartmentSort ? "Department" : "Company"}
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
        
        {hasActiveFilters && onClearFilters && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onClearFilters}
                  aria-label="Clear all filters"
                >
                  <X className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Clear all filters</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      
      {/* Filter status message for accessibility */}
      {showFilterCount && (
        <div 
          aria-live="polite" 
          className="text-sm text-gray-500"
        >
          {showingAllItems ? (
            <span>Showing all {totalCount} items</span>
          ) : (
            <span>Showing {filteredCount} of {totalCount} items</span>
          )}
        </div>
      )}
    </div>
  );
};

/**
 * Memoized version of TeamFilter component to prevent unnecessary re-renders
 */
export default memo(TeamFilter);
