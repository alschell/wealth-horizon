
import type { Quote, SymbolSearchResult } from "@/utils/market-data/types";

// Mock quote data for testing
export const mockMarketData: Quote = {
  c: 150.25, // Current price
  d: 2.5,    // Change
  dp: 1.75,  // Percent change
  h: 152.0,  // High price of the day
  l: 148.5,  // Low price of the day
  o: 149.0,  // Open price of the day
  pc: 147.75, // Previous close price
  t: Math.floor(Date.now() / 1000) // Timestamp
};

// Mock search results for testing
export const mockSearchResults: SymbolSearchResult = {
  count: 2,
  result: [
    {
      description: "APPLE INC",
      displaySymbol: "AAPL",
      symbol: "AAPL",
      type: "Common Stock"
    },
    {
      description: "ALPHABET INC-CL A",
      displaySymbol: "GOOGL",
      symbol: "GOOGL",
      type: "Common Stock"
    }
  ]
};
