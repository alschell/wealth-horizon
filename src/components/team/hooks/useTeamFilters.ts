
import { useState, useMemo } from 'react';
import { TeamMember, Advisor } from '../teamData';

/**
 * Custom hook for filtering and sorting team members or advisors
 * 
 * @param items - Array of team members or advisors to filter
 * @returns Filter state and filtered items
 */
export function useTeamFilters<T extends TeamMember | Advisor>(items: T[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'title' | 'department'>('name');
  
  const filteredItems = useMemo(() => {
    // First filter by search query
    const filtered = searchQuery 
      ? items.filter(item => {
          const nameMatch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
          const titleMatch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
          
          // Safely check for department property (only exists on TeamMember)
          const departmentMatch = 'department' in item && 
            typeof item.department === 'string' && 
            item.department.toLowerCase().includes(searchQuery.toLowerCase());
          
          return nameMatch || titleMatch || departmentMatch;
        })
      : items;
    
    // Then sort by the selected field
    return [...filtered].sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'department') {
        // Handle department property safely - check if properties exist first
        const deptA = 'department' in a && typeof a.department === 'string' ? a.department : '';
        const deptB = 'department' in b && typeof b.department === 'string' ? b.department : '';
        return deptA.localeCompare(deptB);
      }
      return 0;
    });
  }, [items, searchQuery, sortBy]);
  
  return {
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    filteredItems
  };
}
