
import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { marketLogger } from "./utils";
import { clearAllMarketCaches } from "@/utils/market-data/cache";
import type { RefreshableMarketDataType, UseMarketDataRefreshReturn } from "./types";

/**
 * Hook for refreshing market data across the application
 * 
 * @example
 * const { refreshMarketData, refreshAll } = useMarketDataRefresh();
 * 
 * // Refresh specific data type
 * refreshMarketData('indices');
 * 
 * // Refresh all market data
 * refreshAll();
 */
export function useMarketDataRefresh(): UseMarketDataRefreshReturn {
  const queryClient = useQueryClient();
  
  /**
   * Refresh specific market data type
   * @param dataType Type of market data to refresh (e.g., 'indices', 'news', 'quotes')
   * @param additionalParams Additional parameters for the query key
   */
  const refreshMarketData = useCallback((
    dataType: RefreshableMarketDataType, 
    additionalParams?: string[]
  ) => {
    const queryKey = additionalParams ? [dataType, ...additionalParams] : [dataType];
    
    marketLogger.info(`Manually refreshing market data: ${dataType}`);
    
    // Map the dataType to the correct query key if needed
    let actualQueryKey = queryKey;
    if (dataType === 'news') {
      actualQueryKey = ['market-news'];
    }
    
    queryClient.invalidateQueries({ queryKey: actualQueryKey });
    
    toast.info(`Refreshing ${dataType} data`);
  }, [queryClient]);
  
  /**
   * Refresh all market data
   * @param clearCache Whether to clear cache before refreshing
   */
  const refreshAll = useCallback((clearCache: boolean = false) => {
    marketLogger.info("Refreshing all market data");
    
    if (clearCache) {
      clearAllMarketCaches();
    }
    
    // Invalidate all market data queries
    queryClient.invalidateQueries({ queryKey: ['indices'] });
    queryClient.invalidateQueries({ queryKey: ['market-news'] });
    queryClient.invalidateQueries({ queryKey: ['company-news'] });
    queryClient.invalidateQueries({ queryKey: ['quote'] });
    queryClient.invalidateQueries({ queryKey: ['candle-data'] });
    queryClient.invalidateQueries({ queryKey: ['symbol-search'] });
    
    toast.info("Refreshing all market data");
  }, [queryClient]);
  
  return {
    refreshMarketData,
    refreshAll
  };
}
