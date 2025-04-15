
export const CURRENCIES = [
  { code: "USD", name: "US Dollar (USD)" },
  { code: "EUR", name: "Euro (EUR)" },
  { code: "GBP", name: "British Pound (GBP)" },
  { code: "JPY", name: "Japanese Yen (JPY)" },
  { code: "CHF", name: "Swiss Franc (CHF)" },
  { code: "CAD", name: "Canadian Dollar (CAD)" },
  { code: "AUD", name: "Australian Dollar (AUD)" },
  { code: "NZD", name: "New Zealand Dollar (NZD)" },
  { code: "CNY", name: "Chinese Yuan (CNY)" },
  { code: "HKD", name: "Hong Kong Dollar (HKD)" },
  { code: "SGD", name: "Singapore Dollar (SGD)" },
  { code: "INR", name: "Indian Rupee (INR)" },
  { code: "BRL", name: "Brazilian Real (BRL)" },
  { code: "RUB", name: "Russian Ruble (RUB)" },
  { code: "ZAR", name: "South African Rand (ZAR)" },
  { code: "MXN", name: "Mexican Peso (MXN)" },
  { code: "SEK", name: "Swedish Krona (SEK)" },
  { code: "NOK", name: "Norwegian Krone (NOK)" },
  { code: "DKK", name: "Danish Krone (DKK)" }
];

export const extractCurrencyCode = (value: string): string => {
  // Extract currency code from the string like "US Dollar (USD)" -> "USD"
  const match = value.match(/\(([A-Z]{3})\)$/);
  return match ? match[1] : value;
};

export const getCurrencySymbol = (code: string): string => {
  switch (code) {
    case "USD": return "$";
    case "EUR": return "€";
    case "GBP": return "£";
    case "JPY": return "¥";
    case "CHF": return "CHF";
    case "CAD": return "C$";
    case "AUD": return "A$";
    case "NZD": return "NZ$";
    case "CNY": return "¥";
    case "HKD": return "HK$";
    case "SGD": return "S$";
    case "INR": return "₹";
    case "BRL": return "R$";
    case "RUB": return "₽";
    case "ZAR": return "R";
    case "MXN": return "$";
    case "SEK": return "kr";
    case "NOK": return "kr";
    case "DKK": return "kr";
    default: return code;
  }
};
