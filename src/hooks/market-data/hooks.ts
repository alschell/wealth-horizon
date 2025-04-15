
import { useQuery } from "@tanstack/react-query";
import { 
  getQuote, 
  getMarketNews, 
  getCompanyNews, 
  searchSymbols, 
  getIndices,
  getCandleData,
  formatQuote,
  refreshMarketData
} from "@/utils/market-data/api";
import { marketLogger } from "./logger";
import { DEFAULT_QUERY_CONFIG } from "./config";

/**
 * Hook for fetching stock quotes
 * 
 * @example
 * const { data, isLoading, error, refetch } = useQuote("AAPL");
 */
export function useQuote(symbol: string) {
  return useQuery({
    queryKey: ['quote', symbol],
    queryFn: async () => {
      marketLogger.info(`Fetching quote for ${symbol}`);
      const startTime = performance.now();
      try {
        const data = await getQuote(symbol);
        const endTime = performance.now();
        marketLogger.debug(`Quote for ${symbol} fetched in ${(endTime - startTime).toFixed(2)}ms`, data);
        return data;
      } catch (error) {
        marketLogger.error(`Failed to fetch quote for ${symbol}`, error);
        throw error;
      }
    },
    enabled: Boolean(symbol),
    ...DEFAULT_QUERY_CONFIG,
    select: (data) => {
      marketLogger.debug(`Formatting quote data for ${symbol}`);
      return {
        raw: data,
        formatted: formatQuote(data)
      };
    }
  });
}

/**
 * Hook for fetching market news
 * 
 * @example
 * const { data, isLoading, error, refetch } = useMarketNews("general", 5);
 */
export function useMarketNews(category: string = "general", count: number = 10) {
  return useQuery({
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
 * Hook for fetching company-specific news
 * 
 * @example
 * const { data, isLoading, error, refetch } = useCompanyNews("AAPL");
 */
export function useCompanyNews(
  symbol: string,
  from: string = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  to: string = new Date().toISOString().split("T")[0]
) {
  return useQuery({
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

/**
 * Hook for searching symbols
 * 
 * @example
 * const { search, data, isLoading } = useSymbolSearch();
 * // Later in your component
 * search("Apple");
 */
export function useSymbolSearch() {
  const {
    data: results,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['symbol-search', ''],
    queryFn: async () => {
      marketLogger.info(`Performing symbol search`);
      const startTime = performance.now();
      try {
        const data = await searchSymbols('');
        const endTime = performance.now();
        marketLogger.debug(`Symbol search completed in ${(endTime - startTime).toFixed(2)}ms`, 
          { count: data.result?.length || 0 });
        return data;
      } catch (error) {
        marketLogger.error(`Symbol search failed`, error);
        throw error;
      }
    },
    ...DEFAULT_QUERY_CONFIG,
    enabled: false // Don't run the query automatically
  });
  
  const search = async (query: string) => {
    if (!query || query.length < 2) return;
    marketLogger.info(`Searching for symbol: ${query}`);
    return refetch();
  };

  return { 
    results, 
    isLoading, 
    error, 
    search 
  };
}

/**
 * Hook for fetching major market indices
 * 
 * @example
 * const { data, isLoading, error, refetch } = useIndices();
 */
export function useIndices(customSymbols?: string[]) {
  return useQuery({
    queryKey: ['indices', customSymbols?.join(',')],
    queryFn: async () => {
      const symbols = customSymbols ? `custom: ${customSymbols.join(',')}` : 'default indices';
      marketLogger.info(`Fetching indices data: ${symbols}`);
      const startTime = performance.now();
      try {
        const data = await getIndices(customSymbols);
        const endTime = performance.now();
        marketLogger.debug(`Indices data fetched in ${(endTime - startTime).toFixed(2)}ms`, 
          { count: data.length });
        return data;
      } catch (error) {
        marketLogger.error(`Failed to fetch indices data`, error);
        throw error;
      }
    },
    ...DEFAULT_QUERY_CONFIG,
  });
}

/**
 * Hook for fetching candle data for charts
 * 
 * @example
 * const { data, isLoading, error, refetch } = useCandleData("AAPL", "D");
 */
export function useCandleData(
  symbol: string,
  resolution: string = "D",
  from: number = Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60,
  to: number = Math.floor(Date.now() / 1000)
) {
  return useQuery({
    queryKey: ['candle-data', symbol, resolution, from, to],
    queryFn: async () => {
      marketLogger.info(`Fetching candle data for ${symbol} with resolution ${resolution}`);
      const startTime = performance.now();
      try {
        const data = await getCandleData(symbol, resolution, from, to);
        const endTime = performance.now();
        marketLogger.debug(`Candle data for ${symbol} fetched in ${(endTime - startTime).toFixed(2)}ms`, 
          { points: data.t?.length || 0 });
        return data;
      } catch (error) {
        marketLogger.error(`Failed to fetch candle data for ${symbol}`, error);
        throw error;
      }
    },
    enabled: Boolean(symbol),
    ...DEFAULT_QUERY_CONFIG,
    staleTime: 5 * 60 * 1000 // 5 minutes
  });
}

/**
 * Hook for real-time data refresh
 * 
 * @example
 * const refreshData = useMarketDataRefresh();
 * // Later in your component
 * refreshData(['quote', 'indices'], { symbol: 'AAPL' });
 */
export function useMarketDataRefresh() {
  const refresh = async (
    types: ('quote' | 'indices' | 'news' | 'candles')[],
    options?: { symbol?: string, showToast?: boolean }
  ) => {
    const { symbol, showToast = true } = options || {};
    
    marketLogger.info(`Manually refreshing market data: ${types.join(', ')}${symbol ? ` for ${symbol}` : ''}`);
    
    try {
      const typesConfig = types.map(type => ({
        type: type as any,
        symbol,
        params: {}
      }));
      
      await refreshMarketData(typesConfig);
      marketLogger.info(`Market data refresh completed successfully`);
      
      return true;
    } catch (error) {
      marketLogger.error(`Market data refresh failed`, error);
      return false;
    }
  };
  
  return refresh;
}
