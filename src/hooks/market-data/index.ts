
// Re-export all market-data hooks
export * from './useQuote';
export * from './useIndices';
export * from './useCandleData';
export * from './useNewsHooks';
export * from './useSymbolSearch';
export * from './useMarketDataRefresh';
export * from './utils';

// Export helper functions
export const formatQuote = (quote: any) => {
  return {
    price: quote?.c || 0,
    change: quote?.d || 0,
    percentChange: quote?.dp || 0,
    high: quote?.h || 0,
    low: quote?.l || 0,
    open: quote?.o || 0,
    previousClose: quote?.pc || 0,
    timestamp: quote?.t ? new Date(quote.t * 1000).toISOString() : new Date().toISOString()
  };
};

// Market data refresh function for legacy code support
// This will be deprecated in favor of the useMarketDataRefresh hook
export const refreshMarketData = (queryClient: any) => {
  queryClient.invalidateQueries({ queryKey: ['indices'] });
  queryClient.invalidateQueries({ queryKey: ['market-news'] });
  queryClient.invalidateQueries({ queryKey: ['company-news'] });
  queryClient.invalidateQueries({ queryKey: ['quote'] });
  queryClient.invalidateQueries({ queryKey: ['candle-data'] });
  queryClient.invalidateQueries({ queryKey: ['symbol-search'] });
};
