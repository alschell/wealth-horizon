
import React, { memo, useId, useRef, useEffect } from 'react';
import { Search, SlidersHorizontal, X, HelpCircle } from 'lucide-react';
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
import { 
  generateAccessibilityProps,
  handleKeyboardNavigation,
  focusManagement
} from './utils/accessibilityUtils';
import { TeamSortOption } from './TeamFilter';

interface AccessibleTeamFilterProps {
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
  /** Label for the component (used for accessibility) */
  ariaLabel?: string;
  /** Help text for the filter options */
  helpText?: string;
}

/**
 * Enhanced accessible component for filtering and sorting team members
 * Provides search functionality and sorting options with keyboard navigation
 */
const AccessibleTeamFilter: React.FC<AccessibleTeamFilterProps> = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  placeholder = "Search...",
  showDepartmentSort = true,
  className = "",
  totalCount,
  filteredCount,
  onClearFilters,
  ariaLabel = "Filter team members",
  helpText = "Use these filters to search or sort team members"
}) => {
  // Generate unique IDs for accessibility
  const uniqueId = useId();
  const searchId = `team-search-${uniqueId}`;
  const sortId = `team-sort-${uniqueId}`;
  const statusId = `filter-status-${uniqueId}`;
  const helpId = `filter-help-${uniqueId}`;
  
  // Refs for focus management
  const searchInputRef = useRef<HTMLInputElement>(null);
  const clearButtonRef = useRef<HTMLButtonElement>(null);
  
  // Get accessibility props
  const filterProps = generateAccessibilityProps('filter', {
    id: uniqueId,
    label: ariaLabel
  });
  
  // Handler for sort selection changes
  const handleSortChange = (value: string) => {
    onSortChange(value as TeamSortOption);
  };
  
  // Focus the search input on mount
  useEffect(() => {
    if (searchInputRef.current) {
      // Optional: uncomment to focus search on mount
      // searchInputRef.current.focus();
    }
  }, []);
  
  // Determine if filters are active
  const hasActiveFilters = searchQuery.trim().length > 0;
  const showFilterCount = typeof totalCount === 'number' && typeof filteredCount === 'number';
  const showingAllItems = !hasActiveFilters || (filteredCount === totalCount);
  
  // Handle clear search with keyboard
  const handleClearSearch = (event?: React.KeyboardEvent) => {
    if (event) {
      handleKeyboardNavigation(event, () => {
        onSearchChange('');
        // Focus back on search input after clearing
        searchInputRef.current?.focus();
      });
    } else {
      onSearchChange('');
      // Focus back on search input after clearing
      searchInputRef.current?.focus();
    }
  };
  
  // Handle clear all filters with keyboard
  const handleClearAllFilters = (event?: React.KeyboardEvent) => {
    if (onClearFilters) {
      if (event) {
        handleKeyboardNavigation(event, () => {
          onClearFilters();
          // Focus back on search input after clearing
          searchInputRef.current?.focus();
        });
      } else {
        onClearFilters();
        // Focus back on search input after clearing
        searchInputRef.current?.focus();
      }
    }
  };
  
  return (
    <div 
      className="space-y-3"
      {...filterProps}
      aria-describedby={helpId}
    >
      <div className={`flex flex-col md:flex-row gap-4 ${className}`}>
        <div className="relative flex-1">
          <label htmlFor={searchId} className="sr-only">Search team members</label>
          <Search 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" 
            aria-hidden="true"
          />
          <Input
            id={searchId}
            ref={searchInputRef}
            className="pl-9 pr-10"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search team members"
            aria-controls={statusId}
          />
          {searchQuery.trim() && (
            <button
              type="button"
              ref={clearButtonRef}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-500"
              onClick={() => handleClearSearch()}
              onKeyPress={handleClearSearch}
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <div className="w-full md:w-48">
          <label htmlFor={sortId} className="sr-only">Sort team members</label>
          <Select 
            value={sortBy} 
            onValueChange={handleSortChange}
          >
            <SelectTrigger 
              id={sortId}
              aria-label="Sort team members"
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
                  onClick={() => handleClearAllFilters()}
                  onKeyPress={handleClearAllFilters}
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
        
        {/* Help tooltip */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full p-0"
                aria-label="Show filter help"
              >
                <HelpCircle className="h-4 w-4" />
                <span className="sr-only">Help</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p id={helpId}>{helpText}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      {/* Filter status message for accessibility */}
      {showFilterCount && (
        <div 
          id={statusId}
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
 * Memoized version of AccessibleTeamFilter component to prevent unnecessary re-renders
 */
export default memo(AccessibleTeamFilter);
