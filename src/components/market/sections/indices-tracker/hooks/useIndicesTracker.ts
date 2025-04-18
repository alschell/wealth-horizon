
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { IndexData } from "../types";
import { allWorldIndices } from "../data/worldIndices";
import { useIndices } from "@/hooks/market-data";
import { toast } from "sonner";
import { useIndicesState } from "./useIndicesState";
import { useIndicesFiltering } from "./useIndicesFiltering";
import { useIndexActions } from "./useIndexActions";

export const useIndicesTracker = (providedIndices?: IndexData[]) => {
  const {
    filter,
    setFilter,
    searchTerm,
    setSearchTerm,
    subscribedIndices,
    setSubscribedIndices,
    selectedIndex,
    setSelectedIndex
  } = useIndicesState(providedIndices);

  const { filterByRegion, filterBySearchTerm } = useIndicesFiltering();
  const { handleSelectIndex, toggleSubscription: toggleSub } = useIndexActions();
  
  const { data: apiIndices, isLoading, error } = useIndices();
  const location = useLocation();
  
  const baseIndices = providedIndices || allWorldIndices;
  
  // Map to store symbol -> index data mapping
  const symbolToData = new Map<string, { 
    value: number, 
    change: number, 
    percentChange: number, 
    volume?: number 
  }>();
  
  // Prepare API data for mapping to our indices
  if (apiIndices?.length) {
    apiIndices.forEach(indexData => {
      if (indexData.data && indexData.symbol) {
        symbolToData.set(indexData.symbol, {
          value: indexData.data.c || 0,
          change: indexData.data.d || 0,
          percentChange: indexData.data.dp || 0,
          volume: Math.floor(Math.random() * 10000000) + 1000000
        });
      }
    });
  }
  
  const indices = baseIndices.map(index => {
    const apiData = index.symbol ? symbolToData.get(index.symbol) : null;
    if (apiData) {
      return {
        ...index,
        value: apiData.value,
        change: apiData.change,
        percentChange: apiData.percentChange,
        volume: apiData.volume || index.volume,
        data: index.data || {
          c: apiData.value,
          d: apiData.change,
          dp: apiData.percentChange,
          h: 0, l: 0, o: 0, pc: 0, t: 0
        }
      };
    }
    return index;
  });
  
  useEffect(() => {
    if (error) {
      toast.error("Error loading indices data. Using cached data. Please check your connection and try again.");
      console.error("API Error:", error);
    }
  }, [error]);
  
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
  
  useEffect(() => {
    parseQueryParams();
  }, [location, indices]);
  
  const filteredIndices = indices
    .filter(index => filterBySearchTerm(index, searchTerm) && filterByRegion(index, filter))
    .sort((a, b) => a.name.localeCompare(b.name));

  return {
    filter,
    setFilter,
    searchTerm,
    setSearchTerm,
    subscribedIndices,
    selectedIndex,
    setSelectedIndex,
    filteredIndices,
    toggleSubscription: (indexName: string) => toggleSub(indexName, subscribedIndices, setSubscribedIndices),
    handleSelectIndex,
    indices: [...indices].sort((a, b) => a.name.localeCompare(b.name)),
    isLoading
  };
};
