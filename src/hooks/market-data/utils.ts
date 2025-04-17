
import { QueryClient } from "@tanstack/react-query";
import { Logger } from "@/utils/logger";

// Create a dedicated logger for market data operations
export const marketLogger = Logger.createLogger("MarketData");

// Default query configuration for all market data queries
export const DEFAULT_QUERY_CONFIG = {
  staleTime: 5 * 60 * 1000, // 5 minutes
  refetchOnWindowFocus: true,
  retry: 1,
};

// Create a query client for market data
export const marketQueryClient = new QueryClient({
  defaultOptions: {
    queries: DEFAULT_QUERY_CONFIG,
  },
});

// Mock data for indices when API fails
export const MOCK_INDICES_DATA = [
  {
    id: "sp500",
    name: "S&P 500",
    symbol: "^GSPC",
    value: 5245.10,
    change: 0.65,
    percentChange: 0.65,
    region: "United States",
    exchange: "NYSE",
    description: "The Standard and Poor's 500 is a stock market index tracking the stock performance of 500 large US companies.",
    volume: 2500000
  },
  {
    id: "dow",
    name: "Dow Jones",
    symbol: "^DJI",
    value: 39125.24,
    change: 0.45,
    percentChange: 0.45,
    region: "United States",
    exchange: "NYSE",
    description: "The Dow Jones Industrial Average is a stock market index of 30 prominent companies listed on stock exchanges in the US.",
    volume: 1800000
  },
  {
    id: "nasdaq",
    name: "NASDAQ Composite",
    symbol: "^IXIC",
    value: 16345.98,
    change: 1.25,
    percentChange: 1.25,
    region: "United States",
    exchange: "NASDAQ",
    description: "The Nasdaq Composite is a stock market index of the common stocks listed on the Nasdaq stock exchange.",
    volume: 3100000
  },
  {
    id: "ftse",
    name: "FTSE 100",
    symbol: "^FTSE",
    value: 7754.80,
    change: -0.32,
    percentChange: -0.32,
    region: "United Kingdom",
    exchange: "LSE",
    description: "The Financial Times Stock Exchange 100 Index is a share index of the 100 companies with the highest market capitalization listed on the London Stock Exchange.",
    volume: 1200000
  },
  {
    id: "nikkei",
    name: "Nikkei 225",
    symbol: "^N225",
    value: 38200.45,
    change: 1.45,
    percentChange: 1.45,
    region: "Japan",
    exchange: "TSE",
    description: "The Nikkei 225 is a stock market index for the Tokyo Stock Exchange.",
    volume: 2100000
  }
];
