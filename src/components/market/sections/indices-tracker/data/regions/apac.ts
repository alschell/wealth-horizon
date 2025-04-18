import { IndexData } from "../../types";

export const apacIndices: IndexData[] = [
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
