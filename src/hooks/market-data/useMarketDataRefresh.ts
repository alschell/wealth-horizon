
import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { refreshMarketData } from '@/utils/market-data/api';
import { RefreshableMarketDataType, MarketDataRefreshOptions, UseMarketDataRefreshReturn } from './types';
import { toast } from "@/hooks/use-toast";

/**
 * Hook for refreshing market data
 * 
 * @example
 * const { refreshMarketData, refreshAll } = useMarketDataRefresh();
 * // Later in your component
 * refreshMarketData('indices');
 */
export function useMarketDataRefresh(): UseMarketDataRefreshReturn {
  const queryClient = useQueryClient();

  /**
   * Refresh a specific type of market data
   */
  const refreshData = useCallback(
    async (dataType: RefreshableMarketDataType, additionalParams: string[] = []) => {
      try {
        toast({
          title: 'Refreshing Data',
          description: `Updating ${dataType} data...`,
        });

        // Create data type configs for the refresh function
        const refreshTypes = [];

        switch (dataType) {
          case 'indices':
            refreshTypes.push({ type: 'indices' });
            break;
          case 'quotes':
            refreshTypes.push({ 
              type: 'quote', 
              symbol: additionalParams?.[0] 
            });
            break;
          case 'news':
            refreshTypes.push({ type: 'news' });
            break;
          case 'candles':
            refreshTypes.push({ 
              type: 'candles', 
              symbol: additionalParams?.[0] 
            });
            break;
          default:
            // No action for unsupported types
            break;
        }

        // Refresh the data
        if (refreshTypes.length > 0) {
          await refreshMarketData(refreshTypes);
        }

        // Invalidate related queries
        switch (dataType) {
          case 'indices':
            queryClient.invalidateQueries({ queryKey: ['indices'] });
            break;
          case 'quotes':
            const symbol = additionalParams?.[0];
            if (symbol) {
              queryClient.invalidateQueries({ queryKey: ['quote', symbol] });
            }
            break;
          case 'news':
            queryClient.invalidateQueries({ queryKey: ['market-news'] });
            queryClient.invalidateQueries({ queryKey: ['company-news'] });
            break;
          case 'candles':
            const candleSymbol = additionalParams?.[0];
            if (candleSymbol) {
              queryClient.invalidateQueries({ queryKey: ['candle-data', candleSymbol] });
            }
            break;
          case 'search':
            queryClient.invalidateQueries({ queryKey: ['symbol-search'] });
            break;
        }

        toast({
          title: 'Data Refreshed',
          description: `${dataType.charAt(0).toUpperCase() + dataType.slice(1)} data has been updated.`,
        });
      } catch (error) {
        toast({
          title: 'Refresh Failed',
          description: `Could not refresh ${dataType} data. Please try again.`,
          variant: 'destructive',
        });
        console.error(`Error refreshing ${dataType} data:`, error);
      }
    },
    [queryClient]
  );

  /**
   * Refresh all market data
   */
  const refreshAll = useCallback(
    async (clearCache = false) => {
      toast({
        title: 'Refreshing All Data',
        description: 'Updating market data...',
      });

      try {
        const types: RefreshableMarketDataType[] = ['indices', 'news', 'quotes', 'candles', 'search'];
        
        // Refresh each type of data
        await Promise.allSettled(types.map(type => refreshData(type)));

        if (clearCache) {
          queryClient.clear();
        }

        toast({
          title: 'All Data Refreshed',
          description: 'Market data has been successfully updated.',
        });
      } catch (error) {
        toast({
          title: 'Refresh Failed',
          description: 'Failed to refresh market data. Please try again.',
          variant: 'destructive',
        });
        console.error('Error in refreshAll:', error);
      }
    },
    [queryClient, refreshData]
  );

  return {
    refreshMarketData: refreshData,
    refreshAll
  };
}
