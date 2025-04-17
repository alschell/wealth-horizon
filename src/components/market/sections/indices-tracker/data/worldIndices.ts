import { IndexData } from "../types";

// List of all available world indices with detailed information
export const allWorldIndices: IndexData[] = [
  {
    id: "sp-500",
    name: "S&P 500",
    symbol: "^GSPC",
    value: 0,
    change: 0,
    percentChange: 0,
    region: "United States",
    description: "Standard & Poor's 500 Index, a market-capitalization-weighted index of the 500 largest publicly traded companies in the U.S.",
    volume: 0
  },
  {
    id: "nasdaq-composite",
    name: "NASDAQ Composite",
    symbol: "^IXIC",
    value: 0,
    change: 0,
    percentChange: 0,
    region: "United States",
    description: "The NASDAQ Composite Index is a stock market index of the common stocks and similar securities listed on the NASDAQ stock market.",
    volume: 0
  },
  {
    id: "dow-jones",
    name: "Dow Jones",
    symbol: "^DJI",
    value: 0,
    change: 0,
    percentChange: 0,
    region: "United States",
    description: "The Dow Jones Industrial Average is a price-weighted measurement stock market index of 30 prominent companies listed on stock exchanges in the United States.",
    volume: 0
  },
  {
    id: "ftse-100",
    name: "FTSE 100",
    symbol: "^FTSE",
    value: 0,
    change: 0,
    percentChange: 0,
    region: "United Kingdom",
    description: "The FTSE 100 Index is a market-capitalization weighted index of the 100 most highly capitalized blue chip companies listed on the London Stock Exchange.",
    volume: 0
  },
  {
    id: "nikkei-225",
    name: "Nikkei 225",
    symbol: "^N225",
    value: 0,
    change: 0,
    percentChange: 0,
    region: "Japan",
    description: "The Nikkei 225 is a stock market index for the Tokyo Stock Exchange (TSE).",
    volume: 0
  },
  {
    id: "cac-40",
    name: "CAC 40",
    symbol: "^FCHI",
    value: 0,
    change: 0,
    percentChange: 0,
    region: "France",
    description: "The CAC 40 is a benchmark French stock market index.",
    volume: 0
  },
  {
    id: "hang-seng",
    name: "Hang Seng",
    symbol: "^HSI",
    value: 0,
    change: 0,
    percentChange: 0,
    region: "Hong Kong",
    description: "The Hang Seng Index is a freefloat-adjusted market-capitalization-weighted stock-market index in Hong Kong.",
    volume: 0
  },
  {
    id: "tsx-composite",
    name: "TSX Composite",
    symbol: "^GSPTSE",
    value: 0,
    change: 0,
    percentChange: 0,
    region: "Canada",
    description: "The S&P/TSX Composite Index is the headline index and the principal broad market measure for the Canadian equity markets.",
    volume: 0
  },
  {
    id: "asx-200",
    name: "ASX 200",
    symbol: "^AXJO",
    value: 0,
    change: 0,
    percentChange: 0,
    region: "Australia",
    description: "The S&P/ASX 200 is a market-capitalization weighted and float-adjusted stock market index of Australian stocks listed on the Australian Securities Exchange.",
    volume: 0
  },
  {
    id: "dax",
    name: "DAX",
    symbol: "^GDAXI",
    value: 0,
    change: 0,
    percentChange: 0,
    region: "Germany",
    description: "The DAX is a stock market index representing the 40 largest and most liquid German companies that trade on the Frankfurt Stock Exchange.",
    volume: 0
  },
  {
    id: "euro-stoxx-50",
    name: "Euro Stoxx 50",
    symbol: "^STOXX50E",
    value: 0,
    change: 0,
    percentChange: 0,
    region: "Switzerland",
    description: "The EURO STOXX 50 is a stock market index of Eurozone stocks designed by STOXX.",
    volume: 0
  },
  {
    id: "ibovespa",
    name: "Ibovespa",
    symbol: "^BVSP",
    value: 0,
    change: 0,
    percentChange: 0,
    region: "Brazil",
    description: "The Ibovespa is a total return index weighted by market capitalization, composed of the most liquid stocks traded on the São Paulo Stock Exchange.",
    volume: 0
  },
  {
    id: "merval",
    name: "MERVAL",
    symbol: "^MERV",
    value: 0,
    change: 0,
    percentChange: 0,
    region: "Argentina",
    description: "The MERVAL is the most important index of the Buenos Aires Stock Exchange.",
    volume: 0
  },
  {
    id: "ipc-mexico",
    name: "IPC Mexico",
    symbol: "^MXX",
    value: 0,
    change: 0,
    percentChange: 0,
    region: "Mexico",
    description: "The IPC is a stock market index of the Mexican Stock Exchange.",
    volume: 0
  },
  {
    id: "klse",
    name: "KLSE",
    symbol: "^KLSE",
    value: 0,
    change: 0,
    percentChange: 0,
    region: "Malaysia",
    description: "Kuala Lumpur Stock Exchange Composite Index",
    volume: 0
  },
  {
    id: "sensex",
    name: "SENSEX",
    symbol: "^BSESN",
    value: 0,
    change: 0,
    percentChange: 0,
    region: "India",
    description: "The S&P BSE SENSEX is a free-float market-weighted stock market index of 30 well-established and financially sound companies listed on Bombay Stock Exchange.",
    volume: 0
  },
  {
    id: "kospi",
    name: "KOSPI",
    symbol: "^KS11",
    value: 0,
    change: 0,
    percentChange: 0,
    region: "South Korea",
    description: "Korea Composite Stock Price Index",
    volume: 0
  },
  {
    id: "jse",
    name: "JSE",
    symbol: "^J203.JO",
    value: 0,
    change: 0,
    percentChange: 0,
    region: "South Africa",
    description: "The FTSE/JSE Africa Top 40 Index is a market-capitalization weighted index of the 40 largest companies listed on the Johannesburg Stock Exchange.",
    volume: 0
  }
];

// Subset of world indices for initial display
export const worldIndices: IndexData[] = allWorldIndices.slice(0, 10);

// Map region filters to actual regions in the data
export const regionToCountryMap: Record<string, string[]> = {
  "North America": ["United States", "Canada"],
  "Europe": ["United Kingdom", "Germany", "France", "Switzerland", "Netherlands", "Spain", "Italy", "Sweden", "Belgium", "Norway", "Denmark", "Finland", "Ireland", "Portugal", "Austria", "Greece"],
  "Asia-Pacific": ["Japan", "China", "Hong Kong", "Australia", "South Korea", "Taiwan", "India", "Singapore", "New Zealand", "Malaysia", "Thailand", "Indonesia", "Philippines"],
  "Other": ["Brazil", "Mexico", "South Africa", "Russia", "Turkey", "Saudi Arabia", "UAE", "Qatar", "Argentina", "Chile", "Colombia", "Peru", "Egypt", "Nigeria", "Kenya", "Morocco"]
};
