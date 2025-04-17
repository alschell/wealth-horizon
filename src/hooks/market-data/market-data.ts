
// This file exports all market data hooks

// Export hooks
export { useQuote } from './useQuote';
export { useMarketNews, useCompanyNews } from './useNewsHooks';
export { useSymbolSearch } from './useSymbolSearch';
export { useIndices } from './useIndices';
export { useCandleData } from './useCandleData';
export { useMarketDataRefresh } from './useMarketDataRefresh';

// Export utilities
export { formatQuote } from '@/utils/market-data/api';

// Import the MarketDataType for proper typing
import type { MarketDataType } from '@/utils/market-data/types';

// Export refresh function for direct use outside hooks
export const refreshMarketData = (types: Array<{ type: MarketDataType; symbol?: string; params?: Record<string, any> }>) => {
  // This is a dummy function that calls the API function
  // The actual implementation is in the individual hook
  return import('@/utils/market-data/api').then(({ refreshMarketData }) => {
    return refreshMarketData(types);
  });
};
