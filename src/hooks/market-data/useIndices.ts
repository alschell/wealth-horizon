
import { useQuery } from "@tanstack/react-query";
import { getIndices } from "@/utils/market-data/api";
import { marketLogger, DEFAULT_QUERY_CONFIG } from "./utils";
import type { IndexData } from "@/utils/market-data/types";

/**
 * Hook for fetching market indices
 * 
 * @example
 * const { data, isLoading, error, refetch } = useIndices(["^GSPC", "^DJI"]);
 */
export function useIndices(symbols?: string[]) {
  return useQuery<IndexData[], Error>({
    queryKey: ['indices', symbols ? symbols.join(',') : 'all'],
    queryFn: async (): Promise<IndexData[]> => {
      marketLogger.info(`Fetching indices ${symbols ? symbols.join(', ') : 'all'}`);
      const startTime = performance.now();
      
      const data = await getIndices(symbols);
      const endTime = performance.now();
      
      marketLogger.debug(`Indices fetched in ${(endTime - startTime).toFixed(2)}ms`, 
        { count: data?.length || 0 });
      
      return data || [];
    },
    ...DEFAULT_QUERY_CONFIG,
    staleTime: 5 * 60 * 1000 // 5 minutes
  });
}
