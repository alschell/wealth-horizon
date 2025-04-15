
import { ReactNode } from 'react';

/**
 * Available market data types
 */
export type MarketDataType = 'quote' | 'index' | 'news' | 'chart' | 'performance';

/**
 * Market quote data
 */
export interface Quote {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap?: number;
  volume?: number;
  open?: number;
  high?: number;
  low?: number;
  previousClose?: number;
  exchange?: string;
  currency?: string;
  lastUpdated: Date | string;
}

/**
 * News item structure
 */
export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  publishedAt: Date | string;
  category?: string;
  image?: string;
  relatedSymbols?: string[];
  sentiment?: 'positive' | 'negative' | 'neutral';
}

/**
 * Index data structure
 */
export interface IndexData {
  id: string;
  name: string;
  value: string | number;
  change: number;
  changePercent: number;
  region: string;
  currency?: string;
  lastUpdated: Date | string;
}

/**
 * Symbol search result
 */
export interface SymbolSearchResult {
  symbol: string;
  name: string;
  type: 'stock' | 'etf' | 'index' | 'forex' | 'crypto' | 'other';
  exchange?: string;
  region?: string;
}

/**
 * Candle/OHLC data point
 */
export interface CandleData {
  date: Date | string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

/**
 * Market data refresh status
 */
export interface MarketDataRefreshStatus {
  isRefreshing: boolean;
  lastRefreshed?: Date | string;
  error?: string;
  success?: boolean;
}

/**
 * Market watchlist item
 */
export interface WatchlistItem {
  id: string;
  symbol: string;
  name: string;
  addedAt: Date | string;
  notes?: string;
  alerts?: {
    priceAbove?: number;
    priceBelow?: number;
    changeAbove?: number;
    changeBelow?: number;
  };
}

/**
 * Market widget configuration
 */
export interface MarketWidgetConfig {
  id: string;
  type: 'quote' | 'chart' | 'news' | 'watchlist' | 'indices';
  title: string;
  icon?: ReactNode;
  defaultVisible: boolean;
  settings?: Record<string, any>;
}
