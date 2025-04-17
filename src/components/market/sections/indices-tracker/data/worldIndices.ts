
import { IndexData } from "../types";

export const regionToCountryMap: Record<string, string[]> = {
  "ALL": ["All Regions"],
  "AMER": ["United States", "Canada", "Brazil", "Mexico", "Argentina"],
  "EMEA": ["United Kingdom", "Germany", "France", "Switzerland", "Spain", "Italy", "Netherlands", "Belgium", "Sweden", "Norway", "Russia", "South Africa", "Turkey", "Israel"],
  "APAC": ["Japan", "China", "Hong Kong", "South Korea", "Australia", "India", "Singapore", "Taiwan", "Indonesia", "Malaysia", "Thailand", "New Zealand"],
};

export const allWorldIndices: IndexData[] = [
  // Americas
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
    id: "russell",
    name: "Russell 2000",
    symbol: "^RUT",
    value: 2097.58,
    change: 0.92,
    percentChange: 0.92,
    region: "United States",
    exchange: "NYSE",
    description: "The Russell 2000 Index measures the performance of the small-cap segment of the US equity universe.",
    volume: 980000
  },
  {
    id: "tsx",
    name: "S&P/TSX",
    symbol: "^GSPTSE",
    value: 21845.25,
    change: 0.35,
    percentChange: 0.35,
    region: "Canada",
    exchange: "TSX",
    description: "The S&P/TSX Composite Index is the benchmark Canadian index representing roughly 70% of the total market capitalization on the Toronto Stock Exchange.",
    volume: 1100000
  },
  {
    id: "bovespa",
    name: "Bovespa",
    symbol: "^BVSP",
    value: 127850.75,
    change: 1.15,
    percentChange: 1.15,
    region: "Brazil",
    exchange: "B3",
    description: "The Bovespa Index is the benchmark index of the Brazilian stock market.",
    volume: 1900000
  },
  {
    id: "ipc",
    name: "IPC",
    symbol: "^MXX",
    value: 54150.45,
    change: 0.65,
    percentChange: 0.65,
    region: "Mexico",
    exchange: "BMV",
    description: "The Mexican Stock Exchange IPC Index is the main index of the Mexican Stock Exchange.",
    volume: 800000
  },
  {
    id: "merval",
    name: "MERVAL",
    symbol: "^MERV",
    value: 985450.25,
    change: 1.85,
    percentChange: 1.85,
    region: "Argentina",
    exchange: "BCBA",
    description: "The MERVAL Index is the most important index of the Buenos Aires Stock Exchange.",
    volume: 700000
  },

  // Europe, Middle East, Africa
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
    id: "dax",
    name: "DAX",
    symbol: "^GDAXI",
    value: 17967.87,
    change: -0.15,
    percentChange: -0.15,
    region: "Germany",
    exchange: "XETRA",
    description: "The DAX is the blue chip stock market index consisting of the 40 major German companies trading on the Frankfurt Stock Exchange.",
    volume: 1500000
  },
  {
    id: "cac",
    name: "CAC 40",
    symbol: "^FCHI",
    value: 7575.25,
    change: -0.28,
    percentChange: -0.28,
    region: "France",
    exchange: "Euronext",
    description: "The CAC 40 is a benchmark French stock market index representing a capitalization-weighted measure of the 40 most significant stocks among the 100 largest market caps on the Euronext Paris.",
    volume: 1300000
  },
  {
    id: "eurostoxx",
    name: "Euro Stoxx 50",
    symbol: "^STOXX50E",
    value: 4845.45,
    change: -0.12,
    percentChange: -0.12,
    region: "Europe",
    exchange: "STOXX",
    description: "The EURO STOXX 50 Index is a stock index of large Eurozone stocks.",
    volume: 1600000
  },
  {
    id: "ibex",
    name: "IBEX 35",
    symbol: "^IBEX",
    value: 10257.30,
    change: -0.22,
    percentChange: -0.22,
    region: "Spain",
    exchange: "BME",
    description: "The IBEX 35 is the benchmark stock market index of the Bolsa de Madrid, Spain's principal stock exchange.",
    volume: 900000
  },
  {
    id: "smi",
    name: "SMI",
    symbol: "^SSMI",
    value: 11865.50,
    change: 0.05,
    percentChange: 0.05,
    region: "Switzerland",
    exchange: "SIX",
    description: "The Swiss Market Index is Switzerland's blue-chip stock market index.",
    volume: 800000
  },
  {
    id: "ta125",
    name: "TA-125",
    symbol: "^TA125",
    value: 2145.65,
    change: 0.25,
    percentChange: 0.25,
    region: "Israel",
    exchange: "TASE",
    description: "The TA-125 Index is a stock market index of the 125 most highly capitalized companies listed on the Tel Aviv Stock Exchange.",
    volume: 500000
  },

  // Asia-Pacific
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
  },
  {
    id: "hangseng",
    name: "Hang Seng",
    symbol: "^HSI",
    value: 17600.35,
    change: -0.85,
    percentChange: -0.85,
    region: "Hong Kong",
    exchange: "HKEX",
    description: "The Hang Seng Index is a freefloat-adjusted market-capitalization-weighted stock market index in Hong Kong.",
    volume: 1700000
  },
  {
    id: "sensex",
    name: "BSE SENSEX",
    symbol: "^BSESN",
    value: 73750.80,
    change: 0.24,
    percentChange: 0.24,
    region: "India",
    exchange: "BSE",
    description: "The S&P BSE SENSEX is a free-float market-weighted stock market index of 30 companies listed on the Bombay Stock Exchange.",
    volume: 1400000
  },
  {
    id: "asx",
    name: "ASX 200",
    symbol: "^AXJO",
    value: 7754.90,
    change: 0.18,
    percentChange: 0.18,
    region: "Australia",
    exchange: "ASX",
    description: "The S&P/ASX 200 index is a market-capitalization weighted and float-adjusted stock market index of stocks listed on the Australian Securities Exchange.",
    volume: 1100000
  },
  {
    id: "kospi",
    name: "KOSPI",
    symbol: "^KS11",
    value: 2645.75,
    change: 0.95,
    percentChange: 0.95,
    region: "South Korea",
    exchange: "KRX",
    description: "The Korea Composite Stock Price Index is the index of all common stocks traded on the Stock Market Division of the Korea Exchange.",
    volume: 1300000
  },
  {
    id: "taiex",
    name: "TAIEX",
    symbol: "^TWII",
    value: 20845.15,
    change: 1.35,
    percentChange: 1.35,
    region: "Taiwan",
    exchange: "TWSE",
    description: "The Taiwan Capitalization Weighted Stock Index is a stock market index for companies traded on the Taiwan Stock Exchange.",
    volume: 1500000
  }
];
