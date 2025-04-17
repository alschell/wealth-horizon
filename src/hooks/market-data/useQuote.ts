
import { useQuery } from "@tanstack/react-query";
import { getQuote, formatQuote } from "@/utils/market-data/api";
import { marketLogger, DEFAULT_QUERY_CONFIG } from "./utils";
import type { Quote } from "@/utils/market-data/types";
import { createTypedQuery } from "./createTypedQuery";

/**
 * Hook for fetching stock quotes
 * 
 * @example
 * const { data, isLoading, error, refetch } = useQuote("AAPL");
 */
export function useQuote(symbol: string) {
  // Create a properly typed query function
  const fetchQuoteQuery = createTypedQuery<Quote, [string]>(getQuote);
  
  return useQuery<Quote, Error, { raw: Quote; formatted: ReturnType<typeof formatQuote> }>({
    queryKey: ['quote', symbol],
    queryFn: fetchQuoteQuery(symbol),
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
