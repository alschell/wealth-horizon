
export interface IndexData {
  id: string;
  name: string;
  symbol: string;
  value: number;
  change: number;
  percentChange: number;
  region: string;
  description: string;
  volume?: number; // Changed from string to number to match actual data
}

export interface IndicesTrackerProps {
  preselectedIndex?: string;
}

export interface FilterOption {
  id: string;
  name: string;
}

// Add the missing ChartDataPoint interface
export interface ChartDataPoint {
  date: string;
  value: number;
}
