
/**
 * Gets the appropriate country code for a flag icon
 * 
 * @param category The category of the market item
 * @param label The label of the market item
 * @returns The country code for the flag
 */
export const getCountryFlagCode = (category: string, label: string): string => {
  // Map for country names to ISO codes
  const countryCodes: Record<string, string> = {
    // Major indices
    "S&P 500": "us",
    "Dow Jones": "us",
    "Nasdaq": "us",
    "Russell 2000": "us",
    "FTSE 100": "gb",
    "DAX": "de",
    "CAC 40": "fr",
    "Nikkei 225": "jp",
    "Hang Seng": "hk",
    "Shanghai Composite": "cn",
    "Sensex": "in",
    "ASX 200": "au",
    "TSX Composite": "ca",
    
    // Currencies
    "EUR/USD": "eu",
    "GBP/USD": "gb",
    "USD/JPY": "jp", 
    "USD/CHF": "ch",
    "USD/CAD": "ca",
    "AUD/USD": "au",
    "NZD/USD": "nz"
  };
  
  // Check if the label exists in our mapping
  if (label in countryCodes) {
    return countryCodes[label];
  }
  
  // Default fallbacks based on currency codes
  if (category === "Currencies") {
    // Check if it's a currency pair like EUR/USD
    const parts = label.split('/');
    if (parts.length === 2) {
      // For pairs, use the first currency's code
      const firstCurrency = parts[0];
      
      // Map of currency codes to country codes
      const currencyToCountry: Record<string, string> = {
        "EUR": "eu",
        "USD": "us",
        "GBP": "gb",
        "JPY": "jp",
        "CHF": "ch",
        "CAD": "ca",
        "AUD": "au",
        "NZD": "nz",
        "CNY": "cn",
        "HKD": "hk",
        "SGD": "sg"
      };
      
      if (firstCurrency in currencyToCountry) {
        return currencyToCountry[firstCurrency];
      }
    }
  }
  
  // If the item is a country-specific index, try to extract the country
  if (category === "Indices" && label.includes(" ")) {
    const words = label.split(" ");
    const lastWord = words[words.length - 1];
    
    // Map of common index suffixes to country codes
    const indexToCountry: Record<string, string> = {
      "Index": "us", // Default for "X Index" 
      "Composite": "us",
      "500": "us",
      "100": "gb",
      "40": "fr",
      "30": "de",
      "225": "jp"
    };
    
    if (lastWord in indexToCountry) {
      return indexToCountry[lastWord];
    }
  }
  
  // Default fallback
  return "us";
};
