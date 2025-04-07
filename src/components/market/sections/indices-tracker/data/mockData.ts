
import { IndexData } from "../types";

export const mockIndices: IndexData[] = [
  {
    id: "sp500",
    name: "S&P 500",
    value: "4,587.20",
    change: 0.85,
    volume: "2.5B",
    region: "United States"
  },
  {
    id: "nasdaq",
    name: "NASDAQ",
    value: "14,346.30",
    change: 1.2,
    volume: "1.8B",
    region: "United States"
  },
  {
    id: "dowjones",
    name: "Dow Jones",
    value: "36,124.56",
    change: 0.32,
    volume: "850M",
    region: "United States"
  },
  {
    id: "ftse",
    name: "FTSE 100",
    value: "7,582.10",
    change: -0.32,
    volume: "620M",
    region: "United Kingdom"
  },
  {
    id: "dax",
    name: "DAX",
    value: "15,947.80",
    change: -0.15,
    volume: "720M",
    region: "Germany"
  },
  {
    id: "nikkei",
    name: "Nikkei 225",
    value: "37,156.45",
    change: 1.45,
    volume: "1.2B",
    region: "Japan"
  },
  {
    id: "shanghai",
    name: "Shanghai Composite",
    value: "3,210.40",
    change: -0.30,
    volume: "950M",
    region: "China"
  },
  {
    id: "cac",
    name: "CAC 40",
    value: "7,125.80",
    change: 0.42,
    volume: "580M",
    region: "France"
  },
  {
    id: "asx",
    name: "ASX 200",
    value: "7,648.25",
    change: 0.85,
    volume: "490M",
    region: "Australia"
  },
  {
    id: "hangseng",
    name: "Hang Seng",
    value: "18,125.45",
    change: -1.20,
    volume: "1.1B",
    region: "Hong Kong"
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
