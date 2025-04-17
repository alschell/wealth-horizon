
import { useQuery } from "@tanstack/react-query";
import { getQuote, formatQuote } from "@/utils/market-data/api";
import { marketLogger, DEFAULT_QUERY_CONFIG } from "./utils";
import type { Quote } from "@/utils/market-data/types";

/**
 * Hook for fetching stock quotes
 * 
 * @example
 * const { data, isLoading, error, refetch } = useQuote("AAPL");
 */
export function useQuote(symbol: string) {
  return useQuery<Quote, Error, { raw: Quote; formatted: ReturnType<typeof formatQuote> }>({
    queryKey: ['quote', symbol],
    queryFn: async (): Promise<Quote> => {
      marketLogger.info(`Fetching quote for ${symbol}`);
      const startTime = performance.now();
      try {
        const data = await getQuote(symbol);
        const endTime = performance.now();
        marketLogger.debug(`Quote for ${symbol} fetched in ${(endTime - startTime).toFixed(2)}ms`, data);
        return data as Quote;
      } catch (error) {
        marketLogger.error(`Failed to fetch quote for ${symbol}`, error);
        throw error;
      }
    },
    enabled: Boolean(symbol),
    ...DEFAULT_QUERY_CONFIG,
    select: (data: Quote) => {
      marketLogger.debug(`Formatting quote data for ${symbol}`);
      return {
        raw: data,
        formatted: formatQuote(data)
      };
    }
  });
}
