
import { MarketItem } from "./types";

// Get country flag code by category
export const getCountryFlagCode = (category: string, label: string): string => {
  if (category === "Indices") {
    const mapping: Record<string, string> = {
      "S&P 500": "us",
      "Nasdaq": "us",
      "Dow Jones": "us",
      "Nikkei 225": "jp",
      "DAX": "de",
      "FTSE 100": "gb",
      "Shanghai": "cn",
    };
    return mapping[label] || "globe";
  }
  
  if (category === "Currencies") {
    const mapping: Record<string, string> = {
      "US Dollar": "us",
      "Euro": "eu",
      "British Pound": "gb",
      "Japanese Yen": "jp",
      "Swiss Franc": "ch",
    };
    return mapping[label] || "globe";
  }

  // Default flag code
  return "globe";
};

// Define market items data
export const marketItems: MarketItem[] = [
  // Indices
  { id: "sp500", label: "S&P 500", value: "4,400.50", change: "+0.25%", category: "Indices" },
  { id: "nasdaq", label: "Nasdaq", value: "13,630.75", change: "-0.10%", category: "Indices" },
  { id: "dowjones", label: "Dow Jones", value: "34,500.20", change: "+0.15%", category: "Indices" },
  { id: "japan", label: "Nikkei 225", value: "32,450.80", change: "+1.20%", category: "Indices" },
  { id: "germany", label: "DAX", value: "15,720.30", change: "+0.22%", category: "Indices" },
  { id: "uk", label: "FTSE 100", value: "7,650.10", change: "-0.05%", category: "Indices" },
  { id: "china", label: "Shanghai", value: "3,210.40", change: "-0.30%", category: "Indices" },
  
  // Cryptocurrencies
  { id: "bitcoin", label: "Bitcoin", value: "29,500.00", change: "+1.50%", category: "Cryptocurrencies" },
  { id: "ethereum", label: "Ethereum", value: "1,850.40", change: "+0.75%", category: "Cryptocurrencies" },
  
  // Commodities
  { id: "gold", label: "Gold", value: "$1,850.20", change: "+0.35%", category: "Commodities" },
  { id: "oil", label: "Crude Oil", value: "$79.15", change: "-0.60%", category: "Commodities" },
  
  // Currencies
  { id: "dollar", label: "US Dollar", value: "1.0870", change: "+0.12%", category: "Currencies" },
];

// Get unique categories
export const categories = [...new Set(marketItems.map(item => item.category))];

// Get sorted items
export const getAlphabeticallySortedItems = () => {
  return [...marketItems].sort((a, b) => a.label.localeCompare(b.label));
};

// Load visible items from localStorage
export const loadVisibleItems = (): string[] => {
  try {
    const saved = localStorage.getItem("marketSnapshotVisibleItems");
    return saved ? JSON.parse(saved) : getAlphabeticallySortedItems().map(item => item.id);
  } catch (e) {
    return getAlphabeticallySortedItems().map(item => item.id);
  }
};

// Load item order from localStorage
export const loadItemOrder = (): string[] => {
  try {
    const savedOrder = localStorage.getItem("marketSnapshotItemOrder");
    return savedOrder ? JSON.parse(savedOrder) : getAlphabeticallySortedItems().map(item => item.id);
  } catch (e) {
    return getAlphabeticallySortedItems().map(item => item.id);
  }
};

// Save to localStorage
export const saveToLocalStorage = (visibleItems: string[], itemOrder: string[]) => {
  localStorage.setItem("marketSnapshotVisibleItems", JSON.stringify(visibleItems));
  localStorage.setItem("marketSnapshotItemOrder", JSON.stringify(itemOrder));
};
