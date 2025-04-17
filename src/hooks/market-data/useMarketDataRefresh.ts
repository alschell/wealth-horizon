
import { useQueryClient } from "@tanstack/react-query";
import { refreshMarketData as refreshAPI } from "@/utils/market-data/api";
import { marketLogger } from "./utils";
import type { UseMarketDataRefreshReturn, RefreshableMarketDataType } from "./types";

/**
 * Hook for refreshing market data
 * 
 * @example
 * const { refreshMarketData, refreshAll } = useMarketDataRefresh();
 * // Refresh specific data types
 * refreshMarketData('indices');
 * // Refresh all market data
 * refreshAll();
 */
export function useMarketDataRefresh(): UseMarketDataRefreshReturn {
  const queryClient = useQueryClient();
  
  /**
   * Refresh market data for a specific type
   * @param dataType Type of market data to refresh
   * @param additionalParams Optional parameters (e.g., symbols)
   */
  const refreshMarketData = (dataType: RefreshableMarketDataType, additionalParams?: string[]) => {
    marketLogger.info(`Refreshing ${dataType} market data`, additionalParams);
    
    switch (dataType) {
      case 'indices':
        queryClient.invalidateQueries({ queryKey: ['indices'] });
        break;
      case 'quotes':
        if (additionalParams?.length) {
          additionalParams.forEach(symbol => {
            queryClient.invalidateQueries({ queryKey: ['quote', symbol] });
          });
        } else {
          queryClient.invalidateQueries({ queryKey: ['quote'] });
        }
        break;
      case 'news':
        queryClient.invalidateQueries({ queryKey: ['market-news'] });
        queryClient.invalidateQueries({ queryKey: ['company-news'] });
        break;
      case 'candles':
        if (additionalParams?.length) {
          additionalParams.forEach(symbol => {
            queryClient.invalidateQueries({ queryKey: ['candle-data', symbol] });
          });
        } else {
          queryClient.invalidateQueries({ queryKey: ['candle-data'] });
        }
        break;
      case 'search':
        queryClient.invalidateQueries({ queryKey: ['symbol-search'] });
        break;
    }
  };
  
  /**
   * Refresh all market data
   * @param clearCache Whether to clear the cache
   */
  const refreshAll = (clearCache = false) => {
    marketLogger.info(`Refreshing all market data${clearCache ? ' and clearing cache' : ''}`);
    
    // Invalidate all market data queries
    refreshMarketData('indices');
    refreshMarketData('quotes');
    refreshMarketData('news');
    refreshMarketData('candles');
    refreshMarketData('search');
    
    // Also trigger API refresh (to clear server cache if needed)
    refreshAPI([
      { type: 'indices' },
      { type: 'quote' },
      { type: 'news' }
    ]);
  };
  
  return {
    refreshMarketData,
    refreshAll
  };
}
