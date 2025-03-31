import { useState, useCallback, useEffect } from "react";
import { Instrument } from "../types";
import { mockInstruments } from "../data/instruments";

interface UseInstrumentSearchProps {
  setSelectedInstrument: (instrument: Instrument | null) => void;
  orderType?: string;
}

export const useInstrumentSearch = ({ setSelectedInstrument, orderType }: UseInstrumentSearchProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Instrument[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  // Effect to trigger search when query changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        performSearch(searchQuery);
      } else if (hasSearched) {
        // Keep showing all instruments when searchQuery is empty but user has searched before
        setSearchResults(mockInstruments);
        setIsLoading(false);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, hasSearched]);

  const performSearch = useCallback((query: string) => {
    setError(null);
    
    // Only show loading for non-empty queries
    if (query.trim() !== "") {
      setIsLoading(true);
      setHasSearched(true);
    }
    
    try {
      // Simulate API search with a timeout
      setTimeout(() => {
        if (query.trim() === "") {
          // Show all instruments when search query is empty after having searched
          setSearchResults(mockInstruments);
        } else {
          const results = mockInstruments.filter(
            (instrument) =>
              instrument.symbol.toLowerCase().includes(query.toLowerCase()) ||
              instrument.name.toLowerCase().includes(query.toLowerCase()) ||
              (instrument.isin && instrument.isin.toLowerCase().includes(query.toLowerCase()))
          );
          setSearchResults(results);
        }
        setIsLoading(false);
      }, 300);
    } catch (e) {
      setError("An error occurred during search");
      setIsLoading(false);
    }
  }, []);

  // Handle selecting an instrument
  const handleSelectInstrument = useCallback((instrument: Instrument | null) => {
    setSelectedInstrument(instrument);
    // Don't clear search results when selecting or unselecting
  }, [setSelectedInstrument]);

  // Clear selected instrument
  const clearSelectedInstrument = useCallback(() => {
    setSelectedInstrument(null);
    // Don't clear search results when unselecting
  }, [setSelectedInstrument]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isLoading,
    error,
    handleSelectInstrument,
    clearSelectedInstrument,
    hasSearched
  };
};
