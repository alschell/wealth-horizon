
export { useQuote } from './useQuote';
export { formatQuote } from '@/utils/market-data/api';
export { useMarketNews, useCompanyNews } from './useNewsHooks';
export { useIndices } from './useIndices';
export { useCandleData } from './useCandleData';

// Symbol search hook (placeholder implementation)
export function useSymbolSearch(query: string) {
  return { data: [], isLoading: false, error: null };
}

// Market data refresh function (placeholder implementation)
export function refreshMarketData() {
  return Promise.resolve();
}

// Market data refresh hook (placeholder implementation)
export function useMarketDataRefresh() {
  return { refresh: refreshMarketData };
}
