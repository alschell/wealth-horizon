
import { useCurrency } from "@/hooks/use-currency";

interface FormatOptions {
  notation?: 'standard' | 'scientific' | 'engineering' | 'compact';
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  signDisplay?: 'auto' | 'never' | 'always' | 'exceptZero';
}

/**
 * Formats a number as a currency string using the provided currency code and options
 */
export function formatCurrency(
  amount: number,
  currencyCode: string = 'USD',
  options: FormatOptions = {}
): string {
  const {
    notation = 'standard',
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
    signDisplay = 'auto'
  } = options;

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    notation,
    minimumFractionDigits,
    maximumFractionDigits,
    signDisplay
  }).format(amount);
}

/**
 * Formats a number as a compact currency string (e.g., $1.2M)
 */
export function formatCompactCurrency(
  amount: number,
  currencyCode: string = 'USD',
  options: Omit<FormatOptions, 'notation'> = {}
): string {
  return formatCurrency(amount, currencyCode, {
    ...options,
    notation: 'compact',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  });
}

/**
 * Returns currency information for a given currency code
 */
export function getCurrencyInfo(currencyCode: string): {
  symbol: string;
  name: string;
} | undefined {
  const currencyMap: Record<string, { symbol: string; name: string }> = {
    USD: { symbol: '$', name: 'US Dollar' },
    EUR: { symbol: '€', name: 'Euro' },
    GBP: { symbol: '£', name: 'British Pound' },
    JPY: { symbol: '¥', name: 'Japanese Yen' },
    CHF: { symbol: 'Fr', name: 'Swiss Franc' },
    CNY: { symbol: '¥', name: 'Chinese Yuan' },
    AUD: { symbol: 'A$', name: 'Australian Dollar' },
    CAD: { symbol: 'C$', name: 'Canadian Dollar' },
    SGD: { symbol: 'S$', name: 'Singapore Dollar' },
    HKD: { symbol: 'HK$', name: 'Hong Kong Dollar' },
  };

  return currencyMap[currencyCode];
}

/**
 * Converts an amount from one currency to another using the provided exchange rates
 */
export function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  exchangeRates: Record<string, number>
): number {
  if (fromCurrency === toCurrency) return amount;
  
  // Convert to USD as base currency first (assuming USD is the base in exchangeRates)
  const amountInUSD = fromCurrency === "USD" 
    ? amount 
    : amount / exchangeRates[fromCurrency];
  
  // Convert from USD to target currency
  return toCurrency === "USD" 
    ? amountInUSD 
    : amountInUSD * exchangeRates[toCurrency];
}

/**
 * Formats a percentage with the specified number of decimal places
 */
export function formatPercentage(
  value: number,
  options: {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    signDisplay?: 'auto' | 'never' | 'always' | 'exceptZero';
  } = {}
): string {
  const {
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
    signDisplay = 'auto'
  } = options;

  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits,
    maximumFractionDigits,
    signDisplay
  }).format(value / 100);
}
