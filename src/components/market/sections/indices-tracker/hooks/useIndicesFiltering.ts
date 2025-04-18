
import { useCallback } from 'react';
import { IndexData } from '../types';
import { filterIndicesByRegion, searchIndices } from '../utils/indexDataUtils';

export const useIndicesFiltering = () => {
  const filterByRegion = useCallback((index: IndexData, filter: string) => {
    return filter === 'all' || index.region === filter;
  }, []);

  const filterBySearchTerm = useCallback((index: IndexData, searchTerm: string) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      index.name.toLowerCase().includes(term) ||
      index.symbol.toLowerCase().includes(term) ||
      index.region?.toLowerCase().includes(term)
    );
  }, []);

  return {
    filterByRegion,
    filterBySearchTerm
  };
};
