
import { useQuery } from "@tanstack/react-query";
import { getCandleData } from "@/utils/market-data/api";
import { marketLogger, DEFAULT_QUERY_CONFIG } from "./utils";
import type { CandleData } from "@/utils/market-data/types";
import { createTypedQuery } from "./createTypedQuery";

/**
 * Hook for fetching candle data for charts
 * 
 * @example
 * const { data, isLoading, error, refetch } = useCandleData("AAPL", "D");
 */
export function useCandleData(
  symbol: string,
  resolution: string = "D",
  from: number = Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60,
  to: number = Math.floor(Date.now() / 1000)
) {
  // Create a properly typed query function
  const fetchCandleDataQuery = createTypedQuery<CandleData, [string, string, number, number]>(getCandleData);
  
  return useQuery<CandleData, Error>({
    queryKey: ['candle-data', symbol, resolution, from, to],
    queryFn: fetchCandleDataQuery(symbol, resolution, from, to),
    enabled: Boolean(symbol),
    ...DEFAULT_QUERY_CONFIG,
    staleTime: 5 * 60 * 1000 // 5 minutes
  });
}
