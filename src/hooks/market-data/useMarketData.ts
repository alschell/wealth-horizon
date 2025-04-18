
import { useQuery } from "@tanstack/react-query";
import { marketLogger, DEFAULT_QUERY_CONFIG } from "./utils";
import type { Quote } from "@/utils/market-data/types";

// Mock API function since we don't have direct access to it in this context
const mockFetchMarketData = async (symbol: string): Promise<Quote> => {
  // This is a mock implementation that would be replaced by actual API call
  marketLogger.info(`Fetching mock market data for ${symbol}`);
  return {
    c: 150.25, // Current price
    d: 2.5,    // Change
    dp: 1.75,  // Percent change
    h: 152.0,  // High price of the day
    l: 148.5,  // Low price of the day
    o: 149.0,  // Open price of the day
    pc: 147.75, // Previous close price
    t: Math.floor(Date.now() / 1000) // Timestamp
  };
};

/**
 * Hook for fetching market data
 * 
 * @example
 * const { data, isLoading, error } = useMarketData("AAPL");
 */
export function useMarketData(symbol: string) {
  return useQuery({
    queryKey: ['market-data', symbol],
    queryFn: async () => {
      marketLogger.info(`Fetching market data for ${symbol}`);
      const startTime = performance.now();
      try {
        const data = await mockFetchMarketData(symbol);
        const endTime = performance.now();
        marketLogger.debug(`Market data for ${symbol} fetched in ${(endTime - startTime).toFixed(2)}ms`, data);
        return data;
      } catch (error) {
        marketLogger.error(`Failed to fetch market data for ${symbol}`, error);
        throw error;
      }
    },
    enabled: Boolean(symbol),
    ...DEFAULT_QUERY_CONFIG
  });
}
