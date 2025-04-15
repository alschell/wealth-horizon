
export interface Currency {
  code: string;
  name: string;
}

export const CURRENCIES: Currency[] = [
  { code: "USD", name: "US Dollar (USD)" },
  { code: "EUR", name: "Euro (EUR)" },
  { code: "GBP", name: "British Pound (GBP)" },
  { code: "JPY", name: "Japanese Yen (JPY)" },
  { code: "CHF", name: "Swiss Franc (CHF)" },
  { code: "CAD", name: "Canadian Dollar (CAD)" },
  { code: "AUD", name: "Australian Dollar (AUD)" },
  { code: "CNY", name: "Chinese Yuan (CNY)" },
  { code: "HKD", name: "Hong Kong Dollar (HKD)" },
  { code: "SGD", name: "Singapore Dollar (SGD)" }
];

// Utility function to extract currency code from a string like "US Dollar (USD)"
export const extractCurrencyCode = (currencyString: string): string => {
  const match = currencyString.match(/\(([^)]+)\)/);
  return match ? match[1] : currencyString;
};
