
import { MarketItem } from "./types";

// Helper function to get country flag code based on market item
export const getCountryFlagCode = (category: string, label: string): string => {
  if (category === "Indices") {
    // Map common indices to their country codes
    const indexToCountry: Record<string, string> = {
      "S&P 500": "us",
      "Dow Jones": "us",
      "NASDAQ": "us",
      "FTSE 100": "gb",
      "Nikkei 225": "jp",
      "DAX": "de",
      "CAC 40": "fr",
      "ASX 200": "au",
      "Hang Seng": "hk",
      "SSE Composite": "cn",
    };
    return indexToCountry[label] || "us";
  } else if (category === "Currencies") {
    // For currencies, use the first country code
    const currencyPair = label.split('/');
    if (currencyPair.length === 2) {
      const firstCurrency = currencyPair[0].toLowerCase();
      const currencyToCountry: Record<string, string> = {
        "eur": "eu",
        "usd": "us",
        "gbp": "gb",
        "jpy": "jp",
        "aud": "au",
        "cad": "ca",
        "chf": "ch",
        "cny": "cn",
      };
      return currencyToCountry[firstCurrency] || "us";
    }
  }
  return "us"; // Default to US flag
};

// Sample market items for the UI
export const marketItems: MarketItem[] = [
  // Indices
  { id: "sp500", label: "S&P 500", value: "4,587.20", change: "+0.65%", category: "Indices" },
  { id: "nasdaq", label: "NASDAQ", value: "14,346.30", change: "+1.20%", category: "Indices" },
  { id: "djia", label: "Dow Jones", value: "36,124.56", change: "+0.32%", category: "Indices" },
  { id: "ftse", label: "FTSE 100", value: "7,582.10", change: "-0.32%", category: "Indices" },
  { id: "nikkei", label: "Nikkei 225", value: "37,156.45", change: "+1.45%", category: "Indices" },
  
  // Currencies
  { id: "eur-usd", label: "EUR/USD", value: "1.0875", change: "+0.15%", category: "Currencies" },
  { id: "gbp-usd", label: "GBP/USD", value: "1.2650", change: "-0.23%", category: "Currencies" },
  { id: "usd-jpy", label: "USD/JPY", value: "151.25", change: "+0.42%", category: "Currencies" },
  { id: "usd-cad", label: "USD/CAD", value: "1.3575", change: "+0.08%", category: "Currencies" },
  
  // Cryptocurrencies
  { id: "btc-usd", label: "Bitcoin", value: "$51,234.85", change: "-2.15%", category: "Cryptocurrencies" },
  { id: "eth-usd", label: "Ethereum", value: "$2,876.42", change: "-1.32%", category: "Cryptocurrencies" },
  
  // Commodities
  { id: "gold", label: "Gold", value: "$2,356.70", change: "+0.75%", category: "Commodities" },
  { id: "wti-crude", label: "Crude Oil", value: "$75.46", change: "-0.65%", category: "Commodities" },
  { id: "silver", label: "Silver", value: "$28.12", change: "+1.15%", category: "Commodities" },
];

// Categories for market items
export const categories = ["Indices", "Currencies", "Cryptocurrencies", "Commodities"];
