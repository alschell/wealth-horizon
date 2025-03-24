
// Currencies constants with symbols
export const CURRENCIES = [
  "USD - US Dollar",
  "EUR - Euro",
  "GBP - British Pound",
  "CHF - Swiss Franc",
  "JPY - Japanese Yen",
  "CNY - Chinese Yuan",
  "CAD - Canadian Dollar",
  "AUD - Australian Dollar",
  "HKD - Hong Kong Dollar",
  "SGD - Singapore Dollar",
  "NZD - New Zealand Dollar",
  "SEK - Swedish Krona",
  "NOK - Norwegian Krone",
  "DKK - Danish Krone",
  "BRL - Brazilian Real",
  "INR - Indian Rupee",
  "MXN - Mexican Peso",
  "ZAR - South African Rand",
  "RUB - Russian Ruble",
  "TRY - Turkish Lira",
  "AED - UAE Dirham",
  "SAR - Saudi Riyal",
  "KRW - South Korean Won",
  "PLN - Polish Zloty",
  "THB - Thai Baht",
  "IDR - Indonesian Rupiah",
  "PHP - Philippine Peso",
  "MYR - Malaysian Ringgit",
  "CZK - Czech Koruna",
  "HUF - Hungarian Forint"
].sort();

// Common currencies subset for simpler forms
export const COMMON_CURRENCIES = [
  "USD - US Dollar",
  "EUR - Euro",
  "GBP - British Pound",
  "CHF - Swiss Franc",
  "JPY - Japanese Yen",
  "CNY - Chinese Yuan",
  "CAD - Canadian Dollar",
  "AUD - Australian Dollar",
  "HKD - Hong Kong Dollar",
  "SGD - Singapore Dollar",
  "NZD - New Zealand Dollar",
  "SEK - Swedish Krona",
  "NOK - Norwegian Krone",
  "DKK - Danish Krone",
  "BRL - Brazilian Real",
  "INR - Indian Rupee",
  "MXN - Mexican Peso",
  "ZAR - South African Rand"
].sort();

// Helper function to extract currency code from option
export const extractCurrencyCode = (currencyOption: string): string => {
  return currencyOption.split(" - ")[0];
};
