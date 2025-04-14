
// Types for financial data

export interface Quote {
  c: number;  // Current price
  d: number;  // Change
  dp: number; // Percent change
  h: number;  // High price of the day
  l: number;  // Low price of the day
  o: number;  // Open price of the day
  pc: number; // Previous close price
  t: number;  // Timestamp
}

export interface NewsItem {
  category: string;
  datetime: number;
  headline: string;
  id: number;
  image: string;
  related: string;
  source: string;
  summary: string;
  url: string;
}

export interface SymbolSearchResult {
  count: number;
  result: Array<{
    description: string;
    displaySymbol: string;
    symbol: string;
    type: string;
  }>;
}

export interface CandleData {
  c: number[]; // List of close prices
  h: number[]; // List of high prices
  l: number[]; // List of low prices
  o: number[]; // List of open prices
  s: string;   // Status of the response
  t: number[]; // List of timestamps
  v: number[]; // List of volume data
}

export interface IndexData {
  symbol: string;
  data: Quote;
}

export type MarketDataType = 'quote' | 'news' | 'search' | 'indices' | 'candles';
