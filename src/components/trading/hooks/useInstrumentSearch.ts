
import { useState, useCallback } from "react";
import { Instrument } from "../types";
import { mockInstruments } from "../data/instruments";

export const useInstrumentSearch = () => {
  const [results, setResults] = useState<Instrument[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const performSearch = useCallback((query: string) => {
    setIsSearching(true);
    
    // Simulate API search with a timeout
    setTimeout(() => {
      if (query.trim() === "") {
        setResults([]);
      } else {
        const searchResults = mockInstruments.filter(
          (instrument) =>
            instrument.symbol.toLowerCase().includes(query.toLowerCase()) ||
            instrument.name.toLowerCase().includes(query.toLowerCase()) ||
            (instrument.isin && instrument.isin.toLowerCase().includes(query.toLowerCase()))
        );
        setResults(searchResults);
      }
      setIsSearching(false);
    }, 300);
  }, []);

  return {
    results,
    isSearching,
    performSearch
  };
};
