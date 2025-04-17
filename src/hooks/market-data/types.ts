
/**
 * Types for market data hooks
 */

export type RefreshableMarketDataType = 'indices' | 'news' | 'quotes' | 'candles' | 'search';

export interface MarketDataRefreshOptions {
  symbol?: string;
  clearCache?: boolean;
}

export interface UseMarketDataRefreshReturn {
  refreshMarketData: (dataType: RefreshableMarketDataType, additionalParams?: string[]) => void;
  refreshAll: (clearCache?: boolean) => void;
}
