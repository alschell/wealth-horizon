
import { useQuery } from "@tanstack/react-query";
import { getIndices } from "@/utils/market-data/api";
import { marketLogger, DEFAULT_QUERY_CONFIG } from "./utils";
import type { IndexData } from "@/utils/market-data/types";
import { createTypedQuery } from "./createTypedQuery";

/**
 * Hook for fetching market indices
 * 
 * @example
 * const { data, isLoading, error, refetch } = useIndices(["^GSPC", "^DJI"]);
 */
export function useIndices(symbols?: string[]) {
  const fetchIndices = createTypedQuery<IndexData[], [string[] | undefined]>(getIndices);
  
  return useQuery<IndexData[], Error>({
    queryKey: ['indices', symbols ? symbols.join(',') : 'all'],
    queryFn: fetchIndices(symbols),
    ...DEFAULT_QUERY_CONFIG,
    staleTime: 5 * 60 * 1000 // 5 minutes
  });
}
