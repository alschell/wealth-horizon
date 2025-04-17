
import { useQuery } from "@tanstack/react-query";
import { searchSymbols } from "@/utils/market-data/api";
import { marketLogger, DEFAULT_QUERY_CONFIG } from "./utils";
import { SymbolSearchResult } from "@/utils/market-data/types";

/**
 * Hook for searching symbols
 * 
 * @example
 * const { search, data, isLoading } = useSymbolSearch();
 * // Later in your component
 * search("Apple");
 */
export function useSymbolSearch() {
  const {
    data: results,
    isLoading,
    error,
    refetch
  } = useQuery<SymbolSearchResult, Error>({
    queryKey: ['symbol-search', ''],
    queryFn: async (): Promise<SymbolSearchResult> => {
      return searchSymbols('');
    },
    ...DEFAULT_QUERY_CONFIG,
    enabled: false // Don't run the query automatically
  });
  
  const search = async (query: string) => {
    if (!query || query.length < 2) return;
    marketLogger.info(`Searching for symbol: ${query}`);
    return refetch();
  };

  return { 
    results, 
    isLoading, 
    error, 
    search 
  };
}
