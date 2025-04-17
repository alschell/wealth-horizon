
import { useQuery } from "@tanstack/react-query";
import { searchSymbols } from "@/utils/market-data/api";
import { DEFAULT_QUERY_CONFIG } from "./utils";
import type { SymbolSearchResult } from "@/utils/market-data/types";

/**
 * Hook for searching symbols
 * 
 * @example
 * const { search, data, isLoading } = useSymbolSearch();
 * // Later in your component
 * search("Apple");
 */
export function useSymbolSearch() {
  const { refetch, data, isLoading, error } = useQuery<SymbolSearchResult, Error>({
    queryKey: ['symbol-search', ''],
    queryFn: async () => {
      return await searchSymbols('');
    },
    ...DEFAULT_QUERY_CONFIG,
    enabled: false // Don't run the query automatically
  });

  // Function to trigger search
  const search = async (query: string) => {
    if (!query || query.length < 2) return;
    return refetch();
  };

  return {
    results: data,
    isLoading,
    error,
    search
  };
}
