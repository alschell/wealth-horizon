
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
    queryFn: () => getQuote(symbol),
    enabled: Boolean(symbol),
    ...DEFAULT_QUERY_CONFIG,
    staleTime: 5 * 60 * 1000, // 5 minutes
    select: (data) => {
      return {
        raw: data,
        formatted: formatQuote(data)
      };
    }
  });
}
