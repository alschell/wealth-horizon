// Market items and categories
export interface MarketItem {
  id: string;
  label: string;
  value: string;
  change: string;
  category: "Indices" | "Cryptocurrencies" | "Currencies" | "Commodities";
}

export const categories = ["Indices", "Commodities", "Currencies", "Bonds"];

export const marketItems: MarketItem[] = [
  // Indices
  { id: "sp500", label: "S&P 500", category: "Indices", value: "4486.83", change: "20.12" },
  { id: "nasdaq", label: "NASDAQ", category: "Indices", value: "14897.34", change: "110.98" },
  { id: "dowjones", label: "Dow Jones", category: "Indices", value: "35559.18", change: "99.12" },
  { id: "ftse100", label: "FTSE 100", category: "Indices", value: "7652.55", change: "-10.89" },
  { id: "nikkei225", label: "Nikkei 225", category: "Indices", value: "32851.24", change: "295.17" },
  
  // Commodities
  { id: "gold", label: "Gold", category: "Commodities", value: "1985.12", change: "6.75" },
  { id: "silver", label: "Silver", category: "Commodities", value: "24.56", change: "0.16" },
  { id: "crude-oil", label: "Crude Oil", category: "Commodities", value: "76.38", change: "-0.69" },
  { id: "natural-gas", label: "Natural Gas", category: "Commodities", value: "2.87", change: "0.035" },
  
  // Currencies
  { id: "eur-usd", label: "EUR/USD", category: "Currencies", value: "1.0945", change: "0.0012" },
  { id: "gbp-usd", label: "GBP/USD", category: "Currencies", value: "1.2834", change: "-0.0028" },
  { id: "usd-jpy", label: "USD/JPY", category: "Currencies", value: "141.86", change: "0.64" },
  { id: "usd-chf", label: "USD/CHF", category: "Currencies", value: "0.9124", change: "-0.0017" },
  
  // Bonds
  { id: "us-10y", label: "US 10Y", category: "Bonds", value: "4.268", change: "0.033" },
  { id: "us-30y", label: "US 30Y", category: "Bonds", value: "4.375", change: "0.027" },
  { id: "ger-10y", label: "German 10Y", category: "Bonds", value: "2.457", change: "0.021" },
  { id: "uk-10y", label: "UK 10Y", category: "Bonds", value: "4.179", change: "0.015" }
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
