import { IndexData } from "../../types";

export const americasIndices: IndexData[] = [
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
];
