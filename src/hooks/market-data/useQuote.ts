
import { useQuery } from "@tanstack/react-query";
import { getQuote, formatQuote } from "@/utils/market-data/api";
import { DEFAULT_QUERY_CONFIG } from "./utils";
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
    queryFn: async () => {
      return getQuote(symbol);
    },
    enabled: Boolean(symbol),
    ...DEFAULT_QUERY_CONFIG,
    select: (data: Quote) => {
      return {
        raw: data,
        formatted: formatQuote(data)
      };
    }
  });
}
