
import { refreshMarketData } from "@/utils/market-data/api";
import { marketLogger } from "./useMarketLogger";

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

// Re-export for convenience
export { refreshMarketData };
