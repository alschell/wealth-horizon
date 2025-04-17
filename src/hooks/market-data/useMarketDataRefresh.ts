
import { useState, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { refreshMarketData as refreshAPI } from "@/utils/market-data/api";
import { marketLogger } from "./utils";
import type { MarketDataType } from "@/utils/market-data/types";
import type { RefreshableMarketDataType, MarketDataRefreshOptions, UseMarketDataRefreshReturn } from "./types";

/**
 * Mapping from RefreshableMarketDataType to MarketDataType
 */
const dataTypeMapping: Record<RefreshableMarketDataType, MarketDataType> = {
  indices: 'indices',
  quotes: 'quote',
  news: 'news',
  candles: 'candles',
  search: 'search'
};

/**
 * Hook to refresh market data
 * 
 * @example
 * const { refreshMarketData, refreshAll } = useMarketDataRefresh();
 * 
 * // Refresh indices
 * refreshMarketData('indices');
 * 
 * // Refresh a specific symbol
 * refreshMarketData('quotes', ['AAPL']);
 * 
 * // Refresh all data
 * refreshAll();
 */
export function useMarketDataRefresh(): UseMarketDataRefreshReturn {
  const queryClient = useQueryClient();
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  /**
   * Refresh a specific type of market data
   */
  const refreshMarketData = useCallback((
    dataType: RefreshableMarketDataType,
    additionalParams?: string[],
    options?: MarketDataRefreshOptions
  ) => {
    const { clearCache = false } = options || {};
    
    marketLogger.info(`Refreshing ${dataType} data${additionalParams ? ` for ${additionalParams.join(', ')}` : ''}`);
    
    // Map the dataType to the appropriate query key pattern
    let queryKeysToInvalidate: string[] = [];
    switch (dataType) {
      case 'indices':
        queryKeysToInvalidate = ['indices'];
        break;
      case 'quotes':
        if (additionalParams && additionalParams.length > 0) {
          // Invalidate specific quotes
          additionalParams.forEach(symbol => {
            queryClient.invalidateQueries({ queryKey: ['quote', symbol] });
          });
        } else {
          // Invalidate all quotes
          queryClient.invalidateQueries({ queryKey: ['quote'] });
        }
        break;
      case 'news':
        queryKeysToInvalidate = ['market-news', 'company-news'];
        break;
      case 'candles':
        if (additionalParams && additionalParams.length > 0) {
          // Invalidate specific candle data
          additionalParams.forEach(symbol => {
            queryClient.invalidateQueries({ queryKey: ['candle-data', symbol] });
          });
        } else {
          // Invalidate all candle data
          queryClient.invalidateQueries({ queryKey: ['candle-data'] });
        }
        break;
      case 'search':
        queryKeysToInvalidate = ['symbol-search'];
        break;
    }
    
    // Invalidate the query keys
    queryKeysToInvalidate.forEach(key => {
      queryClient.invalidateQueries({ queryKey: [key] });
    });
    
    // If we want to clear server cache, trigger an API refresh
    if (clearCache && dataType !== 'search') {
      const apiType = dataTypeMapping[dataType];
      const symbol = additionalParams?.[0];
      
      refreshAPI([{ type: apiType, symbol }]);
    }
  }, [queryClient]);
  
  /**
   * Refresh all market data
   */
  const refreshAll = useCallback((clearCache: boolean = false) => {
    marketLogger.info(`Refreshing all market data${clearCache ? ' with cache clearing' : ''}`);
    setIsRefreshing(true);
    
    // Invalidate all relevant queries
    refreshMarketData('indices');
    refreshMarketData('quotes');
    refreshMarketData('news');
    refreshMarketData('candles');
    refreshMarketData('search');
    
    // Map RefreshableMarketDataType to MarketDataType for API call
    const refreshTypes: Array<{ type: MarketDataType; symbol?: string }> = [
      { type: 'indices' },
      { type: 'quote' },
      { type: 'news' }
    ];
    
    // Also trigger API refresh (to clear server cache if needed)
    if (clearCache) {
      refreshAPI(refreshTypes);
    }
    
    setIsRefreshing(false);
    
    return true;
  }, [refreshMarketData]);
  
  return {
    refreshMarketData,
    refreshAll
  };
}
