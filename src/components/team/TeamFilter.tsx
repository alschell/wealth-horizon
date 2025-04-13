
import React, { memo } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

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
}

/**
 * Reusable component for filtering and sorting team members
 * Provides search functionality and sorting options
 * 
 * @example
 * ```tsx
 * <TeamFilter
 *   searchQuery={searchQuery}
 *   onSearchChange={setSearchQuery}
 *   sortBy={sortBy}
 *   onSortChange={setSortBy}
 *   placeholder="Search team members..."
 * />
 * ```
 */
const TeamFilter: React.FC<TeamFilterProps> = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  placeholder = "Search...",
  showDepartmentSort = true,
  className = "",
}) => {
  // Handler for sort selection changes
  const handleSortChange = (value: string) => {
    onSortChange(value as TeamSortOption);
  };
  
  return (
    <div className={`flex flex-col md:flex-row gap-4 mb-6 ${className}`}>
      <div className="relative flex-1">
        <Search 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" 
          aria-hidden="true"
        />
        <Input
          className="pl-9"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search"
        />
      </div>
      
      <div className="w-full md:w-48">
        <Select 
          value={sortBy} 
          onValueChange={handleSortChange}
        >
          <SelectTrigger aria-label="Sort by">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Sort by Name</SelectItem>
            <SelectItem value="title">Sort by Title</SelectItem>
            {showDepartmentSort && (
              <SelectItem value="department">Sort by Department</SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

/**
 * Memoized version of TeamFilter component to prevent unnecessary re-renders
 * Only re-renders when props change
 */
export default memo(TeamFilter);
