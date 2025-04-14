
import { supabase } from "@/integrations/supabase/client";
import type { 
  Quote, 
  NewsItem, 
  SymbolSearchResult, 
  CandleData, 
  IndexData,
  MarketDataType
} from "./types";

/**
 * Fetches market data from the Finnhub edge function
 */
async function fetchMarketData<T>(
  endpoint: MarketDataType,
  params: Record<string, any>
): Promise<T> {
  try {
    const { data, error } = await supabase.functions.invoke("finnhub", {
      body: { 
        ...params,
      },
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      path: endpoint,
    });

    if (error) {
      console.error(`Error fetching ${endpoint} data:`, error);
      throw new Error(`Failed to fetch ${endpoint} data: ${error.message}`);
    }

    return data as T;
  } catch (error) {
    console.error(`Error in fetchMarketData for ${endpoint}:`, error);
    throw error;
  }
}

/**
 * Gets a stock quote for a symbol
 */
export async function getQuote(symbol: string): Promise<Quote> {
  return fetchMarketData<Quote>("quote", { symbol });
}

/**
 * Searches for symbols
 */
export async function searchSymbols(query: string): Promise<SymbolSearchResult> {
  return fetchMarketData<SymbolSearchResult>("search", { query });
}

/**
 * Gets market news
 */
export async function getMarketNews(
  category: string = "general",
  count: number = 10
): Promise<NewsItem[]> {
  const result = await fetchMarketData<NewsItem[]>("news", { category });
  return result.slice(0, count);
}

/**
 * Gets company news
 */
export async function getCompanyNews(
  symbol: string,
  from: string = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // 30 days ago
  to: string = new Date().toISOString().split("T")[0] // today
): Promise<NewsItem[]> {
  return fetchMarketData<NewsItem[]>("news", { symbol, from, to });
}

/**
 * Gets indices data
 */
export async function getIndices(symbols?: string[]): Promise<IndexData[]> {
  return fetchMarketData<IndexData[]>("indices", { symbols });
}

/**
 * Gets candle data for charts
 */
export async function getCandleData(
  symbol: string,
  resolution: string = "D", // D = Daily
  from: number = Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60, // 30 days ago
  to: number = Math.floor(Date.now() / 1000) // now
): Promise<CandleData> {
  return fetchMarketData<CandleData>("candles", { symbol, resolution, from, to });
}

/**
 * Formats a quote into a readable format
 */
export function formatQuote(quote: Quote) {
  return {
    price: quote.c.toFixed(2),
    change: quote.d.toFixed(2),
    percentChange: quote.dp.toFixed(2),
    high: quote.h.toFixed(2),
    low: quote.l.toFixed(2),
    open: quote.o.toFixed(2),
    previousClose: quote.pc.toFixed(2),
    timestamp: new Date(quote.t * 1000).toLocaleDateString()
  };
}
