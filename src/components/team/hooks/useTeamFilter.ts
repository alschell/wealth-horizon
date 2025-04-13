import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { TeamFilterError } from '../errors/TeamErrors';

export interface UseTeamFilterOptions<T> {
  initialItems: T[];
  initialSearchQuery?: string;
  initialSortBy?: string;
  filterFunction: (items: T[], query: string) => T[];
  sortFunction: (items: T[], sortBy: string) => T[];
  debounceMs?: number;
}

export interface UseTeamFilterResult<T> {
  filteredItems: T[];
  filterState: {
    searchQuery: string;
    sortBy: string;
  };
  setSearchQuery: (query: string) => void;
  setSortBy: (sortBy: string) => void;
  resetFilters: () => void;
  isFiltering: boolean;
}

/**
 * Custom hook for filtering and sorting team data
 * Provides search, sorting, and filtering capabilities
 * 
 * @param options - Configuration options
 * @returns Filtered items and filter control functions
 */
export function useTeamFilter<T>(options: UseTeamFilterOptions<T>): UseTeamFilterResult<T> {
  const {
    initialItems,
    initialSearchQuery = '',
    initialSortBy = '',
    filterFunction,
    sortFunction,
    debounceMs = 300
  } = options;
  
  // State for filtering
  const [searchQuery, setSearchQueryInternal] = useState(initialSearchQuery);
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [isFiltering, setIsFiltering] = useState(false);
  
  // Debounce search query changes
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(initialSearchQuery);
  
  // Cache the last result
  const cachedResultRef = useRef<{
    items: T[];
    searchQuery: string;
    sortBy: string;
    result: T[];
  } | null>(null);
  
  // Handle search query changes with debounce
  const setSearchQuery = useCallback((query: string) => {
    setSearchQueryInternal(query);
    setIsFiltering(true);
    
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    
    debounceTimeout.current = setTimeout(() => {
      setDebouncedSearchQuery(query);
      setIsFiltering(false);
    }, debounceMs);
  }, [debounceMs]);
  
  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);
  
  // Reset filters to initial values
  const resetFilters = useCallback(() => {
    setSearchQueryInternal(initialSearchQuery);
    setDebouncedSearchQuery(initialSearchQuery);
    setSortBy(initialSortBy);
    setIsFiltering(false);
  }, [initialSearchQuery, initialSortBy]);
  
  // Calculate filtered and sorted items with caching
  const filteredItems = useMemo(() => {
    try {
      // If we have a cached result for the same inputs, use it
      if (
        cachedResultRef.current &&
        cachedResultRef.current.searchQuery === debouncedSearchQuery &&
        cachedResultRef.current.sortBy === sortBy &&
        cachedResultRef.current.items === initialItems
      ) {
        return cachedResultRef.current.result;
      }
      
      // Otherwise, compute the new result
      const filtered = filterFunction(initialItems, debouncedSearchQuery);
      const sorted = sortFunction(filtered, sortBy);
      
      // Cache the result
      cachedResultRef.current = {
        items: initialItems,
        searchQuery: debouncedSearchQuery,
        sortBy,
        result: sorted
      };
      
      return sorted;
    } catch (error) {
      console.error('Error in team filter:', error);
      
      // Wrap in our custom error
      throw new TeamFilterError('Failed to filter team items', {
        details: {
          itemCount: initialItems.length,
          searchQuery: debouncedSearchQuery,
          sortBy
        },
        cause: error instanceof Error ? error : new Error(String(error))
      });
    }
  }, [initialItems, debouncedSearchQuery, sortBy, filterFunction, sortFunction]);
  
  return {
    filteredItems,
    filterState: {
      searchQuery,
      sortBy
    },
    setSearchQuery,
    setSortBy,
    resetFilters,
    isFiltering
  };
}

/**
 * Hook for enhancing team components with accessibility attributes
 * 
 * @param sectionId - ID of the section (used for aria-labelledby)
 * @param sectionName - Display name of the section
 * @returns Accessibility props to spread onto components
 */
export function useTeamAccessibility(
  sectionId: string,
  sectionName: string
): {
  role: string;
  ariaLabelledBy?: string;
  'aria-label'?: string;
  tabIndex?: number;
} {
  // Check if the section heading exists
  const headingExists = useCallback(() => {
    if (typeof document === 'undefined') return false;
    return !!document.getElementById(`${sectionId}-heading`);
  }, [sectionId]);
  
  // Determine which accessibility pattern to use
  const accessibilityProps = useMemo(() => {
    const hasHeading = typeof document !== 'undefined' && headingExists();
    
    if (hasHeading) {
      return {
        role: 'region',
        ariaLabelledBy: `${sectionId}-heading`,
        tabIndex: -1
      };
    } else {
      return {
        role: 'region',
        'aria-label': sectionName,
        tabIndex: -1
      };
    }
  }, [sectionId, sectionName, headingExists]);
  
  return accessibilityProps;
}
