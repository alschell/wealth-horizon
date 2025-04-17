
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
  return useQuery<NewsItem[]>({
    queryKey: ['market-news', category],
    queryFn: async (): Promise<NewsItem[]> => {
      marketLogger.info(`Fetching market news for category ${category}`);
      const startTime = performance.now();
      try {
        const data = await getMarketNews(category, count);
        const endTime = performance.now();
        marketLogger.debug(`Market news fetched in ${(endTime - startTime).toFixed(2)}ms`, 
          { count: data?.length || 0 });
        return data;
      } catch (error) {
        marketLogger.error(`Failed to fetch market news for ${category}`, error);
        throw error;
      }
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
  return useQuery<NewsItem[]>({
    queryKey: ['company-news', symbol, from, to],
    queryFn: async (): Promise<NewsItem[]> => {
      marketLogger.info(`Fetching news for ${symbol}`);
      const startTime = performance.now();
      try {
        const data = await getCompanyNews(symbol, from, to);
        const endTime = performance.now();
        marketLogger.debug(`Company news for ${symbol} fetched in ${(endTime - startTime).toFixed(2)}ms`, 
          { count: data?.length || 0 });
        return data;
      } catch (error) {
        marketLogger.error(`Failed to fetch news for ${symbol}`, error);
        throw error;
      }
    },
    enabled: Boolean(symbol),
    ...DEFAULT_QUERY_CONFIG,
    staleTime: 10 * 60 * 1000 // 10 minutes
  });
}
