
// Market items and categories
import { MarketCategory, MarketItem } from './types';

export const categories = ["Indices", "Commodities", "Currencies", "Bonds"];

export const marketItems: MarketItem[] = [
  // Indices
  { 
    id: "sp500", 
    ticker: "SPX", 
    name: "S&P 500", 
    category: "Indices", 
    value: "4486.83", 
    change: "20.12", 
    changePercent: "0.45%", 
    isUp: true 
  },
  { 
    id: "nasdaq", 
    ticker: "COMP", 
    name: "NASDAQ", 
    category: "Indices", 
    value: "14897.34", 
    change: "110.98", 
    changePercent: "0.75%", 
    isUp: true 
  },
  { 
    id: "dowjones", 
    ticker: "DJIA", 
    name: "Dow Jones", 
    category: "Indices", 
    value: "35559.18", 
    change: "99.12", 
    changePercent: "0.28%", 
    isUp: true 
  },
  { 
    id: "ftse100", 
    ticker: "UKX", 
    name: "FTSE 100", 
    category: "Indices", 
    value: "7652.55", 
    change: "-10.89", 
    changePercent: "-0.14%", 
    isUp: false 
  },
  { 
    id: "nikkei225", 
    ticker: "NKY", 
    name: "Nikkei 225", 
    category: "Indices", 
    value: "32851.24", 
    change: "295.17", 
    changePercent: "0.91%", 
    isUp: true 
  },
  
  // Commodities
  { 
    id: "gold", 
    ticker: "XAU", 
    name: "Gold", 
    category: "Commodities", 
    value: "1985.12", 
    change: "6.75", 
    changePercent: "0.34%", 
    isUp: true 
  },
  { 
    id: "silver", 
    ticker: "XAG", 
    name: "Silver", 
    category: "Commodities", 
    value: "24.56", 
    change: "0.16", 
    changePercent: "0.66%", 
    isUp: true 
  },
  { 
    id: "crude-oil", 
    ticker: "CL1", 
    name: "Crude Oil", 
    category: "Commodities", 
    value: "76.38", 
    change: "-0.69", 
    changePercent: "-0.90%", 
    isUp: false 
  },
  { 
    id: "natural-gas", 
    ticker: "NG1", 
    name: "Natural Gas", 
    category: "Commodities", 
    value: "2.87", 
    change: "0.035", 
    changePercent: "1.23%", 
    isUp: true 
  },
  
  // Currencies
  { 
    id: "eur-usd", 
    ticker: "EURUSD", 
    name: "EUR/USD", 
    category: "Currencies", 
    value: "1.0945", 
    change: "0.0012", 
    changePercent: "0.11%", 
    isUp: true 
  },
  { 
    id: "gbp-usd", 
    ticker: "GBPUSD", 
    name: "GBP/USD", 
    category: "Currencies", 
    value: "1.2834", 
    change: "-0.0028", 
    changePercent: "-0.22%", 
    isUp: false 
  },
  { 
    id: "usd-jpy", 
    ticker: "USDJPY", 
    name: "USD/JPY", 
    category: "Currencies", 
    value: "141.86", 
    change: "0.64", 
    changePercent: "0.45%", 
    isUp: true 
  },
  { 
    id: "usd-chf", 
    ticker: "USDCHF", 
    name: "USD/CHF", 
    category: "Currencies", 
    value: "0.9124", 
    change: "-0.0017", 
    changePercent: "-0.19%", 
    isUp: false 
  },
  
  // Bonds
  { 
    id: "us-10y", 
    ticker: "US10Y", 
    name: "US 10Y", 
    category: "Bonds" as MarketCategory, 
    value: "4.268", 
    change: "0.033", 
    changePercent: "0.78%", 
    isUp: true 
  },
  { 
    id: "us-30y", 
    ticker: "US30Y", 
    name: "US 30Y", 
    category: "Bonds" as MarketCategory, 
    value: "4.375", 
    change: "0.027", 
    changePercent: "0.62%", 
    isUp: true 
  },
  { 
    id: "ger-10y", 
    ticker: "GER10Y", 
    name: "German 10Y", 
    category: "Bonds" as MarketCategory, 
    value: "2.457", 
    change: "0.021", 
    changePercent: "0.86%", 
    isUp: true 
  },
  { 
    id: "uk-10y", 
    ticker: "UK10Y", 
    name: "UK 10Y", 
    category: "Bonds" as MarketCategory, 
    value: "4.179", 
    change: "0.015", 
    changePercent: "0.36%", 
    isUp: true 
  }
];

// Utility functions for market snapshot

/**
 * Gets the country code for flag display based on market item category and label
 */
export const getCountryFlagCode = (category: string, label: string): string => {
  // Map common indices to country codes
  const indicesMap: Record<string, string> = {
    'S&P 500': 'us',
    'NASDAQ': 'us',
    'Dow Jones': 'us',
    'FTSE 100': 'gb',
    'DAX': 'de',
    'CAC 40': 'fr',
    'Nikkei 225': 'jp',
    'Hang Seng': 'hk',
    'Shanghai Composite': 'cn',
    'KOSPI': 'kr',
    'ASX 200': 'au',
    'Sensex': 'in',
    'Bovespa': 'br'
  };

  // Map currencies to country codes
  const currencyMap: Record<string, string> = {
    'USD': 'us',
    'EUR': 'eu',
    'GBP': 'gb',
    'JPY': 'jp',
    'CHF': 'ch',
    'CAD': 'ca',
    'AUD': 'au',
    'CNY': 'cn',
    'HKD': 'hk',
    'SGD': 'sg',
    'EUR/USD': 'eu',
    'USD/JPY': 'jp',
    'GBP/USD': 'gb',
    'USD/CHF': 'ch',
    'USD/CAD': 'ca',
    'AUD/USD': 'au',
    'USD/CNY': 'cn'
  };

  if (category === "Indices") {
    return indicesMap[label] || 'us';
  } else if (category === "Currencies") {
    // Extract currency code from pair or use direct mapping
    const currency = label.split('/')[0];
    return currencyMap[label] || currencyMap[currency] || 'us';
  }

  // Default fallback
  return 'us';
};

export const loadVisibleItems = (): string[] => {
  try {
    const stored = localStorage.getItem('market-snapshot-visible-items');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading visible items:', error);
  }
  // Default visible items - first 6
  return marketItems.slice(0, 6).map(item => item.id);
};

export const loadItemOrder = (): string[] => {
  try {
    const stored = localStorage.getItem('market-snapshot-item-order');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading item order:', error);
  }
  // Default order is the order of all items
  return marketItems.map(item => item.id);
};

export const saveToLocalStorage = (visibleItems: string[], itemOrder: string[]): void => {
  try {
    localStorage.setItem('market-snapshot-visible-items', JSON.stringify(visibleItems));
    localStorage.setItem('market-snapshot-item-order', JSON.stringify(itemOrder));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};
