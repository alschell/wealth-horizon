
/**
 * Cache management for market data
 */

// Cache keys
const CACHE_KEYS = {
  MARKET_ITEMS: 'market_items_cache',
  INDICES: 'indices_cache',
  NEWS: 'news_cache',
  QUOTES: 'quotes_cache',
};

// Cache expiration times (in milliseconds)
const CACHE_EXPIRATION = {
  MARKET_ITEMS: 5 * 60 * 1000, // 5 minutes
  INDICES: 5 * 60 * 1000, // 5 minutes
  NEWS: 30 * 60 * 1000, // 30 minutes
  QUOTES: 5 * 60 * 1000, // 5 minutes
};

// Cache item interface
interface CacheItem<T> {
  data: T;
  timestamp: number;
}

/**
 * Save data to cache
 */
export function saveToCache<T>(key: string, data: T): void {
  if (!data) return;
  
  try {
    const cacheItem: CacheItem<T> = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(cacheItem));
    console.log(`Data saved to cache: ${key}`);
  } catch (error) {
    console.error(`Error saving to cache (${key}):`, error);
  }
}

/**
 * Get data from cache
 */
export function getFromCache<T>(key: string, maxAge: number = 60 * 60 * 1000): T | null {
  try {
    const cachedData = localStorage.getItem(key);
    if (!cachedData) return null;
    
    const cacheItem: CacheItem<T> = JSON.parse(cachedData);
    const now = Date.now();
    const age = now - cacheItem.timestamp;
    
    // Return data if it's within the max age
    if (age < maxAge) {
      console.log(`Using cached data for ${key} (age: ${(age / 1000).toFixed(0)}s)`);
      return cacheItem.data;
    }
    
    console.log(`Cached data for ${key} expired (age: ${(age / 1000).toFixed(0)}s)`);
    return null;
  } catch (error) {
    console.error(`Error reading from cache (${key}):`, error);
    return null;
  }
}

/**
 * Clear specific cache
 */
export function clearCache(key: string): void {
  localStorage.removeItem(key);
}

// Export cache constants
export { CACHE_KEYS, CACHE_EXPIRATION };
