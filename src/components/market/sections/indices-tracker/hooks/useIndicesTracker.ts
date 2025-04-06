
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IndexData } from "../types";
import { indices } from "../data/mockData";

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
      const foundIndex = indices.find(idx => idx.name === indexName);
      if (foundIndex) {
        setSelectedIndex(foundIndex);
      }
    }
  }, [location]);
  
  const filteredIndices = indices.filter(index => {
    if (filter !== "all" && index.region !== filter) return false;
    if (searchTerm && !index.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });
  
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
    indices
  };
};
