
import { useQuery } from "@tanstack/react-query";
import { getMarketNews, getCompanyNews } from "@/utils/market-data/api";
import { DEFAULT_QUERY_CONFIG } from "./utils";
import type { NewsItem } from "@/utils/market-data/types";

/**
 * Hook for fetching market news
 * 
 * @example
 * const { data, isLoading, error, refetch } = useMarketNews("general", 5);
 */
export function useMarketNews(category: string = "general", count: number = 10) {
  return useQuery<NewsItem[], Error>({
    queryKey: ['market-news', category, count],
    queryFn: async () => {
      const result = await getMarketNews(category, count);
      return result as NewsItem[];
    },
    ...DEFAULT_QUERY_CONFIG,
    staleTime: 5 * 60 * 1000 // 5 minutes
  });
}

/**
 * Hook for fetching company news
 * 
 * @example
 * const { data, isLoading, error, refetch } = useCompanyNews("AAPL", 5);
 */
export function useCompanyNews(symbol: string, count: number = 10) {
  return useQuery<NewsItem[], Error>({
    queryKey: ['company-news', symbol, count],
    queryFn: async () => {
      const result = await getCompanyNews(symbol, count);
      return result as NewsItem[];
    },
    enabled: Boolean(symbol),
    ...DEFAULT_QUERY_CONFIG,
    staleTime: 5 * 60 * 1000 // 5 minutes
  });
}
