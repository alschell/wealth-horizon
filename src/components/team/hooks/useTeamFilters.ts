
import { useState, useMemo, useCallback } from 'react';
import { TeamMember, Advisor } from '../teamData';
import { TeamSortOption } from '../TeamFilter';

/**
 * Result interface for the useTeamFilters hook
 */
interface TeamFilterResult<T> {
  /** Current search query string */
  searchQuery: string;
  /** Function to update search query */
  setSearchQuery: (query: string) => void;
  /** Current sort criteria */
  sortBy: TeamSortOption;
  /** Function to update sort criteria */
  setSortBy: (sortBy: TeamSortOption) => void;
  /** Array of filtered and sorted items */
  filteredItems: T[];
}

/**
 * Custom hook for filtering and sorting team members or advisors
 * Provides memoized state and filtered results
 * 
 * @param items - Array of team members or advisors to filter
 * @returns Filter state and filtered items
 * 
 * @example
 * ```tsx
 * const { 
 *   searchQuery, 
 *   setSearchQuery, 
 *   sortBy, 
 *   setSortBy, 
 *   filteredItems 
 * } = useTeamFilters(leadershipTeam);
 * ```
 */
export function useTeamFilters<T extends TeamMember | Advisor>(items: T[]): TeamFilterResult<T> {
  // State for search query and sort criteria
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<TeamSortOption>('name');
  
  // Memoized callback for setting search query to prevent unnecessary rerenders
  const handleSetSearchQuery = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);
  
  // Memoized callback for setting sort criteria to prevent unnecessary rerenders
  const handleSetSortBy = useCallback((sort: TeamSortOption) => {
    setSortBy(sort);
  }, []);
  
  // Memoized filtered and sorted items
  const filteredItems = useMemo(() => {
    // Filter items by search query
    const filtered = searchQuery 
      ? items.filter(item => {
          const lowercaseQuery = searchQuery.toLowerCase();
          const nameMatch = item.name.toLowerCase().includes(lowercaseQuery);
          const titleMatch = item.title.toLowerCase().includes(lowercaseQuery);
          
          // Safely check for department property (only exists on TeamMember)
          const departmentMatch = 'department' in item && 
            item.department.toLowerCase().includes(lowercaseQuery);
          
          // For advisors, also check company name
          const companyMatch = 'company' in item &&
            item.company.toLowerCase().includes(lowercaseQuery);
          
          return nameMatch || titleMatch || departmentMatch || companyMatch;
        })
      : items;
    
    // Sort filtered items
    return [...filtered].sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } 
      
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } 
      
      if (sortBy === 'department') {
        // Handle department property safely for TeamMember type
        if ('department' in a && 'department' in b) {
          return a.department.localeCompare(b.department);
        }
        
        // Handle company property for Advisor type as fallback
        if ('company' in a && 'company' in b) {
          return a.company.localeCompare(b.company);
        }
      }
      
      return 0;
    });
  }, [items, searchQuery, sortBy]);
  
  return {
    searchQuery,
    setSearchQuery: handleSetSearchQuery,
    sortBy,
    setSortBy: handleSetSortBy,
    filteredItems
  };
}
