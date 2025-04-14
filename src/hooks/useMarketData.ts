import { 
  getQuote, 
  getMarketNews, 
  getCompanyNews, 
  searchSymbols, 
  getIndices,
  getCandleData,
  formatQuote 
} from "@/utils/market-data/api";
import { useQuery } from "@tanstack/react-query";

/**
 * Base config for all market data queries
 */
const DEFAULT_QUERY_CONFIG = {
  staleTime: 60 * 1000, // 1 minute
  retry: 2,
  refetchOnWindowFocus: true,
  refetchOnReconnect: true
};

/**
 * Hook for fetching stock quotes
 * 
 * @example
 * const { data, isLoading, error } = useQuote("AAPL");
 */
export function useQuote(symbol: string) {
  return useQuery({
    queryKey: ['quote', symbol],
    queryFn: () => getQuote(symbol),
    enabled: Boolean(symbol),
    ...DEFAULT_QUERY_CONFIG,
    select: (data) => ({
      raw: data,
      formatted: formatQuote(data)
    })
  });
}

/**
 * Hook for fetching market news
 * 
 * @example
 * const { data, isLoading, error } = useMarketNews("general", 5);
 */
export function useMarketNews(category: string = "general", count: number = 10) {
  return useQuery({
    queryKey: ['market-news', category, count],
    queryFn: () => getMarketNews(category, count),
    ...DEFAULT_QUERY_CONFIG,
    staleTime: 5 * 60 * 1000 // 5 minutes
  });
}

/**
 * Hook for fetching company-specific news
 * 
 * @example
 * const { data, isLoading, error } = useCompanyNews("AAPL");
 */
export function useCompanyNews(
  symbol: string,
  from: string = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  to: string = new Date().toISOString().split("T")[0]
) {
  return useQuery({
    queryKey: ['company-news', symbol, from, to],
    queryFn: () => getCompanyNews(symbol, from, to),
    enabled: Boolean(symbol),
    ...DEFAULT_QUERY_CONFIG,
    staleTime: 5 * 60 * 1000 // 5 minutes
  });
}

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
  } = useQuery({
    queryKey: ['symbol-search', ''],
    queryFn: () => searchSymbols(''),
    ...DEFAULT_QUERY_CONFIG,
    enabled: false // Don't run the query automatically
  });
  
  const search = async (query: string) => {
    if (!query || query.length < 2) return;
    return refetch({ queryKey: ['symbol-search', query] });
  };

  return { 
    results, 
    isLoading, 
    error, 
    search 
  };
}

/**
 * Hook for fetching major market indices
 * 
 * @example
 * const { data, isLoading, error } = useIndices();
 */
export function useIndices(customSymbols?: string[]) {
  return useQuery({
    queryKey: ['indices', customSymbols?.join(',')],
    queryFn: () => getIndices(customSymbols),
    ...DEFAULT_QUERY_CONFIG,
  });
}

/**
 * Hook for fetching candle data for charts
 * 
 * @example
 * const { data, isLoading, error } = useCandleData("AAPL", "D");
 */
export function useCandleData(
  symbol: string,
  resolution: string = "D",
  from: number = Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60,
  to: number = Math.floor(Date.now() / 1000)
) {
  return useQuery({
    queryKey: ['candle-data', symbol, resolution, from, to],
    queryFn: () => getCandleData(symbol, resolution, from, to),
    enabled: Boolean(symbol),
    ...DEFAULT_QUERY_CONFIG,
    staleTime: 5 * 60 * 1000 // 5 minutes
  });
}

// Re-export for backwards compatibility
export { formatQuote };
