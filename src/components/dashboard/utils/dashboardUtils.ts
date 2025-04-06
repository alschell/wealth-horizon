
import { formatDistanceToNow, format } from "date-fns";

/**
 * Formats a date relative to now (e.g., "2 days ago")
 */
export const formatRelativeDate = (date: Date | string | number): string => {
  const dateObj = typeof date === 'string' || typeof date === 'number' 
    ? new Date(date) 
    : date;
    
  return formatDistanceToNow(dateObj, { addSuffix: true });
};

/**
 * Formats a date in a standard dashboard format
 */
export const formatDashboardDate = (date: Date | string | number): string => {
  const dateObj = typeof date === 'string' || typeof date === 'number' 
    ? new Date(date) 
    : date;
    
  return format(dateObj, 'MMM d, yyyy');
};

/**
 * Truncates text with an ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Formats a number as currency
 */
export const formatCurrency = (
  amount: number, 
  currency: string = 'USD', 
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

/**
 * Formats a number with thousands separators
 */
export const formatNumber = (
  num: number, 
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale).format(num);
};
