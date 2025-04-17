
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IndexData } from "../types";
import { regionToCountryMap, allWorldIndices } from "../data/worldIndices";
import { useIndices } from "@/hooks/market-data";
import { toast } from "sonner";

/**
 * Custom hook for managing the indices tracker state and functionality
 */
export const useIndicesTracker = () => {
  const [filter, setFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [subscribedIndices, setSubscribedIndices] = useState<string[]>(["S&P 500", "NASDAQ Composite", "Dow Jones", "FTSE 100", "Nikkei 225"]);
  const [selectedIndex, setSelectedIndex] = useState<IndexData | null>(null);
  
  // Fetch indices data from API
  const { data: apiIndices, isLoading, error } = useIndices();
  
  // Map to store symbol -> index data mapping
  const symbolToData = new Map<string, { value: number, change: number, percentChange: number, volume?: number }>();
  
  // Prepare API data for mapping to our indices
  if (apiIndices?.length) {
    apiIndices.forEach(indexData => {
      if (indexData.data && indexData.symbol) {
        symbolToData.set(indexData.symbol, {
          value: indexData.data.c || 0,
          change: indexData.data.d || 0,
          percentChange: indexData.data.dp || 0,
          // Generate random volume as it's not available in the API
          volume: Math.floor(Math.random() * 10000000) + 1000000
        });
      }
    });
  }
  
  // Combine API data with our complete list of indices
  const indices: IndexData[] = allWorldIndices.map(index => {
    const apiData = symbolToData.get(index.symbol);
    if (apiData) {
      return {
        ...index,
        value: apiData.value,
        change: apiData.change,
        percentChange: apiData.percentChange,
        volume: apiData.volume || index.volume
      };
    }
    return index;
  });
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // Parse the query parameters to get the selected index
  useEffect(() => {
    parseQueryParams();
  }, [location, indices]);
  
  // Show error toast if API fails
  useEffect(() => {
    if (error) {
      toast.error("Error loading indices data. Using cached data. Please check your connection and try again.");
      console.error("API Error:", error);
    }
  }, [error]);
  
  /**
   * Parse URL query parameters and set selected index if present
   */
  const parseQueryParams = () => {
    const params = new URLSearchParams(location.search);
    const indexName = params.get('index');
    
    if (indexName && indices.length > 0) {
      const foundIndex = indices.find(idx => idx.name === indexName);
      if (foundIndex) {
        setSelectedIndex(foundIndex);
      }
    }
  };
  
  /**
   * Filter indices by region based on the region groups
   */
  const filterByRegion = (index: IndexData, currentFilter: string): boolean => {
    if (currentFilter === "ALL") {
      return true;
    }
    
    // Check if the index's region is in the selected region group
    return regionToCountryMap[currentFilter]?.includes(index.region) || false;
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
      (index.description && index.description.toLowerCase().includes(searchLower))
    );
  };
  
  /**
   * Apply all filters and sorting to indices
   */
  const getFilteredIndices = (): IndexData[] => {
    return indices
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
    return [...indices].sort((a, b) => a.name.localeCompare(b.name));
  };

  const filteredIndices = getFilteredIndices();
  
  // Log the current state for debugging
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log("Current indices state:", {
        totalIndices: indices.length,
        filteredIndices: filteredIndices.length,
        apiIndicesFetched: apiIndices?.length || 0,
        subscribedIndices: subscribedIndices.length,
        currentFilter: filter,
        searchTerm,
        hasError: !!error
      });
    }
  }, [indices, filteredIndices, apiIndices, subscribedIndices, filter, searchTerm, error]);
  
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
    indices: getSortedIndices(),
    isLoading
  };
};
