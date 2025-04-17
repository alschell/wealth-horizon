
import { useQuery } from "@tanstack/react-query";
import { getCandleData } from "@/utils/market-data/api";
import { marketLogger, DEFAULT_QUERY_CONFIG } from "./utils";
import type { CandleData } from "@/utils/market-data/types";

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
  return useQuery<CandleData>({
    queryKey: ['candle-data', symbol, resolution, from, to],
    queryFn: async (): Promise<CandleData> => {
      marketLogger.info(`Fetching candle data for ${symbol} with resolution ${resolution}`);
      const startTime = performance.now();
      try {
        const data = await getCandleData(symbol, resolution, from, to);
        const endTime = performance.now();
        marketLogger.debug(`Candle data for ${symbol} fetched in ${(endTime - startTime).toFixed(2)}ms`, 
          { points: data.t?.length || 0 });
        return data as CandleData;
      } catch (error) {
        marketLogger.error(`Failed to fetch candle data for ${symbol}`, error);
        throw error;
      }
    },
    enabled: Boolean(symbol),
    ...DEFAULT_QUERY_CONFIG,
    staleTime: 5 * 60 * 1000 // 5 minutes
  });
}
