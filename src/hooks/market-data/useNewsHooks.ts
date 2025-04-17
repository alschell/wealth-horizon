
import { useQuery } from "@tanstack/react-query";
import { getMarketNews, getCompanyNews } from "@/utils/market-data/api";
import { marketLogger, DEFAULT_QUERY_CONFIG } from "./utils";
import type { NewsItem } from "@/utils/market-data/types";

/**
 * Hook for fetching market news
 * 
 * @example
 * const { data, isLoading, error, refetch } = useMarketNews("general", 10);
 */
export function useMarketNews(category: string = "general", count: number = 10) {
  return useQuery<NewsItem[], Error>({
    queryKey: ['market-news', category],
    queryFn: async () => {
      marketLogger.info(`Fetching market news for category ${category}`);
      const startTime = performance.now();
      
      const data = await getMarketNews(category, count);
      const endTime = performance.now();
      
      marketLogger.debug(`Market news fetched in ${(endTime - startTime).toFixed(2)}ms`, 
        { count: data?.length || 0 });
      
      return data || [];
    },
    ...DEFAULT_QUERY_CONFIG,
    staleTime: 15 * 60 * 1000 // 15 minutes
  });
}

/**
 * Hook for fetching company-specific news
 * 
 * @example
 * const { data, isLoading, error, refetch } = useCompanyNews("AAPL");
 */
export function useCompanyNews(
  symbol: string,
  from?: string,
  to?: string
) {
  return useQuery<NewsItem[], Error>({
    queryKey: ['company-news', symbol, from, to],
    queryFn: async () => {
      marketLogger.info(`Fetching news for ${symbol}`);
      const startTime = performance.now();
      
      const data = await getCompanyNews(symbol, from, to);
      const endTime = performance.now();
      
      marketLogger.debug(`Company news for ${symbol} fetched in ${(endTime - startTime).toFixed(2)}ms`, 
        { count: data?.length || 0 });
      
      return data || [];
    },
    enabled: Boolean(symbol),
    ...DEFAULT_QUERY_CONFIG,
    staleTime: 10 * 60 * 1000 // 10 minutes
  });
}
