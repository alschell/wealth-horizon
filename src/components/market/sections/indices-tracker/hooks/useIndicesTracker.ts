
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IndexData } from "../types";
import { mockIndices } from "../data/mockData";

export const useIndicesTracker = () => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [subscribedIndices, setSubscribedIndices] = useState<string[]>(["S&P 500", "NASDAQ"]);
  const [selectedIndex, setSelectedIndex] = useState<IndexData | null>(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // Parse the query parameters to get the selected index
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const indexName = params.get('index');
    
    if (indexName) {
      const foundIndex = mockIndices.find(idx => idx.name === indexName);
      if (foundIndex) {
        setSelectedIndex(foundIndex);
      }
    }
  }, [location]);
  
  // Apply filtering and sorting
  const filteredIndices = mockIndices
    .filter(index => {
      // Apply search filter
      if (searchTerm && !index.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Apply region filter
      if (filter === "all") {
        return true;
      } else if (filter === "United States") {
        return index.region === "United States";
      } else if (filter === "Europe") {
        return ["United Kingdom", "Germany", "France", "Italy", "Spain", "Netherlands", "Switzerland"].includes(index.region);
      } else if (filter === "Asia") {
        return ["Japan", "China", "Hong Kong", "Singapore", "South Korea", "India", "Australia"].includes(index.region);
      }
      
      return index.region === filter;
    })
    // Sort alphabetically by name
    .sort((a, b) => a.name.localeCompare(b.name));
  
  const toggleSubscription = (indexName: string) => {
    if (subscribedIndices.includes(indexName)) {
      setSubscribedIndices(subscribedIndices.filter(name => name !== indexName));
    } else {
      setSubscribedIndices([...subscribedIndices, indexName]);
    }
  };
  
  const handleSelectIndex = (index: IndexData) => {
    setSelectedIndex(index);
    // Update URL with the selected index
    navigate(`/market-data?index=${encodeURIComponent(index.name)}`);
  };

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
    indices: mockIndices.sort((a, b) => a.name.localeCompare(b.name))
  };
};
