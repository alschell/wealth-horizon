
import { useQuery } from "@tanstack/react-query";
import { getIndices } from "@/utils/market-data/api";
import { DEFAULT_QUERY_CONFIG } from "./utils";
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
    queryFn: async () => {
      return await getIndices(symbols);
    },
    ...DEFAULT_QUERY_CONFIG,
    staleTime: 5 * 60 * 1000 // 5 minutes
  });
}
