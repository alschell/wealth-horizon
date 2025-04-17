
import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { marketLogger } from "./utils";
import { clearAllMarketCaches } from "@/utils/market-data/cache";
import type { RefreshableMarketDataType } from "./types";

/**
 * Hook for refreshing market data across the application
 * 
 * @example
 * const refreshMarketData = useMarketDataRefresh();
 * 
 * // Refresh specific data types
 * refreshMarketData(['indices', 'quote'], { symbol: 'AAPL' });
 */
export function useMarketDataRefresh() {
  const queryClient = useQueryClient();
  
  /**
   * Refresh specific market data types
   * @param types Array of data types to refresh
   * @param options Additional options like symbol
   * @returns Promise that resolves to success boolean
   */
  const refreshMarketData = useCallback(async (
    types: RefreshableMarketDataType[],
    options: { symbol?: string; showToast?: boolean } = {}
  ): Promise<boolean> => {
    try {
      const { symbol, showToast = true } = options;
      
      marketLogger.info(`Manually refreshing market data: ${types.join(', ')}${symbol ? ` for ${symbol}` : ''}`);
      
      // Invalidate queries based on types
      types.forEach(type => {
        switch(type) {
          case 'quote':
            queryClient.invalidateQueries({ queryKey: ['quote', symbol].filter(Boolean) });
            break;
          case 'indices':
            queryClient.invalidateQueries({ queryKey: ['indices'] });
            break;
          case 'news':
            queryClient.invalidateQueries({ queryKey: ['market-news'] });
            queryClient.invalidateQueries({ queryKey: ['company-news', symbol].filter(Boolean) });
            break;
          case 'candles':
            queryClient.invalidateQueries({ queryKey: ['candle-data', symbol].filter(Boolean) });
            break;
        }
      });
      
      if (showToast) {
        toast.info(`Refreshing ${types.length > 1 ? 'market data' : types[0]} data`);
      }
      
      return true;
    } catch (error) {
      console.error("Error refreshing market data:", error);
      return false;
    }
  }, [queryClient]);
  
  /**
   * Refresh all market data
   * @param clearCache Whether to clear cache before refreshing
   * @returns Promise that resolves to success boolean
   */
  const refreshAll = useCallback(async (clearCache: boolean = false): Promise<boolean> => {
    try {
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
      
      return true;
    } catch (error) {
      console.error("Error refreshing all market data:", error);
      return false;
    }
  }, [queryClient]);
  
  return refreshMarketData;
}
