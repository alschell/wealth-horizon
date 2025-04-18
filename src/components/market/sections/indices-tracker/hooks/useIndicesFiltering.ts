
import { IndexData } from "../types";
import { regionToCountryMap } from "../data/worldIndices";

export const useIndicesFiltering = () => {
  const filterByRegion = (index: IndexData, currentFilter: string): boolean => {
    if (currentFilter === "ALL") {
      return true;
    }
    return index.region ? regionToCountryMap[currentFilter]?.includes(index.region) || false : false;
  };

  const filterBySearchTerm = (index: IndexData, term: string): boolean => {
    if (!term) return true;
    
    const searchLower = term.toLowerCase();
    return (
      index.name.toLowerCase().includes(searchLower) || 
      (index.region && index.region.toLowerCase().includes(searchLower)) ||
      (index.description && index.description.toLowerCase().includes(searchLower))
    );
  };

  return {
    filterByRegion,
    filterBySearchTerm
  };
};
