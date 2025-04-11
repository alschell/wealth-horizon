
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IndexData } from "../types";
import { mockIndices } from "../data/mockData";

/**
 * Custom hook for managing the indices tracker state and functionality
 */
export const useIndicesTracker = () => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [subscribedIndices, setSubscribedIndices] = useState<string[]>(["S&P 500", "NASDAQ"]);
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
      const foundIndex = mockIndices.find(idx => idx.name === indexName);
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
    } else if (currentFilter === "United States") {
      return index.region === "United States";
    } else if (currentFilter === "Europe") {
      return ["United Kingdom", "Germany", "France", "Italy", "Spain", "Netherlands", "Switzerland"].includes(index.region);
    } else if (currentFilter === "Asia") {
      return ["Japan", "China", "Hong Kong", "Singapore", "South Korea", "India", "Australia"].includes(index.region);
    }
    
    return index.region === currentFilter;
  };
  
  /**
   * Filter indices by search term
   */
  const filterBySearchTerm = (index: IndexData, term: string): boolean => {
    if (!term) return true;
    return index.name.toLowerCase().includes(term.toLowerCase());
  };
  
  /**
   * Apply all filters and sorting to indices
   */
  const getFilteredIndices = (): IndexData[] => {
    return mockIndices
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
   * Get sorted indices
   */
  const getSortedIndices = (): IndexData[] => {
    return mockIndices.sort((a, b) => a.name.localeCompare(b.name));
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
