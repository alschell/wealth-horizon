
import { useState, useEffect, useCallback } from "react";
import { 
  getQuote, 
  getMarketNews, 
  getCompanyNews, 
  searchSymbols, 
  getIndices,
  getCandleData,
  formatQuote 
} from "@/utils/market-data/api";
import type { 
  Quote, 
  NewsItem, 
  SymbolSearchResult, 
  CandleData, 
  IndexData 
} from "@/utils/market-data/types";

/**
 * Hook for fetching stock quotes
 */
export function useQuote(symbol: string) {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [formattedQuote, setFormattedQuote] = useState<Record<string, string> | null>(null);

  const fetchQuote = useCallback(async () => {
    if (!symbol) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await getQuote(symbol);
      setQuote(data);
      setFormattedQuote(formatQuote(data));
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, [symbol]);

  useEffect(() => {
    fetchQuote();
    
    // Refresh every 60 seconds for real-time data
    const intervalId = setInterval(fetchQuote, 60000);
    return () => clearInterval(intervalId);
  }, [fetchQuote]);

  return { quote, formattedQuote, loading, error, refetch: fetchQuote };
}

/**
 * Hook for fetching market news
 */
export function useMarketNews(category: string = "general", count: number = 10) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getMarketNews(category, count);
      setNews(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, [category, count]);

  useEffect(() => {
    fetchNews();
    
    // Refresh news every 5 minutes
    const intervalId = setInterval(fetchNews, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [fetchNews]);

  return { news, loading, error, refetch: fetchNews };
}

/**
 * Hook for fetching company-specific news
 */
export function useCompanyNews(
  symbol: string,
  from: string = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  to: string = new Date().toISOString().split("T")[0]
) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchNews = useCallback(async () => {
    if (!symbol) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await getCompanyNews(symbol, from, to);
      setNews(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, [symbol, from, to]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return { news, loading, error, refetch: fetchNews };
}

/**
 * Hook for searching symbols
 */
export function useSymbolSearch() {
  const [results, setResults] = useState<SymbolSearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const search = useCallback(async (query: string) => {
    if (!query || query.length < 2) {
      setResults(null);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await searchSymbols(query);
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, []);

  return { results, loading, error, search };
}

/**
 * Hook for fetching major market indices
 */
export function useIndices(customSymbols?: string[]) {
  const [indices, setIndices] = useState<IndexData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchIndices = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getIndices(customSymbols);
      setIndices(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, [customSymbols?.join(',')]);

  useEffect(() => {
    fetchIndices();
    
    // Refresh indices every minute
    const intervalId = setInterval(fetchIndices, 60000);
    return () => clearInterval(intervalId);
  }, [fetchIndices]);

  return { indices, loading, error, refetch: fetchIndices };
}

/**
 * Hook for fetching candle data for charts
 */
export function useCandleData(
  symbol: string,
  resolution: string = "D",
  from: number = Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60,
  to: number = Math.floor(Date.now() / 1000)
) {
  const [data, setData] = useState<CandleData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchCandleData = useCallback(async () => {
    if (!symbol) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const candleData = await getCandleData(symbol, resolution, from, to);
      setData(candleData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, [symbol, resolution, from, to]);

  useEffect(() => {
    fetchCandleData();
  }, [fetchCandleData]);

  return { data, loading, error, refetch: fetchCandleData };
}
