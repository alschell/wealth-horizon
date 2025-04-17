
/**
 * Types for market data hooks
 */

import type { Quote, NewsItem, IndexData, CandleData, SymbolSearchResult } from "@/utils/market-data/types";

export type RefreshableMarketDataType = 'indices' | 'news' | 'quotes' | 'candles' | 'search';

export interface MarketDataRefreshOptions {
  symbol?: string;
  clearCache?: boolean;
}

export interface UseMarketDataRefreshReturn {
  refreshMarketData: (dataType: RefreshableMarketDataType, additionalParams?: string[]) => Promise<void>;
  refreshAll: (clearCache?: boolean) => Promise<void>;
}

export interface FormattedQuote {
  price: string;
  change: string;
  percentChange: string;
  high: string;
  low: string;
  open: string;
  previousClose: string;
  timestamp: string;
}
