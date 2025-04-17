
import { IndexData } from "../types";

export const mockIndices: IndexData[] = [
  {
    id: "sp500",
    name: "S&P 500",
    symbol: "^GSPC",
    value: 4587.20,
    change: 0.85,
    percentChange: 0.85,
    volume: "2.5B",
    region: "United States",
    description: "Standard & Poor's 500 Index of 500 large US companies"
  },
  {
    id: "nasdaq",
    name: "NASDAQ",
    symbol: "^IXIC",
    value: 14346.30,
    change: 1.2,
    percentChange: 1.2,
    volume: "1.8B",
    region: "United States",
    description: "NASDAQ Composite Index of securities listed on NASDAQ"
  },
  {
    id: "dowjones",
    name: "Dow Jones",
    symbol: "^DJI",
    value: 36124.56,
    change: 0.32,
    percentChange: 0.32,
    volume: "850M",
    region: "United States",
    description: "Dow Jones Industrial Average of 30 large US companies"
  },
  {
    id: "ftse",
    name: "FTSE 100",
    symbol: "^FTSE",
    value: 7582.10,
    change: -0.32,
    percentChange: -0.32,
    volume: "620M",
    region: "United Kingdom",
    description: "Financial Times Stock Exchange 100 Index of UK companies"
  },
  {
    id: "dax",
    name: "DAX",
    symbol: "^GDAXI",
    value: 15947.80,
    change: -0.15,
    percentChange: -0.15,
    volume: "720M",
    region: "Germany",
    description: "Deutscher Aktienindex of 40 major German companies"
  },
  {
    id: "nikkei",
    name: "Nikkei 225",
    symbol: "^N225",
    value: 37156.45,
    change: 1.45,
    percentChange: 1.45,
    volume: "1.2B",
    region: "Japan",
    description: "Nikkei 225 Index of Japanese companies"
  },
  {
    id: "shanghai",
    name: "Shanghai Composite",
    symbol: "000001.SS",
    value: 3210.40,
    change: -0.30,
    percentChange: -0.30,
    volume: "950M",
    region: "China",
    description: "Shanghai Stock Exchange Composite Index"
  },
  {
    id: "cac",
    name: "CAC 40",
    symbol: "^FCHI",
    value: 7125.80,
    change: 0.42,
    percentChange: 0.42,
    volume: "580M",
    region: "France",
    description: "Cotation Assistée en Continu 40 Index of French companies"
  },
  {
    id: "asx",
    name: "ASX 200",
    symbol: "^AXJO",
    value: 7648.25,
    change: 0.85,
    percentChange: 0.85,
    volume: "490M",
    region: "Australia",
    description: "S&P/ASX 200 Index of Australian companies"
  },
  {
    id: "hangseng",
    name: "Hang Seng",
    symbol: "^HSI",
    value: 18125.45,
    change: -1.20,
    percentChange: -1.20,
    volume: "1.1B",
    region: "Hong Kong",
    description: "Hang Seng Index of Hong Kong companies"
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
    "Mexico": "mx"
  };
  
  return mapping[region] || "globe";
};
