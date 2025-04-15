
// Mock implementation of the market data API functions
// This file should be replaced with actual API implementations in a real application

/**
 * Format a quote object into a more user-friendly format
 */
export const formatQuote = (quoteData: any) => {
  if (!quoteData) return {};
  
  const { price = 0, change = 0, changePercent = 0 } = quoteData;
  
  return {
    formattedPrice: `$${price.toFixed(2)}`,
    formattedChange: change.toFixed(2),
    formattedChangePercent: `${(changePercent * 100).toFixed(2)}%`,
    isPositive: change >= 0,
  };
};

/**
 * Get a stock quote for a given symbol
 */
export const getQuote = async (symbol: string) => {
  console.log(`Fetching quote for ${symbol}`);
  // In a real app, this would call an actual API
  return {
    symbol,
    price: 150.25,
    change: 2.5,
    changePercent: 0.0166,
    volume: 28000000,
    marketCap: 2500000000000,
    peRatio: 28.5,
  };
};

/**
 * Get market news for a specific category
 */
export const getMarketNews = async (category: string = 'general', limit: number = 10) => {
  console.log(`Fetching ${limit} market news items for category: ${category}`);
  // In a real app, this would call an actual API
  return Array(limit).fill(0).map((_, i) => ({
    id: i + 1,
    title: `${category.charAt(0).toUpperCase() + category.slice(1)} Market News ${i + 1}`,
    summary: `This is a summary of ${category} market news item ${i + 1}`,
    source: 'Financial Times',
    publishedAt: new Date().toISOString(),
    url: `https://example.com/news/${i + 1}`,
  }));
};

/**
 * Get company-specific news for a given symbol
 */
export const getCompanyNews = async (symbol: string, limit: number = 10) => {
  console.log(`Fetching ${limit} news items for ${symbol}`);
  // In a real app, this would call an actual API
  return Array(limit).fill(0).map((_, i) => ({
    id: i + 1,
    title: `${symbol} News ${i + 1}`,
    summary: `This is a summary of news item ${i + 1} for ${symbol}`,
    source: 'CNBC',
    publishedAt: new Date().toISOString(),
    url: `https://example.com/${symbol.toLowerCase()}/news/${i + 1}`,
  }));
};

/**
 * Search for symbols based on a query string
 */
export const searchSymbols = async (query: string) => {
  console.log(`Searching symbols for "${query}"`);
  // In a real app, this would call an actual API
  return {
    result: [
      { symbol: 'AAPL', name: 'Apple Inc.', exchange: 'NASDAQ' },
      { symbol: 'AMZN', name: 'Amazon.com Inc.', exchange: 'NASDAQ' },
      { symbol: 'GOOG', name: 'Alphabet Inc.', exchange: 'NASDAQ' },
      { symbol: 'MSFT', name: 'Microsoft Corporation', exchange: 'NASDAQ' },
    ].filter(item => 
      item.symbol.toLowerCase().includes(query.toLowerCase()) || 
      item.name.toLowerCase().includes(query.toLowerCase())
    )
  };
};

/**
 * Get market indices data
 */
export const getIndices = async () => {
  console.log('Fetching market indices');
  // In a real app, this would call an actual API
  return [
    { symbol: '^GSPC', name: 'S&P 500', price: 4200.52, change: 12.34, changePercent: 0.0029 },
    { symbol: '^DJI', name: 'Dow Jones', price: 34567.89, change: -45.67, changePercent: -0.0013 },
    { symbol: '^IXIC', name: 'NASDAQ', price: 14123.45, change: 78.90, changePercent: 0.0056 },
    { symbol: '^FTSE', name: 'FTSE 100', price: 7654.32, change: -12.34, changePercent: -0.0016 },
  ];
};

/**
 * Get candle (OHLC) data for a specific symbol and timeframe
 */
export const getCandleData = async (symbol: string, timeframe: string = '1D') => {
  console.log(`Fetching ${timeframe} candle data for ${symbol}`);
  // Generate mock OHLC data for the last 30 periods
  const now = Math.floor(Date.now() / 1000);
  const periodSeconds = timeframe === '1D' ? 86400 : 
                        timeframe === '1H' ? 3600 : 
                        timeframe === '1W' ? 604800 : 86400;
  
  const timestamps = Array(30).fill(0).map((_, i) => now - (29 - i) * periodSeconds);
  const basePrice = 150.0;
  const volatility = 2.0;
  
  const opens = timestamps.map(() => basePrice + (Math.random() - 0.5) * volatility);
  const closes = opens.map(open => open + (Math.random() - 0.5) * volatility);
  const highs = opens.map((open, i) => Math.max(open, closes[i]) + Math.random() * volatility / 2);
  const lows = opens.map((open, i) => Math.min(open, closes[i]) - Math.random() * volatility / 2);
  const volumes = timestamps.map(() => Math.floor(Math.random() * 10000000) + 5000000);
  
  return {
    t: timestamps,
    o: opens,
    h: highs,
    l: lows,
    c: closes,
    v: volumes,
    s: 'ok'
  };
};

/**
 * Refresh all market data
 */
export const refreshMarketData = async () => {
  console.log('Refreshing all market data');
  // In a real app, this would invalidate caches or trigger new API calls
  return true;
};
