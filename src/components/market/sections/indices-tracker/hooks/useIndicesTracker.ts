import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IndexData } from "../types";
import { useIndices } from "@/hooks/market-data/useIndices";

// Comprehensive list of global indices 
const GLOBAL_INDICES = [
  // North America
  { symbol: "^GSPC", name: "S&P 500", region: "United States" },
  { symbol: "^DJI", name: "Dow Jones", region: "United States" },
  { symbol: "^IXIC", name: "NASDAQ", region: "United States" },
  { symbol: "^RUT", name: "Russell 2000", region: "United States" },
  { symbol: "^VIX", name: "Volatility Index", region: "United States" },
  { symbol: "^GSPTSE", name: "S&P/TSX Composite", region: "Canada" },
  { symbol: "^MXX", name: "IPC Mexico", region: "Mexico" },
  
  // Europe
  { symbol: "^FTSE", name: "FTSE 100", region: "United Kingdom" },
  { symbol: "^GDAXI", name: "DAX", region: "Germany" },
  { symbol: "^FCHI", name: "CAC 40", region: "France" },
  { symbol: "^STOXX50E", name: "EURO STOXX 50", region: "Europe" },
  { symbol: "^IBEX", name: "IBEX 35", region: "Spain" },
  { symbol: "^FTSEMIB.MI", name: "FTSE MIB", region: "Italy" },
  { symbol: "^AEX", name: "AEX", region: "Netherlands" },
  { symbol: "^SSMI", name: "SMI", region: "Switzerland" },
  { symbol: "^OMX", name: "OMX Stockholm 30", region: "Sweden" },
  { symbol: "^BFX", name: "BEL 20", region: "Belgium" },
  
  // Asia-Pacific
  { symbol: "^N225", name: "Nikkei 225", region: "Japan" },
  { symbol: "^HSI", name: "Hang Seng", region: "Hong Kong" },
  { symbol: "000001.SS", name: "Shanghai Composite", region: "China" },
  { symbol: "399001.SZ", name: "Shenzhen Component", region: "China" },
  { symbol: "^KOSPI", name: "KOSPI", region: "South Korea" },
  { symbol: "^TWII", name: "Taiwan Weighted", region: "Taiwan" },
  { symbol: "^STI", name: "Straits Times", region: "Singapore" },
  { symbol: "^AXJO", name: "ASX 200", region: "Australia" },
  { symbol: "^BSESN", name: "BSE SENSEX", region: "India" },
  { symbol: "^NSEI", name: "NIFTY 50", region: "India" },
  
  // Other regions
  { symbol: "^BVSP", name: "BOVESPA", region: "Brazil" },
  { symbol: "^MERV", name: "MERVAL", region: "Argentina" },
  { symbol: "^TA125.TA", name: "Tel Aviv 125", region: "Israel" },
  { symbol: "^CASE30", name: "EGX 30", region: "Egypt" },
  { symbol: "^JKSE", name: "Jakarta Composite", region: "Indonesia" },
  { symbol: "^KLSE", name: "FTSE Bursa Malaysia KLCI", region: "Malaysia" }
];

/**
 * Custom hook for managing the indices tracker state and functionality
 */
export const useIndicesTracker = () => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [subscribedIndices, setSubscribedIndices] = useState<string[]>(["S&P 500", "NASDAQ", "Dow Jones", "FTSE 100", "Nikkei 225"]);
  const [selectedIndex, setSelectedIndex] = useState<IndexData | null>(null);
  const [allIndices, setAllIndices] = useState<IndexData[]>([]);
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // Fetch indices data from API
  const { data: indicesData, isLoading } = useIndices(
    GLOBAL_INDICES.map(index => index.symbol)
  );
  
  // Transform API data to our IndexData format
  useEffect(() => {
    if (indicesData && !isLoading) {
      const formattedIndices: IndexData[] = indicesData.map(item => {
        const indexInfo = GLOBAL_INDICES.find(idx => idx.symbol === item.symbol) || {
          name: item.symbol,
          region: "Unknown"
        };
        
        return {
          symbol: item.symbol,
          name: indexInfo.name,
          region: indexInfo.region,
          data: item.data,
          currentValue: item.data?.c.toFixed(2) || "0.00",
          change: item.data?.dp.toFixed(2) + "%" || "0.00%",
          isPositive: (item.data?.dp || 0) >= 0
        };
      });
      
      setAllIndices(formattedIndices);
      
      // Set default selected index if none is selected
      if (!selectedIndex && formattedIndices.length > 0) {
        setSelectedIndex(formattedIndices[0]);
      }
    }
  }, [indicesData, isLoading, selectedIndex]);
  
  // Parse the query parameters to get the selected index
  useEffect(() => {
    parseQueryParams();
  }, [location, allIndices]);
  
  /**
   * Parse URL query parameters and set selected index if present
   */
  const parseQueryParams = () => {
    const params = new URLSearchParams(location.search);
    const indexName = params.get('index');
    
    if (indexName && allIndices.length > 0) {
      const foundIndex = allIndices.find(idx => idx.name === indexName);
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
      return ["United Kingdom", "Germany", "France", "Italy", "Spain", "Netherlands", "Switzerland", "Sweden", "Belgium"].includes(index.region);
    } else if (currentFilter === "Asia") {
      return ["Japan", "China", "Hong Kong", "South Korea", "Taiwan", "Singapore", "India", "Indonesia", "Malaysia", "Australia"].includes(index.region);
    } else if (currentFilter === "Other") {
      return ["Brazil", "Argentina", "Mexico", "Canada", "Israel", "Egypt"].includes(index.region);
    }
    
    return index.region === currentFilter;
  };
  
  /**
   * Filter indices by search term
   */
  const filterBySearchTerm = (index: IndexData, term: string): boolean => {
    if (!term) return true;
    return (
      index.name.toLowerCase().includes(term.toLowerCase()) ||
      index.region.toLowerCase().includes(term.toLowerCase()) ||
      index.symbol.toLowerCase().includes(term.toLowerCase())
    );
  };
  
  /**
   * Apply all filters and sorting to indices
   */
  const getFilteredIndices = (): IndexData[] => {
    return allIndices
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
    indices: allIndices,
    isLoading
  };
};
