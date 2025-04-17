
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
        const data = await getIndices(customSymbols);
        const endTime = performance.now();
        marketLogger.debug(`Indices data fetched in ${(endTime - startTime).toFixed(2)}ms`, 
          { count: data.length });
        
        if (!data || data.length === 0) {
          throw new Error("No indices data returned from API");
        }
        
        return data;
      } catch (error) {
        marketLogger.error(`Failed to fetch indices data`, error);
        console.error("Indices API error details:", error);
        throw error;
      }
    },
    ...DEFAULT_QUERY_CONFIG,
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
