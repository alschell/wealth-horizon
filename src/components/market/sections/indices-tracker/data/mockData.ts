import { IndexData } from "../types";

export const mockIndices: IndexData[] = [
  {
    id: "sp500",
    name: "S&P 500",
    symbol: "^GSPC",
    value: 4587.20,
    change: 0.85,
    percentChange: 0.85,
    volume: 2500000000,
    region: "United States",
    description: "Standard & Poor's 500 Index of 500 large US companies",
    data: {
      c: 4587.20,
      d: 0.85,
      dp: 0.85,
      h: 4600.15,
      l: 4550.30,
      o: 4560.75,
      pc: 4548.35,
      t: Date.now()
    }
  },
  {
    id: "nasdaq",
    name: "NASDAQ",
    symbol: "^IXIC",
    value: 14346.30,
    change: 1.2,
    percentChange: 1.2,
    volume: 1800000000,
    region: "United States",
    description: "NASDAQ Composite Index of securities listed on NASDAQ",
    data: {
      c: 14346.30,
      d: 1.2,
      dp: 1.2,
      h: 14375.45,
      l: 14290.80,
      o: 14320.50,
      pc: 14180.65,
      t: Date.now()
    }
  },
  {
    id: "dowjones",
    name: "Dow Jones",
    symbol: "^DJI",
    value: 36124.56,
    change: 0.32,
    percentChange: 0.32,
    volume: 850000000,
    region: "United States",
    description: "Dow Jones Industrial Average of 30 large US companies",
    data: {
      c: 36124.56,
      d: 0.32,
      dp: 0.32,
      h: 36150.60,
      l: 36098.52,
      o: 36110.00,
      pc: 36094.24,
      t: Date.now()
    }
  },
  {
    id: "ftse",
    name: "FTSE 100",
    symbol: "^FTSE",
    value: 7582.10,
    change: -0.32,
    percentChange: -0.32,
    volume: 620000000,
    region: "United Kingdom",
    description: "Financial Times Stock Exchange 100 Index of UK companies",
    data: {
      c: 7582.10,
      d: -0.32,
      dp: -0.32,
      h: 7585.22,
      l: 7578.98,
      o: 7580.00,
      pc: 7577.68,
      t: Date.now()
    }
  },
  {
    id: "dax",
    name: "DAX",
    symbol: "^GDAXI",
    value: 15947.80,
    change: -0.15,
    percentChange: -0.15,
    volume: 720000000,
    region: "Germany",
    description: "Deutscher Aktienindex of 40 major German companies",
    data: {
      c: 15947.80,
      d: -0.15,
      dp: -0.15,
      h: 15952.92,
      l: 15942.68,
      o: 15945.00,
      pc: 15943.84,
      t: Date.now()
    }
  },
  {
    id: "nikkei",
    name: "Nikkei 225",
    symbol: "^N225",
    value: 37156.45,
    change: 1.45,
    percentChange: 1.45,
    volume: 1200000000,
    region: "Japan",
    description: "Nikkei 225 Index of Japanese companies",
    data: {
      c: 37156.45,
      d: 1.45,
      dp: 1.45,
      h: 37161.57,
      l: 37151.33,
      o: 37154.00,
      pc: 37152.59,
      t: Date.now()
    }
  },
  {
    id: "shanghai",
    name: "Shanghai Composite",
    symbol: "000001.SS",
    value: 3210.40,
    change: -0.30,
    percentChange: -0.30,
    volume: 950000000,
    region: "China",
    description: "Shanghai Stock Exchange Composite Index",
    data: {
      c: 3210.40,
      d: -0.30,
      dp: -0.30,
      h: 3211.72,
      l: 3209.08,
      o: 3210.00,
      pc: 3209.70,
      t: Date.now()
    }
  },
  {
    id: "cac",
    name: "CAC 40",
    symbol: "^FCHI",
    value: 7125.80,
    change: 0.42,
    percentChange: 0.42,
    volume: 580000000,
    region: "France",
    description: "Cotation Assistée en Continu 40 Index of French companies",
    data: {
      c: 7125.80,
      d: 0.42,
      dp: 0.42,
      h: 7126.22,
      l: 7125.38,
      o: 7125.00,
      pc: 7124.58,
      t: Date.now()
    }
  },
  {
    id: "asx",
    name: "ASX 200",
    symbol: "^AXJO",
    value: 7648.25,
    change: 0.85,
    percentChange: 0.85,
    volume: 490000000,
    region: "Australia",
    description: "S&P/ASX 200 Index of Australian companies",
    data: {
      c: 7648.25,
      d: 0.85,
      dp: 0.85,
      h: 7650.17,
      l: 7646.33,
      o: 7647.00,
      pc: 7646.15,
      t: Date.now()
    }
  },
  {
    id: "hangseng",
    name: "Hang Seng",
    symbol: "^HSI",
    value: 18125.45,
    change: -1.20,
    percentChange: -1.20,
    volume: 1100000000,
    region: "Hong Kong",
    description: "Hang Seng Index of Hong Kong companies",
    data: {
      c: 18125.45,
      d: -1.20,
      dp: -1.20,
      h: 18130.57,
      l: 18119.33,
      o: 18120.00,
      pc: 18118.85,
      t: Date.now()
    }
  },
  {
    id: "kospi",
    name: "KOSPI",
    symbol: "^KS11",
    value: 2617.75,
    change: 0.68,
    percentChange: 0.68,
    volume: 750000000,
    region: "South Korea",
    description: "Korea Composite Stock Price Index",
    data: {
      c: 2617.75,
      d: 0.68,
      dp: 0.68,
      h: 2618.47,
      l: 2617.03,
      o: 2617.50,
      pc: 2617.11,
      t: Date.now()
    }
  },
  {
    id: "tsx",
    name: "S&P/TSX Composite",
    symbol: "^GSPTSE",
    value: 22143.25,
    change: 0.54,
    percentChange: 0.54,
    volume: 420000000,
    region: "Canada",
    description: "Standard & Poor's/Toronto Stock Exchange Composite Index",
    data: {
      c: 22143.25,
      d: 0.54,
      dp: 0.54,
      h: 22148.37,
      l: 22138.13,
      o: 22144.00,
      pc: 22143.69,
      t: Date.now()
    }
  },
  {
    id: "sensex",
    name: "BSE SENSEX",
    symbol: "^BSESN",
    value: 72485.15,
    change: 1.05,
    percentChange: 1.05,
    volume: 860000000,
    region: "India",
    description: "Bombay Stock Exchange Sensitive Index",
    data: {
      c: 72485.15,
      d: 1.05,
      dp: 1.05,
      h: 72492.27,
      l: 72478.03,
      o: 72480.00,
      pc: 72478.95,
      t: Date.now()
    }
  },
  {
    id: "nifty",
    name: "NIFTY 50",
    symbol: "^NSEI",
    value: 21957.30,
    change: 0.95,
    percentChange: 0.95,
    volume: 820000000,
    region: "India",
    description: "National Stock Exchange of India 50 Index",
    data: {
      c: 21957.30,
      d: 0.95,
      dp: 0.95,
      h: 21964.42,
      l: 21950.18,
      o: 21953.00,
      pc: 21952.07,
      t: Date.now()
    }
  },
  {
    id: "bovespa",
    name: "IBOVESPA",
    symbol: "^BVSP",
    value: 125784.65,
    change: -0.22,
    percentChange: -0.22,
    volume: 670000000,
    region: "Brazil",
    description: "Brasil Bolsa Balcão Index of top Brazilian companies",
    data: {
      c: 125784.65,
      d: -0.22,
      dp: -0.22,
      h: 125806.77,
      l: 125762.53,
      o: 125780.00,
      pc: 125778.83,
      t: Date.now()
    }
  },
  {
    id: "mexbol",
    name: "IPC Mexico",
    symbol: "^MXX",
    value: 53216.30,
    change: 0.38,
    percentChange: 0.38,
    volume: 310000000,
    region: "Mexico",
    description: "Índice de Precios y Cotizaciones, Mexican Stock Exchange Index",
    data: {
      c: 53216.30,
      d: 0.38,
      dp: 0.38,
      h: 53223.42,
      l: 53209.18,
      o: 53213.00,
      pc: 53212.66,
      t: Date.now()
    }
  },
  {
    id: "sti",
    name: "Straits Times Index",
    symbol: "^STI",
    value: 3317.45,
    change: 0.25,
    percentChange: 0.25,
    volume: 280000000,
    region: "Singapore",
    description: "Straits Times Index of Singapore Exchange",
    data: {
      c: 3317.45,
      d: 0.25,
      dp: 0.25,
      h: 3318.67,
      l: 3316.23,
      o: 3317.00,
      pc: 3316.79,
      t: Date.now()
    }
  },
  {
    id: "jse",
    name: "JSE All-Share",
    symbol: "J203.JO",
    value: 75412.85,
    change: -0.45,
    percentChange: -0.45,
    volume: 350000000,
    region: "South Africa",
    description: "Johannesburg Stock Exchange All-Share Index",
    data: {
      c: 75412.85,
      d: -0.45,
      dp: -0.45,
      h: 75428.97,
      l: 75396.73,
      o: 75410.00,
      pc: 75408.59,
      t: Date.now()
    }
  },
  {
    id: "omxs30",
    name: "OMX Stockholm 30",
    symbol: "^OMX",
    value: 2410.62,
    change: 0.52,
    percentChange: 0.52,
    volume: 230000000,
    region: "Sweden",
    description: "Stockholm Stock Exchange 30 Index",
    data: {
      c: 2410.62,
      d: 0.52,
      dp: 0.52,
      h: 2411.14,
      l: 2409.08,
      o: 2410.00,
      pc: 2409.46,
      t: Date.now()
    }
  },
  {
    id: "smi",
    name: "SMI",
    symbol: "^SSMI",
    value: 11684.35,
    change: 0.15,
    percentChange: 0.15,
    volume: 320000000,
    region: "Switzerland",
    description: "Swiss Market Index of top Swiss companies",
    data: {
      c: 11684.35,
      d: 0.15,
      dp: 0.15,
      h: 11685.47,
      l: 11683.23,
      o: 11684.00,
      pc: 11683.89,
      t: Date.now()
    }
  },
  {
    id: "atx",
    name: "ATX",
    symbol: "^ATX",
    value: 3428.90,
    change: -0.18,
    percentChange: -0.18,
    volume: 180000000,
    region: "Austria",
    description: "Austrian Traded Index of Wiener Börse",
    data: {
      c: 3428.90,
      d: -0.18,
      dp: -0.18,
      h: 3429.42,
      l: 3428.38,
      o: 3428.00,
      pc: 3427.82,
      t: Date.now()
    }
  },
  {
    id: "bel20",
    name: "BEL 20",
    symbol: "^BFX",
    value: 3742.65,
    change: 0.28,
    percentChange: 0.28,
    volume: 160000000,
    region: "Belgium",
    description: "Euronext Brussels BEL 20 Index",
    data: {
      c: 3742.65,
      d: 0.28,
      dp: 0.28,
      h: 3743.17,
      l: 3741.53,
      o: 3742.00,
      pc: 3741.75,
      t: Date.now()
    }
  },
  {
    id: "omxc25",
    name: "OMX Copenhagen 25",
    symbol: "^OMXC25",
    value: 2137.85,
    change: 0.35,
    percentChange: 0.35,
    volume: 140000000,
    region: "Denmark",
    description: "Copenhagen Stock Exchange 25 Index",
    data: {
      c: 2137.85,
      d: 0.35,
      dp: 0.35,
      h: 2138.37,
      l: 2136.23,
      o: 2137.00,
      pc: 2136.78,
      t: Date.now()
    }
  },
  {
    id: "hex25",
    name: "OMX Helsinki 25",
    symbol: "^OMXH25",
    value: 4852.30,
    change: 0.48,
    percentChange: 0.48,
    volume: 170000000,
    region: "Finland",
    description: "Helsinki Stock Exchange 25 Index",
    data: {
      c: 4852.30,
      d: 0.48,
      dp: 0.48,
      h: 4852.82,
      l: 4849.68,
      o: 4851.00,
      pc: 4850.66,
      t: Date.now()
    }
  },
  {
    id: "ase",
    name: "Athens General",
    symbol: "^ATH",
    value: 1274.50,
    change: -0.65,
    percentChange: -0.65,
    volume: 85000000,
    region: "Greece",
    description: "Athens Stock Exchange General Index",
    data: {
      c: 1274.50,
      d: -0.65,
      dp: -0.65,
      h: 1275.12,
      l: 1273.88,
      o: 1274.00,
      pc: 1273.94,
      t: Date.now()
    }
  },
  {
    id: "iseq",
    name: "ISEQ Overall",
    symbol: "^ISEQ",
    value: 9485.70,
    change: 0.21,
    percentChange: 0.21,
    volume: 95000000,
    region: "Ireland",
    description: "Irish Stock Exchange Overall Index",
    data: {
      c: 9485.70,
      d: 0.21,
      dp: 0.21,
      h: 9486.32,
      l: 9485.08,
      o: 9485.50,
      pc: 9485.34,
      t: Date.now()
    }
  },
  {
    id: "mib",
    name: "FTSE MIB",
    symbol: "FTSEMIB.MI",
    value: 31247.80,
    change: 0.33,
    percentChange: 0.33,
    volume: 425000000,
    region: "Italy",
    description: "FTSE Milano Italia Borsa Index",
    data: {
      c: 31247.80,
      d: 0.33,
      dp: 0.33,
      h: 31253.92,
      l: 31241.78,
      o: 31245.00,
      pc: 31243.66,
      t: Date.now()
    }
  },
  {
    id: "osebx",
    name: "Oslo Børs",
    symbol: "^OSEAX",
    value: 1442.15,
    change: 0.42,
    percentChange: 0.42,
    volume: 125000000,
    region: "Norway",
    description: "Oslo Stock Exchange Benchmark Index",
    data: {
      c: 1442.15,
      d: 0.42,
      dp: 0.42,
      h: 1442.57,
      l: 1441.73,
      o: 1442.00,
      pc: 1441.61,
      t: Date.now()
    }
  },
  {
    id: "wig20",
    name: "WIG20",
    symbol: "^WIG20",
    value: 2352.40,
    change: -0.25,
    percentChange: -0.25,
    volume: 210000000,
    region: "Poland",
    description: "Warsaw Stock Exchange WIG 20 Index",
    data: {
      c: 2352.40,
      d: -0.25,
      dp: -0.25,
      h: 2352.92,
      l: 2351.18,
      o: 2352.00,
      pc: 2351.94,
      t: Date.now()
    }
  },
  {
    id: "psi20",
    name: "PSI 20",
    symbol: "^PSI20",
    value: 6387.25,
    change: 0.18,
    percentChange: 0.18,
    volume: 115000000,
    region: "Portugal",
    description: "Portuguese Stock Index of 20 companies",
    data: {
      c: 6387.25,
      d: 0.18,
      dp: 0.18,
      h: 6387.77,
      l: 6386.63,
      o: 6387.00,
      pc: 6386.89,
      t: Date.now()
    }
  },
  {
    id: "ibex",
    name: "IBEX 35",
    symbol: "^IBEX",
    value: 10124.30,
    change: 0.52,
    percentChange: 0.52,
    volume: 385000000,
    region: "Spain",
    description: "Índice Bursátil Español of 35 Spanish companies",
    data: {
      c: 10124.30,
      d: 0.52,
      dp: 0.52,
      h: 10129.42,
      l: 10119.18,
      o: 10123.00,
      pc: 10122.66,
      t: Date.now()
    }
  },
  {
    id: "moex",
    name: "MOEX Russia",
    symbol: "IMOEX.ME",
    value: 3120.45,
    change: 0.38,
    percentChange: 0.38,
    volume: 290000000,
    region: "Russia",
    description: "Moscow Exchange Russia Index",
    data: {
      c: 3120.45,
      d: 0.38,
      dp: 0.38,
      h: 3121.17,
      l: 3119.23,
      o: 3120.00,
      pc: 3119.89,
      t: Date.now()
    }
  },
  {
    id: "tasi",
    name: "Tadawul All Share",
    symbol: "^TASI",
    value: 11827.65,
    change: 0.15,
    percentChange: 0.15,
    volume: 260000000,
    region: "Saudi Arabia",
    description: "Tadawul All Share Index of Saudi Stock Exchange",
    data: {
      c: 11827.65,
      d: 0.15,
      dp: 0.15,
      h: 11832.77,
      l: 11812.43,
      o: 11828.00,
      pc: 11827.59,
      t: Date.now()
    }
  },
  {
    id: "nz50",
    name: "NZX 50",
    symbol: "^NZ50",
    value: 11684.75,
    change: 0.22,
    percentChange: 0.22,
    volume: 175000000,
    region: "New Zealand",
    description: "New Zealand Exchange 50 Index",
    data: {
      c: 11684.75,
      d: 0.22,
      dp: 0.22,
      h: 11689.87,
      l: 11679.43,
      o: 11685.00,
      pc: 11684.67,
      t: Date.now()
    }
  },
  {
    id: "twii",
    name: "TAIEX",
    symbol: "^TWII",
    value: 19784.30,
    change: 1.85,
    percentChange: 1.85,
    volume: 630000000,
    region: "Taiwan",
    description: "Taiwan Stock Exchange Weighted Index",
    data: {
      c: 19784.30,
      d: 1.85,
      dp: 1.85,
      h: 19790.42,
      l: 19776.18,
      o: 19780.00,
      pc: 19779.66,
      t: Date.now()
    }
  },
  {
    id: "set",
    name: "SET Index",
    symbol: "^SET.BK",
    value: 1412.85,
    change: -0.35,
    percentChange: -0.35,
    volume: 320000000,
    region: "Thailand",
    description: "Stock Exchange of Thailand Index",
    data: {
      c: 1412.85,
      d: -0.35,
      dp: -0.35,
      h: 1413.57,
      l: 1411.13,
      o: 1412.00,
      pc: 1411.69,
      t: Date.now()
    }
  },
  {
    id: "klci",
    name: "FTSE Bursa Malaysia KLCI",
    symbol: "^KLSE",
    value: 1542.10,
    change: 0.28,
    percentChange: 0.28,
    volume: 240000000,
    region: "Malaysia",
    description: "Kuala Lumpur Composite Index",
    data: {
      c: 1542.10,
      d: 0.28,
      dp: 0.28,
      h: 1542.62,
      l: 1541.58,
      o: 1542.00,
      pc: 1541.94,
      t: Date.now()
    }
  },
  {
    id: "psei",
    name: "PSEi Composite",
    symbol: "^PSI",
    value: 6548.20,
    change: -0.45,
    percentChange: -0.45,
    volume: 185000000,
    region: "Philippines",
    description: "Philippine Stock Exchange PSEi Composite Index",
    data: {
      c: 6548.20,
      d: -0.45,
      dp: -0.45,
      h: 6553.32,
      l: 6542.98,
      o: 6549.00,
      pc: 6548.56,
      t: Date.now()
    }
  },
  {
    id: "jkse",
    name: "Jakarta Composite",
    symbol: "^JKSE",
    value: 7215.45,
    change: 0.32,
    percentChange: 0.32,
    volume: 275000000,
    region: "Indonesia",
    description: "Jakarta Stock Exchange Composite Index",
    data: {
      c: 7215.45,
      d: 0.32,
      dp: 0.32,
      h: 7216.17,
      l: 7214.23,
      o: 7215.00,
      pc: 7214.89,
      t: Date.now()
    }
  }
];

// Helper function to search and filter indices
export const searchIndices = (indices: IndexData[], term: string) => {
  if (!term) return indices;
  
  const lowerTerm = term.toLowerCase();
  return indices.filter(index => 
    index.name.toLowerCase().includes(lowerTerm) ||
    index.region.toLowerCase().includes(lowerTerm)
  );
};

// Filter indices by region
export const filterIndicesByRegion = (indices: IndexData[], region: string) => {
  if (region === "all") return indices;
  
  return indices.filter(index => {
    if (region === "americas") {
      return ["United States", "Canada", "Brazil", "Mexico"].includes(index.region);
    }
    if (region === "emea") {
      return ["United Kingdom", "Germany", "France", "Switzerland", "Italy", "Spain", "Netherlands"].includes(index.region);
    }
    if (region === "apac") {
      return ["Japan", "China", "Hong Kong", "Australia", "Singapore", "South Korea", "India"].includes(index.region);
    }
    return true;
  });
};

// Map country to flag code
export const getCountryFlagCode = (region: string): string => {
  const mapping: Record<string, string> = {
    "United States": "us",
    "United Kingdom": "gb",
    "Germany": "de",
    "France": "fr",
    "Japan": "jp",
    "China": "cn",
    "Hong Kong": "hk",
    "Australia": "au",
    "Canada": "ca",
    "Brazil": "br",
    "Switzerland": "ch",
    "India": "in",
    "South Korea": "kr",
    "Singapore": "sg",
    "Spain": "es",
    "Italy": "it",
    "Netherlands": "nl",
    "Mexico": "mx",
    "South Africa": "za",
    "Sweden": "se",
    "Austria": "at",
    "Belgium": "be",
    "Denmark": "dk",
    "Finland": "fi",
    "Greece": "gr",
    "Ireland": "ie",
    "Norway": "no",
    "Poland": "pl",
    "Portugal": "pt",
    "Russia": "ru",
    "Saudi Arabia": "sa",
    "New Zealand": "nz",
    "Taiwan": "tw",
    "Thailand": "th",
    "Malaysia": "my",
    "Philippines": "ph",
    "Indonesia": "id"
  };
  
  return mapping[region] || "globe";
};
