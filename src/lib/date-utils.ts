/**
 * Utility functions for date formatting and manipulation
 */

/**
 * Formats a date to a human-readable string (e.g. "Today", "Yesterday", "April 5, 2025")
 * @param date - The date to format
 * @returns A human-readable string representation of the date
 */
export function formatDate(date: Date): string {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  
  // Check if the date is today
  if (isSameDay(date, today)) {
    return "Today";
  }
  
  // Check if the date is yesterday
  if (isSameDay(date, yesterday)) {
    return "Yesterday";
  }
  
  // Otherwise, format as month day, year
  return date.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });
}

/**
 * Formats a date to a relative time string (e.g. "2 hours ago", "Yesterday", "April 5")
 * @param date - The date to format
 * @returns A relative time string
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return "just now";
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) {
    return "Yesterday";
  }
  
  if (diffInDays < 30) {
    return `${diffInDays} days ago`;
  }
  
  // For older dates, just show the formatted date
  return date.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric' 
  });
}

/**
 * Checks if two dates are the same day
 * @param date1 - The first date
 * @param date2 - The second date
 * @returns True if the dates are the same day, false otherwise
 */
export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * Checks if a date is within a specified number of days from now
 * @param date - The date to check
 * @param days - The number of days
 * @returns True if the date is within the specified number of days, false otherwise
 */
export function isWithinDays(date: Date, days: number): boolean {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  
  return diffInDays <= days;
}
