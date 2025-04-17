
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

// Mock data for news when API fails
export const MOCK_NEWS_DATA = [
  {
    category: "general",
    datetime: 1681720800,
    headline: "Markets rally as inflation shows signs of cooling",
    id: 101,
    image: "https://example.com/image1.jpg",
    related: "SPY,QQQ,DIA",
    source: "Financial Times",
    summary: "Global markets surged today as new data indicated inflation pressures may be easing, potentially giving central banks room to slow interest rate hikes in coming months.",
    url: "https://example.com/news1"
  },
  {
    category: "forex",
    datetime: 1681734300,
    headline: "Dollar weakens against major currencies following Fed comments",
    id: 102,
    image: "https://example.com/image2.jpg",
    related: "EURUSD,GBPUSD,USDJPY",
    source: "Reuters",
    summary: "The U.S. dollar fell against a basket of major currencies after Federal Reserve officials suggested they might be nearing the end of their tightening cycle.",
    url: "https://example.com/news2"
  },
  {
    category: "crypto",
    datetime: 1681747800,
    headline: "Bitcoin breaks above $30,000 for first time since June",
    id: 103,
    image: "https://example.com/image3.jpg",
    related: "BTC,ETH,COIN",
    source: "CoinDesk",
    summary: "Bitcoin surpassed the $30,000 mark for the first time in over six months, as investor confidence in the cryptocurrency sector appears to be recovering.",
    url: "https://example.com/news3"
  },
  {
    category: "general",
    datetime: 1681761320,
    headline: "Tech stocks lead market gains as earnings season kicks off",
    id: 104,
    image: "https://example.com/image4.jpg",
    related: "AAPL,MSFT,GOOGL",
    source: "CNBC",
    summary: "Technology stocks led market gains today as investors await quarterly earnings reports from major tech companies later this week.",
    url: "https://example.com/news4"
  },
  {
    category: "merger",
    datetime: 1681774800,
    headline: "Major pharmaceutical merger announced in $45 billion deal",
    id: 105,
    image: "https://example.com/image5.jpg",
    related: "PFE,MRK,JNJ",
    source: "Wall Street Journal",
    summary: "Two of the world's largest pharmaceutical companies announced plans to merge in a deal valued at approximately $45 billion, creating a new global healthcare leader.",
    url: "https://example.com/news5"
  },
  {
    category: "general",
    datetime: 1681788300,
    headline: "Fed minutes reveal divided opinions on future rate path",
    id: 106,
    image: "https://example.com/image6.jpg",
    related: "SPY,TLT,UUP",
    source: "Bloomberg",
    summary: "Minutes from the latest Federal Reserve meeting showed officials were divided on the future path of interest rates, with some advocating for a pause in hikes.",
    url: "https://example.com/news6"
  },
  {
    category: "general",
    datetime: 1681801800,
    headline: "Oil prices climb on supply concerns and Middle East tensions",
    id: 107,
    image: "https://example.com/image7.jpg",
    related: "USO,XLE,CL",
    source: "Energy Daily",
    summary: "Crude oil prices rose sharply today on growing concerns about global supply constraints and escalating geopolitical tensions in the Middle East.",
    url: "https://example.com/news7"
  },
  {
    category: "general",
    datetime: 1681815300,
    headline: "Retail sales data exceeds analysts' expectations",
    id: 108,
    image: "https://example.com/image8.jpg",
    related: "XRT,WMT,TGT",
    source: "Market Watch",
    summary: "U.S. retail sales figures for the previous month came in stronger than expected, suggesting consumer spending remains resilient despite economic headwinds.",
    url: "https://example.com/news8"
  },
  {
    category: "general",
    datetime: 1681828800,
    headline: "New housing starts fall to three-year low",
    id: 109,
    image: "https://example.com/image9.jpg",
    related: "XHB,DHI,LEN",
    source: "Housing Wire",
    summary: "New housing construction in the U.S. fell to its lowest level in three years, highlighting challenges in the real estate market amid higher interest rates.",
    url: "https://example.com/news9"
  },
  {
    category: "general",
    datetime: 1681842300,
    headline: "Central bank announces new measures to support financial stability",
    id: 110,
    image: "https://example.com/image10.jpg",
    related: "XLF,JPM,BAC",
    source: "Financial Post",
    summary: "The central bank unveiled a set of new measures designed to enhance liquidity and support financial stability following recent market volatility.",
    url: "https://example.com/news10"
  }
];
