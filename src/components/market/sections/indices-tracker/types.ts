
export interface IndexData {
  id: string;
  name: string;
  value: number;
  change: number;
  percentChange: number;
  // Add additional properties that are being used throughout the application
  symbol?: string;
  region?: string;
  exchange?: string;
  volume?: number;
  description?: string;
}

export interface IndicesTrackerProps {
  indices: IndexData[];
}

// Add chart data point type that's used in IndexPerformanceChart
export interface ChartDataPoint {
  date: string;
  value: number;
}
