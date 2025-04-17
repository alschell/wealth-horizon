
import { Logger } from '@/utils/logger';

export const marketLogger = Logger.createLogger('market-data');

export const DEFAULT_QUERY_CONFIG = {
  refetchOnWindowFocus: false,
  refetchOnMount: true,
  retry: 2,
  retryDelay: (attempt: number) => Math.min(1000 * 2 ** attempt, 30000),
};

// Mock data for indices when API fails
export const MOCK_INDICES_DATA = [
  { symbol: "^GSPC", name: "S&P 500", region: "AMER", country: "United States", exchange: "NYSE", value: 5245.10, change: 0.65, volume: 2.5 },
  { symbol: "^DJI", name: "Dow Jones", region: "AMER", country: "United States", exchange: "NYSE", value: 39125.24, change: 0.45, volume: 1.8 },
  { symbol: "^IXIC", name: "Nasdaq", region: "AMER", country: "United States", exchange: "NASDAQ", value: 16345.98, change: 1.25, volume: 3.1 },
  { symbol: "^FTSE", name: "FTSE 100", region: "EMEA", country: "United Kingdom", exchange: "LSE", value: 7754.80, change: -0.32, volume: 1.2 },
  { symbol: "^GDAXI", name: "DAX", region: "EMEA", country: "Germany", exchange: "XETRA", value: 17967.87, change: -0.15, volume: 1.5 },
  { symbol: "^FCHI", name: "CAC 40", region: "EMEA", country: "France", exchange: "Euronext", value: 7575.25, change: -0.28, volume: 1.3 },
  { symbol: "^N225", name: "Nikkei 225", region: "APAC", country: "Japan", exchange: "TSE", value: 38200.45, change: 1.45, volume: 2.1 },
  { symbol: "^HSI", name: "Hang Seng", region: "APAC", country: "Hong Kong", exchange: "HKEX", value: 17600.35, change: -0.85, volume: 1.7 },
  { symbol: "^BSESN", name: "BSE SENSEX", region: "APAC", country: "India", exchange: "BSE", value: 73750.80, change: 0.24, volume: 1.4 },
  { symbol: "^AXJO", name: "ASX 200", region: "APAC", country: "Australia", exchange: "ASX", value: 7754.90, change: 0.18, volume: 1.1 },
  { symbol: "^STOXX50E", name: "Euro Stoxx 50", region: "EMEA", country: "Europe", exchange: "STOXX", value: 4845.45, change: -0.12, volume: 1.6 },
  { symbol: "^IBEX", name: "IBEX 35", region: "EMEA", country: "Spain", exchange: "BME", value: 10257.30, change: -0.22, volume: 0.9 },
  { symbol: "^SSMI", name: "SMI", region: "EMEA", country: "Switzerland", exchange: "SIX", value: 11865.50, change: 0.05, volume: 0.8 },
  { symbol: "^BVSP", name: "Bovespa", region: "AMER", country: "Brazil", exchange: "B3", value: 127850.75, change: 1.15, volume: 1.9 },
  { symbol: "^MERV", name: "MERVAL", region: "AMER", country: "Argentina", exchange: "BCBA", value: 985450.25, change: 1.85, volume: 0.7 },
  { symbol: "^TA125", name: "TA-125", region: "EMEA", country: "Israel", exchange: "TASE", value: 2145.65, change: 0.25, volume: 0.5 },
  { symbol: "^KS11", name: "KOSPI", region: "APAC", country: "South Korea", exchange: "KRX", value: 2645.75, change: 0.95, volume: 1.3 },
  { symbol: "^TWII", name: "TAIEX", region: "APAC", country: "Taiwan", exchange: "TWSE", value: 20845.15, change: 1.35, volume: 1.5 },
  { symbol: "^GSPTSE", name: "S&P/TSX", region: "AMER", country: "Canada", exchange: "TSX", value: 21845.25, change: 0.35, volume: 1.1 },
  { symbol: "^MXX", name: "IPC", region: "AMER", country: "Mexico", exchange: "BMV", value: 54150.45, change: 0.65, volume: 0.8 },
];

// Mock data for market news when API fails
export const MOCK_NEWS_DATA = [
  {
    category: "general",
    datetime: Date.now() - 3600000,
    headline: "Federal Reserve Signals Potential Rate Cut",
    id: 1001,
    image: "https://placehold.co/600x400?text=Fed+Rate+News",
    related: "economy,markets",
    source: "Financial Times",
    summary: "The Federal Reserve has indicated it may consider rate cuts later this year as inflation pressures ease.",
    url: "#"
  },
  {
    category: "technology",
    datetime: Date.now() - 7200000,
    headline: "Tech Giants Report Strong Quarterly Earnings",
    id: 1002,
    image: "https://placehold.co/600x400?text=Tech+Earnings",
    related: "technology,stocks",
    source: "TechCrunch",
    summary: "Major technology companies exceeded analyst expectations in the latest round of quarterly reports.",
    url: "#"
  },
  {
    category: "forex",
    datetime: Date.now() - 10800000,
    headline: "Dollar Weakens Against Major Currencies",
    id: 1003,
    image: "https://placehold.co/600x400?text=Forex+News",
    related: "forex,economy",
    source: "Reuters",
    summary: "The US dollar declined against a basket of major currencies following central bank comments.",
    url: "#"
  },
  {
    category: "merger",
    datetime: Date.now() - 14400000,
    headline: "Major Pharma Merger Announced",
    id: 1004,
    image: "https://placehold.co/600x400?text=Pharma+Merger",
    related: "healthcare,mergers",
    source: "Bloomberg",
    summary: "Two leading pharmaceutical companies have announced plans to merge in a $45 billion deal.",
    url: "#"
  },
  {
    category: "crypto",
    datetime: Date.now() - 18000000,
    headline: "Bitcoin Surges Past $60,000",
    id: 1005,
    image: "https://placehold.co/600x400?text=Crypto+News",
    related: "cryptocurrency,bitcoin",
    source: "CoinDesk",
    summary: "Bitcoin has broken through the $60,000 barrier amid growing institutional adoption.",
    url: "#"
  },
  {
    category: "general",
    datetime: Date.now() - 21600000,
    headline: "Global Markets Rally on Economic Data",
    id: 1006,
    image: "https://placehold.co/600x400?text=Market+Rally",
    related: "markets,economy",
    source: "Wall Street Journal",
    summary: "Stock markets worldwide surged following better-than-expected economic indicators.",
    url: "#"
  },
  {
    category: "general",
    datetime: Date.now() - 25200000,
    headline: "Oil Prices Stabilize After Recent Volatility",
    id: 1007,
    image: "https://placehold.co/600x400?text=Oil+Prices",
    related: "commodities,energy",
    source: "CNBC",
    summary: "Crude oil prices have found stability following weeks of fluctuations due to supply concerns.",
    url: "#"
  },
  {
    category: "technology",
    datetime: Date.now() - 28800000,
    headline: "New AI Breakthrough Announced by Research Lab",
    id: 1008,
    image: "https://placehold.co/600x400?text=AI+News",
    related: "technology,artificial-intelligence",
    source: "MIT Technology Review",
    summary: "Scientists have developed a new AI algorithm that significantly improves natural language processing.",
    url: "#"
  },
  {
    category: "general",
    datetime: Date.now() - 32400000,
    headline: "Central Banks Coordinate Policy Response",
    id: 1009,
    image: "https://placehold.co/600x400?text=Central+Banks",
    related: "economy,monetary-policy",
    source: "Financial Times",
    summary: "Major central banks announced coordinated actions to address financial stability concerns.",
    url: "#"
  },
  {
    category: "merger",
    datetime: Date.now() - 36000000,
    headline: "Tech Startup Acquired in Billion-Dollar Deal",
    id: 1010,
    image: "https://placehold.co/600x400?text=Startup+Acquisition",
    related: "technology,startups",
    source: "TechCrunch",
    summary: "A promising AI startup has been acquired by a major tech company in a $1.2 billion deal.",
    url: "#"
  }
];
