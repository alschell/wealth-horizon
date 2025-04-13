
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface TeamFilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sortBy: 'name' | 'title' | 'department';
  onSortChange: (value: 'name' | 'title' | 'department') => void;
  placeholder?: string;
  showDepartmentSort?: boolean;
}

/**
 * Reusable component for filtering and sorting team members
 */
const TeamFilter: React.FC<TeamFilterProps> = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  placeholder = "Search...",
  showDepartmentSort = true
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          className="pl-9"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="w-full md:w-48">
        <Select 
          value={sortBy} 
          onValueChange={(value) => onSortChange(value as 'name' | 'title' | 'department')}
        >
          <SelectTrigger>
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

export default TeamFilter;
