
import { supabase } from "@/integrations/supabase/client";
import type { 
  Quote, 
  NewsItem, 
  SymbolSearchResult, 
  CandleData, 
  IndexData,
  MarketDataType
} from "./types";
import { toast } from "@/hooks/use-toast";

/**
 * Options for market data fetching
 */
interface MarketDataOptions {
  /** Whether to bypass cache */
  skipCache?: boolean;
  /** Number of retries on failure */
  retries?: number;
  /** Callback for handling errors */
  onError?: (error: Error) => void;
  /** Whether to show error toasts */
  showErrorToast?: boolean;
}

/**
 * Fetches market data from the Finnhub edge function with retry and error handling
 */
async function fetchMarketData<T>(
  endpoint: MarketDataType,
  params: Record<string, any>,
  options: MarketDataOptions = {}
): Promise<T> {
  const { 
    skipCache = false, 
    retries = 2,
    onError,
    showErrorToast = true
  } = options;

  let attempts = 0;
  let lastError: Error;
  
  while (attempts <= retries) {
    try {
      attempts++;
      
      const { data, error } = await supabase.functions.invoke("finnhub", {
        body: { 
          endpoint,
          ...params,
          skipCache: skipCache && attempts === 1 // Only skip cache on first attempt
        },
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (error) {
        // Rethrow as Error for consistent error handling
        throw new Error(`Failed to fetch ${endpoint} data: ${error.message}`);
      }

      if (!data && endpoint !== 'news') {
        // Some endpoints might return empty arrays which are valid
        throw new Error(`No data returned for ${endpoint}`);
      }

      return data as T;
    } catch (error) {
      console.error(`Error in fetchMarketData for ${endpoint} (attempt ${attempts}/${retries + 1}):`, error);
      lastError = error instanceof Error ? error : new Error(String(error));
      
      // If we've reached max retries, handle the error
      if (attempts > retries) {
        // Call onError callback if provided
        if (onError) {
          onError(lastError);
        }
        
        // Show error toast if enabled
        if (showErrorToast) {
          toast({
            title: "Market data error",
            description: `Could not load ${endpoint} data. ${lastError.message}`,
            variant: "destructive"
          });
        }
        
        throw lastError;
      }
      
      // Wait before retrying (exponential backoff)
      const delayMs = Math.min(1000 * Math.pow(2, attempts - 1), 8000);
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
  
  // This shouldn't be reached due to the throw in the loop, but TypeScript needs it
  throw lastError!;
}

/**
 * Gets a stock quote for a symbol
 */
export async function getQuote(
  symbol: string, 
  options: MarketDataOptions = {}
): Promise<Quote> {
  return fetchMarketData<Quote>("quote", { symbol }, options);
}

/**
 * Searches for symbols
 */
export async function searchSymbols(
  query: string,
  options: MarketDataOptions = {}
): Promise<SymbolSearchResult> {
  return fetchMarketData<SymbolSearchResult>("search", { query }, options);
}

/**
 * Gets market news
 */
export async function getMarketNews(
  category: string = "general",
  count: number = 10,
  options: MarketDataOptions = {}
): Promise<NewsItem[]> {
  const result = await fetchMarketData<NewsItem[]>(
    "news", 
    { category }, 
    options
  );
  return result.slice(0, count);
}

/**
 * Gets company news
 */
export async function getCompanyNews(
  symbol: string,
  from: string = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // 30 days ago
  to: string = new Date().toISOString().split("T")[0], // today
  options: MarketDataOptions = {}
): Promise<NewsItem[]> {
  return fetchMarketData<NewsItem[]>(
    "news", 
    { symbol, from, to }, 
    options
  );
}

/**
 * Gets indices data
 */
export async function getIndices(
  symbols?: string[],
  options: MarketDataOptions = {}
): Promise<IndexData[]> {
  return fetchMarketData<IndexData[]>(
    "indices", 
    { symbols }, 
    options
  );
}

/**
 * Gets candle data for charts
 */
export async function getCandleData(
  symbol: string,
  resolution: string = "D", // D = Daily
  from: number = Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60, // 30 days ago
  to: number = Math.floor(Date.now() / 1000), // now
  options: MarketDataOptions = {}
): Promise<CandleData> {
  return fetchMarketData<CandleData>(
    "candles", 
    { symbol, resolution, from, to }, 
    options
  );
}

/**
 * Formats a quote into a readable format
 */
export function formatQuote(quote: Quote) {
  if (!quote) return null;
  
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

/**
 * Refreshes market data for a specific set of items
 */
export async function refreshMarketData(
  types: { type: MarketDataType; symbol?: string; params?: Record<string, any> }[]
): Promise<void> {
  // Execute requests in parallel
  await Promise.allSettled(
    types.map(({ type, symbol, params = {} }) => {
      switch (type) {
        case "quote":
          return symbol ? getQuote(symbol, { skipCache: true }) : Promise.resolve();
        case "indices":
          return getIndices(undefined, { skipCache: true });
        case "news":
          return getMarketNews("general", 10, { skipCache: true });
        case "candles":
          return symbol
            ? getCandleData(symbol, "D", undefined, undefined, { skipCache: true })
            : Promise.resolve();
        default:
          return Promise.resolve();
      }
    })
  );
}
