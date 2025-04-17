
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IndexData, ChartDataPoint } from "../types";
import { regionToCountryMap, allWorldIndices } from "../data/worldIndices";
import { useIndices } from "@/hooks/market-data";
import { toast } from "@/components/ui/use-toast";

/**
 * Custom hook for managing the indices tracker state and functionality
 */
export const useIndicesTracker = () => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [subscribedIndices, setSubscribedIndices] = useState<string[]>(["S&P 500", "NASDAQ Composite", "Dow Jones", "FTSE 100", "Nikkei 225"]);
  const [selectedIndex, setSelectedIndex] = useState<IndexData | null>(null);
  
  // Fetch indices data from API
  const { data: apiIndices, isLoading, error } = useIndices();
  
  // Combine API indices with our complete list if available
  const indices: IndexData[] = apiIndices?.length 
    ? apiIndices.map(apiIndex => {
        // Find matching index in our detailed list
        const matchedIndex = allWorldIndices.find(idx => 
          idx.symbol === apiIndex.symbol || 
          idx.name.includes(apiIndex.symbol.replace('^', ''))
        );
        
        if (matchedIndex) {
          // Update with live data
          return {
            ...matchedIndex,
            value: apiIndex.data.c,
            change: apiIndex.data.d,
            percentChange: apiIndex.data.dp
          };
        }
        
        // Fallback to API data with default values for missing fields
        return {
          id: apiIndex.symbol,
          name: apiIndex.symbol,
          symbol: apiIndex.symbol,
          value: apiIndex.data.c,
          change: apiIndex.data.d,
          percentChange: apiIndex.data.dp,
          region: "Other",
          description: `${apiIndex.symbol} index`,
          volume: 0
        };
      })
    : allWorldIndices;
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // Parse the query parameters to get the selected index
  useEffect(() => {
    parseQueryParams();
  }, [location, indices]);
  
  // Show error toast if API fails
  useEffect(() => {
    if (error) {
      toast({
        title: "Error loading indices data",
        description: "Using cached data. Please check your connection and try again.",
        variant: "destructive"
      });
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
