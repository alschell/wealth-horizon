import { useQuery } from "@tanstack/react-query";
import { getIndices } from "@/utils/market-data/api";
import { marketLogger, DEFAULT_QUERY_CONFIG } from "./utils";

/**
 * Hook for fetching major market indices
 * 
 * @example
 * const { data, isLoading, error, refetch } = useIndices();
 */
export function useIndices(customSymbols?: string[]) {
  return useQuery({
    queryKey: ['indices', customSymbols?.join(',')],
    queryFn: async () => {
      const symbols = customSymbols ? `custom: ${customSymbols.join(',')}` : 'default indices';
      marketLogger.info(`Fetching indices data: ${symbols}`);
      const startTime = performance.now();
      
      try {
        // Explicitly list major indices to ensure they are always fetched
        const majorIndices = [
          "^GSPC",   // S&P 500
          "^DJI",    // Dow Jones
          "^IXIC",   // NASDAQ Composite
          "^FTSE",   // FTSE 100
          "^N225",   // Nikkei 225
          "^FCHI",   // CAC 40
          "^GDAXI",  // DAX
          "^HSI",    // Hang Seng
          "^BSESN",  // SENSEX
          "^AXJO",   // ASX 200
          "^STOXX50E", // Euro Stoxx 50
        ];
        
        // Use the provided custom symbols or fall back to major indices
        const symbolsToFetch = customSymbols || majorIndices;
        
        const data = await getIndices(symbolsToFetch);
        const endTime = performance.now();
        marketLogger.debug(`Indices data fetched in ${(endTime - startTime).toFixed(2)}ms`, 
          { count: data.length, symbols: symbolsToFetch });
        
        if (!data || data.length === 0) {
          throw new Error("No indices data returned from API");
        }
        
        // Log the actual received data for debugging
        console.log("Received indices data:", data);
        
        return data;
      } catch (error) {
        marketLogger.error(`Failed to fetch indices data`, error);
        console.error("Indices API error details:", error);
        throw error;
      }
    },
    ...DEFAULT_QUERY_CONFIG,
    // Increase retries for better resilience
    retry: 3,
    // Keep data fresher
    refetchInterval: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}
