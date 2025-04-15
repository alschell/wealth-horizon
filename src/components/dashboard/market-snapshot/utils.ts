
// Market snapshot utility functions and data
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

// Market categories
export type MarketCategory = "Indices" | "Commodities" | "Currencies" | "Cryptocurrencies" | "Bonds";

// Categories array for filtering
export const categories: MarketCategory[] = [
  "Indices",
  "Commodities",
  "Currencies", 
  "Cryptocurrencies",
  "Bonds"
];

// Market item data structure
export interface MarketItem {
  id: string;
  name: string;
  ticker: string;
  value: number;
  change: number;
  changePercent: number;
  isUp: boolean;
  category: MarketCategory;
  label?: string; // Optional label property for display
}

// Sample market data
export const marketItems: MarketItem[] = [
  // Indices
  { id: "sp500", name: "S&P 500", ticker: "SPX", value: 4536.34, change: 12.45, changePercent: 0.27, isUp: true, category: "Indices" },
  { id: "dow", name: "Dow Jones", ticker: "DJI", value: 36211.32, change: -89.62, changePercent: -0.25, isUp: false, category: "Indices" },
  { id: "nasdaq", name: "NASDAQ", ticker: "IXIC", value: 14165.81, change: 78.36, changePercent: 0.56, isUp: true, category: "Indices" },
  { id: "russell", name: "Russell 2000", ticker: "RUT", value: 1985.53, change: -12.33, changePercent: -0.62, isUp: false, category: "Indices" },
  
  // Commodities
  { id: "gold", name: "Gold", ticker: "XAU", value: 1834.60, change: 7.30, changePercent: 0.40, isUp: true, category: "Commodities" },
  { id: "silver", name: "Silver", ticker: "XAG", value: 24.15, change: 0.18, changePercent: 0.75, isUp: true, category: "Commodities" },
  { id: "oil", name: "Crude Oil", ticker: "CL", value: 79.68, change: -1.24, changePercent: -1.53, isUp: false, category: "Commodities" },
  { id: "nat_gas", name: "Natural Gas", ticker: "NG", value: 3.58, change: 0.12, changePercent: 3.47, isUp: true, category: "Commodities" },
  
  // Currencies
  { id: "eurusd", name: "EUR/USD", ticker: "EUR", value: 1.093, change: -0.002, changePercent: -0.18, isUp: false, category: "Currencies" },
  { id: "gbpusd", name: "GBP/USD", ticker: "GBP", value: 1.276, change: 0.004, changePercent: 0.31, isUp: true, category: "Currencies" },
  { id: "usdjpy", name: "USD/JPY", ticker: "JPY", value: 149.28, change: 0.53, changePercent: 0.36, isUp: true, category: "Currencies" },
  { id: "usdchf", name: "USD/CHF", ticker: "CHF", value: 0.897, change: -0.003, changePercent: -0.33, isUp: false, category: "Currencies" },
  
  // Cryptocurrencies
  { id: "btc", name: "Bitcoin", ticker: "BTC", value: 44567.82, change: 1243.67, changePercent: 2.87, isUp: true, category: "Cryptocurrencies" },
  { id: "eth", name: "Ethereum", ticker: "ETH", value: 2387.41, change: 54.23, changePercent: 2.32, isUp: true, category: "Cryptocurrencies" },
  { id: "sol", name: "Solana", ticker: "SOL", value: 143.76, change: -3.42, changePercent: -2.33, isUp: false, category: "Cryptocurrencies" },
  { id: "link", name: "Chainlink", ticker: "LINK", value: 14.93, change: 0.87, changePercent: 6.19, isUp: true, category: "Cryptocurrencies" },
  
  // Bonds
  { id: "us10y", name: "US 10Y Treasury", ticker: "US10Y", value: 4.324, change: 0.028, changePercent: 0.65, isUp: true, category: "Bonds" },
  { id: "us2y", name: "US 2Y Treasury", ticker: "US2Y", value: 4.867, change: 0.035, changePercent: 0.72, isUp: true, category: "Bonds" },
  { id: "de10y", name: "German 10Y Bund", ticker: "DE10Y", value: 2.375, change: -0.018, changePercent: -0.75, isUp: false, category: "Bonds" },
  { id: "uk10y", name: "UK 10Y Gilt", ticker: "UK10Y", value: 3.928, change: -0.007, changePercent: -0.18, isUp: false, category: "Bonds" }
];

// Save selected items to localStorage
export const saveToLocalStorage = (visibleItems: string[], itemOrder: string[]) => {
  localStorage.setItem('market-visible-items', JSON.stringify(visibleItems));
  localStorage.setItem('market-item-order', JSON.stringify(itemOrder));
};

// Load visible items from localStorage or use default (all items)
export const loadVisibleItems = (): string[] => {
  const savedItems = localStorage.getItem('market-visible-items');
  if (savedItems) {
    return JSON.parse(savedItems);
  }
  return marketItems.map(item => item.id);
};

// Load item order from localStorage or use default order
export const loadItemOrder = (): string[] => {
  const savedOrder = localStorage.getItem('market-item-order');
  if (savedOrder) {
    return JSON.parse(savedOrder);
  }
  return marketItems.map(item => item.id);
};

// Function to get color class based on change direction
export const getChangeColorClass = (isUp: boolean): string => {
  return isUp ? "text-green-600" : "text-red-600";
};

// Function to get icon based on change direction
export const getChangeIcon = (isUp: boolean) => {
  return isUp ? ArrowUpRight : ArrowDownRight;
};
