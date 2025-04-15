
import { useState } from "react";

type Currency = {
  code: string;
  symbol: string;
  name: string;
};

const currencies: Currency[] = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "CHF", symbol: "Fr", name: "Swiss Franc" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "SGD", symbol: "S$", name: "Singapore Dollar" },
  { code: "HKD", symbol: "HK$", name: "Hong Kong Dollar" },
];

export function useCurrency() {
  const [activeCurrency, setActiveCurrency] = useState<Currency>(currencies[0]);

  const formatAmount = (amount: number, options?: Intl.NumberFormatOptions): string => {
    const defaultOptions: Intl.NumberFormatOptions = {
      style: 'currency',
      currency: activeCurrency.code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      ...options
    };
    
    return new Intl.NumberFormat('en-US', defaultOptions).format(amount);
  };

  const formatCompact = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: activeCurrency.code,
      notation: 'compact',
      compactDisplay: 'short',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(amount);
  };

  const convertCurrency = (amount: number, fromCurrency: string, toCurrency: string, rates: Record<string, number>): number => {
    if (fromCurrency === toCurrency) return amount;
    
    // Convert to USD as base currency first
    const amountInUSD = fromCurrency === "USD" ? amount : amount / rates[fromCurrency];
    
    // Convert from USD to target currency
    return toCurrency === "USD" ? amountInUSD : amountInUSD * rates[toCurrency];
  };

  return {
    currencies,
    activeCurrency,
    setActiveCurrency,
    formatAmount,
    formatCompact,
    convertCurrency
  };
}
