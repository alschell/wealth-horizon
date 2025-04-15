
import { IndexData } from "../types";

export const mockIndices: IndexData[] = [
  {
    id: "sp500",
    symbol: "^GSPC",
    name: "S&P 500",
    currentValue: "4,587.20",
    change: "0.85",
    volume: "2.5B",
    region: "United States",
    isPositive: true
  },
  {
    id: "nasdaq",
    symbol: "^IXIC",
    name: "NASDAQ",
    currentValue: "14,346.30",
    change: "1.2",
    volume: "1.8B",
    region: "United States",
    isPositive: true
  },
  {
    id: "dowjones",
    symbol: "^DJI",
    name: "Dow Jones",
    currentValue: "36,124.56",
    change: "0.32",
    volume: "850M",
    region: "United States",
    isPositive: true
  },
  {
    id: "ftse",
    symbol: "^FTSE",
    name: "FTSE 100",
    currentValue: "7,582.10",
    change: "-0.32",
    volume: "620M",
    region: "United Kingdom",
    isPositive: false
  },
  {
    id: "dax",
    symbol: "^GDAXI",
    name: "DAX",
    currentValue: "15,947.80",
    change: "-0.15",
    volume: "720M",
    region: "Germany",
    isPositive: false
  },
  {
    id: "nikkei",
    symbol: "^N225",
    name: "Nikkei 225",
    currentValue: "37,156.45",
    change: "1.45",
    volume: "1.2B",
    region: "Japan",
    isPositive: true
  },
  {
    id: "shanghai",
    symbol: "000001.SS",
    name: "Shanghai Composite",
    currentValue: "3,210.40",
    change: "-0.30",
    volume: "950M",
    region: "China",
    isPositive: false
  },
  {
    id: "cac",
    symbol: "^FCHI",
    name: "CAC 40",
    currentValue: "7,125.80",
    change: "0.42",
    volume: "580M",
    region: "France",
    isPositive: true
  },
  {
    id: "asx",
    symbol: "^AXJO",
    name: "ASX 200",
    currentValue: "7,648.25",
    change: "0.85",
    volume: "490M",
    region: "Australia",
    isPositive: true
  },
  {
    id: "hangseng",
    symbol: "^HSI",
    name: "Hang Seng",
    currentValue: "18,125.45",
    change: "-1.20",
    volume: "1.1B",
    region: "Hong Kong",
    isPositive: false
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
