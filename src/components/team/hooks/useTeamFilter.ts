
import { useState, useCallback, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import { TeamSortOption } from '../TeamFilter';
import { TeamFilterState, TeamFilterResult, TeamAccessibilityProps } from '../types/teamTypes';

/**
 * Hook options for team filtering
 */
interface UseTeamFilterOptions<T> {
  initialItems: ReadonlyArray<T>;
  initialSearchQuery?: string;
  initialSortBy?: TeamSortOption;
  filterFunction: (items: ReadonlyArray<T>, searchQuery: string) => ReadonlyArray<T>;
  sortFunction: (items: ReadonlyArray<T>, sortBy: TeamSortOption) => ReadonlyArray<T>;
}

/**
 * Hook result for team filtering
 */
interface UseTeamFilterResult<T> {
  items: ReadonlyArray<T>;
  filteredItems: ReadonlyArray<T>;
  filterState: TeamFilterState;
  setSearchQuery: (query: string) => void;
  setSortBy: (option: TeamSortOption) => void;
  resetFilters: () => void;
  isFiltering: boolean;
  totalCount: number;
  filteredCount: number;
}

/**
 * Custom hook for managing team filtering and sorting
 * Provides state management, error handling, and memoized results
 */
export function useTeamFilter<T>({
  initialItems,
  initialSearchQuery = '',
  initialSortBy = 'name',
  filterFunction,
  sortFunction
}: UseTeamFilterOptions<T>): UseTeamFilterResult<T> {
  const { toast } = useToast();
  
  // State for filter criteria
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const [sortBy, setSortBy] = useState<TeamSortOption>(initialSortBy);
  
  // Calculate whether filtering is active
  const isFiltering = useMemo(() => 
    searchQuery.trim().length > 0, 
    [searchQuery]
  );
  
  // Memoized filtered and sorted items
  const filteredItems = useMemo(() => {
    try {
      // First filter, then sort
      const filtered = filterFunction(initialItems, searchQuery);
      return sortFunction(filtered, sortBy);
    } catch (error) {
      console.error('Error filtering or sorting items:', error);
      toast({
        title: 'Filter Error',
        description: 'An error occurred while filtering items',
        variant: 'destructive',
      });
      return [];
    }
  }, [initialItems, searchQuery, sortBy, filterFunction, sortFunction, toast]);
  
  // Wrap the search setter with error handling
  const handleSetSearchQuery = useCallback((query: string) => {
    try {
      setSearchQuery(query);
    } catch (error) {
      console.error('Error setting search query:', error);
      toast({
        title: 'Search Error',
        description: 'Failed to update search query',
        variant: 'destructive',
      });
    }
  }, [toast]);
  
  // Wrap the sort setter with error handling
  const handleSetSortBy = useCallback((option: TeamSortOption) => {
    try {
      setSortBy(option);
    } catch (error) {
      console.error('Error setting sort option:', error);
      toast({
        title: 'Sort Error',
        description: 'Failed to update sort criteria',
        variant: 'destructive',
      });
    }
  }, [toast]);
  
  // Reset filters to initial state
  const resetFilters = useCallback(() => {
    setSearchQuery(initialSearchQuery);
    setSortBy(initialSortBy);
  }, [initialSearchQuery, initialSortBy]);
  
  return {
    items: initialItems,
    filteredItems,
    filterState: {
      searchQuery,
      sortBy
    },
    setSearchQuery: handleSetSearchQuery,
    setSortBy: handleSetSortBy,
    resetFilters,
    isFiltering,
    totalCount: initialItems.length,
    filteredCount: filteredItems.length
  };
}

/**
 * Hook for creating accessibility props for team sections
 */
export function useTeamAccessibility(sectionId: string, sectionName: string): TeamAccessibilityProps {
  return useMemo(() => ({
    ariaLabelledBy: `${sectionId}-heading`,
    ariaLabel: `${sectionName} section`,
    role: 'region'
  }), [sectionId, sectionName]);
}
