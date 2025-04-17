
import { useQuery } from "@tanstack/react-query";
import { getMarketNews, getCompanyNews } from "@/utils/market-data/api";
import { marketLogger, DEFAULT_QUERY_CONFIG, MOCK_NEWS_DATA } from "./utils";
import type { NewsItem } from "@/utils/market-data/types";
import { toast } from "sonner";

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
        console.log(`Fetching market news for category: ${category}, count: ${count}`);
        
        // First try fetching from the API
        try {
          const data = await getMarketNews(category, count);
          const endTime = performance.now();
          
          // Debug logging
          console.log(`Market news API response for ${category}:`, data);
          
          // If we have valid data, return it
          if (data && Array.isArray(data) && data.length > 0) {
            marketLogger.debug(`${category} market news fetched in ${(endTime - startTime).toFixed(2)}ms`, 
              { count: data.length });
            return data;
          } else {
            console.warn(`Empty or invalid news data returned for category: ${category}`);
            throw new Error("API returned empty or invalid data");
          }
        } catch (fetchError) {
          console.error(`Error fetching news data:`, fetchError);
          
          // Fall back to mock data
          const filteredMockNews = MOCK_NEWS_DATA
            .filter(item => category === "general" || item.category === category)
            .slice(0, count);
            
          toast.warning("Using sample news data - API connection issue", {
            description: "We're temporarily using sample news while resolving a connection issue."
          });
          
          return filteredMockNews;
        }
      } catch (error) {
        marketLogger.error(`Failed to fetch ${category} market news`, error);
        
        // Enhanced error logging
        console.error(`Error fetching market news for category ${category}:`, error);
        if (error instanceof Error) {
          console.error(`Error details: ${error.message}`, {
            stack: error.stack,
            timestamp: new Date().toISOString()
          });
        }
        
        // Fall back to mock data
        const filteredMockNews = MOCK_NEWS_DATA
          .filter(item => category === "general" || item.category === category)
          .slice(0, count);
          
        toast.warning("Using sample news data - API connection issue", {
          description: "We're temporarily using sample news while resolving a connection issue."
        });
        
        return filteredMockNews;
      }
    },
    ...DEFAULT_QUERY_CONFIG,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    refetchOnWindowFocus: true,
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
        console.log(`Fetching company news for symbol: ${symbol}, from: ${from}, to: ${to}`);
        
        // First try fetching from the API
        try {
          const data = await getCompanyNews(symbol, from, to);
          const endTime = performance.now();
          
          // Debug logging
          console.log(`Company news API response for ${symbol}:`, data);
          
          // If we have valid data, return it
          if (data && Array.isArray(data) && data.length > 0) {
            marketLogger.debug(`News for ${symbol} fetched in ${(endTime - startTime).toFixed(2)}ms`, 
              { count: data.length });
            return data;
          } else {
            console.warn(`Empty or invalid company news data returned for symbol: ${symbol}`);
            throw new Error("API returned empty or invalid data");
          }
        } catch (fetchError) {
          console.error(`Error fetching company news data:`, fetchError);
          
          // Fall back to mock data with the company symbol in the headlines
          const mockCompanyNews = MOCK_NEWS_DATA.map(item => ({
            ...item,
            headline: item.headline.includes(symbol) ? item.headline : `${symbol}: ${item.headline}`,
            related: `${symbol},${item.related}`
          })).slice(0, 5);
            
          toast.warning("Using sample company news - API connection issue", {
            description: "We're temporarily using sample data while resolving a connection issue."
          });
          
          return mockCompanyNews;
        }
      } catch (error) {
        marketLogger.error(`Failed to fetch news for ${symbol}`, error);
        
        // Enhanced error logging
        console.error(`Error fetching company news for ${symbol}:`, error);
        if (error instanceof Error) {
          console.error(`Error details: ${error.message}`, {
            stack: error.stack,
            timestamp: new Date().toISOString()
          });
        }
        
        // Fall back to mock data with the company symbol in the headlines
        const mockCompanyNews = MOCK_NEWS_DATA.map(item => ({
          ...item,
          headline: item.headline.includes(symbol) ? item.headline : `${symbol}: ${item.headline}`,
          related: `${symbol},${item.related}`
        })).slice(0, 5);
          
        toast.warning("Using sample company news - API connection issue", {
          description: "We're temporarily using sample data while resolving a connection issue."
        });
        
        return mockCompanyNews;
      }
    },
    enabled: Boolean(symbol),
    ...DEFAULT_QUERY_CONFIG,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    refetchOnWindowFocus: true,
  });
}
