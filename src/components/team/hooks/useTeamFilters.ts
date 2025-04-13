
import { useState, useMemo, useCallback } from 'react';
import { TeamMember, Advisor } from '../teamData';
import { TeamSortOption } from '../TeamFilter';
import { useToast } from '@/hooks/use-toast';

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
  /** Error state */
  error: Error | null;
  /** Number of total filtered items */
  totalFiltered: number;
  /** Loading state */
  isLoading: boolean;
}

/**
 * Custom hook for filtering and sorting team members or advisors
 * Provides memoized state, filtered results, and error handling
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
  // Access toast for error notifications
  const { toast } = useToast();
  
  // State for search query and sort criteria
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<TeamSortOption>('name');
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Memoized callback for setting search query to prevent unnecessary rerenders
  const handleSetSearchQuery = useCallback((query: string) => {
    try {
      setIsLoading(true);
      setSearchQuery(query);
      setError(null);
      setIsLoading(false);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to update search query');
      setError(error);
      setIsLoading(false);
      toast({
        title: 'Error updating search',
        description: error.message,
        variant: 'destructive',
      });
    }
  }, [toast]);
  
  // Memoized callback for setting sort criteria to prevent unnecessary rerenders
  const handleSetSortBy = useCallback((sort: TeamSortOption) => {
    try {
      setIsLoading(true);
      setSortBy(sort);
      setError(null);
      setIsLoading(false);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to update sort criteria');
      setError(error);
      setIsLoading(false);
      toast({
        title: 'Error updating sort',
        description: error.message,
        variant: 'destructive',
      });
    }
  }, [toast]);
  
  // Memoized filtered and sorted items
  const filteredItemsResult = useMemo(() => {
    try {
      setIsLoading(true);
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
      const sorted = [...filtered].sort((a, b) => {
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
      
      setIsLoading(false);
      return {
        items: sorted,
        total: sorted.length,
        error: null
      };
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to filter or sort items');
      
      // Log error and show toast notification
      console.error('Error in useTeamFilters:', error);
      toast({
        title: 'Filter Error',
        description: error.message,
        variant: 'destructive',
      });
      
      setError(error);
      setIsLoading(false);
      
      // Return empty array as fallback
      return {
        items: [],
        total: 0,
        error
      };
    }
  }, [items, searchQuery, sortBy, toast]);
  
  return {
    searchQuery,
    setSearchQuery: handleSetSearchQuery,
    sortBy,
    setSortBy: handleSetSortBy,
    filteredItems: filteredItemsResult.items,
    error,
    totalFiltered: filteredItemsResult.total,
    isLoading
  };
}
