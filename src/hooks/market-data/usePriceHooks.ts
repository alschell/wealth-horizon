
import { useQuery } from "@tanstack/react-query";
import { getCandleData } from "@/utils/market-data/api";
import { marketLogger, DEFAULT_QUERY_CONFIG } from "./utils";
import type { CandleData } from "@/utils/market-data/types";

/**
 * Hook for fetching candle data for charts with enhanced error handling
 * 
 * This hook provides historical price data in OHLC (Open, High, Low, Close) format,
 * suitable for candlestick charts and technical analysis.
 * 
 * @param symbol - Stock symbol to fetch data for (e.g., 'AAPL')
 * @param resolution - Time resolution for candles (e.g., 'D' for daily, 'W' for weekly)
 * @param from - Start timestamp (Unix time in seconds)
 * @param to - End timestamp (Unix time in seconds)
 * @returns Query result with candle data, loading state, and error information
 * 
 * @example
 * ```tsx
 * // Fetch 30 days of daily candles for Apple
 * const thirtyDaysAgo = Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60;
 * const now = Math.floor(Date.now() / 1000);
 * 
 * const { data, isLoading } = useCandleData("AAPL", "D", thirtyDaysAgo, now);
 * 
 * return (
 *   <CandlestickChart 
 *     data={data} 
 *     isLoading={isLoading} 
 *     symbol="AAPL" 
 *   />
 * );
 * ```
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
        return data;
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
