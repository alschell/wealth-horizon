
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
      ? items.filter(item => 
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (('department' in item) ? 
            (item as TeamMember).department?.toLowerCase().includes(searchQuery.toLowerCase()) : 
            false)
        )
      : items;
    
    // Then sort by the selected field
    return [...filtered].sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'department' && 'department' in a && 'department' in b) {
        return (a as TeamMember).department?.localeCompare((b as TeamMember).department || '') || 0;
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
