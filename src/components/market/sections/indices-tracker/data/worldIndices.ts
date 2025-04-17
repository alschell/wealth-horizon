
import { IndexData } from "../types";

// Comprehensive list of stock market indices from around the world
export const worldIndices: IndexData[] = [
  // North America
  { 
    id: "sp500", 
    name: "S&P 500", 
    symbol: "^GSPC", 
    value: 5280.12, 
    change: 0.75, 
    percentChange: 1.42, 
    region: "United States",
    description: "Standard & Poor's 500 - 500 largest US publicly traded companies"
  },
  { 
    id: "dow", 
    name: "Dow Jones", 
    symbol: "^DJI", 
    value: 38250.42, 
    change: 125.30, 
    percentChange: 0.33, 
    region: "United States",
    description: "Dow Jones Industrial Average - 30 large US companies"
  },
  { 
    id: "nasdaq", 
    name: "NASDAQ Composite", 
    symbol: "^IXIC", 
    value: 16720.54, 
    change: 184.09, 
    percentChange: 1.12, 
    region: "United States",
    description: "NASDAQ Composite - All companies listed on the NASDAQ stock exchange"
  },
  { 
    id: "russell2000", 
    name: "Russell 2000", 
    symbol: "^RUT", 
    value: 2080.78, 
    change: 17.24, 
    percentChange: 0.84, 
    region: "United States",
    description: "Russell 2000 - 2000 small-cap US companies"
  },
  { 
    id: "tsx", 
    name: "S&P/TSX Composite", 
    symbol: "^GSPTSE", 
    value: 21924.98, 
    change: -47.35, 
    percentChange: -0.22, 
    region: "Canada",
    description: "S&P/Toronto Stock Exchange Composite - Largest companies on Toronto Stock Exchange"
  },
  { 
    id: "ipc", 
    name: "IPC Mexico", 
    symbol: "^MXX", 
    value: 52872.34, 
    change: 321.54, 
    percentChange: 0.61, 
    region: "Mexico",
    description: "Índice de Precios y Cotizaciones - Main index of the Mexican Stock Exchange"
  },

  // Europe
  { 
    id: "ftse100", 
    name: "FTSE 100", 
    symbol: "^FTSE", 
    value: 7860.35, 
    change: -12.45, 
    percentChange: -0.16, 
    region: "United Kingdom",
    description: "Financial Times Stock Exchange 100 - 100 companies on the London Stock Exchange"
  },
  { 
    id: "dax", 
    name: "DAX", 
    symbol: "^GDAXI", 
    value: 17980.28, 
    change: 87.35, 
    percentChange: 0.49, 
    region: "Germany",
    description: "Deutscher Aktienindex - 40 largest German companies trading on Frankfurt Stock Exchange"
  },
  { 
    id: "cac40", 
    name: "CAC 40", 
    symbol: "^FCHI", 
    value: 7592.31, 
    change: 34.86, 
    percentChange: 0.46, 
    region: "France",
    description: "Cotation Assistée en Continu - 40 most significant companies on Euronext Paris"
  },
  { 
    id: "ibex35", 
    name: "IBEX 35", 
    symbol: "^IBEX", 
    value: 10124.70, 
    change: -28.90, 
    percentChange: -0.28, 
    region: "Spain",
    description: "Iberia Index - 35 most liquid Spanish companies listed on Madrid Stock Exchange"
  },
  { 
    id: "ftse-mib", 
    name: "FTSE MIB", 
    symbol: "FTSEMIB.MI", 
    value: 33185.34, 
    change: 122.65, 
    percentChange: 0.37, 
    region: "Italy",
    description: "FTSE Milano Italia Borsa - 40 most-traded stock classes on Borsa Italiana"
  },
  { 
    id: "aex", 
    name: "AEX", 
    symbol: "^AEX", 
    value: 887.37, 
    change: 5.12, 
    percentChange: 0.58, 
    region: "Netherlands",
    description: "Amsterdam Exchange Index - 25 Dutch companies listed on Euronext Amsterdam"
  },
  { 
    id: "smi", 
    name: "SMI", 
    symbol: "^SSMI", 
    value: 11642.81, 
    change: 32.55, 
    percentChange: 0.28, 
    region: "Switzerland",
    description: "Swiss Market Index - 20 largest Swiss companies on SIX Swiss Exchange"
  },
  {
    id: "omx-stockholm", 
    name: "OMX Stockholm 30", 
    symbol: "^OMX", 
    value: 2415.67, 
    change: 12.34, 
    percentChange: 0.51, 
    region: "Sweden",
    description: "OMX Stockholm 30 - 30 most-traded stocks on Stockholm Stock Exchange"
  },
  {
    id: "osebx", 
    name: "Oslo Børs", 
    symbol: "OSEBX.OL", 
    value: 1295.32, 
    change: -5.80, 
    percentChange: -0.45, 
    region: "Norway",
    description: "Oslo Stock Exchange Benchmark Index - Main index on Oslo Stock Exchange"
  },

  // Asia Pacific
  { 
    id: "nikkei", 
    name: "Nikkei 225", 
    symbol: "^N225", 
    value: 38360.65, 
    change: 481.20, 
    percentChange: 1.27, 
    region: "Japan",
    description: "Nikkei 225 - 225 largest companies listed on Tokyo Stock Exchange"
  },
  { 
    id: "topix", 
    name: "TOPIX", 
    symbol: "^TOPX", 
    value: 2664.84, 
    change: 15.42, 
    percentChange: 0.58, 
    region: "Japan",
    description: "Tokyo Price Index - All companies in the First Section of Tokyo Stock Exchange"
  },
  { 
    id: "shanghai", 
    name: "Shanghai Composite", 
    symbol: "000001.SS", 
    value: 3184.22, 
    change: 18.75, 
    percentChange: 0.59, 
    region: "China",
    description: "Shanghai Stock Exchange Composite Index - All stocks on Shanghai Stock Exchange"
  },
  { 
    id: "shenzhen", 
    name: "Shenzhen Component", 
    symbol: "399001.SZ", 
    value: 10126.82, 
    change: 58.30, 
    percentChange: 0.58, 
    region: "China",
    description: "Shenzhen Stock Exchange Component Index - 500 stocks on Shenzhen Stock Exchange"
  },
  { 
    id: "hang-seng", 
    name: "Hang Seng", 
    symbol: "^HSI", 
    value: 18077.69, 
    change: -120.31, 
    percentChange: -0.66, 
    region: "Hong Kong",
    description: "Hang Seng Index - Largest companies of Hong Kong stock market"
  },
  { 
    id: "kospi", 
    name: "KOSPI", 
    symbol: "^KS11", 
    value: 2691.28, 
    change: 10.54, 
    percentChange: 0.39, 
    region: "South Korea",
    description: "Korea Composite Stock Price Index - All common stocks on Korean Stock Exchange"
  },
  { 
    id: "sensex", 
    name: "BSE SENSEX", 
    symbol: "^BSESN", 
    value: 73354.85, 
    change: 181.33, 
    percentChange: 0.25, 
    region: "India",
    description: "Bombay Stock Exchange Sensitive Index - 30 largest companies on Bombay Stock Exchange"
  },
  { 
    id: "nifty", 
    name: "NIFTY 50", 
    symbol: "^NSEI", 
    value: 22347.60, 
    change: 67.65, 
    percentChange: 0.30, 
    region: "India",
    description: "National Stock Exchange Fifty - 50 largest companies on National Stock Exchange of India"
  },
  { 
    id: "asx", 
    name: "S&P/ASX 200", 
    symbol: "^AXJO", 
    value: 7742.80, 
    change: -18.62, 
    percentChange: -0.24, 
    region: "Australia",
    description: "Standard & Poor's/ASX 200 - 200 largest index-eligible stocks on Australian Securities Exchange"
  },
  { 
    id: "nzx50", 
    name: "NZX 50", 
    symbol: "^NZ50", 
    value: 11742.32, 
    change: 28.92, 
    percentChange: 0.25, 
    region: "New Zealand",
    description: "New Zealand Exchange 50 Index - 50 largest stocks on New Zealand Stock Exchange"
  },
  { 
    id: "sti", 
    name: "Straits Times Index", 
    symbol: "^STI", 
    value: 3382.54, 
    change: 12.80, 
    percentChange: 0.38, 
    region: "Singapore",
    description: "Straits Times Index - 30 representative companies on Singapore Exchange"
  },
  { 
    id: "jkse", 
    name: "Jakarta Composite", 
    symbol: "^JKSE", 
    value: 7287.42, 
    change: 28.14, 
    percentChange: 0.39, 
    region: "Indonesia",
    description: "Jakarta Composite Index - All stocks on Indonesia Stock Exchange"
  },
  { 
    id: "klci", 
    name: "FTSE Bursa Malaysia KLCI", 
    symbol: "^KLSE", 
    value: 1582.64, 
    change: -4.21, 
    percentChange: -0.27, 
    region: "Malaysia",
    description: "FTSE Bursa Malaysia Kuala Lumpur Composite Index - 30 largest companies on Bursa Malaysia"
  },

  // Middle East & Africa
  { 
    id: "tasi", 
    name: "Tadawul All Share", 
    symbol: "^TASI", 
    value: 11685.47, 
    change: 65.32, 
    percentChange: 0.56, 
    region: "Saudi Arabia",
    description: "Tadawul All Share Index - Main index of Saudi Stock Exchange"
  },
  { 
    id: "dfmgi", 
    name: "Dubai Financial Market", 
    symbol: "^DFMGI", 
    value: 4124.08, 
    change: 18.45, 
    percentChange: 0.45, 
    region: "UAE",
    description: "Dubai Financial Market General Index - Main index of Dubai Financial Market"
  },
  { 
    id: "adx", 
    name: "Abu Dhabi Securities", 
    symbol: "^ADI", 
    value: 9212.34, 
    change: 38.67, 
    percentChange: 0.42, 
    region: "UAE",
    description: "Abu Dhabi Securities Market General Index - Main index of Abu Dhabi Securities Exchange"
  },
  { 
    id: "qe", 
    name: "Qatar Exchange", 
    symbol: "^QSI", 
    value: 10287.55, 
    change: -32.45, 
    percentChange: -0.31, 
    region: "Qatar",
    description: "Qatar Stock Exchange Index - Main index of Qatar Stock Exchange"
  },
  { 
    id: "tase", 
    name: "Tel Aviv 35", 
    symbol: "^TA35", 
    value: 1942.68, 
    change: 12.25, 
    percentChange: 0.63, 
    region: "Israel",
    description: "Tel Aviv Stock Exchange's flagship index - 35 stocks with highest market cap on TASE"
  },
  { 
    id: "egx30", 
    name: "EGX 30", 
    symbol: "^CASE", 
    value: 28112.54, 
    change: 142.65, 
    percentChange: 0.51, 
    region: "Egypt",
    description: "Egyptian Exchange 30 - 30 most highly capitalized and liquid stocks on Egyptian Exchange"
  },
  { 
    id: "jse", 
    name: "JSE Top 40", 
    symbol: "^JTOPI", 
    value: 69548.32, 
    change: 215.67, 
    percentChange: 0.31, 
    region: "South Africa",
    description: "Johannesburg Stock Exchange Top 40 - 40 largest companies on JSE"
  },
  { 
    id: "nse", 
    name: "NSE All Share", 
    symbol: "^NGSEINDX", 
    value: 65487.35, 
    change: 342.52, 
    percentChange: 0.53, 
    region: "Nigeria",
    description: "Nigerian Stock Exchange All Share Index - All common stocks on Nigerian Stock Exchange"
  },

  // Latin America
  { 
    id: "bovespa", 
    name: "Bovespa", 
    symbol: "^BVSP", 
    value: 124758.42, 
    change: 854.32, 
    percentChange: 0.69, 
    region: "Brazil",
    description: "Brasil Bolsa Balcão - About 60 stocks traded on the B3 exchange"
  },
  { 
    id: "ipsa", 
    name: "S&P/CLX IPSA", 
    symbol: "^IPSA", 
    value: 5982.47, 
    change: 24.78, 
    percentChange: 0.42, 
    region: "Chile",
    description: "Índice de Precio Selectivo de Acciones - 30 most significant stocks on Santiago Stock Exchange"
  },
  { 
    id: "merval", 
    name: "MERVAL", 
    symbol: "^MERV", 
    value: 1008537.85, 
    change: 5023.54, 
    percentChange: 0.50, 
    region: "Argentina",
    description: "Mercado de Valores - Leading stocks on Buenos Aires Stock Exchange"
  },
  { 
    id: "colcap", 
    name: "COLCAP", 
    symbol: "^COLCAP", 
    value: 1384.21, 
    change: -5.32, 
    percentChange: -0.38, 
    region: "Colombia",
    description: "Capitalization Index - 20 most liquid stocks on Colombia Stock Exchange"
  },
  { 
    id: "lima", 
    name: "S&P/BVL Peru", 
    symbol: "^SPBLPGPT", 
    value: 22478.56, 
    change: 92.41, 
    percentChange: 0.41, 
    region: "Peru",
    description: "S&P/BVL Peru General Index - Most liquid stocks on Lima Stock Exchange"
  }
];

// Create regional groupings
export const regions = [
  { id: "all", name: "All" },
  { id: "north-america", name: "North America" },
  { id: "europe", name: "Europe" },
  { id: "asia-pacific", name: "Asia Pacific" },
  { id: "middle-east-africa", name: "Middle East & Africa" },
  { id: "latin-america", name: "Latin America" }
];

// Map regions to countries for filtering
export const regionToCountryMap: Record<string, string[]> = {
  "North America": ["United States", "Canada", "Mexico"],
  "Europe": ["United Kingdom", "Germany", "France", "Spain", "Italy", "Netherlands", "Switzerland", "Sweden", "Norway"],
  "Asia Pacific": ["Japan", "China", "Hong Kong", "South Korea", "India", "Australia", "New Zealand", "Singapore", "Indonesia", "Malaysia"],
  "Middle East & Africa": ["Saudi Arabia", "UAE", "Qatar", "Israel", "Egypt", "South Africa", "Nigeria"],
  "Latin America": ["Brazil", "Chile", "Argentina", "Colombia", "Peru"]
};
