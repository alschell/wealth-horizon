import { useState, useEffect, useCallback, useMemo } from "react";
import { TeamAccessibilityProps } from "../types/teamTypes";

/**
 * Custom hook for filtering and sorting team data
 * Features optimized state management and memoization
 */
export function useTeamFilter<T>({
  initialItems,
  initialSearchQuery = '',
  initialSortBy = 'name',
  filterFunction,
  sortFunction
}: {
  initialItems: ReadonlyArray<T>;
  initialSearchQuery?: string;
  initialSortBy?: string;
  filterFunction: (items: ReadonlyArray<T>, query: string) => ReadonlyArray<T>;
  sortFunction: (items: ReadonlyArray<T>, sortBy: string) => ReadonlyArray<T>;
}) {
  // Fix: Update state type to use ReadonlyArray instead of mutable array
  const [items, setItems] = useState<ReadonlyArray<T>>(initialItems);
  const [filterState, setFilterState] = useState({
    searchQuery: initialSearchQuery,
    sortBy: initialSortBy
  });

  // Update items when initialItems change
  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  // Apply filtering and sorting
  const filteredItems = useMemo(() => {
    if (!filterState.searchQuery) {
      return sortFunction(items, filterState.sortBy);
    }
    const filtered = filterFunction(items, filterState.searchQuery);
    return sortFunction(filtered, filterState.sortBy);
  }, [items, filterState.searchQuery, filterState.sortBy, filterFunction, sortFunction]);

  // Setter functions
  const setSearchQuery = useCallback((query: string) => {
    setFilterState(prev => ({ ...prev, searchQuery: query }));
  }, []);

  const setSortBy = useCallback((sortBy: string) => {
    setFilterState(prev => ({ ...prev, sortBy }));
  }, []);

  return {
    filteredItems,
    filterState,
    setSearchQuery,
    setSortBy
  };
}

/**
 * Custom hook for generating accessibility properties for team sections
 * Provides aria attributes for better screen reader support
 */
export const useTeamAccessibility = (sectionId: string, sectionLabel: string): TeamAccessibilityProps => {
  const ariaLabelledBy = `${sectionId}-heading`;
  
  return {
    ariaLabelledBy,
    ariaLabel: sectionLabel,
    role: 'group'
  };
};
