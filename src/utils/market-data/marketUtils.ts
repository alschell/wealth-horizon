
import type { Quote, NewsItem, CandleData, IndexData } from "./types";

/**
 * Calculate percent change between two values
 */
export function calculatePercentChange(current: number, previous: number): number {
  if (!previous) return 0;
  return ((current - previous) / previous) * 100;
}

/**
 * Determines the color to use based on price change
 * @returns Tailwind CSS class name for text color
 */
export function getPriceChangeColor(change: number): string {
  if (change > 0) return "text-green-600";
  if (change < 0) return "text-red-600";
  return "text-gray-600";
}

/**
 * Format a large number with abbreviations (K, M, B)
 */
export function formatLargeNumber(num: number): string {
  if (!num) return "0";
  
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + "B";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

/**
 * Format a date from timestamp
 */
export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString();
}

/**
 * Processes candle data for charts
 */
export function processCandleData(data: CandleData) {
  if (!data || data.s !== "ok" || !data.t) {
    return [];
  }

  return data.t.map((timestamp, i) => ({
    date: new Date(timestamp * 1000),
    open: data.o[i],
    high: data.h[i],
    low: data.l[i],
    close: data.c[i],
    volume: data.v[i],
  }));
}

/**
 * Formats news item data for display
 */
export function formatNewsItem(item: NewsItem) {
  return {
    ...item,
    formattedDate: new Date(item.datetime * 1000).toLocaleDateString(),
    shortSummary: item.summary.length > 120 
      ? item.summary.substring(0, 120) + "..." 
      : item.summary
  };
}

/**
 * Map common indices to human-readable names
 */
export const INDICES_MAP: Record<string, string> = {
  "^GSPC": "S&P 500",
  "^DJI": "Dow Jones",
  "^IXIC": "NASDAQ",
  "^FTSE": "FTSE 100",
  "^N225": "Nikkei 225",
  "^HSI": "Hang Seng",
  "^GDAXI": "DAX",
  "^FCHI": "CAC 40"
};

/**
 * Get a readable name for an index
 */
export function getIndexName(symbol: string): string {
  return INDICES_MAP[symbol] || symbol;
}

/**
 * Gets a friendly time-based description of a data refresh
 */
export function getLastUpdatedText(timestamp?: number): string {
  if (!timestamp) return "Not yet updated";
  
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  
  if (seconds < 60) return "Just now";
  if (seconds < 120) return "1 minute ago";
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 7200) return "1 hour ago";
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  
  return new Date(timestamp).toLocaleString();
}
