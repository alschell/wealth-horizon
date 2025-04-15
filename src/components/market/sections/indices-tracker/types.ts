
/**
 * Represents stock market index data
 */
export interface IndexData {
  /** Unique identifier for the index */
  id: string;
  
  /** Name of the index (e.g., "S&P 500", "NASDAQ") */
  name: string;
  
  /** Current value of the index */
  value: string;
  
  /** Percentage change from previous close */
  change: number;
  
  /** Trading volume */
  volume: string;
  
  /** Region/country of the index */
  region: string;
  
  /** Is the market currently open? */
  isMarketOpen?: boolean;
  
  /** Last update timestamp */
  lastUpdated?: string | Date;
  
  /** Previous close value */
  previousClose?: string;
  
  /** Opening value for the current session */
  openValue?: string;
  
  /** Currency the index is denominated in */
  currency?: string;
}

/**
 * Represents a data point for time-series charts
 */
export interface ChartDataPoint {
  /** Date/time of the data point */
  date: string;
  
  /** Value at the given date/time */
  value: number;
  
  /** Optional volume data */
  volume?: number;
  
  /** Optional boolean indicating if this is a highlighted point */
  isHighlighted?: boolean;
}

/**
 * Filter options for indices
 */
export type IndexFilterOption = 'all' | 'americas' | 'europe' | 'asia' | 'other';

/**
 * Sort options for indices display
 */
export type IndexSortOption = 'name' | 'value' | 'change' | 'region';

/**
 * Index subscription status
 */
export interface IndexSubscription {
  indexId: string;
  alertsEnabled: boolean;
  lastNotified?: Date;
  changeThreshold?: number;
}

/**
 * API response for index data
 */
export interface IndexDataResponse {
  data: IndexData[];
  lastUpdated: string;
  status: 'success' | 'error';
  message?: string;
}
