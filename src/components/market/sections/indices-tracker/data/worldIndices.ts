import { IndexData } from "../types";

// List of all available world indices with detailed information
export const allWorldIndices: IndexData[] = [
  // North America
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
    id: "russell-2000",
    name: "Russell 2000",
    symbol: "^RUT",
    value: 0,
    change: 0,
    percentChange: 0,
    region: "United States",
    description: "The Russell 2000 Index is a small-cap stock market index that includes the smallest 2,000 companies in the Russell 3000 Index.",
    volume: 0
  },
  {
    id: "nyse-composite",
    name: "NYSE Composite",
    symbol: "^NYA",
    value: 0,
    change: 0,
    percentChange: 0,
    region: "United States",
    description: "The NYSE Composite Index measures the performance of all stocks listed on the New York Stock Exchange.",
    volume: 0
  },
  {
    id: "s-p-tsx-composite",
    name: "S&P/TSX Composite",
    symbol: "^GSPTSE",
    value: 0,
    change: 0,
    percentChange: 0,
    region: "Canada",
    description: "The S&P/TSX Composite Index is the headline index and the principal broad market measure for the Canadian equity markets.",
    volume: 0
  },
  {
    id: "bse-ipc",
    name: "IPC Mexico",
    symbol: "^MXX",
    value: 0,
    change: 0,
    percentChange: 0,
    region: "Mexico",
    description: "The S&P/BMV IPC (Índice de Precios y Cotizaciones) is the main benchmark stock market index of the Mexican Stock Exchange.",
    volume: 0
  },
  
  // Europe
  {
    id: "ftse-100",
    name: "FTSE 100",
    symbol: "^FTSE",
    value: 0,
    change: 0,
    percentChange: 0,
    region: "United Kingdom",
    description: "The Financial Times Stock Exchange 100 Index tracks the 100 companies listed on the London Stock Exchange with the highest market capitalization.",
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
    description: "The DAX is a blue-chip stock market index consisting of the 40 major German companies trading on the Frankfurt Stock Exchange.",
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
    description: "The CAC 40 represents a capitalization-weighted measure of the 40 most significant companies among the 100 largest market caps on the Euronext Paris.",
    volume: 0
  },
  {
    id: "euro-stoxx-50",
    name: "Euro Stoxx 50",
    symbol: "^STOXX50E",
    value: 0,
    change: 0,
    percentChange: 0,
    region: "Eurozone",
    description: "The EURO STOXX 50 is a stock index of Eurozone stocks designed by STOXX, an index provider owned by Deutsche Börse Group.",
    volume: 0
  },
  {
    id: "ibex-35",
    name: "IBEX 35",
    symbol: "^IBEX",
    value: 0,
    change: 0,
    percentChange: 0,
    region: "Spain",
    description: "The IBEX 35 is the benchmark stock market index of the Bolsa de Madrid, Spain's principal stock exchange.",
    volume: 0
  },
  {
    id: "ftse-mib",
    name: "FTSE MIB",
    symbol: "FTSEMIB.MI",
    value: 0,
    change: 0,
    percentChange: 0,
    region: "Italy",
    description: "The FTSE MIB is the benchmark stock market index for the Borsa Italiana, the Italian national stock exchange.",
    volume: 0
  },
  {
    id: "smi",
    name: "SMI",
    symbol: "^SSMI",
    value: 0,
    change: 0,
    percentChange: 0,
    region: "Switzerland",
    description: "The Swiss Market Index is Switzerland's blue-chip stock market index, containing 20 of the largest and most liquid Swiss stocks.",
    volume: 0
  },
  {
    id: "aex",
    name: "AEX",
    symbol: "^AEX",
    value: 0,
    change: 0,
    percentChange: 0,
    region: "Netherlands",
    description: "The AEX index is the benchmark stock market index of Euronext Amsterdam, consisting of Dutch companies that trade on the exchange.",
    volume: 0
  },
  {
    id: "omx-stockholm-30",
    name: "OMX Stockholm 30",
    symbol: "^OMX",
    value: 0,
    change: 0,
    percentChange: 0,
    region: "Sweden",
    description: "The OMX Stockholm 30 is a stock market index for the Stockholm Stock Exchange. It is a market-weighted price index consisting of the 30 most-traded stock classes.",
    volume: 0
  },
  {
    id: "bel-20",
    name: "BEL 20",
    symbol: "^BFX",
    value: 0,
    change: 0,
    percentChange: 0,
    region: "Belgium",
    description: "The BEL 20 is the benchmark stock market index of Euronext Brussels, consisting of a minimum of 10 and a maximum of 20 companies traded at the Brussels Stock Exchange.",
    volume: 0
  },
  
  // Asia-Pacific
  {
    id: "nikkei-225",
    name: "Nikkei 225",
    symbol: "^N225",
    value: 0,
    change: 0,
    percentChange: 0,
    region: "Japan",
    description: "The Nikkei 225 is a stock market index for the Tokyo Stock Exchange. It is the most widely quoted average of Japanese equities.",
    volume: 0
  },
  {
    id: "topix",
    name: "TOPIX",
    symbol: "^TOPX",
    value: 0,
    change: 0,
    percentChange: 0,
    region: "Japan",
    description: "The TOPIX, also known as the Tokyo Price Index, is a capitalization-weighted index of all companies listed on the First Section of the Tokyo Stock Exchange.",
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
    description: "The Hang Seng Index is a free-float adjusted market-capitalization-weighted stock market index in Hong Kong.",
    volume: 0
  },
  {
    id: "shanghai-composite",
    name: "Shanghai Composite",
    symbol: "000001.SS",
    value: 0,
    change: 0,
    percentChange: 0,
    region: "China",
    description: "The SSE Composite Index is a stock market index of all stocks that are traded at the Shanghai Stock Exchange.",
    volume: 0
  },
  {
    id: "shenzhen-component",
    name: "Shenzhen Component",
    symbol: "399001.SZ",
    value: 0,
    change: 0,
    percentChange: 0,
    region: "China",
    description: "The SZSE Component Index is an index of 500 stocks that are traded at the Shenzhen Stock Exchange.",
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
    description: "The Korea Composite Stock Price Index is the index of all common stocks traded on the Stock Market Division of the Korea Exchange.",
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
    description: "The S&P BSE SENSEX is a free-float market-weighted stock market index of 30 well-established companies listed on the Bombay Stock Exchange.",
    volume: 0
  },
  {
    id: "nifty-50",
    name: "Nifty 50",
    symbol: "^NSEI",
    value: 0,
    change: 0,
    percentChange: 0,
    region: "India",
    description: "The NIFTY 50 is the flagship index on the National Stock Exchange of India, representing the weighted average of 50 Indian company stocks in various sectors.",
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
    description: "The S&P/ASX 200 is a market-capitalization weighted and float-adjusted stock market index of stocks listed on the Australian Securities Exchange.",
    volume: 0
  },
  {
    id: "nzx-50",
    name: "NZX 50",
    symbol: "^NZ50",
    value: 0,
    change: 0,
    percentChange: 0,
    region: "New Zealand",
    description: "The S&P/NZX 50 Index is the main stock market index in New Zealand, representing the performance of the 50 largest companies by free-float market capitalization listed on the New Zealand Stock Exchange.",
    volume: 0
  },
  {
    id: "sti",
    name: "STI",
    symbol: "^STI",
    value: 0,
    change: 0,
    percentChange: 0,
    region: "Singapore",
    description: "The Straits Times Index is a market value-weighted stock market index based on the stocks of 30 representative companies listed on the Singapore Exchange.",
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
    description: "The FTSE Bursa Malaysia KLCI, or Kuala Lumpur Composite Index, is a Malaysian stock market index of the largest 30 companies on the Bursa Malaysia by market capitalization.",
    volume: 0
  },
  {
    id: "jci",
    name: "JCI",
    symbol: "^JKSE",
    value: 0,
    change: 0,
    percentChange: 0,
    region: "Indonesia",
    description: "The Jakarta Composite Index is an index of all stocks that are traded on the Indonesia Stock Exchange.",
    volume: 0
  },
  {
    id: "set",
    name: "SET",
    symbol: "^SET.BK",
    value: 0,
    change: 0,
    percentChange: 0,
    region: "Thailand",
    description: "The SET Index is a Thai composite stock market index which is calculated from the prices of all common stocks on the main board of the Stock Exchange of Thailand.",
    volume: 0
  },
  {
    id: "vn-index",
    name: "VN-Index",
    symbol: "^VNINDEX",
    value: 0,
    change: 0,
    percentChange: 0,
    region: "Vietnam",
    description: "The VN-Index is a capitalization-weighted index of all the companies listed on the Ho Chi Minh City Stock Exchange.",
    volume: 0
  },
  {
    id: "psei",
    name: "PSEi",
    symbol: "^PSI",
    value: 0,
    change: 0,
    percentChange: 0,
    region: "Philippines",
    description: "The PSE Composite Index, commonly known as PSEi, is a stock market index of the Philippine Stock Exchange consisting of 30 companies.",
    volume: 0
  },
  {
    id: "taiex",
    name: "TAIEX",
    symbol: "^TWII",
    value: 0,
    change: 0,
    percentChange: 0,
    region: "Taiwan",
    description: "The Taiwan Capitalization Weighted Stock Index is a stock market index for companies traded on the Taiwan Stock Exchange.",
    volume: 0
  },
  
  // Other Markets (South America, Middle East, Africa)
  {
    id: "ibovespa",
    name: "Ibovespa",
    symbol: "^BVSP",
    value: 0,
    change: 0,
    percentChange: 0,
    region: "Brazil",
    description: "The Ibovespa is the benchmark index of the São Paulo Stock Exchange in Brazil, representing about 80% of the trades and volume on the exchange.",
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
    description: "The MERVAL is the most important index of the Buenos Aires Stock Exchange, representing the performance of the largest companies in Argentina.",
    volume: 0
  },
  {
    id: "ipsa",
    name: "IPSA",
    symbol: "^IPSA",
    value: 0,
    change: 0,
    percentChange: 0,
    region: "Chile",
    description: "The IPSA is a stock market index for the Santiago Stock Exchange. It is designed to measure market price performance of the largest and most active stocks.",
    volume: 0
  },
  {
    id: "colcap",
    name: "COLCAP",
    symbol: "^COLCAP",
    value: 0,
    change: 0,
    percentChange: 0,
    region: "Colombia",
    description: "The COLCAP is a capitalization-weighted stock market index consisting of the most liquid 25 stocks traded on the Colombia Stock Exchange.",
    volume: 0
  },
  {
    id: "jse-top-40",
    name: "JSE Top 40",
    symbol: "^J203.JO",
    value: 0,
    change: 0,
    percentChange: 0,
    region: "South Africa",
    description: "The FTSE/JSE Top 40 Index is a market capitalization-weighted index of the 40 largest companies on the Johannesburg Stock Exchange.",
    volume: 0
  },
  {
    id: "egx30",
    name: "EGX 30",
    symbol: "^CASE30",
    value: 0,
    change: 0,
    percentChange: 0,
    region: "Egypt",
    description: "The EGX 30 Index is the Egyptian stock market benchmark index, representing the 30 most highly capitalized and liquid stocks traded on the Egyptian Exchange.",
    volume: 0
  },
  {
    id: "tadawul",
    name: "Tadawul All Share",
    symbol: "^TASI.SR",
    value: 0,
    change: 0,
    percentChange: 0,
    region: "Saudi Arabia",
    description: "The Tadawul All Share Index is the main stock market index of the Saudi Stock Exchange, containing all companies listed on the Saudi Stock Exchange.",
    volume: 0
  },
  {
    id: "msci-world",
    name: "MSCI World",
    symbol: "^WORLD",
    value: 0,
    change: 0,
    percentChange: 0,
    region: "Global",
    description: "The MSCI World Index is a market cap weighted stock market index of 1,500+ companies throughout the world.",
    volume: 0
  },
  {
    id: "msci-emerging",
    name: "MSCI Emerging Markets",
    symbol: "^MSCIEF",
    value: 0,
    change: 0,
    percentChange: 0,
    region: "Global",
    description: "The MSCI Emerging Markets Index captures large and mid-cap representation across 24 Emerging Markets countries.",
    volume: 0
  }
];

// Subset of world indices for initial display
export const worldIndices: IndexData[] = allWorldIndices;

// Map region filters to actual regions in the data
export const regionToCountryMap: Record<string, string[]> = {
  "ALL": ["United States", "Canada", "United Kingdom", "Germany", "France", "Switzerland", "Netherlands", "Spain", "Italy", "Japan", "China", "Hong Kong", "Australia", "South Korea", "Taiwan", "India", "Singapore", "Brazil", "Mexico", "South Africa", "Russia", "Turkey", "Europe", "Eurozone", "Sweden", "Belgium", "New Zealand", "Malaysia", "Indonesia", "Thailand", "Vietnam", "Philippines", "Taiwan", "Brazil", "Argentina", "Chile", "Colombia", "South Africa", "Egypt", "Saudi Arabia", "Global"],
  
  "AMER": ["United States", "Canada", "Brazil", "Mexico", "Argentina", "Chile", "Colombia", "Peru"],
  
  "APAC": ["Japan", "China", "Hong Kong", "Australia", "South Korea", "Taiwan", "India", "Singapore", "New Zealand", "Malaysia", "Thailand", "Indonesia", "Philippines", "Vietnam"],
  
  "EMEA": ["United Kingdom", "Germany", "France", "Switzerland", "Netherlands", "Spain", "Italy", "Sweden", "Belgium", "Norway", "Denmark", "Finland", "Ireland", "Portugal", "Austria", "Greece", "South Africa", "Russia", "Turkey", "Saudi Arabia", "UAE", "Qatar", "Egypt", "Nigeria", "Kenya", "Morocco", "Europe", "Eurozone"]
};
