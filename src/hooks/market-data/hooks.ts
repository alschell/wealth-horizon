
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  getQuote, 
  getMarketNews, 
  getCompanyNews, 
  searchSymbols, 
  getIndices, 
  getCandleData, 
  refreshMarketData,
  formatQuote
} from '@/utils/market-data/api';
import { DEFAULT_QUERY_CONFIG } from './config';
import { marketLogger } from './logger';

/**
 * Hook to fetch quote data for a given symbol
 */
export const useQuote = (symbol: string) => {
  const queryResult = useQuery({
    queryKey: ['quote', symbol],
    queryFn: () => getQuote(symbol),
    ...DEFAULT_QUERY_CONFIG,
    enabled: Boolean(symbol),
  });

  // Enhanced result with formatted data
  return {
    ...queryResult,
    data: queryResult.data ? {
      raw: queryResult.data,
      formatted: formatQuote(queryResult.data)
    } : undefined
  };
};

/**
 * Hook to fetch market news
 */
export const useMarketNews = (category: string = 'general', limit: number = 10) => {
  return useQuery({
    queryKey: ['market-news', category, limit],
    queryFn: () => getMarketNews(category, limit),
    ...DEFAULT_QUERY_CONFIG,
  });
};

/**
 * Hook to fetch company specific news
 */
export const useCompanyNews = (symbol: string, limit: number = 10) => {
  return useQuery({
    queryKey: ['company-news', symbol, limit],
    queryFn: () => getCompanyNews(symbol, limit),
    ...DEFAULT_QUERY_CONFIG,
    enabled: Boolean(symbol),
  });
};

/**
 * Hook to search for symbols 
 */
export const useSymbolSearch = (query: string) => {
  return useQuery({
    queryKey: ['symbol-search', query],
    queryFn: () => searchSymbols(query),
    ...DEFAULT_QUERY_CONFIG,
    enabled: query.length > 1,
  });
};

/**
 * Hook to fetch market indices data
 */
export const useIndices = () => {
  return useQuery({
    queryKey: ['indices'],
    queryFn: getIndices,
    ...DEFAULT_QUERY_CONFIG,
  });
};

/**
 * Hook to fetch candle (OHLC) data for charts
 */
export const useCandleData = (symbol: string, timeframe: string = '1D') => {
  return useQuery({
    queryKey: ['candle-data', symbol, timeframe],
    queryFn: () => getCandleData(symbol, timeframe),
    ...DEFAULT_QUERY_CONFIG,
    enabled: Boolean(symbol),
  });
};

/**
 * Hook to refresh all market data
 */
export const useMarketDataRefresh = () => {
  const queryClient = useQueryClient();
  
  const refreshAll = async () => {
    marketLogger.info('Refreshing all market data');
    await refreshMarketData();
    
    // Invalidate all market data queries to trigger refetch
    queryClient.invalidateQueries({ queryKey: ['quote'] });
    queryClient.invalidateQueries({ queryKey: ['market-news'] });
    queryClient.invalidateQueries({ queryKey: ['indices'] });
    
    return true;
  };
  
  return { refreshAll };
};
