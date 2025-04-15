
import { useState, useEffect } from 'react';

interface Currency {
  code: string;
  symbol: string;
  name: string;
}

export const useCurrency = () => {
  const currencies: Currency[] = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
    { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar' },
    { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
  ];

  // Get from localStorage or default to USD
  const [activeCurrency, setActiveCurrency] = useState<Currency>(() => {
    const savedCurrency = localStorage.getItem('activeCurrency');
    return savedCurrency 
      ? JSON.parse(savedCurrency) 
      : currencies[0];
  });

  // Save to localStorage when changed
  useEffect(() => {
    localStorage.setItem('activeCurrency', JSON.stringify(activeCurrency));
  }, [activeCurrency]);

  // Format a number to the active currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: activeCurrency.code,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return {
    currencies,
    activeCurrency,
    setActiveCurrency,
    formatCurrency
  };
};

export default useCurrency;
