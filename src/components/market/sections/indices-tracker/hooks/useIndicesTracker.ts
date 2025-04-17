import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IndexData } from "../types";
import { worldIndices, regionToCountryMap } from "../data/worldIndices";

/**
 * Custom hook for managing the indices tracker state and functionality
 */
export const useIndicesTracker = () => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [subscribedIndices, setSubscribedIndices] = useState<string[]>(["S&P 500", "NASDAQ Composite", "Dow Jones", "FTSE 100", "Nikkei 225"]);
  const [selectedIndex, setSelectedIndex] = useState<IndexData | null>(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // Parse the query parameters to get the selected index
  useEffect(() => {
    parseQueryParams();
  }, [location]);
  
  /**
   * Parse URL query parameters and set selected index if present
   */
  const parseQueryParams = () => {
    const params = new URLSearchParams(location.search);
    const indexName = params.get('index');
    
    if (indexName) {
      const foundIndex = worldIndices.find(idx => idx.name === indexName);
      if (foundIndex) {
        setSelectedIndex(foundIndex);
      }
    }
  };
  
  /**
   * Filter indices by region
   */
  const filterByRegion = (index: IndexData, currentFilter: string): boolean => {
    if (currentFilter === "all") {
      return true;
    }
    
    // Check if filter is one of our special region groups
    if (regionToCountryMap[currentFilter]) {
      return regionToCountryMap[currentFilter].includes(index.region);
    }
    
    // Otherwise filter by exact region match
    return index.region === currentFilter;
  };
  
  /**
   * Filter indices by search term
   */
  const filterBySearchTerm = (index: IndexData, term: string): boolean => {
    if (!term) return true;
    
    const searchLower = term.toLowerCase();
    return (
      index.name.toLowerCase().includes(searchLower) || 
      index.region.toLowerCase().includes(searchLower) ||
      index.description.toLowerCase().includes(searchLower)
    );
  };
  
  /**
   * Apply all filters and sorting to indices
   */
  const getFilteredIndices = (): IndexData[] => {
    return worldIndices
      .filter(index => {
        // Apply search filter
        if (!filterBySearchTerm(index, searchTerm)) {
          return false;
        }
        
        // Apply region filter
        return filterByRegion(index, filter);
      })
      // Sort alphabetically by name
      .sort((a, b) => a.name.localeCompare(b.name));
  };
  
  /**
   * Toggle subscription status for an index
   */
  const toggleSubscription = (indexName: string) => {
    if (subscribedIndices.includes(indexName)) {
      setSubscribedIndices(subscribedIndices.filter(name => name !== indexName));
    } else {
      setSubscribedIndices([...subscribedIndices, indexName]);
    }
  };
  
  /**
   * Handle selection of an index
   */
  const handleSelectIndex = (index: IndexData) => {
    setSelectedIndex(index);
    // Update URL with the selected index
    navigate(`/market-data?index=${encodeURIComponent(index.name)}`);
  };

  /**
   * Get all indices sorted alphabetically
   */
  const getSortedIndices = (): IndexData[] => {
    return [...worldIndices].sort((a, b) => a.name.localeCompare(b.name));
  };

  const filteredIndices = getFilteredIndices();
  
  return {
    filter,
    setFilter,
    searchTerm,
    setSearchTerm,
    subscribedIndices,
    selectedIndex,
    setSelectedIndex,
    filteredIndices,
    toggleSubscription,
    handleSelectIndex,
    indices: getSortedIndices()
  };
};
