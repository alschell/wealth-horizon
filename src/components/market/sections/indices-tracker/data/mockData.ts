import { IndexData } from "../types";
import { createIndexData } from "../utils/indexDataUtils";

export const mockIndices: IndexData[] = [
  createIndexData(
    "sp500",
    "S&P 500",
    "^GSPC",
    4185.25,
    15.32,
    0.37,
    "United States",
    "Standard & Poor's 500 Index",
    2500000
  ),
  createIndexData(
    "nasdaq",
    "NASDAQ Composite",
    "^IXIC",
    13630.61,
    80.23,
    0.59,
    "United States",
    "NASDAQ Composite Index",
    3800000
  ),
  createIndexData(
    "dowjones",
    "Dow Jones",
    "^DJI",
    34285.51,
    100.71,
    0.29,
    "United States",
    "Dow Jones Industrial Average",
    2000000
  ),
  createIndexData(
    "ftse100",
    "FTSE 100",
    "^FTSE",
    7627.57,
    40.15,
    0.53,
    "United Kingdom",
    "Financial Times Stock Exchange 100 Index",
    1200000
  ),
  createIndexData(
    "nikkei225",
    "Nikkei 225",
    "^N225",
    27530.25,
    200.50,
    0.73,
    "Japan",
    "Nikkei 225 Index",
    1800000
  ),
  createIndexData(
    "hangseng",
    "Hang Seng",
    "^HSI",
    19781.41,
    -128.52,
    -0.65,
    "Hong Kong",
    "Hang Seng Index",
    1500000
  ),
  createIndexData(
    "euronext100",
    "Euronext 100",
    "^N100",
    1250.85,
    5.20,
    0.42,
    "Europe",
    "Euronext 100 Index",
    900000
  ),
  createIndexData(
    "tsx",
    "S&P/TSX Composite",
    "^GSPTSE",
    20764.44,
    62.58,
    0.30,
    "Canada",
    "S&P/TSX Composite Index",
    700000
  ),
  createIndexData(
    "asx200",
    "ASX 200",
    "^AXJO",
    7306.60,
    28.70,
    0.39,
    "Australia",
    "S&P/ASX 200 Index",
    600000
  ),
  createIndexData(
    "bsesensex",
    "BSE SENSEX",
    "^BSESN",
    60157.72,
    241.02,
    0.40,
    "India",
    "BSE SENSEX Index",
    500000
  )
];
