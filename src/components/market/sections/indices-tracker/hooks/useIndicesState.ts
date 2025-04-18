
import { useState } from "react";
import { IndexData } from "../types";

export const useIndicesState = (providedIndices?: IndexData[]) => {
  const [filter, setFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [subscribedIndices, setSubscribedIndices] = useState<string[]>([
    "S&P 500",
    "NASDAQ Composite",
    "Dow Jones",
    "FTSE 100",
    "Nikkei 225"
  ]);
  const [selectedIndex, setSelectedIndex] = useState<IndexData | null>(null);
  
  return {
    filter,
    setFilter,
    searchTerm,
    setSearchTerm,
    subscribedIndices,
    setSubscribedIndices,
    selectedIndex,
    setSelectedIndex
  };
};
