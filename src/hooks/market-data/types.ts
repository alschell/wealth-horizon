
import type { 
  Quote, 
  NewsItem, 
  SymbolSearchResult, 
  CandleData, 
  IndexData,
  MarketDataType
} from "@/utils/market-data/types";

/**
 * Options for market data refresh operations
 */
export interface MarketDataRefreshOptions {
  /** Symbol to refresh data for (if applicable) */
  symbol?: string;
  /** Whether to show a toast notification on refresh completion */
  showToast?: boolean;
}

/**
 * Supported market data types for refresh operations
 */
export type RefreshableMarketDataType = 'quote' | 'indices' | 'news' | 'candles';

/**
 * Configuration for a market data refresh operation
 */
export interface MarketDataRefreshConfig {
  /** Type of market data to refresh */
  type: MarketDataType;
  /** Symbol to refresh data for (if applicable) */
  symbol?: string;
  /** Additional parameters for the refresh operation */
  params?: Record<string, any>;
}

/**
 * Result of a market data refresh operation
 */
export interface MarketDataRefreshResult {
  /** Whether the refresh was successful */
  success: boolean;
  /** Error message if the refresh failed */
  error?: string;
}
