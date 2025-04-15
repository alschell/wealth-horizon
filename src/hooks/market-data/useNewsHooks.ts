
import { useQuery } from "@tanstack/react-query";
import { getMarketNews, getCompanyNews } from "@/utils/market-data/api";
import { marketLogger, DEFAULT_QUERY_CONFIG } from "./utils";
import type { NewsItem } from "@/utils/market-data/types";

/**
 * Hook for fetching general market news
 * 
 * @param category - News category to filter by (e.g., 'general', 'forex', 'crypto', 'merger')
 * @param count - Maximum number of news items to return
 * @returns Query result with news data, loading state, and error information
 * 
 * @example
 * ```tsx
 * const { data, isLoading, error, refetch } = useMarketNews("general", 5);
 * 
 * if (isLoading) return <Spinner />;
 * if (error) return <ErrorMessage message={error.message} />;
 * 
 * return (
 *   <NewsList items={data || []} />
 * );
 * ```
 */
export function useMarketNews(category: string = "general", count: number = 10) {
  return useQuery<NewsItem[]>({
    queryKey: ['market-news', category, count],
    queryFn: async () => {
      marketLogger.info(`Fetching ${category} market news (${count} items)`);
      const startTime = performance.now();
      try {
        const data = await getMarketNews(category, count);
        const endTime = performance.now();
        marketLogger.debug(`${category} market news fetched in ${(endTime - startTime).toFixed(2)}ms`, 
          { count: data.length });
        return data;
      } catch (error) {
        marketLogger.error(`Failed to fetch ${category} market news`, error);
        throw error;
      }
    },
    ...DEFAULT_QUERY_CONFIG,
    staleTime: 5 * 60 * 1000 // 5 minutes
  });
}

/**
 * Hook for fetching company-specific news within a date range
 * 
 * @param symbol - Stock symbol to fetch news for (e.g., 'AAPL', 'MSFT')
 * @param from - Start date in 'YYYY-MM-DD' format
 * @param to - End date in 'YYYY-MM-DD' format 
 * @returns Query result with company news, loading state, and error information
 * 
 * @example
 * ```tsx
 * const { data, isLoading, error } = useCompanyNews("AAPL", "2023-01-01", "2023-01-31");
 * 
 * return (
 *   <CompanyNewsSection 
 *     news={data || []}
 *     isLoading={isLoading}
 *     error={error}
 *   />
 * );
 * ```
 */
export function useCompanyNews(
  symbol: string,
  from: string = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  to: string = new Date().toISOString().split("T")[0]
) {
  return useQuery<NewsItem[]>({
    queryKey: ['company-news', symbol, from, to],
    queryFn: async () => {
      marketLogger.info(`Fetching news for ${symbol} from ${from} to ${to}`);
      const startTime = performance.now();
      try {
        const data = await getCompanyNews(symbol, from, to);
        const endTime = performance.now();
        marketLogger.debug(`News for ${symbol} fetched in ${(endTime - startTime).toFixed(2)}ms`, 
          { count: data.length });
        return data;
      } catch (error) {
        marketLogger.error(`Failed to fetch news for ${symbol}`, error);
        throw error;
      }
    },
    enabled: Boolean(symbol),
    ...DEFAULT_QUERY_CONFIG,
    staleTime: 5 * 60 * 1000 // 5 minutes
  });
}
